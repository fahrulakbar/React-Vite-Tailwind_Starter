export const Thumbnail = ({ bg, note, title, description }) => {
  return (
    <div
      className="w-full flex flex-col md:h-[350px] lg:h-[500px] xl:h-[600px] justify-between lg:p-[60px] rounded-[12px]"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="w-fit px-5 py-3 bg-teal-700 md:text-[12px] lg:text-[16px] rounded-md justify-center items-center text-white lg:text-lg font-medium font-[Poppins]">
        {note}
      </h1>
      <div className="flex flex-col">
        <h1 className="text-teal-700 text-[32px] font-bold font-[Poppins] bg-white px-4 w-fit">
          {title}
        </h1>
        <div className="p-4 bg bg-teal-700 bg-opacity-50">
          <p className="text-justify text-white text-xl font-medium font-[Poppins] line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
