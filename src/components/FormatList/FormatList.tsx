"use client";
import { useCallback, useContext, useState } from "react";
import { UrlContext } from "@/contexts/url.context";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { VideoFormat, VideoInfoModel } from "@/models/video-info.model";
import { ErrorReqModel } from "@/models/error-req.model";
import FormatListLoader from "@/components/FormatList/FormatListLoader";
import TypeBadge from "@/components/TypeBadge";
import DownloadModal from "@/components/DownloadModal/DownloadModal";

interface FormatItemProps extends VideoFormat {
  videoKey: string;
  title: string;
  onClickDownloadButton: (urlCheck: string) => void;
}

function FormatItem({
  qualityLabel,
  url,
  title,
  type,
  contentLength,
  onClickDownloadButton,
}: FormatItemProps) {
  const onClick = async () => {
    onClickDownloadButton(url);
  };

  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 text-nowrap md:block max-w-72 dark:text-white truncate  hidden">
        {title}
      </td>
      <td className="py-4 px-3 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
        {qualityLabel}
      </td>
      <td className="hidden sm:block py-4 px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white ">
        <TypeBadge type={type} />
      </td>
      <td className="py-4 px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white ">
        {contentLength}
      </td>
      <td className="py-4 pr-6 pl-3 text-sm font-medium text-right whitespace-nowrap">
        <button
          className="text-blue-600 dark:text-blue-500 hover:underline flex gap-1"
          onClick={onClick}
        >
          <DownloadIcon className="fill-blue-600 dark:fill-blue-500" />
          download
        </button>
      </td>
    </tr>
  );
}

function FormatList() {
  const { videoInfo, videoKey, infoLoading } = useContext(UrlContext);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [urlCheck, setUrlCheck] = useState<string | null>();

  const onClickDownloadButton = useCallback((urlCheck: string) => {
    setOpenDownloadModal(true);
    setUrlCheck(urlCheck);
  }, []);

  if (infoLoading) {
    return <FormatListLoader />;
  }

  if (!videoInfo || (videoInfo as ErrorReqModel).error) {
    return null;
  }

  const { formats, title } = videoInfo as VideoInfoModel;

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="p-3 pl-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 md:block hidden"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        quality
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:block p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        type
                      </th>
                      <th
                        scope="col"
                        className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        size
                      </th>
                      <th scope="col" className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 ">
                    {formats.map((format) => (
                      <FormatItem
                        key={format.url}
                        {...{
                          ...format,
                          title,
                          videoKey,
                          onClickDownloadButton,
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DownloadModal
        openModal={openDownloadModal}
        urlCheck={urlCheck}
        setOpenModal={setOpenDownloadModal}
        title={title}
      />
    </>
  );
}

export default FormatList;
