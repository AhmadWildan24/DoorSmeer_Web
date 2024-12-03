import { Table, TableHead, TableHeader, TableBody, TableCell, TableRow } from "../ui/table";
import { fetchJasa } from "../../fetch";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import NavBar from "./NavBar";

export interface Jasa {
  id: number;
  namaJasa: string;
  harga: number;
}

const Jasa: React.FC = () => {
  const [jasa, setJasa] = useState<Jasa[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getJasa = () => {
    fetchJasa(
      (data) => setJasa(data),
      (errorMessage) => setError(errorMessage)
    );
  };

  useEffect(() => {});

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="flex bg-gray-50 items-center gap-5 pl-5 py-5">
        <Button onClick={getJasa} style={{ backgroundColor: "#007BFF", color: "#FFF", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Muat Pesan
        </Button>
      </div>
      <Table className="mx-10 w-2/4">
        <TableHeader>
          <TableHead>Id Jasa</TableHead>
          <TableHead>Nama Jasa</TableHead>
          <TableHead>Harga</TableHead>
        </TableHeader>
        <TableBody>
          {jasa.map((message) => (
            <TableRow key={message.id}>
              <TableCell>{message.id}</TableCell>
              <TableCell>{message.namaJasa}</TableCell>
              <TableCell>{message.harga}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Jasa;
