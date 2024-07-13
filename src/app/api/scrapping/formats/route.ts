import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { checkFormatsPrams } from "@/app/api/scrapping/formats/query-formats.schema";
import { getScrappingFormatFromBackEnd } from "@/server/scrapping-format";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { id } = checkFormatsPrams(request.url);
    const data = await getScrappingFormatFromBackEnd(id);
    return NextResponse.json(data);
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
