import React from "react";
import Navmenu from "./Navmenu";
import Logo from "../Logo";

function Navbar() {
  return (
    <div className="fixed z-[999999] top-0 left-0 w-full flex justify-between items-center px-[20px] py-3 md:py-[30px] md:px-[60px] lg:px-[80px] xl:px-[160px] shadow-md bg-white">
      <Logo
        className="flex gap-2"
        text="Kampung Eka Sapta"
        addres="Kec. Talisayan Kab. Berau Kalimantan Timur "
        href="/home"
      />
      <Navmenu />
    </div>
  );
}

export default Navbar;
