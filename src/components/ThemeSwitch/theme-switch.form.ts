"use client";

import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { useEffect } from "react";

interface ThemeSwitchForm {
  theme: string;
}

export const useThemeSwitchForm = () => {
  const { theme, setTheme } = useTheme();

  const { register, watch } = useForm<ThemeSwitchForm>({
    defaultValues: { theme },
  });

  const newTheme = watch("theme");

  useEffect(() => {
    if (theme === newTheme) {
      return;
    }
    setTheme(newTheme);
  }, [newTheme]);

  return { register };
};
