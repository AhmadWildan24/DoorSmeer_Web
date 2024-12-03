import * as React from "react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { handleMessagesUser } from "@/fetch";

interface PopUpPropsUser {
  onFetchMessages: () => void; // Tambahkan props untuk memanggil fetchMessages
}

const PopUpUser: React.FC<PopUpPropsUser> = ({ onFetchMessages = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false); // Kontrol dialog
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
      setIsOpen(false); // Tutup dialog setelah pesan ditambahkan
      onFetchMessages();
    });
  };

  React.useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-[8px] mt-5 bg-[#00365F] p-5" onClick={() => setIsOpen(true)}>
            Pesan Jasa DoorSmeer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Bungkus dengan form */}
            <DialogHeader>
              <DialogTitle>Tambah antrian</DialogTitle>
              <DialogDescription>Silahkan tambah antrian dengan mengisi formulir berikut</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mailCode" className="text-right">
                  Nama Pelanggan
                </Label>
                <Input id="mailCode" type="text" placeholder="Nama" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mailCode" className="text-right">
                  Email Pelanggan
                </Label>
                <Input id="mailCode" type="text" placeholder="Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mailCode" className="text-right">
                  Nomor Telepon
                </Label>
                <Input id="mailCode" type="text" placeholder="Nomor Telepon" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mailCode" className="text-right">
                  Nama Kendaraan
                </Label>
                <Input id="mailCode" type="text" placeholder="Nama Kendaraan" value={namaKendaraan} onChange={(e) => setNamaKendaraan(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Nomor Polisi
                </Label>
                <Input id="content" placeholder="Nomor Polisi" value={nomorPolisi} onChange={(e) => setNomorPolisi(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <DropdownMenu>
                  <Label htmlFor="content" className="text-right">
                    Jasa
                  </Label>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="col-span-3">
                      {jasaId === 1 ? "Cuci Mobil - Rp50000" : jasaId === 2 ? "Cuci Mobil Full - Rp60000" : "Pilih Jasa"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Pilih Jasa</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={String(jasaId)} // Pastikan value berupa string karena DropdownMenuRadioItem bekerja dengan string
                      onValueChange={(value) => setJasaId(Number(value))} // Konversi kembali ke number
                    >
                      <DropdownMenuRadioItem value="1">Cuci Mobil - Rp50000</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="2">Cuci Mobil Full - Rp60000</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <DialogFooter>
              <Button id="submit" type="submit">
                Tambah Pesan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUpUser;
