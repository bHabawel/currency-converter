export default function Options({ onCurr, setOnCurr, isLoading }) {
  return (
    <select
      value={onCurr}
      onChange={(e) => setOnCurr(e.target.value)}
      disabled={isLoading}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="CAD">CAD</option>
      <option value="INR">INR</option>
    </select>
  );
}
