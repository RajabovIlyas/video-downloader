import axios from "axios";
import {
  getScrappingHeader,
  TWO_META_URL,
} from "@/server/scrapping-format/scrapping-format.constant";

interface FormatsFetchProps {
  urlQuery: string;
  convertEndpoint: string;
  analyzeUrl: string;
  clientToken: string;
  videoId: string;
}

export const getFormatFetch = async ({
  urlQuery,
  analyzeUrl,
  clientToken,
  videoId,
}: FormatsFetchProps) => {
  const bodyAnalyzeForm = new FormData();
  bodyAnalyzeForm.append("url", urlQuery);
  bodyAnalyzeForm.append("q_auto", urlQuery && urlQuery !== "" ? "1" : "0");
  bodyAnalyzeForm.append("ajax", "1");
  bodyAnalyzeForm.append("token", clientToken);
  const { data } = await axios<{ result: string; status: string }>({
    url: `${TWO_META_URL}${analyzeUrl}`,
    method: "post",
    data: bodyAnalyzeForm,
    headers: getScrappingHeader(videoId),
  });

  return data.result;
};
