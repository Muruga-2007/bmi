import InsightsCard from "../InsightsCard";

export default function InsightsCardExample() {
  return (
    <div className="min-h-screen bg-background p-8">
      <InsightsCard
        insight={{
          title: "Your Weekly Health Insight",
          description: "Based on your BMI of 24.2, here's your personalized wellness plan",
          tips: [
            "Focus on maintaining your current healthy weight range",
            "Incorporate strength training 2-3 times per week to build lean muscle",
            "Add more colorful vegetables to each meal for better micronutrient intake",
            "Practice mindful eating to maintain awareness of hunger and fullness cues",
            "Consider meal prepping on weekends to ensure consistent healthy choices",
          ],
        }}
      />
    </div>
  );
}
