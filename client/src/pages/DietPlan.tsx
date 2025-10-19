import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  Activity,
  ShoppingCart,
  CalendarDays,
  Zap,
  Check,
  Timer
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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 lg:w-auto">
            <TabsTrigger value="meals" className="flex items-center gap-2" data-testid="tab-meals">
              <Utensils className="h-4 w-4" />
              Meal Plan
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex items-center gap-2" data-testid="tab-recipes">
              <ChefHat className="h-4 w-4" />
              Recipes
            </TabsTrigger>
            <TabsTrigger value="shopping" className="flex items-center gap-2" data-testid="tab-shopping">
              <ShoppingCart className="h-4 w-4" />
              Shopping List
            </TabsTrigger>
            <TabsTrigger value="mealprep" className="flex items-center gap-2" data-testid="tab-mealprep">
              <CalendarDays className="h-4 w-4" />
              Meal Prep
            </TabsTrigger>
            <TabsTrigger value="exercise" className="flex items-center gap-2" data-testid="tab-exercise">
              <Activity className="h-4 w-4" />
              Workouts
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

          <TabsContent value="recipes" className="space-y-6" data-testid="content-recipes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className={`h-6 w-6 ${currentPlan.color}`} />
                  Quick & Healthy Recipes
                </CardTitle>
                <CardDescription>
                  Easy-to-follow recipes tailored for {selectedCategory} diet plan
                </CardDescription>
              </CardHeader>
              <CardContent data-testid="recipes-content">
                <Accordion type="single" collapsible className="w-full" data-testid="accordion-recipes">
                  <AccordionItem value="recipe-1" data-testid="recipe-item-1">
                    <AccordionTrigger className="text-lg font-semibold" data-testid="recipe-trigger-1">
                      <div className="flex items-center gap-3">
                        <Timer className={`h-5 w-5 ${currentPlan.color}`} />
                        High-Protein Breakfast Bowl
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />15 mins</Badge>
                          <Badge variant="outline"><Flame className="h-3 w-3 mr-1" />450 kcal</Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Ingredients:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>2 eggs</li>
                            <li>1 cup spinach</li>
                            <li>1/2 avocado</li>
                            <li>1 slice whole grain toast</li>
                            <li>Cherry tomatoes</li>
                            <li>Salt, pepper, olive oil</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Instructions:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Heat olive oil in a pan over medium heat</li>
                            <li>Sauté spinach until wilted, season with salt and pepper</li>
                            <li>Scramble eggs in the same pan</li>
                            <li>Toast bread and top with mashed avocado</li>
                            <li>Serve eggs with spinach, toast, and fresh tomatoes</li>
                          </ol>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="recipe-2" data-testid="recipe-item-2">
                    <AccordionTrigger className="text-lg font-semibold" data-testid="recipe-trigger-2">
                      <div className="flex items-center gap-3">
                        <Timer className={`h-5 w-5 ${currentPlan.color}`} />
                        Grilled Chicken & Veggie Bowl
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />25 mins</Badge>
                          <Badge variant="outline"><Flame className="h-3 w-3 mr-1" />550 kcal</Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Ingredients:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>150g chicken breast</li>
                            <li>1 cup brown rice (cooked)</li>
                            <li>Mixed vegetables (broccoli, carrots, bell peppers)</li>
                            <li>2 tbsp olive oil</li>
                            <li>Lemon juice, garlic, herbs</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Instructions:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Marinate chicken with olive oil, lemon juice, garlic for 10 mins</li>
                            <li>Grill chicken until fully cooked (6-7 mins each side)</li>
                            <li>Steam or roast vegetables until tender</li>
                            <li>Serve chicken sliced over rice with vegetables</li>
                            <li>Drizzle with extra lemon juice and herbs</li>
                          </ol>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="recipe-3" data-testid="recipe-item-3">
                    <AccordionTrigger className="text-lg font-semibold" data-testid="recipe-trigger-3">
                      <div className="flex items-center gap-3">
                        <Timer className={`h-5 w-5 ${currentPlan.color}`} />
                        Protein-Packed Smoothie
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />5 mins</Badge>
                          <Badge variant="outline"><Flame className="h-3 w-3 mr-1" />320 kcal</Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Ingredients:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>1 scoop protein powder</li>
                            <li>1 banana</li>
                            <li>1 cup almond milk</li>
                            <li>1 tbsp peanut butter</li>
                            <li>Handful of spinach</li>
                            <li>Ice cubes</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Instructions:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Add all ingredients to blender</li>
                            <li>Blend on high until smooth and creamy</li>
                            <li>Add more milk if too thick</li>
                            <li>Pour into glass and enjoy immediately</li>
                          </ol>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shopping" className="space-y-6" data-testid="content-shopping">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className={`h-6 w-6 ${currentPlan.color}`} />
                  Weekly Grocery Shopping List
                </CardTitle>
                <CardDescription>
                  Complete shopping list for {selectedCategory} diet plan
                </CardDescription>
              </CardHeader>
              <CardContent data-testid="shopping-list-content">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Apple className={`h-5 w-5 ${currentPlan.color}`} />
                      <h3 className="font-semibold text-lg">Proteins</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        "Chicken breast (1kg)",
                        "Salmon fillets (500g)",
                        "Eggs (1 dozen)",
                        "Greek yogurt (500g)",
                        "Tofu (400g)",
                        "Protein powder"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                          <Check className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Utensils className={`h-5 w-5 ${currentPlan.color}`} />
                      <h3 className="font-semibold text-lg">Grains & Carbs</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        "Brown rice (1kg)",
                        "Whole grain bread",
                        "Oatmeal (500g)",
                        "Quinoa (500g)",
                        "Sweet potatoes (1kg)",
                        "Whole wheat pasta"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                          <Check className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className={`h-5 w-5 ${currentPlan.color}`} />
                      <h3 className="font-semibold text-lg">Vegetables</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        "Spinach (bunch)",
                        "Broccoli (2 heads)",
                        "Carrots (1kg)",
                        "Bell peppers (assorted)",
                        "Tomatoes (1kg)",
                        "Mixed salad greens"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                          <Check className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className={`h-5 w-5 ${currentPlan.color}`} />
                      <h3 className="font-semibold text-lg">Healthy Fats</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        "Avocados (4)",
                        "Almonds (250g)",
                        "Olive oil",
                        "Peanut butter",
                        "Walnuts (200g)",
                        "Chia seeds"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                          <Check className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mealprep" className="space-y-6" data-testid="content-mealprep">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className={`h-6 w-6 ${currentPlan.color}`} />
                  Weekly Meal Prep Guide
                </CardTitle>
                <CardDescription>
                  Plan and prepare meals in advance for {selectedCategory} diet success
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6" data-testid="mealprep-content">
                <div className={`p-4 rounded-lg ${currentPlan.bgColor} border ${currentPlan.borderColor}`}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Timer className={`h-5 w-5 ${currentPlan.color}`} />
                    Sunday Prep Session (2-3 hours)
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="bg-background/50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Proteins</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Grill 6 chicken breasts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Boil 12 eggs for quick snacks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Prepare portion sizes of tofu</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Carbs & Grains</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Cook large batch of brown rice</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Prepare overnight oats for 3 days</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Roast sweet potatoes</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Vegetables</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Wash and chop all vegetables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Steam broccoli and carrots</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Prepare salad containers</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Snacks & Extras</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Portion nuts into containers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Prep fruit boxes for week</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <span>Make protein smoothie packs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Utensils className={`h-5 w-5 ${currentPlan.color}`} />
                    Meal Prep Tips
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <h4 className="font-medium text-sm mb-1">Storage</h4>
                      <p className="text-xs text-muted-foreground">Use airtight containers and label with dates. Most prepped meals last 3-4 days refrigerated.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <h4 className="font-medium text-sm mb-1">Variety</h4>
                      <p className="text-xs text-muted-foreground">Rotate proteins and vegetables throughout the week to avoid flavor fatigue.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <h4 className="font-medium text-sm mb-1">Freezing</h4>
                      <p className="text-xs text-muted-foreground">Freeze extra portions for later. Soups, grains, and proteins freeze well.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <h4 className="font-medium text-sm mb-1">Time Saving</h4>
                      <p className="text-xs text-muted-foreground">Cook multiple items simultaneously using oven, stovetop, and slow cooker.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercise" className="space-y-6" data-testid="content-exercise">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className={`h-6 w-6 ${currentPlan.color}`} />
                  Personalized Exercise Program
                </CardTitle>
                <CardDescription>
                  Evidence-based workout routines for {selectedCategory} BMI category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6" data-testid="exercise-content">
                <div className={`p-4 rounded-lg ${currentPlan.bgColor} border ${currentPlan.borderColor}`}>
                  <h3 className="font-semibold mb-3 text-lg">Weekly Workout Split</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { day: "Monday", focus: "Upper Body Strength", duration: "45 mins" },
                      { day: "Tuesday", focus: "Cardio & Core", duration: "30 mins" },
                      { day: "Wednesday", focus: "Lower Body Strength", duration: "45 mins" },
                      { day: "Thursday", focus: "Active Recovery (Yoga/Walking)", duration: "30 mins" },
                      { day: "Friday", focus: "Full Body Circuit", duration: "40 mins" },
                      { day: "Weekend", focus: "Outdoor Activity or Rest", duration: "varies" }
                    ].map((workout, i) => (
                      <div key={i} className="bg-background/80 p-3 rounded-lg">
                        <h4 className="font-medium mb-1">{workout.day}</h4>
                        <p className="text-sm text-muted-foreground">{workout.focus}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {workout.duration}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Zap className={`h-5 w-5 ${currentPlan.color}`} />
                    Sample Workouts
                  </h3>
                  <Accordion type="single" collapsible className="w-full" data-testid="accordion-workouts">
                    <AccordionItem value="workout-1" data-testid="workout-item-1">
                      <AccordionTrigger className="text-base font-semibold" data-testid="workout-trigger-1">
                        <div className="flex items-center gap-3">
                          <Activity className={`h-5 w-5 ${currentPlan.color}`} />
                          Upper Body Strength Routine
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline"><Timer className="h-3 w-3 mr-1" />45 minutes</Badge>
                            <Badge variant="outline"><Flame className="h-3 w-3 mr-1" />350-450 calories</Badge>
                          </div>
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-muted/50">
                              <h4 className="font-medium mb-1">Warm-up (5 mins)</h4>
                              <p className="text-sm text-muted-foreground">Arm circles, shoulder rolls, light cardio</p>
                            </div>
                            {[
                              { exercise: "Push-ups", sets: "3 sets", reps: "10-15 reps", rest: "60s" },
                              { exercise: "Dumbbell Rows", sets: "3 sets", reps: "12 reps each arm", rest: "60s" },
                              { exercise: "Overhead Press", sets: "3 sets", reps: "10-12 reps", rest: "60s" },
                              { exercise: "Bicep Curls", sets: "3 sets", reps: "12-15 reps", rest: "45s" },
                              { exercise: "Tricep Dips", sets: "3 sets", reps: "10-12 reps", rest: "45s" },
                              { exercise: "Plank", sets: "3 sets", reps: "30-60 seconds", rest: "30s" }
                            ].map((ex, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div>
                                  <p className="font-medium">{ex.exercise}</p>
                                  <p className="text-xs text-muted-foreground">{ex.sets} × {ex.reps}</p>
                                </div>
                                <Badge variant="secondary" className="text-xs">Rest: {ex.rest}</Badge>
                              </div>
                            ))}
                            <div className="p-3 rounded-lg bg-muted/50">
                              <h4 className="font-medium mb-1">Cool-down (5 mins)</h4>
                              <p className="text-sm text-muted-foreground">Upper body stretches, deep breathing</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="workout-2" data-testid="workout-item-2">
                      <AccordionTrigger className="text-base font-semibold" data-testid="workout-trigger-2">
                        <div className="flex items-center gap-3">
                          <Activity className={`h-5 w-5 ${currentPlan.color}`} />
                          Cardio & Core Circuit
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline"><Timer className="h-3 w-3 mr-1" />30 minutes</Badge>
                            <Badge variant="outline"><Flame className="h-3 w-3 mr-1" />300-400 calories</Badge>
                          </div>
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-muted/50">
                              <h4 className="font-medium mb-1">Format: HIIT (High-Intensity Interval Training)</h4>
                              <p className="text-sm text-muted-foreground">30 seconds work, 30 seconds rest, repeat 3 rounds</p>
                            </div>
                            {[
                              { exercise: "Jumping Jacks", benefit: "Full body warm-up" },
                              { exercise: "Mountain Climbers", benefit: "Core & cardio" },
                              { exercise: "Burpees", benefit: "Full body power" },
                              { exercise: "High Knees", benefit: "Cardio endurance" },
                              { exercise: "Bicycle Crunches", benefit: "Obliques & core" },
                              { exercise: "Plank Jacks", benefit: "Core stability" },
                              { exercise: "Jump Squats", benefit: "Lower body power" },
                              { exercise: "Russian Twists", benefit: "Core rotation" }
                            ].map((ex, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div>
                                  <p className="font-medium">{ex.exercise}</p>
                                  <p className="text-xs text-muted-foreground">{ex.benefit}</p>
                                </div>
                                <Badge variant="secondary" className="text-xs">30s on/off</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="workout-3" data-testid="workout-item-3">
                      <AccordionTrigger className="text-base font-semibold" data-testid="workout-trigger-3">
                        <div className="flex items-center gap-3">
                          <Activity className={`h-5 w-5 ${currentPlan.color}`} />
                          Lower Body Power Workout
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline"><Timer className="h-3 w-3 mr-1" />45 minutes</Badge>
                            <Badge variant="outline"><Flame className="h-3 w-3 mr-1" />400-500 calories</Badge>
                          </div>
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-muted/50">
                              <h4 className="font-medium mb-1">Warm-up (5 mins)</h4>
                              <p className="text-sm text-muted-foreground">Leg swings, bodyweight squats, lunges</p>
                            </div>
                            {[
                              { exercise: "Squats", sets: "4 sets", reps: "12-15 reps", rest: "90s" },
                              { exercise: "Lunges", sets: "3 sets", reps: "10 each leg", rest: "60s" },
                              { exercise: "Romanian Deadlifts", sets: "3 sets", reps: "12 reps", rest: "90s" },
                              { exercise: "Glute Bridges", sets: "3 sets", reps: "15-20 reps", rest: "60s" },
                              { exercise: "Calf Raises", sets: "3 sets", reps: "15-20 reps", rest: "45s" },
                              { exercise: "Wall Sit", sets: "3 sets", reps: "45-60 seconds", rest: "60s" }
                            ].map((ex, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div>
                                  <p className="font-medium">{ex.exercise}</p>
                                  <p className="text-xs text-muted-foreground">{ex.sets} × {ex.reps}</p>
                                </div>
                                <Badge variant="secondary" className="text-xs">Rest: {ex.rest}</Badge>
                              </div>
                            ))}
                            <div className="p-3 rounded-lg bg-muted/50">
                              <h4 className="font-medium mb-1">Cool-down (5 mins)</h4>
                              <p className="text-sm text-muted-foreground">Quad stretches, hamstring stretches, hip flexor stretches</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className={`p-4 rounded-lg border ${currentPlan.borderColor} ${currentPlan.bgColor}`}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Heart className={`h-5 w-5 ${currentPlan.color}`} />
                      Progressive Overload
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Gradually increase weights, reps, or intensity every 1-2 weeks to continue seeing results and building strength.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg border ${currentPlan.borderColor} ${currentPlan.bgColor}`}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className={`h-5 w-5 ${currentPlan.color}`} />
                      Rest & Recovery
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Allow 48 hours between training the same muscle group. Quality sleep and proper nutrition are essential for muscle recovery.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg border ${currentPlan.borderColor} ${currentPlan.bgColor}`}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Droplets className={`h-5 w-5 ${currentPlan.color}`} />
                      Hydration
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Drink water before, during, and after workouts. Aim for 500ml extra for every 30 minutes of intense exercise.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg border ${currentPlan.borderColor} ${currentPlan.bgColor}`}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className={`h-5 w-5 ${currentPlan.color}`} />
                      Form Over Weight
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Always prioritize proper form over lifting heavier weights. Poor form increases injury risk and reduces effectiveness.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
