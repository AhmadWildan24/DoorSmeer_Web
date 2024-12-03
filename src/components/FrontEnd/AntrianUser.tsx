import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow } from "../ui/table";
import { fetchMessagesUser } from "../../fetch";
import { useState, useEffect } from "react";

interface Message {
  id: number;
  namaKendaraan: string;
  nomorPolisi: string;
  status: string;
  updatedAt: string;
}

const AntrianUser: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getMessages = () => {
    fetchMessagesUser(
      (data) => setMessages(data),
      (errorMessage) => setError(errorMessage)
    );
  };

  const formatNomorPolisi = (nomorPolisi: string) => {
    // Format ulang nomor polisi menjadi B 1234 XYZ
    return nomorPolisi.replace(/^([A-Za-z])(\d+)([A-Za-z]+)$/, "$1 $2 $3");
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

  useEffect(() => {
    getMessages();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col bg-gradient-to-r from-sky-100 via-sky-300 to-sky-500 py-5 my-20 h-[500px] w-full">
      <div className="w-full overflow-x-auto pl-10">
        <h1 className="text-center pb-8 poppins font-[700] text-[25px]">Status Antrian</h1>
        <Table className="w-auto bg-white border-none justify-self-center rounded-[25px]">
          <TableHeader>
            <TableHead className="text-2xl text-sky-600 poppins">Nama Kendaraan</TableHead>
            <TableHead className="text-2xl text-sky-600 poppins">Nomor Polisi</TableHead>
            <TableHead className="text-2xl text-sky-600 poppins">Status</TableHead>
            <TableHead className="text-2xl text-sky-600 poppins">Waktu</TableHead>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id} className="border-b-2 border-gray-300">
                <TableCell className="text-xl poppins">{message.namaKendaraan}</TableCell>
                <TableCell className="text-xl poppins">{formatNomorPolisi(message.nomorPolisi)}</TableCell>
                <TableCell className="text-xl poppins">{formatStatus(message.status)}</TableCell>
                <TableCell className="text-xl poppins">
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AntrianUser;
