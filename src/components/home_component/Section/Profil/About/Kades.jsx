import { useEffect, useState } from "react";
import imgkades from "../../../../../../assets/img/Kades.png";

const Kades = () => {
  const url = "";
  const [kades, setKades] = useState({
    img: imgkades,
    alt: "Kades Image",
    nama: "John Die",
    nip: "000090900909",
    jabatan: "PJ Kepala Desa",
  });

  const getDataKades = async () => {
    const response = await fetch(url);
    const datakades = await response.json();
    setKades(datakades);
    console.log(kades);
  };
  useEffect(() => {
    getDataKades();
  }, []);

  return (
    <div className="flex flex-col gap-2 lg:gap-5">
      <h1 className="font-[Poppins] text-[12px] md:text-[24px] font-semibold text-teal-700">
        Kepala Desa
      </h1>
      {/* Detail Kantor Desa */}
      <div className="flex flex-col md:flex-row border-l-2 pl-3 border-teal-700 gap-2">
        <div className="flex justify-center w-full md:w-1/2 md:px-4">
          <img
            src={kades.img}
            alt={kades.alt}
            className="w-1/2 md:w-full lg:max-w-[400px]"
          />
        </div>
        <div className="flex items-"></div>
        <table className="table-auto h-fit">
          <tbody>
            <tr className="font-[Poppins] text-gray-500 text-[10px] md:text-[12px] align-top">
              <td className="pb-2 w-[60px] md:w-[80px]">Nama</td>
              <td className="">{kades.nama}</td>
            </tr>
            <tr className="font-[Poppins] text-gray-500 text-[10px] md:text-[12px] align-top">
              <td className="pb-2 w-[60px] md:w-[80px]">NIP</td>
              <td className="">{kades.nip}</td>
            </tr>
            <tr className="font-[Poppins] text-gray-500 text-[10px] md:text-[12px] align-top">
              <td className="pb-2 w-[60px] md:w-[80px]">Jabatan</td>
              <td className="">{kades.jabatan}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kades;
