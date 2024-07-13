import React, { useEffect, useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Form_SKTMBPJS from "./Form/Form-SKTM-BPJS";
import Form_SKTM_Sekolah from "./Form/Form-SKTM-Sekolah";

const Layout = () => {
  const [active, setActive] = useState(null);
  const [dropdownMenu, setdropdownMenu] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const items = [
    { id: "alur", label: "Alur Pengajuan Form" },
    { id: "pelayanan", label: "Pilih Jenis Pelayanan" },
  ];

  const services = [
    { id: "SKTM BPJS", label: "SKTM BPJS" },
    { id: "SKTM Sekolah", label: "Service 2" },
    { id: "service3", label: "Service 3" },
  ];

  const handleClick = (id) => {
    setActive(id);
    if (id === "pelayanan") {
      setDropdownOpen(!dropdownOpen);
    } else {
      setDropdownOpen(false);
      setdropdownMenu("");
    }
  };

  const handleServiceChange = (serviceId) => {
    setdropdownMenu(serviceId);
    setDropdownOpen(false);
  };

  useEffect(() => {
    setdropdownMenu("");
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 xl:px-[200px]">
      <div className="flex gap-3 font-[Poppins]">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`relative xl:text-[20px] font-semibold px-8 py-4 rounded-md cursor-pointer ${
              active === item.id
                ? "bg-white text-teal-700 duration-300 ease-in-out"
                : "bg-teal-700 md:bg-opacity-60 md:hover:bg-opacity-100 duration-300 ease-in md:hover:text-white text-white"
            }`}
          >
            {item.label}
            {item.id === "pelayanan" && (
              <>
                {dropdownOpen ? (
                  <IconChevronUp className="inline ml-3 border border-white rounded-full" />
                ) : (
                  <IconChevronDown className="inline ml-3 border border-white rounded-full" />
                )}
              </>
            )}
            {item.id === "pelayanan" && active === "pelayanan" && (
              <div
                className={`absolute top-full left-0 w-full mt-2 bg-white rounded-md shadow-lg z-10  ${
                  dropdownOpen ? "" : "hidden"
                }`}
              >
                <ul>
                  {services.map((service) => (
                    <li
                      key={service.id}
                      onClick={() => handleServiceChange(service.id)}
                      className="px-8 py-3 rounded-md cursor-pointer hover:bg-gray-200 text-[16px] font-normal"
                    >
                      {service.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-full md:rounded-sm">
        {active === "alur" && (
          <div className="flex flex-col md:rounded-md gap-3 px-4 py-3 bg-teal-700 duration-200 ease-in-out">
            <h2 className="w-full text-center font-bold text-white text-[16px]">
              Statistik Penduduk Desa Berdasarkan Alur Pengajuan Form
            </h2>
          </div>
        )}
        {active === "pelayanan" && dropdownMenu && (
          <div className="md:rounded-md lg:rounded-2xl xl:px-[100px] min-h-[604px] bg-white md:pb-20">
            {dropdownMenu === "SKTM BPJS" && <Form_SKTMBPJS />}
            {dropdownMenu === "SKTM Sekolah" && <Form_SKTM_Sekolah />}
            {dropdownMenu === "service3" && (
              <div className="bg-white p-4 rounded-md">
                <h3 className="font-bold">Service 3</h3>
                {/* Add content for Service 3 */}
                <p>Content for Service 3</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
