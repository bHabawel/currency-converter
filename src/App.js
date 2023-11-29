// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  return <Converter />;
}

function Converter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  useEffect(() => {
    async function fetchCurrency() {
      try {
        let res = await fetch(
          `https://api.frankfurter.app/latest?amount=100&from=${fromCurrency}&to=${toCurrency}`
        );
        if (!res.ok) throw new Error(`Failed to fetch`);

        let data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchCurrency();
  }, [fromCurrency, toCurrency]);

  function handleFromCurrency(currency) {
    setFromCurrency(currency);
  }

  function handleToCurrency(currency) {
    setToCurrency(currency);
  }

  return (
    <div>
      <input type="text" />
      <Options onChange={handleFromCurrency} />
      <span> to </span>
      <Options onChange={handleToCurrency} value={"EUR"} />
      <Output />
    </div>
  );
}

function Options({ onChange, value }) {
  function handleCurrency(e) {
    const currency = e.target.value;
    onChange(currency);
  }
  return (
    <select onChange={handleCurrency} value={value}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="CAD">CAD</option>
      <option value="INR">INR</option>
    </select>
  );
}

function Output() {
  return <p>OUTPUT</p>;
}
