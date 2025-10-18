import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import { TrendingUp } from "lucide-react";

type BMIChartProps = {
  userBMI: number;
};

export default function BMIChart({ userBMI }: BMIChartProps) {
  const data = [
    { category: "Underweight", range: "< 18.5", value: 17, color: "hsl(var(--chart-3))" },
    { category: "Normal", range: "18.5-24.9", value: 21.7, color: "hsl(var(--chart-2))" },
    { category: "Overweight", range: "25-29.9", value: 27.5, color: "hsl(var(--chart-4))" },
    { category: "Obese", range: "≥ 30", value: 35, color: "hsl(var(--chart-5))" },
  ];

  return (
    <Card className="w-full" data-testid="card-bmi-chart">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle className="font-heading">BMI Category Scale</CardTitle>
        </div>
        <CardDescription>See where your BMI falls on the scale</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="category"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              label={{ value: "BMI", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                color: "hsl(var(--card-foreground))",
              }}
              formatter={(value: number) => [`BMI: ${value}`, ""]}
            />
            <ReferenceLine
              y={userBMI}
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{
                value: `Your BMI: ${userBMI.toFixed(1)}`,
                position: "top",
                fill: "hsl(var(--foreground))",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
