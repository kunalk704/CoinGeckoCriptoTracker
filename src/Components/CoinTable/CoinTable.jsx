import { useState } from "react";
import { fetchCoinData } from "../../Services/fetchCoinData";
import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { CurrencyContext } from "../../Context/CurrencyContext";
import currencyStore from "../../state/store";
import PageLoader from "../PageLoader/PageLoader";
import { useNavigate } from "react-router-dom";

function CoinTable() {
  const { currency } = currencyStore();

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coins", page, currency],
    queryFn: () => fetchCoinData(page, currency),
    queries: {
      // retry: 2,
      // retryDelay: 1000,
      cacheTime: 1000 * 60 * 2,
      staleTime: 1000 * 60 * 2,
    },
  });

  function handleCoinRedirect(id) {
    navigate(`/details/${id}`);
  }

  if (isLoading) {
    return <PageLoader />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="my-5 flex-col item-center justify- center gap-5 w-[80vw] mx-auto">
      <div className="w-full bg-yellow-400 text-black flex py-2 px-2 font-semibold items-center justify-center">
        {/* {Header of the table} */}
        <div className="basis-[35%]">Coin</div>
        <div className="basis-[25%]">Price({currency})</div>
        <div className="basis-[20%]">24hr change</div>
        <div className="basis-[20%]">Market Capital</div>
      </div>

      <div className="flex flex-col w-[80vw] mx-auto">
        {data &&
          data.map((coin) => {
            return (
              <div
                onClick={() => handleCoinRedirect(coin.id)}
                key={coin.id}
                className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between"
              >
                <div className="flex items-center justify-start gap-3 basis-[35%]">
                  <div className="w-[4rem] h-[2rem]">
                    <img src={coin.image} className="w-full h-full" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-2xl">{coin.name}</div>
                    <div className="text-xl">{coin.symbol}</div>
                  </div>
                </div>
                <div className="basis[25%]">{coin.high_24h}</div>
                <div className="basis[20%]">{coin.price_change_24h}</div>
                <div className="basis[20%]">{coin.market_cap}</div>
              </div>
            );
          })}
      </div>

      <div className="flex gap-4 justify-center items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary btn-wide text-white text-2xl"
        >
          Prev
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="btn btn-secondary btn-wide text-white text-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CoinTable;
