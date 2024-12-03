import { setMessagesAdmin, getMessagesAdmin, getMessagesUser, getJasa, getStatus, setMessagesUser, setStatusAntrian, setStatusToko } from "./Api";

export interface Message {
  id: number;
  namaKendaraan: string;
  nomorPolisi: string;
  updatedAt: string;
  status: string;
}

export interface Jasa {
  id: number;
  namaJasa: string;
  harga: number;
}

export interface statusAntrian {
  status: string;
}

export interface StatusToko {
  isOpen: boolean;
}

export const fetchMessagesAdmin = async (token: string, onDataFetched: (data: Message[]) => void, onError: (error: string) => void): Promise<void> => {
  try {
    // Fetch data
    const data = await getMessagesAdmin(token);
    console.log("Fetched data: ", data); // Debug log untuk memeriksa respons

    // Validasi apakah data berupa array
    if (Array.isArray(data.data)) {
      const sortedData = data.data.sort((a: Message, b: Message) => a.id - b.id);
      onDataFetched(sortedData);
    } else {
      console.error("Invalid response structure:", data);
      onError("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    onError("Failed to fetch messages");
  }
};

export const fetchMessagesUser = async (onDataFetched: (data: Message[]) => void, onError: (error: string) => void): Promise<void> => {
  try {
    // Fetch data
    const data = await getMessagesUser();
    console.log("Fetched data: ", data); // Debug log untuk memeriksa respons

    // Validasi apakah data berupa array
    if (Array.isArray(data.data)) {
      const sortedData = data.data.sort((a: Message, b: Message) => a.id - b.id);
      onDataFetched(sortedData);
    } else {
      console.error("Invalid response structure:", data);
      onError("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    onError("Failed to fetch messages");
  }
};

export const fetchJasa = async (onDataFetched: (data: Jasa[]) => void, onError: (error: string) => void): Promise<void> => {
  try {
    const data = await getJasa();
    console.log("Fetched data: ", data);

    if (Array.isArray(data.data)) {
      const sortedData = data.data.sort((a: Message, b: Message) => a.id - b.id);
      onDataFetched(sortedData);
    } else {
      console.error("Invalid response structure:", data);
      onError("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    onError("Failed to fetch messages");
  }
};

export const fetchStatusToko = async (onDataFetched: (data: StatusToko) => void, onError: (error: string) => void): Promise<void> => {
  try {
    const data = await getStatus();
    console.log("Fetched data: ", data.data);

    if (data && typeof data.data === "object" && "isOpen" in data.data) {
      onDataFetched(data.data); // Kirimkan data jika valid
    } else {
      console.error("Invalid response structure:", data);
      onError("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    onError("Failed to fetch messages");
  }
};

export const handleMessagesAdmin = async (
  token: string,
  messageData: {
    jasaId: number;
    namaKendaraan: string;
    nomorPolisi: string;
  },
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const response = await setMessagesAdmin(token, messageData);
    console.log("Pesan berhasil dimuat: ", response);
  } catch (error) {
    setError("Pesan gagal dimuat");
    console.error(error);
  }
};

export const handleMessagesUser = async (
  messageData: {
    customerName: string;
    customerEmail: string;
    customerPhone: number | string;
    jasaId: number;
    namaKendaraan: string;
    nomorPolisi: string;
  },
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setRedirectUrl: React.Dispatch<React.SetStateAction<string | null>> // Tambahkan state untuk menyimpan redirect_url
) => {
  try {
    const response = await setMessagesUser(messageData); // Memanggil fungsi API
    if (response.status === "true") {
      console.log("Pesan berhasil dimuat: ", response);
      setRedirectUrl(response.data.redirect_url); // Simpan redirect_url ke state
    } else {
      throw new Error(response.message || "Error tidak diketahui");
    }
  } catch (error) {
    setError("Pesan gagal dimuat");
    console.error(error);
  }
};

export const handleEditStatusAntrian = async (
  token: string,
  MessageData: {
    status: string;
    idAntrian: number;
  },
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const response = await setStatusAntrian(token, MessageData);
    console.log("Status antrian berhasil diubah: ", response);
  } catch (error) {
    setError("Status antrian gagal diubah");
    console.error(error);
  }
};

export const handleStatusToko = async (token: string, MessageData: { isOpen: boolean }, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    const response = await setStatusToko(token, MessageData);
    console.log("Status toko berhasil diubah: ", response);
  } catch (error) {
    setError("Status toko gagal diubah");
    console.error(error);
  }
};
