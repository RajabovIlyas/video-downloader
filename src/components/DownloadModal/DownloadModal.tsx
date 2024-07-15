"use client";

import { FC, useEffect, useState } from "react";

interface DownloadModalProps {
  openModal?: boolean;
  urlCheck?: string | null;
  setOpenModal: (bool: boolean) => void;
  title: string;
}

const DownloadModal: FC<DownloadModalProps> = ({
  openModal = false,
  setOpenModal,
  urlCheck,
  title,
}) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>();
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const checkFileDownload = async () => {
    if (typeof urlCheck !== "string") {
      return;
    }
    const data = await fetch(urlCheck);
    const result = await data.json();
    if (result.status === "success") {
      setDownloadUrl(result.url);
    }

    if (result.status === "wait") {
      setTimeout(checkFileDownload, 1000 * 2);
    }
  };

  useEffect(() => {
    if (!openModal) {
      setDownloadUrl(null);
      return;
    }
    checkFileDownload();
  }, [openModal]);

  return (
    <dialog open={openModal}>
      <div
        className="fixed inset-0 bg-gray-500 dark:bg-black dark:bg-opacity-60 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-zinc-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div hidden={!!downloadUrl}>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
              </div>
              <div hidden={!downloadUrl}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z"
                    className="fill-green-800"
                  />
                </svg>
              </div>
              <div className="sm:flex sm:items-start">
                <h2>{title}</h2>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <a href={downloadUrl || "#"}>
                <button
                  disabled={!downloadUrl}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 sm:ml-3 sm:w-auto disabled:bg-zinc-300 disabled:dark:bg-zinc-500 disabled:cursor-wait"
                >
                  download
                </button>
              </a>
              <button
                onClick={onCloseModal}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default DownloadModal;
