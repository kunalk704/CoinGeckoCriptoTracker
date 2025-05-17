import { useState } from "react";
import Home from "./pages/Home";
// import { CurrencyContext } from "./Context/CurrencyContext";

function App() {
  const [currency, setCurrency] = useState("usd");
  return (
    <>
      {/* <CurrencyContext.Provider value={{ currency, setCurrency }}> */}
      <Home />
      {/* </CurrencyContext.Provider> */}
    </>
  );
}

export default App;
