import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, CheckCircle, Activity } from "lucide-react";

type BMICategory = "underweight" | "normal" | "overweight" | "obese";

type BMIResultsProps = {
  bmi: number;
  category: BMICategory;
  idealRange: string;
  aiTips?: string[];
};

const categoryConfig: Record<BMICategory, { color: string; icon: any; label: string }> = {
  underweight: {
    color: "text-chart-3 bg-chart-3/10 border-chart-3/20",
    icon: AlertCircle,
    label: "Underweight",
  },
  normal: {
    color: "text-chart-2 bg-chart-2/10 border-chart-2/20",
    icon: CheckCircle,
    label: "Normal Weight",
  },
  overweight: {
    color: "text-chart-4 bg-chart-4/10 border-chart-4/20",
    icon: TrendingUp,
    label: "Overweight",
  },
  obese: {
    color: "text-chart-5 bg-chart-5/10 border-chart-5/20",
    icon: AlertCircle,
    label: "Obese",
  },
};

export default function BMIResults({ bmi, category, idealRange, aiTips = [] }: BMIResultsProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card data-testid="card-bmi-results">
        <CardHeader>
          <CardTitle className="font-heading text-2xl flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            Your BMI Results
          </CardTitle>
          <CardDescription>Based on your provided measurements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="inline-flex flex-col items-center gap-4"
            >
              <div className="text-6xl font-heading font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent" data-testid="text-bmi-value">
                {bmi.toFixed(1)}
              </div>
              <Badge className={`${config.color} flex items-center gap-1 px-4 py-2 text-sm font-semibold border`} data-testid="badge-bmi-category">
                <Icon className="h-4 w-4" />
                {config.label}
              </Badge>
            </motion.div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Ideal BMI Range
              </div>
              <div className="text-lg font-heading font-semibold" data-testid="text-ideal-range">
                {idealRange}
              </div>
            </div>

            <div className="relative pt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
              </div>
              <div className="h-3 w-full bg-gradient-to-r from-chart-3 via-chart-2 via-chart-4 to-chart-5 rounded-full relative">
                <motion.div
                  initial={{ left: 0 }}
                  animate={{ left: `${Math.min(Math.max(((bmi - 15) / 25) * 100, 0), 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-foreground rounded-full border-2 border-background shadow-lg"
                />
              </div>
            </div>
          </div>

          {aiTips && aiTips.length > 0 && (
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">AI</span> Health Recommendations
              </h4>
              <ul className="space-y-2">
                {aiTips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-2 text-sm"
                    data-testid={`text-tip-${index}`}
                  >
                    <CheckCircle className="h-4 w-4 text-chart-2 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
