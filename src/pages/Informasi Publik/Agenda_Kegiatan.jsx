import { Thumbnail } from "../../components/home_component/Section/Informasi Publik/Thumbnail";
import bg_img from "../../../assets/img/bg_berita.png";
import Card from "../../components/home_component/Section/Home/News/Card";
import Items from "../../components/home_component/Section/Informasi Publik/Items";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
export default function AgendaKegitan() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://nurul-huda.org/api/berita");
      setData(response.data.data.data);
      console.log(response.data.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const headline = data[0];
  const others = data.slice(1, 6);

  return (
    <div className="px-5 pt-14 md:px-[60px] md:pt-[120px] lg:px-[80px] lg:pt-[130px] xl:px-[160px]">
      <div className="w-full p-2 md:p-5 bg-white rounded-xl shadow border border-gray-300 flex-col justify-center items-start gap-2 md:gap-5 inline-flex">
        {headline && (
          <Link to={`/informasi-publik/berita-desa/${headline.slug}`}>
            <Thumbnail
              note="Berita Tebaru"
              bg={headline.thumbnail}
              title={headline.judul}
              description={headline.isi}
            />
          </Link>
        )}

        <div className="flex flex-rows justify-between items-start gap-5 w-full">
          {/* Main */}
          <Items
            text="Berita Lainnya"
            className="w-full flex flex-col gap-2 lg:gap-5"
          >
            {others.map((news, index) => (
              <Card key={index} container="">
                <Link
                  to={`/Informasi-Publik/Berita-Desa/${news.slug}`}
                  className="flex flex-col md:flex-row w-full gap-2 md:gap-5"
                >
                  <Card.Thumbnail
                    src={news.thumbnail}
                    className="w-full h-[150px] xl:h-[200px] rounded-md md:rounded-lg"
                  />
                  <Card.Detail
                    className="w-full"
                    title={news.judul}
                    titleclassName="font-[Poppins] font-semibold text-gray-700 hover:text-teal-700"
                    description={news.isi}
                    descriptionclassName="font-[Poppins] text-[10px] md:text-[12px] xl:text-[14px] text-justify text-gray-500 line-clamp-5"
                  />
                </Link>
              </Card>
            ))}
          </Items>
          {/* Side */}
          <div className="hidden md:flex flex-col md:gap-2 lg:gap-5 md:w-[200px] lg:w-[350px] xl:w-[400px]">
            <Items
              text="Agenda Kegiatan"
              className="flex flex-col text-nowrap lg:gap-5 "
              childrenclassName="flex flex-col gap-2 p-3 rounded-lg bg-white shadow-lg"
            >
              <Card container="p-0 bg-white" wrapper="flex flex-col gap-2">
                <Card.Thumbnail
                  src={bg_img}
                  className="md:h-20 lg:h-32 rounded-lg"
                />
                <Card.Detail
                  className=""
                  title="Lorem ipsum dolor sit amet consectetur."
                  titleclassName="md:text-[10px] text-[16px] font-medium text-wrap font-[Poppins] text-gray-700 line-clamp-3"
                />
              </Card>
            </Items>
            <Items
              text="Galeri Desa"
              className="flex flex-col text-nowrap lg:gap-5 "
              childrenclassName="flex flex-col gap-2 p-3 rounded-lg bg-white shadow-lg"
            >
              <Card container="p-0 bg-white" wrapper="flex flex-col gap-2">
                <Card.Thumbnail
                  src={bg_img}
                  className="md:h-20 h-32 rounded-lg"
                />
                <Card.Detail
                  className=""
                  title="Lorem ipsum dolor sit amet consectetur."
                  titleclassName="md:text-[10px] text-[16px] font-medium text-wrap font-[Poppins] text-gray-700 line-clamp-3"
                />
              </Card>
            </Items>
          </div>
        </div>
      </div>
    </div>
  );
}
