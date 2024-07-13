const Thumbnail = (props) => {
  const { src, alt, title } = props;
  return (
    <div className="w-full relative">
      <span className="absolute font-[Poppins] font-semibold text-slate-200 p-2 md:p-4 lg:p-6 text-[12px] md:text-[24px] lg:text-[32px]">
        {title}
      </span>
      <img
        src={src}
        alt={alt}
        className="object-cover rounded-md md:rounded-lg xl:rounded-xl"
      />
    </div>
  );
};

const Description = (props) => {
  return (
    <div className="font-[Poppins] text-[10px] md:text-[14px] lg:text-[16px] text-gray-500 text-justify">
      {props.children}
    </div>
  );
};

function Layout(props) {
  const { className, children } = props;
  return <div className={className}>{children}</div>;
}

Layout.Thumbnail = Thumbnail;
Layout.Description = Description;

export default Layout;
