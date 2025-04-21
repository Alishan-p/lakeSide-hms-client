import HotelServices from "../components/HotelServices";
import MainHeader from "../components/MainHeader";
import Parallax from "../components/Parallax";

const HomePage = () => {
  return (
    <section>
      <MainHeader />
      <section className="container">
        <Parallax />
        <HotelServices />
        <Parallax />
      </section>
    </section>
  );
};

export default HomePage;
