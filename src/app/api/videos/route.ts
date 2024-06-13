import { NextResponse, NextRequest } from "next/server";
import {
  chooseFormat,
  downloadFromInfo,
  getInfo,
  videoFormat,
  videoInfo,
} from "ytdl-core";
import { checkVideoPrams } from "@/app/api/videos/query-videos.schema";
import { ZodError } from "zod";
import { getContentLength } from "@/helpers/content-length.helper";

interface NextApiResponse extends NextResponse {
  params: { videoName: string };
}

const getHeader = async (
  { headers }: Response,
  format: videoFormat,
  info: videoInfo,
) => {
  const fileName = `${info.videoDetails.title}(${format.qualityLabel}).${format.container}`;

  const responseHeaders = new Headers(headers);

  responseHeaders.set("Content-Type", format.mimeType || "video/mp4");

  if (!format.contentLength) {
    const contentLength = await getContentLength(format.url);
    if (contentLength) {
      responseHeaders.set("Content-Length", String(contentLength));
    }
  }

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
    const { id, quality } = checkVideoPrams(request.url);

    const info = await getInfo(id);
    const format = chooseFormat(info.formats, { quality });

    const data = downloadFromInfo(info, { format, highWaterMark: 1024 * 1024 });

    return new Response(data as never, {
      headers: await getHeader(response, format, info),
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
