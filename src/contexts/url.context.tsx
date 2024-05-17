'use client';

import {createContext, useCallback, useState} from 'react';
import {UrlFormModel} from "@/models/url-form.model";
import {downloadVideo, getVideoInfoByUrl} from "@/services/download-video.service";
import {VideoFormatForView} from "@/models/video-format.model";


type FormatType = VideoFormatForView[] | null | { error: 'Bad request!' }

export interface StateContextParams {
    setFormatsByUrl: (parse: UrlFormModel) => void;
    formats: FormatType;
    loading: boolean
    downloadVideoByFormat: (quality: string, url: string) => void
    videoUrl: string
}

const defaultState: StateContextParams = {
    videoUrl: '',
    formats: null,
    setFormatsByUrl: () => {
    },
    loading: false,
    downloadVideoByFormat: () => {
    }
};

export const UrlContext = createContext<StateContextParams>(defaultState);

export default function UrlContextComponent({
                                                children,
                                            }: Readonly<{
    children: React.ReactNode;
}>) {
    const [formats, setFormats] = useState<FormatType>(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);


    const setFormatsByUrl = async ({url}: UrlFormModel) => {
        try {
            setVideoUrl(url);
            setLoading(true)
            const formats = await getVideoInfoByUrl(url)
            setFormats(formats);
        } catch (e) {
            setFormats({error: 'Bad request!'})
        } finally {
            setLoading(false)
        }
    };

    const downloadVideoByFormat =  (quality: string, url: string) => {
        console.log(`quality: ${quality}, url: ${url}`)
        downloadVideo(quality, url)
    }


    return (
        <UrlContext.Provider value={{formats, setFormatsByUrl, loading, downloadVideoByFormat, videoUrl}}>
            {children}
        </UrlContext.Provider>
    );
}
