import { useState } from "react";

export default function PelayananForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    requirements: "",
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const waMessage = `saya ingin mengkonfirmasikan bahwa saya telah mengajukan ${formData.serviceType} di website`;
    const waUrl = `https://wa.me/+6285753638956?text=${encodeURIComponent(
      waMessage
    )}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="font-[Poppins] text-[24px] font-semibold text-teal-700">
        Form Input Data Pelayanan
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-[Poppins] text-[14px] text-teal-700">
                Nama
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-teal-700 p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-[Poppins] text-[14px] text-teal-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-teal-700 p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-[Poppins] text-[14px] text-teal-700">
                No WA
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border-2 border-teal-700 p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-[Poppins] text-[14px] text-teal-700">
                Jenis Pelayanan
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="border-2 border-teal-700 p-2 rounded"
              >
                <option value="">Pilih Jenis Pelayanan</option>
                <option value="surat_pindah">SKTM BPJS</option>
                <option value="surat_keterangan_tidak_mampu">
                  Surat Pengantar Kecamatan
                </option>
                <option value="surat_keterangan_tidak_mampu">
                  SKTM sekolah
                </option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="bg-teal-700 text-white p-2 rounded font-[Poppins] text-[14px]"
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-[Poppins] text-[14px] text-teal-700">
                Persyaratan{" "}
                {formData.serviceType === "surat_pindah"
                  ? "Surat Pindah"
                  : "Surat Keterangan Tidak Mampu"}
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="border-2 border-teal-700 p-2 rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 text-white p-2 rounded font-[Poppins] text-[14px]"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-teal-700 text-white p-2 rounded font-[Poppins] text-[14px]"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
