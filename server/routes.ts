import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertBmiRecordSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration endpoint
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // Get user by email
  app.get("/api/users/by-email/:email", async (req, res) => {
    try {
      const user = await storage.getUserByEmail(req.params.email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Calculate BMI and save record
  app.post("/api/bmi/calculate", async (req, res) => {
    try {
      const recordData = insertBmiRecordSchema.parse(req.body);
      const bmiRecord = await storage.createBmiRecord(recordData);
      
      // Get diet recommendations based on BMI category
      const dietPlan = getDietRecommendations(recordData.category, recordData.activityLevel);
      
      res.json({
        bmiRecord,
        dietPlan,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to calculate BMI" });
    }
  });

  // Get user's BMI history
  app.get("/api/bmi/history/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const history = await storage.getUserBmiHistory(userId);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch BMI history" });
    }
  });

  // Get latest BMI record for user
  app.get("/api/bmi/latest/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const record = await storage.getLatestBmiRecord(userId);
      
      if (!record) {
        return res.status(404).json({ error: "No BMI records found" });
      }
      
      const dietPlan = getDietRecommendations(record.category, record.activityLevel);
      
      res.json({
        bmiRecord: record,
        dietPlan,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest BMI" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to generate diet recommendations based on BMI category
function getDietRecommendations(category: string, activityLevel: string) {
  const basePlans = {
    underweight: {
      title: "Weight Gain Diet Plan",
      description: "Focus on nutrient-dense, calorie-rich foods to gain healthy weight",
      dailyCalories: "2500-3000 calories",
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM - 8:00 AM",
          items: [
            "3 whole eggs (scrambled/omelette)",
            "2 slices whole grain toast with peanut butter",
            "1 banana",
            "1 glass whole milk",
          ],
        },
        {
          name: "Mid-Morning Snack",
          time: "10:00 AM",
          items: [
            "Mixed nuts (almonds, cashews, walnuts) - 1/4 cup",
            "Dried fruits",
            "Protein smoothie",
          ],
        },
        {
          name: "Lunch",
          time: "12:30 PM - 1:30 PM",
          items: [
            "Brown rice or whole wheat roti - 2 cups",
            "Grilled chicken/fish/paneer - 200g",
            "Mixed vegetable curry",
            "1 cup yogurt",
          ],
        },
        {
          name: "Evening Snack",
          time: "4:00 PM - 5:00 PM",
          items: [
            "Cheese sandwich",
            "Fresh fruit juice",
            "Handful of trail mix",
          ],
        },
        {
          name: "Dinner",
          time: "7:30 PM - 8:30 PM",
          items: [
            "Quinoa or brown rice - 1.5 cups",
            "Lean protein (fish/chicken/tofu) - 200g",
            "Roasted vegetables",
            "Avocado salad",
          ],
        },
        {
          name: "Before Bed",
          time: "10:00 PM",
          items: [
            "Casein protein shake or warm milk",
            "A small bowl of oats with honey",
          ],
        },
      ],
      tips: [
        "Eat every 2-3 hours to increase calorie intake",
        "Include healthy fats like nuts, seeds, and avocados",
        "Add protein powder to smoothies and shakes",
        "Focus on strength training to build muscle mass",
        "Avoid skipping meals",
      ],
    },
    normal: {
      title: "Balanced Maintenance Diet",
      description: "Maintain your healthy weight with balanced nutrition",
      dailyCalories: "2000-2200 calories",
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM - 8:00 AM",
          items: [
            "Oatmeal with berries and honey",
            "2 boiled eggs",
            "1 glass low-fat milk or green tea",
          ],
        },
        {
          name: "Mid-Morning Snack",
          time: "10:30 AM",
          items: [
            "Apple or orange",
            "Small handful of almonds",
          ],
        },
        {
          name: "Lunch",
          time: "1:00 PM - 2:00 PM",
          items: [
            "Brown rice or whole wheat roti - 1.5 cups",
            "Grilled chicken/fish/lentils - 150g",
            "Mixed vegetable salad",
            "Buttermilk or yogurt",
          ],
        },
        {
          name: "Evening Snack",
          time: "5:00 PM",
          items: [
            "Whole grain crackers with hummus",
            "Green tea",
            "Carrot/cucumber sticks",
          ],
        },
        {
          name: "Dinner",
          time: "7:00 PM - 8:00 PM",
          items: [
            "Grilled vegetables",
            "Lean protein (fish/chicken/tofu) - 150g",
            "Quinoa or brown rice - 1 cup",
            "Green salad",
          ],
        },
      ],
      tips: [
        "Maintain regular meal times",
        "Stay hydrated with 8-10 glasses of water daily",
        "Include variety of colorful vegetables",
        "Exercise 150 minutes per week",
        "Get 7-9 hours of quality sleep",
      ],
    },
    overweight: {
      title: "Weight Loss Diet Plan",
      description: "Create a sustainable calorie deficit for healthy weight loss",
      dailyCalories: "1500-1800 calories",
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM - 8:00 AM",
          items: [
            "Vegetable omelette (2 eggs)",
            "1 slice whole grain toast",
            "Green tea or black coffee",
          ],
        },
        {
          name: "Mid-Morning Snack",
          time: "10:30 AM",
          items: [
            "Greek yogurt with berries",
            "Herbal tea",
          ],
        },
        {
          name: "Lunch",
          time: "1:00 PM - 2:00 PM",
          items: [
            "Large mixed salad with olive oil dressing",
            "Grilled chicken/fish - 120g",
            "1/2 cup brown rice or quinoa",
          ],
        },
        {
          name: "Evening Snack",
          time: "4:30 PM",
          items: [
            "Cucumber and celery sticks",
            "Small apple",
            "Green tea",
          ],
        },
        {
          name: "Dinner",
          time: "7:00 PM",
          items: [
            "Vegetable soup",
            "Grilled fish or tofu - 120g",
            "Steamed vegetables",
            "Small portion of brown rice (optional)",
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
      dailyCalories: "1200-1500 calories (consult healthcare provider)",
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM - 8:00 AM",
          items: [
            "Egg white omelette with spinach",
            "1/2 cup oatmeal",
            "Green tea",
          ],
        },
        {
          name: "Mid-Morning Snack",
          time: "10:00 AM",
          items: [
            "Small portion of berries",
            "Herbal tea",
          ],
        },
        {
          name: "Lunch",
          time: "12:30 PM - 1:30 PM",
          items: [
            "Large vegetable salad",
            "Grilled chicken breast - 100g",
            "1/3 cup brown rice",
          ],
        },
        {
          name: "Afternoon Snack",
          time: "3:30 PM",
          items: [
            "Cucumber slices",
            "Green tea",
          ],
        },
        {
          name: "Dinner",
          time: "6:30 PM",
          items: [
            "Clear vegetable soup",
            "Steamed fish or tofu - 100g",
            "Steamed broccoli and carrots",
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

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.0,
    light: 1.1,
    moderate: 1.2,
    active: 1.3,
    "very-active": 1.4,
  };

  const plan = basePlans[category as keyof typeof basePlans] || basePlans.normal;
  const multiplier = activityMultipliers[activityLevel] || 1.0;

  // Adjust calories based on activity level
  const calorieRange = plan.dailyCalories.match(/\d+/g);
  if (calorieRange && calorieRange.length >= 2) {
    const min = Math.round(parseInt(calorieRange[0]) * multiplier);
    const max = Math.round(parseInt(calorieRange[1]) * multiplier);
    plan.dailyCalories = `${min}-${max} calories (adjusted for ${activityLevel} activity)`;
  }

  return plan;
}
