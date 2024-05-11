'use client';
import Link from 'next/link';
import LogoIcon from "@/components/icons/LogoIcon";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";



function Header ()  {

    return (
        <div className='mx-auto max-w-screen-xl'>
            <header>
                <div className='flex items-center justify-between p-5 lg:flex-row'>
                    <div className='flex items-center justify-between'>
                        <Link href='/' className='header-link-icon'>
                            <LogoIcon/>
                            <span>Video Downloader</span>
                        </Link>
                    </div>

                    <div className='items-center gap-4'>
                        <ThemeSwitch/>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
