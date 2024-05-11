import './themeSwitch.css'
import {useTheme} from "next-themes";
import {SiteTheme} from "@/enums/site-theme.enum";

function ThemeSwitch() {

    const { theme, setTheme} = useTheme();

    const changeTheme = (newTheme: SiteTheme) => () => {
        if (theme === newTheme) {
            return
        }
        setTheme(newTheme);
    };

    return (
        <div role="radiogroup" className="theme-switcher">
            <label className='theme-switcher-container'>
                <input
                    type="radio"
                    name="theme"
                    value={SiteTheme.LIGHT}
                    data-theme-switcher="true"
                    data-active="false"
                    aria-label="Switch to light theme"
                    aria-checked="false"

                    checked={SiteTheme.LIGHT === theme}
                    onClick={changeTheme(SiteTheme.LIGHT)}
                />
                <span className="theme-switcher_switch">
            <svg
                style={{color: 'currentcolor', width: '16px', height: '16px'}}
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
                shapeRendering="geometricPrecision"
                height="24"
                fill="none"
                data-testid="geist-icon"
                className="icon"
            >
                <circle r="5" cy="12" cx="12"></circle>
                <path d="M12 1v2"></path>
                <path d="M12 21v2"></path>
                <path d="M4.22 4.22l1.42 1.42"></path>
                <path d="M18.36 18.36l1.42 1.42"></path>
                <path d="M1 12h2"></path>
                <path d="M21 12h2"></path>
                <path d="M4.22 19.78l1.42-1.42"></path>
                <path d="M18.36 5.64l1.42-1.42"></path>
            </svg>
                    </span>
            </label>
            <label className='theme-switcher-container'>
                <input
                    type="radio"
                    name="theme"
                    value={SiteTheme.SYSTEM}
                    data-theme-switcher="true"
                    data-active="false"
                    aria-label="Switch to system theme"
                    aria-checked="false"

                    checked={SiteTheme.SYSTEM === theme}
                    onClick={changeTheme(SiteTheme.SYSTEM)}
                />
                <span className="theme-switcher_switch">
            <svg
                style={{color: 'currentcolor', width: '16px', height: '16px'}}
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
                shapeRendering="geometricPrecision"
                height="24"
                fill="none"
                data-testid="geist-icon"
                className="icon"
            >
                <rect ry="2" rx="2" height="14" width="20" y="3" x="2"></rect>
                <path d="M8 21h8"></path>
                <path d="M12 17v4"></path>
            </svg>
                    </span>
            </label>
            <label className='theme-switcher-container'>
                <input
                    type="radio"
                    name="theme"
                    value={SiteTheme.DARK}
                    data-theme-switcher="true"
                    data-active="true"
                    aria-label="Switch to dark theme"
                    aria-checked="true"
                    checked={SiteTheme.DARK === theme}
                    onClick={changeTheme(SiteTheme.DARK)}
                />
                <span className="theme-switcher_switch">
            <svg
                style={{color: 'currentcolor', width: '16px', height: '16px'}}
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
                shapeRendering="geometricPrecision"
                height="24"
                fill="none"
                data-testid="geist-icon"
                className="icon"
            >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
                    </span>
            </label>
        </div>

    )
}

export default ThemeSwitch;
