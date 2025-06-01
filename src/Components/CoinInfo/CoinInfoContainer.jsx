import { useQuery } from "@tanstack/react-query";
import CoinInfo from "./CoinInfo";
import currencyStore from "../../state/store";
import { useState } from "react";
import { fetchCoinHistoricData } from "../../Services/fetchCoinHistoricData";
import PageLoader from "../PageLoader/PageLoader";
import Alert from "../Alert/Alert";

function CoinInfoContainer({ coinId }) {
  const { currency } = currencyStore();

  const [days, setDays] = useState(7);
  const [interval, setCoinInterval] = useState("daily");

  const {
    data: historicData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coinHistoricData", coinId, currency, days],
    queryFn: () => fetchCoinHistoricData(coinId, interval, days, currency),
    queries: {
      // retry: 2,
      // retryDelay: 1000,
      cacheTime: 1000 * 60 * 2,
      staleTime: 1000 * 60 * 2,
    },
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Alert message="Error fetching the data" type="error" />;
  }

  return (
    <div>
      <CoinInfo
        historicData={historicData}
        setDays={setDays}
        setCoinInterval={setCoinInterval}
        days={days}
        currency={currency}
      />
    </div>
  );
}
export default CoinInfoContainer;
