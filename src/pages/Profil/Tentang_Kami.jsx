import Kades from "../../components/home_component/Section/Profil/About/Kades";
import Office from "../../components/home_component/Section/Profil/About/Office";
import Section from "../../components/home_component/Section/Profil/About/Section";
import React from "react";
const About = () => {
  return (
    <section className="flex flex-col px-5 md:px-[60px] lg:px-[80px] xl:px-[160px] lg:gap-5 relative">
      <div className="flex flex-col items-center gap-3 pt-14 md:pt-[120px] lg:flex-row lg:flex lg:justify-between lg:pt-[120px]">
        <Section />
      </div>
      <div className="flex flex-col md:flex-row mt-2 gap-2 pb-5">
        <Kades />
        <Office />
      </div>
    </section>
  );
};

export default About;
