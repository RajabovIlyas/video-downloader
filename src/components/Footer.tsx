"use client";

function Footer() {
  return (
    <div className="sticky top-[100vh] mx-auto max-w-screen-xl ">
      <footer className="p-5">
        <p className="text-center text-sm text-slate-500 dark:text-zinc-400">
          Copyright © {new Date().getFullYear()} Video Downloader.
        </p>
        <p className="mt-1 text-center text-xs text-slate-500 dark:text-zinc-400">
          Made by &nbsp;
          <a className="hover:cursor-pointer hover:underline">Raj Ilyas</a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
