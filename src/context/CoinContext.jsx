import React, { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allcoin, setAllcoin] = useState([]);
  const [currency, setCurrency] = useState({ name: "USD", symbol: "$" });

  const fetchAllcoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-yzDP3hnFAGqg3dsAa4CT3wAo",
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        options
      );
      const data = await res.json();
      setAllcoin(data);
    } catch (err) {
      console.error("Error fetching coin data:", err);
    }
  };

  useEffect(() => {
    fetchAllcoin();
  }, [currency]);

  const contextValue = {
    allcoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
