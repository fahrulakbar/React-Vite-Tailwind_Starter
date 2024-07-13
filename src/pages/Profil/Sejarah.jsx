import Table from "../../components/home_component/Section/Profil/Sejarah/Table/Layout";
import Thumbnail from "../../components/home_component/Section/Profil/Sejarah/Thumbnail";
import React from "react";
const Sejarah = () => {
  return (
    <>
      <section className="px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]">
        <div className="flex flex-col items-center gap-3 pt-14 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-[100px]">
          <Thumbnail />
          {/* <Table /> */}
        </div>
      </section>
    </>
  );
};

export default Sejarah;
