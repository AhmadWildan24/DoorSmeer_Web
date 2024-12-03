import AntrianAdmin from "./components/FrontEnd/AntrianAdmin";
import AntrianUser from "./components/FrontEnd/AntrianUser";
import PopupAdmin from "./components/FrontEnd/PopupAdmin";
import Login from "./components/FrontEnd/Login";
import Jasa from "./components/FrontEnd/Jasa";
import DashBoard from "./components/FrontEnd/DashBoard";
import NavBar from "./components/FrontEnd/NavBar";
import Layanan from "./components/FrontEnd/Layanan";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false); // Selesai memuat setelah token dicek
  }, []);

  // Sementara `loading` masih true, jangan render apa pun dulu
  if (loading) {
    return <div>Loading...</div>; // Bisa juga diganti dengan spinner atau kosong
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/antrianAdmin" element={token ? <AntrianAdmin token={token} /> : <Navigate to="/login" />} />
          <Route path="/antrianUser" element={<AntrianUser />} />
          <Route path="/" element={token ? <AntrianAdmin token={token} /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/antrianUser" />} />
          <Route
            path="/Popup"
            element={
              token ? (
                <PopupAdmin
                  token={token}
                  onFetchMessages={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/jasa" element={<Jasa />} />
          <Route path="/dashBoard" element={<DashBoard />} />
          <Route path="/navBar" element={<NavBar />} />
          <Route path="/layanan" element={<Layanan />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
