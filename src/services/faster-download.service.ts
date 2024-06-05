"use server";

import axios from "axios";
import vm from "vm";

const retrieve_player_url = async (videoId: string) => {
  const response = await axios.get("https://www.youtube.com/embed/" + videoId);
  const playerHash = /\/s\/player\/(\w+)\/player_ias.vflset\/\w+\/base.js/.exec(
    response.data,
  )?.[1];
  return `https://www.youtube.com/s/player/${playerHash}/player_ias.vflset/en_US/base.js`;
};

export const retrieveChallenge = async (videoId: string) => {
  const playerUrl = await retrieve_player_url(videoId);

  const response = await axios.get(playerUrl);
  const challengeName =
    /\.get\("n"\)\)&&\(b=([a-zA-Z0-9$]+)(?:\[(\d+)\])?\([a-zA-Z0-9]\)/.exec(
      response.data,
    )?.[1];
  const newChallengeName = new RegExp(
    `var ${challengeName}\\s*=\\s*\\[(.+?)\\]\\s*[,;]`,
  ).exec(response.data)?.[1];

  return new RegExp(
    `${newChallengeName}\\s*=\\s*function\\s*\\(([\\w$]+)\\)\\s*{(.+?}\\s*return\\ [\\w$]+.join\\(""\\))};`,
    "s",
  ).exec(response.data)?.[2];
};

/**
 * Проходим проверку и меняем параметр запроса n из url
 */
export const solveChallenge = async (
  challenge: string | undefined,
  formatUrl: string,
) => {
  const url = new URL(formatUrl);

  const n = url.searchParams.get("n");
  const n_transformed = vm.runInNewContext(`((a) => {${challenge}})('${n}')`);

  url.searchParams.set("n", n_transformed);
  return url.toString();
};
