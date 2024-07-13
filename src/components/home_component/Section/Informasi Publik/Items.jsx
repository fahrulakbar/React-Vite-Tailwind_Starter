const Items = ({
  text,
  className = "flex flex-col md:gap-2 lg:gap-5",
  childrenclassName = "flex flex-col gap-5",
  children,
}) => {
  return (
    <div className={className}>
      <h1 className="font-[Poppins] text-[10px] md:text-[12px] lg:text-[16px] font-medium text-gray-500">
        {text}
      </h1>
      <div className={childrenclassName}>{children}</div>
    </div>
  );
};

export default Items;
