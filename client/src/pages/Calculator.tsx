import { useState } from "react";
import { useLocation } from "wouter";
import EnhancedBMICalculator from "@/components/EnhancedBMICalculator";
import BMIResults from "@/components/BMIResults";
import BMIChart from "@/components/BMIChart";
import TDEEPanel from "@/components/TDEEPanel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Utensils, ArrowRight } from "lucide-react";

type BMIData = {
  bmi: number;
  category: "underweight" | "normal" | "overweight" | "obese";
  idealRange: string;
  aiTips: string[];
};

export default function Calculator() {
  const [results, setResults] = useState<BMIData | null>(null);
  const [lastForm, setLastForm] = useState<any | null>(null);
  const [, setLocation] = useLocation();

  const calculateBMI = async (data: any) => {
    const heightInMeters = data.height / 100;
    const bmi = data.weight / (heightInMeters * heightInMeters);
    
    let category: "underweight" | "normal" | "overweight" | "obese";
    let aiTips: string[];
    
    if (bmi < 18.5) {
      category = "underweight";
      aiTips = [
        "Consider adding nutrient-dense, calorie-rich foods to your diet",
        "Include strength training to build healthy muscle mass",
        "Eat more frequently throughout the day with balanced snacks",
        "Consult with a nutritionist for a personalized meal plan",
      ];
    } else if (bmi < 25) {
      category = "normal";
      aiTips = [
        "Maintain your current healthy weight through balanced nutrition",
        "Aim for 150 minutes of moderate aerobic activity per week",
        "Stay hydrated with 8-10 glasses of water daily",
        "Ensure 7-9 hours of quality sleep each night",
      ];
    } else if (bmi < 30) {
      category = "overweight";
      aiTips = [
        "Focus on creating a sustainable calorie deficit through diet",
        "Incorporate both cardio and strength training into your routine",
        "Track your food intake to identify areas for improvement",
        "Set realistic weight loss goals of 0.5-1kg per week",
      ];
    } else {
      category = "obese";
      aiTips = [
        "Consult with healthcare professionals for personalized guidance",
        "Start with low-impact exercises like walking or swimming",
        "Focus on whole foods and limit processed items",
        "Consider working with a registered dietitian",
      ];
    }

    // Save latest inputs for sharing
    setLastForm(data);

    // Fetch AI advice from server (Gemini 2.5 Flash)
    try {
      const res = await fetch("/api/ai/diet-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bmi: Number(bmi.toFixed(1)),
          category,
          age: Number(data.age),
          gender: data.gender,
          activityLevel: data.activityLevel,
        }),
      });
      const json = await res.json();
      if (json?.text) {
        // Split into bullets; fallback to existing tips
        const bullets = String(json.text)
          .split(/\n|\r/)
          .map((s: string) => s.replace(/^[-*•\d\.\s]+/, "").trim())
          .filter((s: string) => s.length > 0)
          .slice(0, 6);
        aiTips = bullets.length ? bullets : aiTips;
      }
    } catch (_) {
      // ignore AI failures, keep heuristic tips
    }

    setResults({ bmi, category, idealRange: "18.5 - 24.9", aiTips });
  };

  const copyLink = async () => {
    try {
      const params = new URLSearchParams();
      if (lastForm) {
        Object.entries(lastForm).forEach(([k, v]) => params.set(k, String(v)));
      }
      if (results) {
        params.set("bmi", results.bmi.toFixed(1));
        params.set("category", results.category);
      }
      const url = `${window.location.origin}/calculator?${params.toString()}`;
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    } catch (_) {
      /* noop */
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          BMI Calculator & Smart Insights
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calculate BMI with instant guidance, AI-backed tips, and shareable results
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Calculator + Results side-by-side on large screens */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <EnhancedBMICalculator onCalculate={calculateBMI} />
          {results && (
            <BMIResults
              bmi={results.bmi}
              category={results.category}
              idealRange={results.idealRange}
              aiTips={results.aiTips}
            />
          )}
        </div>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <BMIChart userBMI={results.bmi} />
            
            <div className="flex justify-center">
              <Button
                onClick={() => setLocation("/diet-plan")}
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-chart-2"
                data-testid="button-view-diet-plan"
              >
                <Utensils className="h-5 w-5" />
                View Detailed Diet Plans
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button onClick={copyLink} variant="outline" className="ml-3" data-testid="button-copy-link">
                Copy Link
              </Button>
            </div>
            <TDEEPanel
              age={Number(lastForm?.age) || 30}
              gender={String(lastForm?.gender) || "male"}
              heightCm={Number(lastForm?.height) || 170}
              weightKg={Number(lastForm?.weight) || 70}
              activityLevel={(lastForm?.activityLevel as any) || "moderate"}
              goal={results.category === "overweight" || results.category === "obese" ? "lose" : results.category === "underweight" ? "gain" : "maintain"}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
