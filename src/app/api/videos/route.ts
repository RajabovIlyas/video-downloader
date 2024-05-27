import { NextResponse, NextRequest } from "next/server";
import {
  chooseFormat,
  downloadFromInfo,
  getInfo,
  videoFormat,
} from "ytdl-core";
import { checkPrams } from "@/app/api/videos/query.schema";
import { ZodError } from "zod";

interface NextApiResponse extends NextResponse {
  params: { videoName: string };
}

const getHeader = ({ headers }: Response, format: videoFormat) => {
  const randomName = Math.random().toString(36).substring(2, 15);

  const responseHeaders = new Headers(headers);

  responseHeaders.set("Content-Type", "video/mp4");

  responseHeaders.set(
    "Content-Disposition",
    `attachment; filename="${randomName}.${format.container}"`,
  );

  responseHeaders.set(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
  );
  return responseHeaders;
};

export async function GET(request: NextRequest, response: NextApiResponse) {
  try {
    const { id, quality } = checkPrams(request.url);

    const info = await getInfo(id);
    const format = chooseFormat(info.formats, { quality });

    const data = downloadFromInfo(info, { format });

    return new Response(data as never, {
      headers: getHeader(response, format),
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
