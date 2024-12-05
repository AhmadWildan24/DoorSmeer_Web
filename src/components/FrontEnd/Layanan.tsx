import { Card } from "../ui/card";
import Card1 from "../Gambar/Card Harga.png";
import Card2 from "../Gambar/Card Harga2.png";
import Card3 from "../Gambar/Card Harga3.png";

const Layanan = () => {
  return (
    <div className="justify-items-center">
      <p className="text-xl font-bold poppins pb-10 font-[#00365F]">Kami Melayani</p>
      <div className="grid grid-row-1 grid-cols-3 gap-[75px]">
        <div>
          <Card className="w-[250px] h-auto">
            <img src={Card1} alt="" />
          </Card>
        </div>
        <div>
          <Card className="w-[250px] h-auto">
            <img src={Card2} alt="" />
          </Card>
        </div>
        <div>
          <Card className="w-[250px] h-auto">
            <img src={Card3} alt="" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Layanan;
