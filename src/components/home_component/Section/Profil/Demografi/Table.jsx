const Header = ({ children }) => {
  return <th className=" border py-2">{children}</th>;
};

const Body = ({ children }) => {
  return <th className=" border py-2 font-normal">{children}</th>;
};

function Table({ children }) {
  return (
    <table className="w-full text-center text-white font-[Poppins] text-[6px] md:text-[8px] lg:text-[10px]">
      {children}
    </table>
  );
}

Table.Header = Header;
Table.Body = Body;

export default Table;
