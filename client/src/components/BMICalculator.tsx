import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, User, Activity } from "lucide-react";

type BMIFormData = {
  gender: string;
  age: string;
  height: number;
  weight: number;
  activityLevel: string;
  unit: "metric" | "imperial";
};

type BMICalculatorProps = {
  onCalculate?: (data: BMIFormData) => void;
};

export default function BMICalculator({ onCalculate }: BMICalculatorProps) {
  const [formData, setFormData] = useState<BMIFormData>({
    gender: "male",
    age: "30",
    height: 170,
    weight: 70,
    activityLevel: "moderate",
    unit: "metric",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("BMI Calculation submitted:", formData);
    onCalculate?.(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="card-bmi-calculator">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          <CardTitle className="font-heading text-2xl">BMI Calculator</CardTitle>
        </div>
        <CardDescription>
          Enter your details to calculate your Body Mass Index and get personalized insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Gender
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <SelectTrigger id="gender" data-testid="select-gender">
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
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                min="1"
                max="120"
                data-testid="input-age"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Height: {formData.height} cm</Label>
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
            <Slider
              value={[formData.height]}
              onValueChange={([value]) =>
                setFormData({ ...formData, height: value })
              }
              min={100}
              max={250}
              step={1}
              data-testid="slider-height"
            />
          </div>

          <div className="space-y-2">
            <Label>Weight: {formData.weight} kg</Label>
            <Slider
              value={[formData.weight]}
              onValueChange={([value]) =>
                setFormData({ ...formData, weight: value })
              }
              min={30}
              max={200}
              step={1}
              data-testid="slider-weight"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Activity Level
            </Label>
            <Select
              value={formData.activityLevel}
              onValueChange={(value) =>
                setFormData({ ...formData, activityLevel: value })
              }
            >
              <SelectTrigger id="activity" data-testid="select-activity">
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

          <Button type="submit" className="w-full font-heading" size="lg" data-testid="button-submit">
            Calculate BMI
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
