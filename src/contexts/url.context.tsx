"use client";

import { createContext, useState } from "react";
import { UrlFormModel } from "@/models/url-form.model";
import { VideoInfoModel } from "@/models/video-info.model";
import { getParamFromUrlYt } from "@/helpers/param-from-url-yt.helper";
import { ErrorReqModel } from "@/models/error-req.model";
import { getVideoInfoByUrl } from "@/services/download-video.service";
import {
  retrieveChallenge,
  solveChallenge,
} from "@/services/check-download-video";

type FormatType = VideoInfoModel | null | ErrorReqModel;

export interface StateContextParams {
  setFormatsByUrl: (parse: UrlFormModel) => void;
  videoInfo: FormatType;
  infoLoading: boolean;
  videoKey: string;
  downloadLoading: boolean;
}

const defaultState: StateContextParams = {
  videoKey: "",
  videoInfo: null,
  setFormatsByUrl: () => {},
  infoLoading: false,
  downloadLoading: false,
};

export const UrlContext = createContext<StateContextParams>(defaultState);

export default function UrlContextComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [videoInfo, setVideoInfo] = useState<FormatType>(null);
  const [videoKey, setVideoKey] = useState("");
  const [infoLoading, setInfoLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const setFormatsByUrl = async ({ url }: UrlFormModel) => {
    try {
      const newVideoKey = getParamFromUrlYt(url);
      if (!newVideoKey) {
        throw Error("Bad url!");
      }
      setInfoLoading(true);
      setVideoKey(newVideoKey);
      const videoInfo = await getVideoInfoByUrl(newVideoKey);
      setVideoInfo(videoInfo);
    } catch (e) {
      setVideoInfo({ error: "Bad request!" });
    } finally {
      setInfoLoading(false);
    }
  };

  return (
    <UrlContext.Provider
      value={{
        videoInfo,
        setFormatsByUrl,
        infoLoading,
        videoKey,
        downloadLoading,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
}
