import logo from "../Gambar/logodoorsmeer.jpg";
import { Link } from "react-router-dom";

const NavBar = () => {
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
              <div className="border bg-[#438ce0] px-5 py-2 rounded-[10px] text-white w-[100px] text-center">
                <p className="font-[500]">Beranda</p>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/antrianAdmin">
              <div className="hover:bg-[#438ce0] px-5 py-2 rounded-[10px]">
                <p className="font-[500]">Admin</p>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/jasa">
              <div className="hover:bg-[#438ce0] px-5 py-2 rounded-[10px]">
                <p className="font-[500]">Jasa</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
