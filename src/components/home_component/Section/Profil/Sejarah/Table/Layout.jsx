import Data from "./Data";

const Header = (props) => {
  const { children } = props;
  return (
    <th className="border h-6 md:h-10 border-slate-100 font-[Poppins] font-medium text-[10px] md:text-[16px] text-slate-100  bg-teal-400">
      {children}
    </th>
  );
};

function Table() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="font-[Poppins] text-[12px] md:text-[24px] font-semibold text-teal-700">
        Riwayat Kepala Desa
      </h1>
      <table className="w-full border-separate">
        <thead>
          <tr>
            <Header>No.</Header>
            <Header>Kepala Desa</Header>
            <Header>Masa Jabatan</Header>
          </tr>
        </thead>
        <Data />
      </table>
    </div>
  );
}

export default Table;
