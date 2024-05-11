import Image from "next/image";

export default function Home() {
  return (
      <main className='mx-auto flex min-h-[calc(100vh-16rem)] max-w-screen-xl flex-grow flex-col items-center justify-center'>
        <h1 className='main-title'>
          Select URL
        </h1>
        <div className='mt-6 flex flex-col gap-1 sm:flex-row'>
          <input className="main-input" type="url"/>
            <button className="main-input">GO</button>
        </div>
          <div className="before:bg-gradient-to-r before:from-cyan-500 before:to-blue-500 before:shadow-[rgba(0, 0, 0, 0.56) 0px 22px 70px 4px]"></div>
      </main>
  );
}
