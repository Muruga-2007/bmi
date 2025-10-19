import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Utensils,
  Clock,
  Flame,
  Apple,
  Coffee,
  Sun,
  Sunset,
  Moon,
  ChefHat,
  TrendingUp,
  Heart,
  Droplets,
  Activity
} from "lucide-react";

type DietCategory = "underweight" | "normal" | "overweight" | "obese";

export default function DietPlan() {
  const [selectedCategory, setSelectedCategory] = useState<DietCategory>("normal");

  const dietPlans = {
    underweight: {
      title: "Weight Gain Diet Plan",
      description: "Nutrient-dense, calorie-rich foods for healthy weight gain",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      calories: "2500-3000",
      icon: TrendingUp,
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM - 8:00 AM",
          icon: Coffee,
          calories: 600,
          items: [
            { name: "3 whole eggs (scrambled/omelette)", protein: "21g", carbs: "2g", fats: "15g" },
            { name: "2 slices whole grain toast with peanut butter", protein: "12g", carbs: "30g", fats: "16g" },
            { name: "1 banana", protein: "1g", carbs: "27g", fats: "0g" },
            { name: "1 glass whole milk (250ml)", protein: "8g", carbs: "12g", fats: "8g" },
          ],
        },
        {
          name: "Mid-Morning Snack",
          time: "10:00 AM",
          icon: Apple,
          calories: 400,
          items: [
            { name: "Mixed nuts (almonds, cashews, walnuts) - 1/4 cup", protein: "7g", carbs: "9g", fats: "18g" },
            { name: "Dried fruits (dates, raisins)", protein: "1g", carbs: "30g", fats: "0g" },
            { name: "Protein smoothie", protein: "25g", carbs: "35g", fats: "5g" },
          ],
        },
        {
          name: "Lunch",
          time: "12:30 PM - 1:30 PM",
          icon: Sun,
          calories: 800,
          items: [
            { name: "Brown rice or whole wheat roti - 2 cups", protein: "10g", carbs: "90g", fats: "4g" },
            { name: "Grilled chicken/fish/paneer - 200g", protein: "40g", carbs: "0g", fats: "10g" },
            { name: "Mixed vegetable curry", protein: "5g", carbs: "20g", fats: "8g" },
            { name: "1 cup yogurt", protein: "10g", carbs: "12g", fats: "8g" },
          ],
        },
        {
          name: "Evening Snack",
          time: "4:00 PM - 5:00 PM",
          icon: Sunset,
          calories: 450,
          items: [
            { name: "Cheese sandwich (2 slices)", protein: "15g", carbs: "28g", fats: "12g" },
            { name: "Fresh fruit juice", protein: "2g", carbs: "26g", fats: "0g" },
            { name: "Handful of trail mix", protein: "5g", carbs: "15g", fats: "10g" },
          ],
        },
        {
          name: "Dinner",
          time: "7:30 PM - 8:30 PM",
          icon: Moon,
          calories: 700,
          items: [
            { name: "Quinoa or brown rice - 1.5 cups", protein: "12g", carbs: "75g", fats: "6g" },
            { name: "Lean protein (fish/chicken/tofu) - 200g", protein: "40g", carbs: "0g", fats: "10g" },
            { name: "Roasted vegetables", protein: "4g", carbs: "15g", fats: "5g" },
            { name: "Avocado salad", protein: "3g", carbs: "12g", fats: "15g" },
          ],
        },
        {
          name: "Before Bed",
          time: "10:00 PM",
          icon: Moon,
          calories: 300,
          items: [
            { name: "Casein protein shake or warm milk", protein: "25g", carbs: "10g", fats: "5g" },
            { name: "Small bowl of oats with honey", protein: "6g", carbs: "40g", fats: "3g" },
          ],
        },
      ],
      tips: [
        "Eat every 2-3 hours to increase calorie intake",
        "Include healthy fats like nuts, seeds, and avocados",
        "Add protein powder to smoothies and shakes",
        "Focus on strength training to build muscle mass",
        "Avoid skipping meals",
        "Stay hydrated with 8-10 glasses of water",
      ],
    },
    normal: {
      title: "Balanced Maintenance Diet",
      description: "Maintain your healthy weight with balanced nutrition",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      calories: "2000-2200",
      icon: Heart,
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM - 8:00 AM",
          icon: Coffee,
          calories: 450,
          items: [
            { name: "Oatmeal with berries and honey", protein: "10g", carbs: "45g", fats: "8g" },
            { name: "2 boiled eggs", protein: "14g", carbs: "1g", fats: "10g" },
            { name: "1 glass low-fat milk or green tea", protein: "8g", carbs: "12g", fats: "2g" },
          ],
        },
        {
          name: "Mid-Morning Snack",
          time: "10:30 AM",
          icon: Apple,
          calories: 200,
          items: [
            { name: "Apple or orange", protein: "1g", carbs: "25g", fats: "0g" },
            { name: "Small handful of almonds (10-12)", protein: "6g", carbs: "6g", fats: "14g" },
          ],
        },
        {
          name: "Lunch",
          time: "1:00 PM - 2:00 PM",
          icon: Sun,
          calories: 600,
          items: [
            { name: "Brown rice or whole wheat roti - 1.5 cups", protein: "8g", carbs: "68g", fats: "3g" },
            { name: "Grilled chicken/fish/lentils - 150g", protein: "30g", carbs: "15g", fats: "5g" },
            { name: "Mixed vegetable salad", protein: "3g", carbs: "10g", fats: "2g" },
            { name: "Buttermilk or yogurt", protein: "8g", carbs: "10g", fats: "4g" },
          ],
        },
        {
          name: "Evening Snack",
          time: "5:00 PM",
          icon: Sunset,
          calories: 250,
          items: [
            { name: "Whole grain crackers with hummus", protein: "5g", carbs: "20g", fats: "8g" },
            { name: "Green tea", protein: "0g", carbs: "0g", fats: "0g" },
            { name: "Carrot/cucumber sticks", protein: "1g", carbs: "5g", fats: "0g" },
          ],
        },
        {
          name: "Dinner",
          time: "7:00 PM - 8:00 PM",
          icon: Moon,
          calories: 550,
          items: [
            { name: "Grilled vegetables", protein: "4g", carbs: "15g", fats: "3g" },
            { name: "Lean protein (fish/chicken/tofu) - 150g", protein: "30g", carbs: "0g", fats: "8g" },
            { name: "Quinoa or brown rice - 1 cup", protein: "8g", carbs: "50g", fats: "4g" },
            { name: "Green salad", protein: "2g", carbs: "8g", fats: "2g" },
          ],
        },
      ],
      tips: [
        "Maintain regular meal times",
        "Stay hydrated with 8-10 glasses of water daily",
        "Include variety of colorful vegetables",
        "Exercise 150 minutes per week",
        "Get 7-9 hours of quality sleep",
        "Practice mindful eating",
      ],
    },
    overweight: {
      title: "Weight Loss Diet Plan",
      description: "Create a sustainable calorie deficit for healthy weight loss",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      calories: "1500-1800",
      icon: Activity,
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM - 8:00 AM",
          icon: Coffee,
          calories: 350,
          items: [
            { name: "Vegetable omelette (2 eggs)", protein: "14g", carbs: "5g", fats: "10g" },
            { name: "1 slice whole grain toast", protein: "4g", carbs: "15g", fats: "1g" },
            { name: "Green tea or black coffee", protein: "0g", carbs: "0g", fats: "0g" },
          ],
        },
        {
          name: "Mid-Morning Snack",
          time: "10:30 AM",
          icon: Apple,
          calories: 150,
          items: [
            { name: "Greek yogurt with berries", protein: "10g", carbs: "15g", fats: "3g" },
            { name: "Herbal tea", protein: "0g", carbs: "0g", fats: "0g" },
          ],
        },
        {
          name: "Lunch",
          time: "1:00 PM - 2:00 PM",
          icon: Sun,
          calories: 450,
          items: [
            { name: "Large mixed salad with olive oil dressing", protein: "5g", carbs: "15g", fats: "10g" },
            { name: "Grilled chicken/fish - 120g", protein: "25g", carbs: "0g", fats: "5g" },
            { name: "1/2 cup brown rice or quinoa", protein: "4g", carbs: "25g", fats: "2g" },
          ],
        },
        {
          name: "Evening Snack",
          time: "4:30 PM",
          icon: Sunset,
          calories: 120,
          items: [
            { name: "Cucumber and celery sticks", protein: "1g", carbs: "5g", fats: "0g" },
            { name: "Small apple", protein: "0g", carbs: "15g", fats: "0g" },
            { name: "Green tea", protein: "0g", carbs: "0g", fats: "0g" },
          ],
        },
        {
          name: "Dinner",
          time: "7:00 PM",
          icon: Moon,
          calories: 400,
          items: [
            { name: "Vegetable soup", protein: "4g", carbs: "15g", fats: "2g" },
            { name: "Grilled fish or tofu - 120g", protein: "25g", carbs: "0g", fats: "5g" },
            { name: "Steamed vegetables", protein: "3g", carbs: "10g", fats: "1g" },
            { name: "Small portion of brown rice (optional)", protein: "2g", carbs: "20g", fats: "1g" },
          ],
        },
      ],
      tips: [
        "Reduce portion sizes gradually",
        "Avoid sugary drinks and processed foods",
        "Drink water before meals",
        "Incorporate cardio and strength training",
        "Track your food intake",
        "Aim for 0.5-1kg weight loss per week",
      ],
    },
    obese: {
      title: "Medical Weight Management Plan",
      description: "Comprehensive approach to significant weight reduction",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      calories: "1200-1500",
      icon: ChefHat,
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM - 8:00 AM",
          icon: Coffee,
          calories: 280,
          items: [
            { name: "Egg white omelette with spinach", protein: "12g", carbs: "3g", fats: "2g" },
            { name: "1/2 cup oatmeal", protein: "3g", carbs: "20g", fats: "2g" },
            { name: "Green tea", protein: "0g", carbs: "0g", fats: "0g" },
          ],
        },
        {
          name: "Mid-Morning Snack",
          time: "10:00 AM",
          icon: Apple,
          calories: 100,
          items: [
            { name: "Small portion of berries", protein: "1g", carbs: "12g", fats: "0g" },
            { name: "Herbal tea", protein: "0g", carbs: "0g", fats: "0g" },
          ],
        },
        {
          name: "Lunch",
          time: "12:30 PM - 1:30 PM",
          icon: Sun,
          calories: 400,
          items: [
            { name: "Large vegetable salad", protein: "4g", carbs: "12g", fats: "5g" },
            { name: "Grilled chicken breast - 100g", protein: "25g", carbs: "0g", fats: "3g" },
            { name: "1/3 cup brown rice", protein: "2g", carbs: "15g", fats: "1g" },
          ],
        },
        {
          name: "Afternoon Snack",
          time: "3:30 PM",
          icon: Sunset,
          calories: 80,
          items: [
            { name: "Cucumber slices", protein: "1g", carbs: "4g", fats: "0g" },
            { name: "Green tea", protein: "0g", carbs: "0g", fats: "0g" },
          ],
        },
        {
          name: "Dinner",
          time: "6:30 PM",
          icon: Moon,
          calories: 350,
          items: [
            { name: "Clear vegetable soup", protein: "3g", carbs: "10g", fats: "1g" },
            { name: "Steamed fish or tofu - 100g", protein: "22g", carbs: "0g", fats: "4g" },
            { name: "Steamed broccoli and carrots", protein: "4g", carbs: "15g", fats: "0g" },
          ],
        },
      ],
      tips: [
        "Consult with a registered dietitian",
        "Start with low-impact exercises (walking, swimming)",
        "Monitor blood sugar and blood pressure regularly",
        "Eliminate processed foods and added sugars",
        "Join a support group for accountability",
        "Consider working with a healthcare team",
        "Set realistic, achievable goals",
      ],
    },
  };

  const currentPlan = dietPlans[selectedCategory];
  const Icon = currentPlan.icon;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          Personalized Diet Plans
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Science-backed nutrition plans tailored to your BMI category and health goals
        </p>
      </motion.div>

      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        {(Object.keys(dietPlans) as DietCategory[]).map((category) => {
          const plan = dietPlans[category];
          const PlanIcon = plan.icon;
          return (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${selectedCategory === category ? plan.bgColor : ""} capitalize`}
              data-testid={`button-category-${category}`}
            >
              <PlanIcon className="h-4 w-4 mr-2" />
              {category}
            </Button>
          );
        })}
      </div>

      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`mb-8 border-2 ${currentPlan.borderColor}`}>
          <CardHeader className={`${currentPlan.bgColor}`}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-background`}>
                  <Icon className={`h-8 w-8 ${currentPlan.color}`} />
                </div>
                <div>
                  <CardTitle className="font-heading text-3xl" data-testid="text-plan-title">{currentPlan.title}</CardTitle>
                  <CardDescription className="text-base mt-1">{currentPlan.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Flame className={`h-5 w-5 ${currentPlan.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">Daily Calories</p>
                  <p className={`text-xl font-bold ${currentPlan.color}`} data-testid="text-calories">{currentPlan.calories}</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="meals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto">
            <TabsTrigger value="meals" className="flex items-center gap-2" data-testid="tab-meals">
              <Utensils className="h-4 w-4" />
              Meal Plan
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2" data-testid="tab-tips">
              <Heart className="h-4 w-4" />
              Health Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meals" className="space-y-6">
            {currentPlan.meals.map((meal, index) => {
              const MealIcon = meal.icon;
              return (
                <motion.div
                  key={meal.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover-elevate">
                    <CardHeader className={`${currentPlan.bgColor}`}>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-background">
                            <MealIcon className={`h-6 w-6 ${currentPlan.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-xl" data-testid={`text-meal-${index}`}>{meal.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <CardDescription>{meal.time}</CardDescription>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-base px-3 py-1">
                          <Flame className="h-4 w-4 mr-1" />
                          {meal.calories} kcal
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {meal.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-start justify-between gap-4 p-3 rounded-lg bg-muted/50 hover-elevate"
                            data-testid={`meal-item-${index}-${itemIndex}`}
                          >
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                            </div>
                            <div className="flex gap-3 text-xs">
                              <Badge variant="outline" className="font-mono">P: {item.protein}</Badge>
                              <Badge variant="outline" className="font-mono">C: {item.carbs}</Badge>
                              <Badge variant="outline" className="font-mono">F: {item.fats}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </TabsContent>

          <TabsContent value="tips">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className={`h-6 w-6 ${currentPlan.color}`} />
                  Health & Nutrition Tips
                </CardTitle>
                <CardDescription>
                  Expert recommendations for your {selectedCategory} diet plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {currentPlan.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover-elevate"
                      data-testid={`tip-${index}`}
                    >
                      <div className={`p-2 rounded-full ${currentPlan.bgColor} mt-1`}>
                        <Droplets className={`h-4 w-4 ${currentPlan.color}`} />
                      </div>
                      <p className="flex-1 text-sm">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
