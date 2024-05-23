import UrlForm from "@/components/UrlForm";
import UrlContextComponent from "@/contexts/url.context";
import FormatList from "@/components/FormatList";

export default function Home() {
  return (
    <UrlContextComponent>
      <main className="mx-auto flex min-h-[calc(100vh-16rem)] max-w-screen-xl flex-grow flex-col items-center justify-center">
        <h1 className="main-title">Select URL</h1>
        <UrlForm />
        <FormatList />
      </main>
    </UrlContextComponent>
  );
}
