import { motion } from "framer-motion";
import InsightsCard from "@/components/InsightsCard";
import BMIChart from "@/components/BMIChart";

export default function Insights() {
  const mockInsight = {
    title: "Your Weekly Health Insight",
    description: "Based on your BMI and activity level, here's your personalized wellness plan",
    tips: [
      "Focus on maintaining your current healthy weight range through balanced nutrition",
      "Incorporate strength training 2-3 times per week to build lean muscle mass",
      "Add more colorful vegetables to each meal for better micronutrient intake",
      "Practice mindful eating to maintain awareness of hunger and fullness cues",
      "Consider meal prepping on weekends to ensure consistent healthy choices throughout the week",
      "Stay active with at least 30 minutes of movement daily, even on rest days",
    ],
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          Health Insights
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI-powered personalized recommendations for your wellness journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <InsightsCard insight={mockInsight} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <BMIChart userBMI={24.2} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 p-6 rounded-lg bg-gradient-to-br from-primary/5 to-chart-2/5 border border-primary/10 text-center"
      >
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> These insights are generated
          based on general health guidelines and AI analysis. For personalized medical
          advice, please consult with qualified healthcare professionals.
        </p>
      </motion.div>
    </div>
  );
}
