import { NextRequest, NextResponse } from "next/server";
import { checkPrams } from "@/app/api/videos/query.schema";
import { ZodError } from "zod";
import { getVideoInfoByUrl } from "@/services/download-video.service";
import {
  retrieveChallenge,
  solveChallenge,
} from "@/services/check-download-video";

const getHeader = ({ headers }: Response, format: string) => {
  const randomName = Math.random().toString(36).substring(2, 15);

  const responseHeaders = new Headers(headers);

  responseHeaders.set("Content-Type", "video/mp4");

  responseHeaders.set(
    "Content-Disposition",
    `attachment; filename="${randomName}.${format}"`,
  );

  responseHeaders.set(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
  );
  return responseHeaders;
};

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { id, quality } = checkPrams(request.url);

    const { formats } = await getVideoInfoByUrl(id);

    const findFormat = formats.find(
      ({ itag, url }) => itag.toString() === quality && url,
    );

    const challenge = await retrieveChallenge(id);

    if (!findFormat?.url || !challenge) {
      return new NextResponse(
        JSON.stringify({ error: "quality is not current" }),
        { status: 400 },
      );
    }

    const videoUrl = await solveChallenge(challenge, findFormat.url);

    const res = await fetch(videoUrl);

    if (!res.ok) {
      return new NextResponse(
        JSON.stringify({ error: `error fetch: ${videoUrl}` }),
        {
          status: 400,
        },
      );
    }

    return new Response(res.body, {
      headers: getHeader(response, "mp4"),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse(error.message, { status: 400 });
    }
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }
  }
}
