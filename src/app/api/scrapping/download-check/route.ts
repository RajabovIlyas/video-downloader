import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getDownloadVideo } from "@/server/download";
import { checkDownloadPrams } from "@/app/api/scrapping/download/query-download.schema";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const query = checkDownloadPrams(request.url);
    const { statusCode, status } = await getDownloadVideo(query);
    if (statusCode === 300) {
      return NextResponse.json({ status: "wait" }, { status: 300 });
    }
    if (statusCode !== 200) {
      return NextResponse.json({ status: "server error" }, { status: 500 });
    }
    const { id, quality, type } = query;
    return NextResponse.json({
      status: status,
      url: `/api/scrapping/download?id=${id}&type=${type}&quality=${quality}`,
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
  return new NextResponse(JSON.stringify({ message: "Server error" }), {
    status: 500,
  });
}
