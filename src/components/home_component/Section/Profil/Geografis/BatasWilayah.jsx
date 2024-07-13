import { useEffect, useState } from "react";
import axios from "axios";

export const Batas = () => {
  const [data, setData] = useState([]);

  const getDataBatas = async () => {
    try {
      const response = await axios.get("http://nurul-huda.org/api/geografis");
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error fetching batas data:", error);
    }
  };

  useEffect(() => {
    getDataBatas();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-[Poppins] text-[12px] md:text-[24px] font-semibold text-teal-700">
        Batas Wilayah
      </h1>
    </div>
  );
};
