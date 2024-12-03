import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow } from "../ui/table";
import { fetchMessagesAdmin, fetchStatusToko, handleStatusToko, handleEditStatusAntrian } from "../../fetch";
import { useState, useEffect } from "react";
import PopupAdmin from "./PopupAdmin";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

interface Message {
  id: number;
  namaKendaraan: string;
  nomorPolisi: string;
  status: string;
  updatedAt: string;
}

interface statusAntrian {
  status: "MENGANTRI" | "PROSES_CUCI" | "SELESAI";
}

interface statusToko {
  isOpen: boolean;
}

const AntrianAdmin: React.FC<{ token: string }> = ({ token }) => {
  const [, setStatAntrian] = useState<statusAntrian | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [statusToko, setStatusToko] = useState<statusToko | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validStatuses: Array<statusAntrian["status"]> = ["MENGANTRI", "PROSES_CUCI", "SELESAI"];

  const getMessages = () => {
    fetchMessagesAdmin(
      token,
      (data) => {
        setMessages(data);

        // Validasi status sebelum mengatur nilai default
        if (data.length > 0 && validStatuses.includes(data[0].status as statusAntrian["status"])) {
          setStatAntrian({ status: data[0].status as statusAntrian["status"] });
        } else {
          setError("Status awal tidak valid.");
        }
      },
      (errorMessage) => setError(errorMessage)
    );
  };

  const getStatus = () => {
    fetchStatusToko(
      (data) => setStatusToko(data),
      (errorMessage) => setError(errorMessage)
    );
  };

  const formatNomorPolisi = (nomorPolisi: string) => {
    return nomorPolisi.replace(/^([A-Za-z]+)(\d+)([A-Za-z]+)$/, "$1 $2 $3");
  };

  const formatStatus = (status: string): string => {
    switch (status) {
      case "PROSES_CUCI":
        return "Proses Cuci";
      case "MENGANTRI":
        return "Mengantri";
      case "SELESAI":
        return "Selesai Cuci";
      default:
        return "Status Tidak Diketahui"; // Handle status yang tidak dikenali
    }
  };

  const toggleStatusToko = async () => {
    if (!statusToko) return;

    const newStatus = !statusToko.isOpen;

    try {
      await handleStatusToko(token, { isOpen: newStatus }, setError);
      setStatusToko({ isOpen: newStatus }); // Update state lokal setelah berhasil
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "Gagal mengubah status toko.");
    }
  };

  const toggleStatusAntrian = async (idAntrian: number) => {
    const currentMessage = messages.find((message) => message.id === idAntrian);

    if (!currentMessage) {
      setError(`Pesan dengan id ${idAntrian} tidak ditemukan.`);
      return;
    }

    const currentStatus = currentMessage.status as statusAntrian["status"];
    let nextStatus: statusAntrian["status"];

    // Tentukan state berikutnya berdasarkan state saat ini
    switch (currentStatus) {
      case "MENGANTRI":
        nextStatus = "PROSES_CUCI";
        break;
      case "PROSES_CUCI":
        nextStatus = "SELESAI";
        break;
      case "SELESAI":
        nextStatus = "MENGANTRI";
        break;
      default:
        setError(`Status ${currentStatus} tidak valid.`);
        return;
    }

    try {
      // Kirim perubahan status ke server
      await handleEditStatusAntrian(token, { status: nextStatus, idAntrian }, setError);

      // Perbarui status di state lokal
      setMessages((prevMessages) => prevMessages.map((message) => (message.id === idAntrian ? { ...message, status: nextStatus } : message)));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "Gagal mengubah status antrian.");
    }
  };

  useEffect(() => {
    // Ambil pesan saat komponen dimuat
    getMessages();
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-50">
      {/* <NavBar /> */}
      <div className="w-full px-36 overflow-x-auto pt-10 pb-20">
        <div className="pb-10">
          <PopupAdmin token={token} onFetchMessages={getMessages} />
          <div className="flex items-center gap-2 pt-10">
            <Switch id="airplane-mode" checked={statusToko?.isOpen} onClick={toggleStatusToko} />
            <Label htmlFor="airplane-mode">{statusToko?.isOpen ? "Status Toko : Buka" : "Status Toko : Tutup"}</Label>
          </div>
        </div>
        <Table className="bg-red-100 border:none rounded-[25px]">
          <TableHeader>
            <TableHead className="text-2xl text-sky-600 poppins px-10">Nama Kendaraan</TableHead>
            <TableHead className="text-2xl text-sky-600 poppins px-10">Nomor Polisi</TableHead>
            <TableHead className="text-2xl text-sky-600 poppins px-10">Status</TableHead>
            <TableHead className="text-2xl text-sky-600 poppins px-10">Waktu</TableHead>
            <TableHead className="text-2xl text-sky-600 poppins px-10">Edit Status</TableHead>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id} className="border-b-4 border-gray-400">
                <TableCell className="text-xl px-10 poppins">{message.namaKendaraan}</TableCell>
                <TableCell className="text-xl px-10 poppins">{formatNomorPolisi(message.nomorPolisi)}</TableCell>
                <TableCell className="text-xl px-10 poppins"> {formatStatus(message.status)}</TableCell>
                <TableCell className="text-xl px-10 poppins">
                  {message.updatedAt
                    ? new Date(message.updatedAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "Tanggal tidak tersedia"}
                </TableCell>
                <TableCell className="poppins">{message.status !== "SELESAI" ? <Button onClick={() => toggleStatusAntrian(message.id)}>Ubah Antrian</Button> : null}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AntrianAdmin;
