import { motion } from "framer-motion";
import { ArrowRight, Activity, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Health_tech_hero_background_e18f3ce9.png";

export default function Hero() {
  const floatingIcons = [
    { Icon: Activity, delay: 0, x: -20, y: -30 },
    { Icon: TrendingUp, delay: 0.2, x: 20, y: -20 },
    { Icon: Zap, delay: 0.4, x: -30, y: 20 },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative mb-8">
            {floatingIcons.map(({ Icon, delay, x, y }, index) => (
              <motion.div
                key={index}
                className="absolute hidden lg:block"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 0.2,
                  scale: 1,
                  x: [0, x, 0],
                  y: [0, y, 0],
                }}
                transition={{
                  duration: 4,
                  delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  left: `${20 + index * 30}%`,
                  top: `${10 + index * 15}%`,
                }}
              >
                <Icon className="h-16 w-16 text-primary" />
              </motion.div>
            ))}

            <motion.h1
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                Know Your Body.
              </span>
              <br />
              <span className="text-foreground">Master Your Health.</span>
            </motion.h1>
          </div>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-testid="text-hero-description"
          >
            Experience the next generation of health insights. AI-powered BMI
            analysis with personalized recommendations for your wellness journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/calculator">
              <Button
                size="lg"
                className="font-heading text-lg px-8 py-6 rounded-full group"
                data-testid="button-calculate-bmi"
              >
                Calculate My BMI Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { label: "AI-Powered", value: "Insights" },
              { label: "Personalized", value: "Tips" },
              { label: "Real-time", value: "Analysis" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border hover-elevate"
                data-testid={`stat-${stat.label.toLowerCase()}`}
              >
                <div className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
