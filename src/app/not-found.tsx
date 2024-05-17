"use client";
import { FC } from "react";
import Notice from "@/components/Notice";

const NotFound: FC = () => (
  <Notice title={404} description={"Page not found."} />
);

export default NotFound;
