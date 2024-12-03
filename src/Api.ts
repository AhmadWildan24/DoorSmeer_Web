const BASE_URL = "https://just-elegance-production.up.railway.app";

export const setMessagesAdmin = async (token: string, MessageData: { jasaId: number; namaKendaraan: string; nomorPolisi: string }) => {
  const response = await fetch(`${BASE_URL}/v1/admin/addantrian`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(MessageData),
  });
  if (!response.ok) {
    throw new Error("Failed to create message");
  }

  console.log("response : ", response);
  return await response.json();
};

export const setMessagesUser = async (MessageData: { customerName: string; customerEmail: string; customerPhone: number | string; jasaId: number; namaKendaraan: string; nomorPolisi: string }) => {
  const response = await fetch(`${BASE_URL}/v1/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(MessageData),
  });
  if (!response.ok) {
    throw new Error("Failed to create message");
  }

  console.log("response : ", response);
  return await response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  return data.token;
};

export const getMessagesAdmin = async (token: string) => {
  const response = await fetch(`${BASE_URL}/v1/getantrian`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("response GetMessageAdmin : ", response);
  return await response.json();
};

export const getMessagesUser = async () => {
  const response = await fetch(`${BASE_URL}/v1/getantrian/today`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response GetMessageUser : ", response);
  return await response.json();
};

export const getJasa = async () => {
  const response = await fetch(`${BASE_URL}/v1/getjasa`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response GetJasa : ", response);
  return await response.json();
};

export const getStatus = async () => {
  const response = await fetch(`${BASE_URL}/v1/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response getStatus : ", response);
  return await response.json();
};

export const setStatusToko = async (token: string, MessageData: { isOpen: boolean }) => {
  const response = await fetch(`${BASE_URL}/v1/admin/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(MessageData),
  });
  if (!response.ok) {
    throw new Error("Failed to set status");
  }

  console.log("response setStatusToko : ", response);
  return await response.json();
};

export const setStatusAntrian = async (token: string, MessageData: { status: string; idAntrian: number }) => {
  const { idAntrian } = MessageData;
  const response = await fetch(`${BASE_URL}/v1/admin/editantrian/${idAntrian}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(MessageData),
  });
  if (!response.ok) {
    throw new Error("Failed to edit status antrian");
  }

  console.log("response statusAntrian : ", response);
  return await response.json();
};
