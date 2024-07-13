import cheerio from "cheerio";
import {
  FormatVideo,
  FormatVideoFromHTML,
} from "@/server/scrapping-format/scrapping-format.interface";

const KEYS = ["videoFormat", "size"];

function findTextAndReturnRemainder(
  target: string,
  variable: string,
  end = ";",
) {
  var chopFront = target.substring(
    target.search(variable) + variable.length,
    target.length,
  );
  var result = chopFront.substring(0, chopFront.search(end));
  return result;
}

function removeExtraSpaces(inputString: string) {
  return inputString.replace(/\s+/g, " ").trim();
}

export const getUserTokenByHTML = (htmlString: string) => {
  const scriptFromHTML = cheerio.load(htmlString)("script").text();

  return {
    urlQuery: findTextAndReturnRemainder(
      scriptFromHTML,
      'var k_get_query="',
      '"',
    ),
    convertEndpoint: findTextAndReturnRemainder(
      scriptFromHTML,
      'var k_convert_url="',
      '"',
    ),
    analyzeUrl: findTextAndReturnRemainder(
      scriptFromHTML,
      'var k_analyze_url="',
      '"',
    ),

    clientToken: findTextAndReturnRemainder(
      scriptFromHTML,
      "var client_token='",
      "'",
    ),
  };
};

export const getFormatsByHTML = (htmlString: string): FormatVideoFromHTML => {
  const $ = cheerio.load(htmlString);

  const title = $("b").text();

  const fileName = $("#FileName").val() as string;

  const scriptFromHTML = $("script").text();

  const videoId = findTextAndReturnRemainder(
    scriptFromHTML,
    'var k_data_vid = "',
    '"',
  );
  const convertUrl = findTextAndReturnRemainder(
    scriptFromHTML,
    'var k_convert_url = "',
    '"',
  );

  const prefixName = findTextAndReturnRemainder(
    scriptFromHTML,
    'var k_prefix_name = "',
    '"',
  );

  const videoToken = findTextAndReturnRemainder(
    scriptFromHTML,
    'var k__id = "',
    '"',
  );

  const videoTime = findTextAndReturnRemainder(
    scriptFromHTML,
    'var k_time = "',
    '"',
  );

  const formats: FormatVideo[] = [];

  $("tr").each(function (i: number, value) {
    let obj: any = {};

    $("td", this).each(function (index: number, value) {
      if (KEYS[index] !== undefined) {
        obj[KEYS[index]] = removeExtraSpaces($(value).text());
        return;
      }
      obj.quality = $("button", this).attr("data-fquality");
      obj.type = $("button", this).attr("data-ftype");
    });

    if (Object.keys(obj).length <= 1) {
      return;
    }

    formats.push(obj);
  });
  return {
    title,
    formats,
    fileName,
    videoId,
    videoTime,
    videoToken,
    convertUrl,
    prefixName,
  };
};
