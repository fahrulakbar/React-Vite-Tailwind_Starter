import { Link } from "react-router-dom";
import React from "react";
export default function Icon({ href, src, alt, text }) {
  return (
    <Link
      to={href}
      className="lg:w-full lg:justify-center flex gap-2 items-center p-2 md:p-4 border border-1 border-teal-700 rounded-md cursor-pointer hover:bg-teal-100 hover:duration-500"
    >
      <img src={src} alt={alt} className="w-8 md:w-10 lg:w-14" />
      <p className="font-[Poppins] font-medium text-[8px] lg:text-[12px] xl:text-[16px] text-gray-700 md:text-nowrap">
        {text}
      </p>
    </Link>
  );
}
