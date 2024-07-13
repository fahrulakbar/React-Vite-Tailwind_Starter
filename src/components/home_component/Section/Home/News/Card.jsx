import { IconCalendarMonth, IconUserFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import React from "react";
const Thumbnail = (props) => {
  const {
    src,
    className = "md:w-1/2 h-40 lg:h-[200px] xl:h-[300px] rounded-md lg:rounded-xl px-2 lg:px-0",
  } = props;
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

const Date = (props) => {
  const {
    className = "[&>svg]:h-4 [&>svg]:w-4 flex items-center justify-center gap-1",
    svg = "stroke-gray-400 ",
    date,
    dateclassName = "text-gray-500 text-[10px] font-[Poppins] h-3",
  } = props;
  return (
    <div className={className}>
      <IconCalendarMonth className={svg} />
      <div className={dateclassName}>{date}</div>
    </div>
  );
};

const Author = (props) => {
  const {
    className = "[&>svg]:h-[14px] [&>svg]:w-3 flex items-center gap-1",
    svg = "fill-gray-500",
    author,
    authorclassName = "text-gray-500 text-[10px] font-[Poppins] h-3",
  } = props;
  return (
    <div className={className}>
      <IconUserFilled className={svg} />
      <div className={authorclassName}>{author}</div>
    </div>
  );
};

const Detail = (props) => {
  const {
    className = "flex flex-col gap-2 md:justify-between md:h-full",
    detailclassName = "flex flex-col gap-2",
    title,
    titleclassName = "text-[12px] lg:text-[16px] xl:text-[20px] font-[Poppins] line-clamp-2 font-semibold text-gray-800 ",
    description,
    descriptionclassName = "w-full line-clamp-5 text-justify text-gray-500 text-[10px] lg:text-[12px] xl:text-[16px] font-normal font-[Poppins]",
    children,
  } = props;
  return (
    <div className={className}>
      <div className={detailclassName}>
        <h1 className={titleclassName}>{title}</h1>
        <div className={descriptionclassName}>{description}</div>
      </div>
      <p className="text-teal-700 text-[10px] xl:text-[12px] font-medium font-[Poppins] hover:text-teal-500 underline underline-offset-2">
        {children}
      </p>
    </div>
  );
};

function Card(props) {
  const {
    container = "flex flex-col md:py-10 md:border-b-2 md:border-gray-400",
    wrapper = "flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between lg:gap-[30px]",
  } = props;
  return (
    <div className={container}>
      <div className={wrapper}>{props.children}</div>
    </div>
  );
}

Card.Thumbnail = Thumbnail;
Card.Date = Date;
Card.Author = Author;
Card.Detail = Detail;

export default Card;
