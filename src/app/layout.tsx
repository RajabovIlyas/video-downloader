import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Providers} from "./providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Raj Downloader",
    description: "Raj Downloader ",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
                <div className='min-h-screen'>
                    <Header/>
                    {children}
                    <Footer/>
                </div>
        </Providers>
        </body>
        </html>
    );
}
