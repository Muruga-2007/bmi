import BMICalculator from "../BMICalculator";

export default function BMICalculatorExample() {
  return (
    <div className="min-h-screen bg-background p-8">
      <BMICalculator onCalculate={(data) => console.log("Calculated:", data)} />
    </div>
  );
}
