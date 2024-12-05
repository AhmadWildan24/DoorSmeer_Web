import AntrianUser from "./AntrianUser";
import Layanan from "./Layanan";
import { fetchStatusToko } from "@/fetch";
import { useState, useEffect } from "react";
import mobil from "@/components/Gambar/mobil.png";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import carWash from "@/components/Gambar/carWash.jpg";

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
        <div className="text-start poppins text-2xl">
          <p>Selamat Datang di AlloySmeer!</p>
          <p>Kami Sedang Buka dan Siap Membuat Kendaraan Anda Kinclong!</p>
        </div>
      );
    } else {
      return (
        <div className="text-start poppins">
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
      <NavBar />
      <div className="pt-10">
        <div className="flex md:pl-44 sm:pl-20">
          <div className="pt-24">
            <div className="text-center mb-4">
              {/* Memeriksa apakah status sudah tersedia */}
              {status ? (
                <div>
                  <p>
                    {statusToko(status.isOpen)} {/* Menampilkan status Buka atau Tutup */}
                  </p>
                </div>
              ) : (
                <p>Data status tidak tersedia</p> // Menampilkan pesan jika status tidak tersedia
              )}
            </div>
            <p className="text-[32px] leading-[35px] poppins font-[700]">
              <span className="text-sky-500">PERAWATAN TERBAIK</span>
              <br />
              UNTUK KENDARAAN ANDA
            </p>
            <p className="w-[500px] poppins">
              Layanan doorsmeer terbaik untuk kendaraan Anda. Kami hadir untuk memberikan kebersihan maksimal dengan proses cepat, hasil kinclong, dan harga terjangkau. Percayakan perawatan mobil dan motor Anda kepada kami, karena kendaraan
              bersih membuat perjalanan lebih menyenangkan!
            </p>
          </div>
          <div className="">
            <img className="w-3/4 justify-self-center" src={carWash} alt="" />
          </div>
        </div>
        <div className="pt-[115px]">
          <p className="border border-2 h-24 bg-[#1195FF]"></p>
        </div>
        <div className="pt-20 justify-items-center">
          <Layanan />
          <div className="flex flex-col lg:flex-row mt-32  border w-3/4 h-auto lg:h-[400px] bg-gradient-to-r from-[#0D84BF] to-[#5BC1F4] rounded-[25px] lg:rounded-[50px] justify-self-center">
            {/* Konten Teks */}
            <div className="pt-8 px-6 md:pt-[50px] md:pl-[50px] flex-1">
              <h1 className="font-bold text-[22px] md:text-[28px] text-white text-center lg:text-left">Pesan Jasa Kami Sekarang !</h1>
              <p className="pt-4 font-[600] text-white text-[14px] md:text-[15px] text-center lg:text-left">
                Daftarkan kendaraan Anda untuk menyimpan data secara aman di sistem kami. Dengan informasi lengkap, proses pembersihan dan perawatan menjadi lebih lancar dan efisien. Data ini juga membantu mencatat riwayat layanan,
                memberikan pengingat perawatan, dan memudahkan komunikasi mengenai status pengerjaan. Dengan pendataan teratur, manajemen kendaraan menjadi lebih mudah dan profesional
              </p>
              <div className="mt-4 flex justify-center lg:justify-start">
                <Link to="/pesanjasa" className="rounded-xl p-2 bg-[#0A3981]">
                  <p className="text-white">Order Sekarang!</p>
                </Link>
              </div>
            </div>
            {/* Gambar */}
            <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
              <img className="md:w-full" src={mobil} alt="Kendaraan" />
            </div>
          </div>
          <AntrianUser />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
