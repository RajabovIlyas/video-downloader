import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getDownloadVideo } from "@/server/download";
import { checkDownloadPrams } from "@/app/api/scrapping/download/query-download.schema";
import { PassThrough } from "stream";
import axios from "axios";

// const createStream = (url: string) => {
//   const stream = new PassThrough({
//     highWaterMark: 1024 * 512,
//   });
//   stream._destroy = () => {
//     stream.destroyed = true;
//   };
//   setImmediate(() => {
//     downloadFromInfoCallback(stream, info, options);
//   });
//   return stream;
// };

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const query = checkDownloadPrams(request.url);
    const { result, title } = await getDownloadVideo(query);
    if (!result) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const data = await fetch(result, {
      method: "get",
      cache: "no-cache",
    });

    const headers = new Headers(data.headers);

    headers.set(
      "Content-Disposition",
      `attachment; filename*=UTF-8''${encodeURIComponent(`${title}.${query.type}`)}`,
    );

    return new NextResponse(await data.blob(), { headers });
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
  return new NextResponse(JSON.stringify({ message: "Server error" }), {
    status: 500,
  });
}
