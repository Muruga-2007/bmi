import BMIChart from "../BMIChart";

export default function BMIChartExample() {
  return (
    <div className="min-h-screen bg-background p-8">
      <BMIChart userBMI={24.2} />
    </div>
  );
}
