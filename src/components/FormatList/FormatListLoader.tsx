"use client";
import DownloadIcon from "@/components/icons/DownloadIcon";

const LOADER_ITEMS = [0, 1, 2, 3, 4, 5, 6];

function FormatItem() {
  return (
    <tr>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 text-nowrap max-w-32 sm:block md:max-w-72 dark:text-white truncate  hidden">
        <div className="animate-pulse h-5 w-32 md:w-64 bg-slate-200 dark:bg-slate-700 rounded" />
      </td>
      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
        <div className="animate-pulse h-5 w-24  bg-slate-200 dark:bg-slate-700 rounded" />
      </td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white ">
        <div className="animate-pulse h-5 w-10 bg-slate-200 dark:bg-slate-700 rounded" />
      </td>
      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
        <p className="text-blue-600 dark:text-blue-500 flex gap-1 cursor-pointer">
          <DownloadIcon className="fill-blue-600 dark:fill-blue-500" />
          download
        </p>
      </td>
    </tr>
  );
}

function FormatListLoader() {
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
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 sm:block hidden"
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
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      fps
                    </th>
                    <th scope="col" className="p-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {LOADER_ITEMS.map((key) => (
                    <FormatItem key={key} />
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

export default FormatListLoader;
