import { NextResponse, NextRequest } from "next/server";
import { chooseFormat, downloadFromInfo, getInfo } from "ytdl-core";

interface NextApiResponse extends NextResponse {
  params: { videoName: string };
}

export async function GET(request: NextRequest, response: NextApiResponse) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const quality = searchParams.get("quality");
  const responseHeaders = new Headers(response.headers);
  if (!id || !quality) {
    return NextResponse.json({ data: "id and format is required params" });
  }

  const randomName = Math.random().toString(36).substring(2, 15);

  const info = await getInfo(id);
  const format = chooseFormat(info.formats, { quality });

  responseHeaders.set("Content-Type", "video/mp4");

  responseHeaders.set(
    "Content-Disposition",
    `attachment; filename="${randomName}.${format.container}"`,
  );

  responseHeaders.set(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
  );

  const data = downloadFromInfo(info, { format });

  return new Response(data as never, {
    headers: responseHeaders,
  });
}
