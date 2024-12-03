import * as React from "react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { handleMessagesAdmin } from "../../fetch";

interface PopUpProps {
  token: string;
  onFetchMessages: () => void; // Tambahkan props untuk memanggil fetchMessages
}

const PopupAdmin: React.FC<PopUpProps> = ({ token, onFetchMessages = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false); // Kontrol dialog
  // const [position, setPosition] = React.useState("bottom");
  const [namaKendaraan, setNamaKendaraan] = useState("");
  const [nomorPolisi, setNomorPolisi] = useState("");
  const [jasaId, setJasaId] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageData = {
      jasaId: jasaId,
      namaKendaraan: namaKendaraan,
      nomorPolisi: nomorPolisi,
    };

    // Panggil handleAddMessage dengan token, data pesan, dan setError
    handleMessagesAdmin(token, messageData, setError).then(() => {
      // Reset state setelah pesan berhasil ditambahkan
      console.log("Message added, fetching messages...");
      setNamaKendaraan("");
      setNomorPolisi("");
      setJasaId(1);
      setIsOpen(false); // Tutup dialog setelah pesan ditambahkan
      onFetchMessages();
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" style={{ backgroundColor: "#007BFF", color: "#FFF", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => setIsOpen(true)}>
            Tambah Antrian
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Bungkus dengan form */}
            <DialogHeader>
              <DialogTitle>Tambah Antrian</DialogTitle>
              <DialogDescription>Silahkan tambah antrian dengan mengisi formulir berikut</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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

export default PopupAdmin;
