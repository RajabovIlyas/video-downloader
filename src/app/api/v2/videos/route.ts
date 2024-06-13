import { NextResponse, NextRequest } from "next/server";
import { chooseFormat, getInfo, videoFormat, videoInfo } from "ytdl-core";
import { ZodError } from "zod";
import {
  retrieveChallenge,
  solveChallenge,
} from "@/services/faster-download.service";
import { checkPrams } from "@/app/api/v2/videos/query.schema";

interface NextApiResponse extends NextResponse {
  params: { videoName: string };
}

const getHeader = (
  { headers }: Response,
  format: videoFormat,
  info: videoInfo,
) => {
  const fileName = `${info.videoDetails.title}(${format.qualityLabel}).${format.container}`;

  const responseHeaders = new Headers(headers);

  responseHeaders.set("Content-Type", "video/mp4");

  if (format.contentLength) {
    responseHeaders.set("Content-Length", format.contentLength);
  }

  responseHeaders.set(
    "Content-Disposition",
    `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
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

    const lowUrl = format.url;

    const challenge = await retrieveChallenge(id);

    const fastUrl = await solveChallenge(challenge, lowUrl);

    return NextResponse.json({ lowUrl, fastUrl });
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
