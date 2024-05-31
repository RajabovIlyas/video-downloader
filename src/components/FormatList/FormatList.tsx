"use client";
import { useContext } from "react";
import { UrlContext } from "@/contexts/url.context";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { VideoFormat, VideoInfoModel } from "@/models/video-info.model";
import { ErrorReqModel } from "@/models/error-req.model";
import FormatListLoader from "@/components/FormatList/FormatListLoader";

interface FormatItemProps extends Omit<VideoFormat, "url"> {
  videoKey: string;
  title: string;
}

const getUrlDownload = (videoKey: string, itag: number) => {
  if (!videoKey || !itag) {
    return "";
  }
  return `/api/videos?id=${videoKey}&quality=${itag}`;
};

function FormatItem({
  itag,
  qualityLabel,
  videoKey,
  title,
  fps,
  contentLength,
  container,
}: FormatItemProps) {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 text-nowrap md:block max-w-72 dark:text-white truncate  hidden">
        {title}
      </td>
      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
        {qualityLabel} {container}
      </td>
      <td className="hidden sm:block py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white ">
        {fps}
      </td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white ">
        {contentLength}
      </td>
      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
        <a
          href={getUrlDownload(videoKey, itag)}
          className="text-blue-600 dark:text-blue-500 hover:underline flex gap-1"
        >
          <DownloadIcon className="fill-blue-600 dark:fill-blue-500" />
          download
        </a>
      </td>
    </tr>
  );
}

function FormatList() {
  const { videoInfo, videoKey, infoLoading } = useContext(UrlContext);

  if (infoLoading) {
    return <FormatListLoader />;
  }

  if (!videoInfo || (videoInfo as ErrorReqModel).error) {
    return null;
  }

  const { formats, title } = videoInfo as VideoInfoModel;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 md:block hidden"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      quality
                    </th>
                    <th
                      scope="col"
                      className="hidden sm:block py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      fps
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      size
                    </th>
                    <th scope="col" className="p-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 ">
                  {formats.map((format) => (
                    <FormatItem
                      key={format.itag}
                      {...{ ...format, title, videoKey }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormatList;
