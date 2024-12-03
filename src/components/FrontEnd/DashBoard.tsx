import AntrianUser from "./AntrianUser";
import Layanan from "./Layanan";
import { fetchStatusToko } from "@/fetch";
import { useState, useEffect } from "react";
import mobil from "@/components/Gambar/mobil.png";
import PopUpUser from "./PopupUser";
import { getMessagesUser } from "@/Api";
import telepon from "@/components/Gambar/telepon.png";
import alamat from "@/components/Gambar/alamat.png";
import gmail from "@/components/Gambar/gmail.png";

interface Status {
  isOpen: boolean;
}

const DashBoard: React.FC = () => {
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getStatus = () => {
    fetchStatusToko(
      (data) => setStatus(data),
      (errorMessage) => setError(errorMessage)
    );
  };

  const statusToko = (isOpen: boolean) => {
    if (isOpen == true) {
      return (
        <div className="border-4 rounded-3xl p-5 bg-gradient-to-r from-teal-700 via-emerald-500 to-green-400 text-white">
          <p>Selamat Datang di AlloySmeer!</p>
          <p>Kami Sedang Buka dan Siap Membuat Kendaraan Anda Kinclong!</p>
        </div>
      );
    } else {
      return (
        <div className="border-4 rounded-3xl p-5 bg-gradient-to-r from-blue-700 via-blue-500 to-gray-300 text-white">
          <p>Maaf Saat ini kami sedang tutup</p>
          <p>Silahkan cek nanti lagi ya</p>
        </div>
      );
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* <NavBar /> */}
      <div className="pl-44 pt-14 pr-44">
        <div className="py-4 justify-items-center">
          <div className="text-center mb-4">
            {/* Memeriksa apakah status sudah tersedia */}
            {status ? (
              <div>
                <p className={`text-3xl`}>
                  {statusToko(status.isOpen)} {/* Menampilkan status Buka atau Tutup */}
                </p>
              </div>
            ) : (
              <p>Data status tidak tersedia</p> // Menampilkan pesan jika status tidak tersedia
            )}
          </div>
          <Layanan />
          <div className="flex flex-col lg:flex-row mt-32 border w-full lg:w-full h-auto lg:h-[400px] bg-gradient-to-r from-[#0D84BF] to-[#5BC1F4] rounded-tl-[50px] lg:rounded-tl-[100px] rounded-bl-[50px] lg:rounded-bl-[100px] justify-self-end">
            {/* Konten Teks */}
            <div className="pt-8 px-6 md:pt-[50px] md:pl-[50px] flex-1">
              <h1 className="font-bold text-[22px] md:text-[28px] text-white text-center lg:text-left">Pesan Jasa Kami Sekarang !</h1>
              <p className="pt-4 font-[600] text-white text-[14px] md:text-[15px] text-center lg:text-left">
                Daftarkan kendaraan Anda untuk menyimpan data secara aman di sistem kami. Dengan informasi lengkap, proses pembersihan dan perawatan menjadi lebih lancar dan efisien. Data ini juga membantu mencatat riwayat layanan,
                memberikan pengingat perawatan, dan memudahkan komunikasi mengenai status pengerjaan. Dengan pendataan teratur, manajemen kendaraan menjadi lebih mudah dan profesional
              </p>
              <div className="mt-4 flex justify-center lg:justify-start">
                <PopUpUser onFetchMessages={getMessagesUser} />
              </div>
            </div>
            {/* Gambar */}
            <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
              <img className="md:w-full" src={mobil} alt="Kendaraan" />
            </div>
          </div>
          <AntrianUser />
          <h1 className="pb-10">Kontak Kami</h1>
          <div className="text-center flex gap-36 pb-10">
            <img className="w-[200px]" src={alamat} alt="" />
            <img className="w-[200px]" src={gmail} alt="" />
            <img className="w-[200px]" src={telepon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
