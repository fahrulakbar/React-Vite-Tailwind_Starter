import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import img from "../../../../../../assets/img/bg_berita.png";
import Card from "../../Home/News/Card";

const DetailBerita = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://nurul-huda.org/api/berita/${slug}`
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      if (!error.response) {
        console.error("Network error:", error);
      } else {
        console.error("Error response:", error.response.data);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [slug]);

  return (
    <div className="px-5 pt-14 md:px-[60px] md:pt-[120px] lg:px-[80px] lg:pt-[130px] xl:px-[160px]">
      <div className="flex flex-col lg:flex-row p-2 md:p-5 bg-white rounded-xl shadow border border-gray-300 justify-center items-start gap-2 md:gap-5">
        {data && (
          <div className="flex flex-col gap-2 drop-shadow-lg bg-white border-l-[1px] border-gray-300 rounded-md">
            {data.thumbnail && (
              <div
                className="rounded-md h-[650px]"
                style={{
                  backgroundImage: `url(${data.thumbnail})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
            )}
            <div className="flex flex-col gap-2">
              <div className="flex">
                {data.tanggal && (
                  <Card.Date
                    date={data.tanggal || "dd/mm/yyyy"}
                    svg="stroke-gray-500"
                    dateclassName="font-[Poppins] text-[8px] text-gray-500"
                    className="[&>svg]:h-3 [&>svg]:w-3 inline-flex items-center gap-1 px-2 border-r-2"
                  />
                )}
                {data.author.nama && (
                  <Card.Author
                    author={data.author.nama || "author name"}
                    authorclassName="font-[Poppins] text-[8px] text-gray-500"
                    svg="h-3 w-[10px]"
                    className="inline-flex [&>svg]:h-3 [&>svg]:fill-gray-500 gap-1 px-2 border-r-2"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1 px-2 pb-2">
                {data.judul && (
                  <h1 className="font-[Poppins] font-medium text-justify text-gray-700">
                    {data.judul ||
                      "Lorem ipsum dolor sit amet consectetur.  Enim feugiat dignissim a fringilla vitae vestibulum faucibus"}
                  </h1>
                )}
                {data.isi && (
                  <div className="font-[Poppins] text-[10px] text-justify text-gray-500">
                    <div dangerouslySetInnerHTML={{ __html: data.isi }}></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="w-full">
          <img src={img} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default DetailBerita;
