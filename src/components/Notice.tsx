"use client";

interface NoticeProps {
  title: string | number;
  description: string | number;
}

function Notice({ title, description }: NoticeProps) {
  return (
    <div className="flex min-h-[calc(100vh-15rem)] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold dark:text-zinc-400 lg:text-5xl lg:tracking-tight">
          {title}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Notice;
