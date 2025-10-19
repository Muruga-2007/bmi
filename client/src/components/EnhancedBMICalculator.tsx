import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, User, Activity, Ruler, Weight } from "lucide-react";
import { motion } from "framer-motion";
import HumanModel3D from "./HumanModel3D";

type BMIFormData = {
  gender: string;
  age: string;
  height: number;
  weight: number;
  activityLevel: string;
  unit: "metric" | "imperial";
};

type EnhancedBMICalculatorProps = {
  onCalculate?: (data: BMIFormData) => void;
};

export default function EnhancedBMICalculator({ onCalculate }: EnhancedBMICalculatorProps) {
  const [formData, setFormData] = useState<BMIFormData>({
    gender: "male",
    age: "30",
    height: 170,
    weight: 70,
    activityLevel: "moderate",
    unit: "metric",
  });

  const [previewBMI, setPreviewBMI] = useState<"underweight" | "normal" | "overweight" | "obese">("normal");

  const calculatePreviewBMI = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    if (bmi < 18.5) return "underweight";
    if (bmi < 25) return "normal";
    if (bmi < 30) return "overweight";
    return "obese";
  };

  const handleHeightChange = (value: number) => {
    setFormData({ ...formData, height: value });
    setPreviewBMI(calculatePreviewBMI(value, formData.weight));
  };

  const handleWeightChange = (value: number) => {
    setFormData({ ...formData, weight: value });
    setPreviewBMI(calculatePreviewBMI(formData.height, value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate?.(formData);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden backdrop-blur-sm bg-card/50 border-2" data-testid="card-enhanced-calculator">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5 pointer-events-none" />
          
          <CardContent className="relative p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm">
                <Calculator className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold" data-testid="text-calculator-title">Advanced BMI Calculator</h2>
                <p className="text-sm text-muted-foreground">Real-time body analysis</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4 text-primary" />
                    Gender
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger id="gender" data-testid="select-gender" className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    min="1"
                    max="120"
                    className="bg-background/50"
                    data-testid="input-age"
                  />
                </div>
              </div>

              <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Ruler className="h-4 w-4 text-primary" />
                    Height
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={formData.unit === "metric" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, unit: "metric" })}
                      data-testid="button-unit-metric"
                    >
                      Metric
                    </Button>
                    <Button
                      type="button"
                      variant={formData.unit === "imperial" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, unit: "imperial" })}
                      data-testid="button-unit-imperial"
                    >
                      Imperial
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary" data-testid="text-height-value">{formData.height}</span>
                  <span className="text-lg text-muted-foreground ml-2">cm</span>
                </div>
                
                <Slider
                  value={[formData.height]}
                  onValueChange={([value]) => handleHeightChange(value)}
                  min={100}
                  max={250}
                  step={1}
                  className="py-4"
                  data-testid="slider-height"
                />
              </div>

              <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-chart-2/5 to-transparent border">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Weight className="h-4 w-4 text-chart-2" />
                  Weight
                </Label>
                
                <div className="text-center">
                  <span className="text-3xl font-bold text-chart-2" data-testid="text-weight-value">{formData.weight}</span>
                  <span className="text-lg text-muted-foreground ml-2">kg</span>
                </div>
                
                <Slider
                  value={[formData.weight]}
                  onValueChange={([value]) => handleWeightChange(value)}
                  min={30}
                  max={200}
                  step={1}
                  className="py-4"
                  data-testid="slider-weight"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity" className="flex items-center gap-2 text-sm font-medium">
                  <Activity className="h-4 w-4 text-primary" />
                  Activity Level
                </Label>
                <Select
                  value={formData.activityLevel}
                  onValueChange={(value) =>
                    setFormData({ ...formData, activityLevel: value })
                  }
                >
                  <SelectTrigger id="activity" data-testid="select-activity" className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very-active">Very Active (intense exercise daily)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full font-heading text-lg h-12 bg-gradient-to-r from-primary to-chart-2 hover:opacity-90" 
                size="lg" 
                data-testid="button-submit"
              >
                Calculate & Get Diet Plan
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:sticky lg:top-8"
      >
        <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-2">
          <div className="aspect-square relative">
            <HumanModel3D 
              bmiCategory={previewBMI}
              height={formData.height}
              weight={formData.weight}
            />
          </div>
          <CardContent className="p-4 bg-gradient-to-t from-background to-transparent">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Live Preview</p>
              <p className="text-lg font-semibold capitalize" data-testid="text-preview-category">
                {previewBMI}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
