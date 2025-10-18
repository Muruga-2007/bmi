import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type Insight = {
  title: string;
  description: string;
  tips: string[];
};

type InsightsCardProps = {
  insight: Insight;
};

export default function InsightsCard({ insight }: InsightsCardProps) {
  return (
    <Card className="w-full border-primary/20" data-testid="card-insights">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <Badge variant="secondary" className="font-heading">
            AI-Powered
          </Badge>
        </div>
        <CardTitle className="font-heading text-2xl">{insight.title}</CardTitle>
        <CardDescription>{insight.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-chart-2/5 border border-primary/10">
          <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
            Weekly Health Tips
          </h4>
          <ul className="space-y-3">
            {insight.tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3"
                data-testid={`text-weekly-tip-${index}`}
              >
                <div className="mt-0.5 flex-shrink-0 p-1 rounded-full bg-chart-2/20">
                  <CheckCircle2 className="h-4 w-4 text-chart-2" />
                </div>
                <span className="text-sm leading-relaxed">{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
          <p>
            These personalized recommendations are generated based on your BMI,
            activity level, and health goals. Consult with healthcare
            professionals for medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
