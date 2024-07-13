import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailLembaga = () => {
  const lembagaList = [
    {
      id: 1,
      title: "Lembaga Pencari Janda",
      image: "/src/assets/img/logo-berau3.png",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam maxime eius aut dolorem ipsum sint iste. Ut fugit, ipsum, velit, eius obcaecati necessitatibus impedit in enim iure architecto at illum. Error atque saepe, dolore provident possimus quasi molestias vero soluta similique incidunt aliquam harum hic, sapiente, explicabo cumque assumenda ratione deserunt ut! Quas dolores rem ad distinctio. Rerum, iusto harum. Aperiam omnis saepe porro neque commodi quos voluptatum earum? Accusantium repudiandae eveniet harum blanditiis fugit molestias impedit asperiores iste nemo, officiis cumque sit inventore! Iusto dignissimos ratione saepe tenetur voluptate.",
      slug: "lembaga-1",
    },
  ];

  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const selectedLembaga = lembagaList.find((item) => item.slug === slug);
    setData(selectedLembaga);
  }, [slug]);

  return (
    <section className="px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]">
      <div className="flex flex-col pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20">
        {data && (
          <h1 className="font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[20px] font-semibold text-white rounded-t-lg border-b">
            {data.title}
          </h1>
        )}
        <div className="flex flex-col gap-2 lg:gap-5 px-2 py-4 md:p-5 border bg-white shadow-lg rounded-b-lg "></div>
      </div>
    </section>
  );
};

export default DetailLembaga;
