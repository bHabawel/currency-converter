import { useEffect, useState } from "react";
import Input from "./components/Input";
import Options from "./components/Options";
import Text from "./components/Text";
import Output from "./components/Output";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurr, setFromCurr] = useState("EUR");
  const [toCurr, setToCurr] = useState("USD");
  const [storeApi, setStoreApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCurrency() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
        );

        if (!res.ok) throw new Error(`Failed to fetch currency`);

        const data = await res.json();
        setStoreApi(data.rates[toCurr]);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    // This will make sure that there are no errors if the two currencies are the same
    if (fromCurr === toCurr) {
      return setStoreApi(amount);
    }

    fetchCurrency();
  }, [amount, fromCurr, toCurr]);

  return (
    <div>
      <Input amount={amount} setAmount={setAmount} />
      <Options
        onCurr={fromCurr}
        setOnCurr={setFromCurr}
        isLoading={isLoading}
      />
      <Text />
      <Options onCurr={toCurr} setOnCurr={setToCurr} isLoading={isLoading} />
      <Output onValue={storeApi} />
    </div>
  );
}
