import * as React from "react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { handleMessagesUser } from "@/fetch";
import NavBar from "./NavBar";

interface PesanJasaProps {
  onFetchMessages: () => void; // Tambahkan props untuk memanggil fetchMessages
}

const PesanJasa: React.FC<PesanJasaProps> = () => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [namaKendaraan, setNamaKendaraan] = useState("");
  const [nomorPolisi, setNomorPolisi] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState<number | string>("");
  const [jasaId, setJasaId] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageData = {
      jasaId: jasaId,
      namaKendaraan: namaKendaraan,
      nomorPolisi: nomorPolisi,
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
    };

    // Panggil handleAddMessage dengan token, data pesan, dan setError
    handleMessagesUser(messageData, setError, setRedirectUrl).then(() => {
      setNamaKendaraan("");
      setNomorPolisi("");
      setJasaId(1);
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone(1);
    });
  };

  React.useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit} className="pt-10 justify-items-center">
        {" "}
        {/* Bungkus dengan form */}
        <div className="grid gap-4 sm:gap-4 border border-2 w-2/4 py-8 rounded-[25px] bg-[#EBEAFF]">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="mailCode" className="text-right pr-16">
              Nama Pelanggan
            </Label>
            <Input id="mailCode" type="text" placeholder="Nama" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="col-span-1 w-2/4 border-black" required />
          </div>
          <div className="grid grid-cols-2 items-center gap-4 ">
            <Label htmlFor="mailCode" className="text-right pr-16">
              Email Pelanggan
            </Label>
            <Input id="mailCode" type="text" placeholder="Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="col-span-1 w-2/4 border-black" required />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="mailCode" className="text-right pr-16">
              Nomor Telepon
            </Label>
            <Input id="mailCode" type="text" placeholder="Nomor Telepon" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="col-span-1 w-2/4 border-black" required />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="mailCode" className="text-right pr-16">
              Nama Kendaraan
            </Label>
            <Input id="mailCode" type="text" placeholder="Nama Kendaraan" value={namaKendaraan} onChange={(e) => setNamaKendaraan(e.target.value)} className="col-span-1 w-2/4 border-black" required />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="content" className="text-right pr-16">
              Nomor Polisi
            </Label>
            <Input id="content" placeholder="Nomor Polisi" value={nomorPolisi} onChange={(e) => setNomorPolisi(e.target.value)} className="col-span-1 w-2/4 border-black" required />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <DropdownMenu>
              <Label htmlFor="content" className="text-right pr-16">
                Jasa
              </Label>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="col-span-1 w-2/4 border-black">
                  {jasaId === 1 ? "Cuci Mobil - Rp50000" : jasaId === 2 ? "Cuci Mobil Full - Rp60000" : "Pilih Jasa"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60">
                <DropdownMenuLabel>Pilih Jasa</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={String(jasaId)} // Pastikan value berupa string karena DropdownMenuRadioItem bekerja dengan string
                  onValueChange={(value) => setJasaId(Number(value))} // Konversi kembali ke number
                >
                  <DropdownMenuRadioItem value="1" className="poppins">
                    Cuci Mobil - Rp50000
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2" className="poppins">
                    Cuci Mobil Full - Rp60000
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-1 justify-items-center">
            <p></p>
            <Button id="submit" type="submit" className="md:w-1/4 sm:w-1/4 md:text-base sm:text-[10px] poppins">
              Pesan Sekarang
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PesanJasa;
