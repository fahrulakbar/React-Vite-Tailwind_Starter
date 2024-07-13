import { useEffect, useState } from "react";
import Layout from "./Layout";

const defaultdata = [
  {
    id: 1,
    nama: "No data available",
    masajabatan: "-",
  },
  {
    id: 2,
    nama: "No data available",
    masajabatan: "-",
  },
  {
    id: 3,
    nama: "No data available",
    masajabatan: "-",
  },
];

const Data = () => {
  const url = "";
  const [datakades, setdataKades] = useState(defaultdata);

  const getDataKades = async () => {
    const response = await fetch(url);
    const DataKades = await response.json();
    setdataKades(DataKades);
    console.log(datakades);
  };

  useEffect(() => {
    getDataKades();
  }, []);

  return (
    <tbody>
      {defaultdata.map((data) => {
        const bgchange = data.id % 2 === 0;
        return (
          <tr key={data.id} className={bgchange ? `bg-gray-200` : `bg-white`}>
            <td className="border border-slate-100 shadow-sm text-[10px] md:text-[16px] text-gray-500 font-medium text-center font-[Poppins] py-1 ">
              {data.id.toString()}
            </td>
            <td className="border border-slate-100 shadow-sm text-[10px] md:text-[16px] text-gray-500 font-medium text-center font-[Poppins] py-1 ">
              {data.nama}
            </td>
            <td className="border border-slate-100 shadow-sm text-[10px] md:text-[16px] text-gray-500 font-medium text-center font-[Poppins] py-1 ">
              {data.masajabatan}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default Data;
