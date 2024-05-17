'use client'
import {useCallback, useContext} from "react";
import {UrlContext} from "@/contexts/url.context";
import DownloadIcon from "@/components/icons/DownloadIcon";
import {VideoFormatForView} from "@/models/video-format.model";


interface FormatItemProps extends Omit<VideoFormatForView, 'url'> {
    onDownloadVideo: (quality: string) => void
}

function FormatItem({quality, itag, qualityLabel, onDownloadVideo}: FormatItemProps) {

    const onClickDownloadButton = () => {
        onDownloadVideo(itag.toString());
    }

    return (
        <tr>
            <td className="mt-5">{quality}</td>
            <td className="mt-5">{qualityLabel}</td>
            <td className="mt-5">
                <button className="main-button flex items-center gap-1" onClick={onClickDownloadButton}>
                    <DownloadIcon/> Download
                </button>
            </td>
        </tr>
    )
}

function FormatList() {
    const {formats, downloadVideoByFormat, videoUrl} = useContext(UrlContext);

    const onDownloadVideo = useCallback((quality: string) => {
        downloadVideoByFormat(quality, videoUrl)
    }, [videoUrl]);

    return (
        <div className="flex justify-center">
            <table className="w-full px-5 ">
                <tbody>
                {(Array.isArray(formats) && formats.map(({url, ...format}) => <FormatItem
                    key={url} {...{onDownloadVideo, ...format}} />))}
                </tbody>
            </table>
        </div>
    )
}

export default FormatList;
