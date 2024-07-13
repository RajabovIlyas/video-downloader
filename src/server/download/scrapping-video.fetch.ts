"use server";
interface ScrappingVideoFetchProps {
  id: string;
  type: string;
  quality: string;
  fileName: string;
  videoToken: string;
  videoTime: string;
  convertUrl: string;
  prefixName: string;
}

export const getDownloadVideoStatusFetch = async ({
  convertUrl,
  id,
  quality,
  videoToken,
  videoTime,
  type,
  prefixName,
}: ScrappingVideoFetchProps): Promise<string> => {
  const data = await fetch(convertUrl, {
    headers: {
      accept: "*/*",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-requested-key": "de0cfuirtgf67a",
      Referer: "https://y2meta.app/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `v_id=${id}&fquality=${quality}&ftype=${type}&token=${videoToken}&timeExpire=${videoTime}&client=${prefixName}`,
    method: "POST",
    cache: "no-cache",
  });

  const { c_server: serverUrl }: { c_server: string } = await data.json();

  return serverUrl;
};

interface UrlVideoForDownloadFetchProps
  extends Omit<ScrappingVideoFetchProps, "convertUrl"> {
  serverUrl: string;
  convertEndpoint: string;
}

export const getUrlForDownloadVideo = async ({
  videoTime,
  videoToken,
  serverUrl,
  id,
  quality,
  type,
  fileName,
}: UrlVideoForDownloadFetchProps): Promise<{
  status: string;
  statusCode: number;
  result: string;
}> => {
  const data = await fetch(`${serverUrl}/api/json/convert`, {
    headers: {
      accept: "*/*",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://y2meta.app/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `v_id=${id}&ftype=${type}&fquality=${quality}&fname=${fileName}&token=${videoToken}&timeExpire=${videoTime}`,
    method: "POST",
  });
  return await data.json();
};
