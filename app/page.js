import SelectCity from "../components/MainFile/SelectCity";
import SquareSlider from "../components/MainFile/SquareSlider";
import Mydata from "../components/main/Mydata";
import Hero from "../app/Hero/page";
export default function Home() {
  return (
    <>
      <Hero />
      <SelectCity />
      <Mydata />
      <SquareSlider />
    </>
  );
}
