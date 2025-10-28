import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  age?: number;
  gender?: string;
  heightCm: number;
  weightKg: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active";
  goal?: "lose" | "maintain" | "gain";
};

function calculateBmr(weightKg: number, heightCm: number, age: number, gender: string) {
  if (gender === "female") return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
}

const activityMultipliers: Record<Props["activityLevel"], number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
};

export default function TDEEPanel({ age = 30, gender = "male", heightCm, weightKg, activityLevel, goal = "maintain" }: Props) {
  const bmr = Math.round(calculateBmr(weightKg, heightCm, age, gender));
  const tdee = Math.round(bmr * activityMultipliers[activityLevel]);
  const delta = goal === "lose" ? -500 : goal === "gain" ? 300 : 0;
  const target = tdee + delta;
  const protein = Math.round(weightKg * 1.6); // g
  const fat = Math.round((0.25 * target) / 9); // g
  const carbs = Math.max(0, Math.round((target - protein * 4 - fat * 9) / 4)); // g

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Daily Energy & Macros</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-xs text-muted-foreground">BMR</div>
          <div className="text-xl font-semibold">{bmr} kcal</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">TDEE</div>
          <div className="text-xl font-semibold">{tdee} kcal</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Target</div>
          <div className="text-xl font-semibold">{target} kcal</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Macros</div>
          <div className="text-sm">P {protein}g • C {carbs}g • F {fat}g</div>
        </div>
      </CardContent>
    </Card>
  );
}


