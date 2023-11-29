// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurr, setFromCurr] = useState("EUR");
  const [toCurr, setToCurr] = useState("USD");
  const [storeApi, setStoreApi] = useState([]);

  useEffect(() => {
    async function fetchCurrency() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
      );
      const data = await res.json();
      console.log(data);
      setStoreApi(data.rates[toCurr]);
    }
    if (fromCurr === toCurr) {
      setStoreApi(amount);
    }
    fetchCurrency();
  }, [amount, fromCurr, toCurr]);
  return (
    <div>
      <Input amount={amount} setAmount={setAmount} />
      <Options onCurr={fromCurr} setOnCurr={setFromCurr} />
      <span> to </span>
      <Options onCurr={toCurr} setOnCurr={setToCurr} />
      <Output onValue={storeApi} />
    </div>
  );
}

function Input({ amount, setAmount }) {
  return (
    <input
      type="text"
      placeholder="Enter a value..."
      amount={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  );
}

function Options({ onCurr, setOnCurr }) {
  return (
    <select value={onCurr} onChange={(e) => setOnCurr(e.target.value)}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="CAD">CAD</option>
      <option value="INR">INR</option>
    </select>
  );
}

function Output({ onValue }) {
  return <p>{onValue}</p>;
}
