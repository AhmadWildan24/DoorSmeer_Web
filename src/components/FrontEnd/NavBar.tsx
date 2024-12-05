import logo from "../Gambar/logodoorsmeer.jpg";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="w-full h-full relative px-5 md:px-10 bg-[#ffffff]">
      {/* Flex Container */}
      <div className="flex items-center justify-between flex-wrap">
        {/* Logo Section */}
        <div className="w-full md:w-auto flex justify-center md:justify-start mb-4 md:mb-0 pl-32">
          <img width={80} height={80} src={logo} alt="gambar" className="md:pr-5" />
        </div>
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-auto gap-5 pr-44">
          <div>
            <Link to="/dashboard">
              <div className={`${isActive("/dashboard") ? "border-red-500 bg-[#0A3981] text-white" : "border-transparent"} border-2 hover:bg-[#0A3981] hover:text-white px-5 py-2 rounded-[10px]`}>
                <p className="font-[500]">Beranda</p>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/pesanjasa">
              <div className={`${isActive("/pesanjasa") ? "border-red-500 bg-[#0A3981] text-white" : "border-transparent"} border-2 hover:bg-[#0A3981] hover:text-white px-5 py-2 rounded-[10px]`}>
                <p className="font-[500]">Order</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
