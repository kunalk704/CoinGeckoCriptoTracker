import { useState } from "react";
import Banner from "./Components/Banner/Banner";
import CoinTable from "./Components/CoinTable/CoinTable";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [currency, setCurrency] = useState("usd");
  return (
    <>
      <Navbar setCurrency={setCurrency} />
      <Banner />
      <CoinTable currency={currency} />
    </>
  );
}

export default App;
