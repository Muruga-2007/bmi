import BMIResults from "../BMIResults";

export default function BMIResultsExample() {
  return (
    <div className="min-h-screen bg-background p-8">
      <BMIResults
        bmi={24.2}
        category="normal"
        idealRange="18.5 - 24.9"
        aiTips={[
          "Maintain your current healthy weight through balanced nutrition",
          "Aim for 150 minutes of moderate aerobic activity per week",
          "Stay hydrated with 8-10 glasses of water daily",
          "Ensure 7-9 hours of quality sleep each night",
        ]}
      />
    </div>
  );
}
