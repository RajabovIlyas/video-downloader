export const TWO_META_URL = "https://y2meta.app";

export const YOUTUBE_URL = "https://www.youtube.com";

export const getYoutubeWatchUrl = (id: string) =>
  `${YOUTUBE_URL}/watch?v=${id}`;

export const getUrlForScrapping = (id: string) =>
  `${TWO_META_URL}/en/download-youtube/${id}`;

export const getScrappingHeader = (videoId: string) => ({
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  Referer: `https://y2meta.app/en/download-youtube/${videoId}`,
  "X-Requested-With": "XMLHttpRequest",

  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cache-Control": "no-cache",
  "Content-Length": "146",
  Cookie: ".AspNetCore.Culture=c%3Den%7Cuic%3Den",
  Origin: "https://y2meta.app",
  Pragma: "no-cache",
  Priority: "u=1, i",
  "Sec-Ch-Ua":
    '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": "Windows",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
});
