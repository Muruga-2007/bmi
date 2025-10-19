import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Flame,
  Heart,
  Moon,
  Activity,
  TrendingUp,
  Plus,
  Minus,
  Award,
  Clock,
  Zap,
  Target,
  Brain
} from "lucide-react";
import BMIChart from "@/components/BMIChart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function Insights() {
  const [waterIntake, setWaterIntake] = useState(4);
  const waterGoal = 8;
  const glassSize = 250;

  const addWater = () => setWaterIntake(Math.min(waterIntake + 1, 12));
  const removeWater = () => setWaterIntake(Math.max(waterIntake - 1, 0));

  const macronutrients = [
    { name: "Protein", value: 30, color: "hsl(var(--chart-1))" },
    { name: "Carbs", value: 45, color: "hsl(var(--chart-2))" },
    { name: "Fats", value: 25, color: "hsl(var(--chart-3))" }
  ];

  const dailyCalories = 2200;
  const tdee = 2400;
  const bmr = 1650;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          Health Metrics Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Track your daily health metrics and get personalized insights
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover-elevate" data-testid="card-daily-calories">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Flame className="h-4 w-4" />
                Daily Calories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary" data-testid="value-daily-calories">{dailyCalories}</p>
              <p className="text-xs text-muted-foreground mt-1">Recommended intake</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover-elevate" data-testid="card-tdee">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="h-4 w-4" />
                TDEE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-chart-2" data-testid="value-tdee">{tdee}</p>
              <p className="text-xs text-muted-foreground mt-1">Total daily energy</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover-elevate" data-testid="card-bmr">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Heart className="h-4 w-4" />
                BMR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-chart-3" data-testid="value-bmr">{bmr}</p>
              <p className="text-xs text-muted-foreground mt-1">Basal metabolic rate</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover-elevate" data-testid="card-active-minutes">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Active Minutes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-chart-4" data-testid="value-active-minutes">45</p>
              <p className="text-xs text-muted-foreground mt-1">Today's activity</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-6 w-6 text-blue-500" />
                Hydration Tracker
              </CardTitle>
              <CardDescription>Track your daily water intake</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Droplets className="h-8 w-8 text-blue-500" />
                  <p className="text-5xl font-bold text-blue-500" data-testid="value-water-intake">{waterIntake}</p>
                  <span className="text-2xl text-muted-foreground">/ {waterGoal}</span>
                </div>
                <p className="text-sm text-muted-foreground" data-testid="text-water-ml">
                  {waterIntake * glassSize}ml of {waterGoal * glassSize}ml daily goal
                </p>
              </div>

              <Progress value={(waterIntake / waterGoal) * 100} className="h-3" />

              <div className="flex justify-center gap-4">
                <Button onClick={removeWater} variant="outline" size="lg" className="gap-2" data-testid="button-remove-water">
                  <Minus className="h-4 w-4" />
                  Remove Glass
                </Button>
                <Button onClick={addWater} size="lg" className="gap-2 bg-blue-500 hover:bg-blue-600" data-testid="button-add-water">
                  <Plus className="h-4 w-4" />
                  Add Glass
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: waterGoal }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-16 rounded-lg flex items-center justify-center transition-all ${
                      i < waterIntake
                        ? 'bg-blue-500 text-white'
                        : 'bg-muted border-2 border-dashed border-muted-foreground/30'
                    }`}
                  >
                    <Droplets className={`h-8 w-8 ${i < waterIntake ? 'opacity-100' : 'opacity-30'}`} />
                  </div>
                ))}
              </div>

              {waterIntake >= waterGoal && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center"
                  data-testid="hydration-achievement"
                >
                  <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-semibold text-green-600">Great job! Hydration goal achieved!</p>
                </motion.div>
              )}

              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-semibold text-sm">Hydration Benefits:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Boosts energy and cognitive function</li>
                  <li>• Aids in weight management and metabolism</li>
                  <li>• Improves skin health and complexion</li>
                  <li>• Supports digestion and nutrient absorption</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Macronutrient Balance
              </CardTitle>
              <CardDescription>Optimal daily nutrition breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macronutrients}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {macronutrients.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid gap-3 mt-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Protein</span>
                    <Badge style={{ backgroundColor: macronutrients[0].color }}>165g</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Essential for muscle repair and growth</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Carbohydrates</span>
                    <Badge style={{ backgroundColor: macronutrients[1].color }}>248g</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Primary energy source for body and brain</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Fats</span>
                    <Badge style={{ backgroundColor: macronutrients[2].color }}>61g</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Supports hormone production and vitamin absorption</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="hover-elevate h-full" data-testid="card-sleep-quality">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Moon className="h-5 w-5 text-purple-500" />
                Sleep Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Sleep</span>
                <span className="text-2xl font-bold text-purple-500" data-testid="value-sleep-hours">7.5h</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Aim for 7-9 hours of quality sleep for optimal recovery
              </p>
              <div className="pt-2 border-t space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>Bedtime: 10:30 PM</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>Wake time: 6:00 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="hover-elevate h-full" data-testid="card-activity-level">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-green-500" />
                Activity Level
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20" data-testid="badge-activity-level">Moderately Active</Badge>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Steps Today</span>
                  <span className="font-semibold">8,234</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Calories Burned</span>
                  <span className="font-semibold">420 kcal</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Workout Streak</span>
                  <span className="font-semibold">5 days</span>
                </div>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground">
                65% of your weekly activity goal achieved
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="hover-elevate h-full" data-testid="card-wellness-score">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5 text-orange-500" />
                Wellness Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Health</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-2xl font-bold text-orange-500" data-testid="value-wellness-score">82/100</span>
                </div>
              </div>
              <Progress value={82} className="h-2" />
              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Nutrition</p>
                  <p className="text-lg font-bold text-green-500">85</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Fitness</p>
                  <p className="text-lg font-bold text-blue-500">78</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <BMIChart userBMI={24.2} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mt-8 p-6 rounded-lg bg-gradient-to-br from-primary/5 to-chart-2/5 border border-primary/10 text-center"
      >
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> These metrics and insights are based on general health guidelines.
          For personalized medical advice, please consult with qualified healthcare professionals.
        </p>
      </motion.div>
    </div>
  );
}
