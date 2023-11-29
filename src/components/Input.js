export default function Input({ amount, setAmount }) {
  return (
    <input
      type="text"
      placeholder="Enter a value..."
      amount={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  );
}
