import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Brain, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const technologies = [
    { name: "React", icon: Code },
    { name: "Express", icon: Code },
    { name: "OpenAI", icon: Brain },
    { name: "TypeScript", icon: Code },
  ];

  const achievements = [
    { value: "25+", label: "Years Experience", icon: Award },
    { value: "AI", label: "Powered Insights", icon: Brain },
    { value: "100%", label: "Dedicated to Health", icon: Heart },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          About BMI Insight
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Created by Fina - 25+ years inspired by health, AI, and precision
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-mission">
                  At BMI Insight, we believe that understanding your body is the first step
                  toward mastering your health. With over 25 years of experience in health
                  technology solutions, we've created a platform that goes beyond simple
                  calculations to provide intelligent, personalized health insights.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4">The Vision</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-vision">
                  We envision a world where everyone has access to professional-grade health
                  analytics. By combining artificial intelligence with proven medical science,
                  we're making personalized health guidance accessible to all. Our AI-powered
                  system analyzes your unique profile to deliver recommendations tailored
                  specifically for you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {achievements.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-chart-2/5 text-center hover-elevate"
                    data-testid={`stat-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                      {item.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-8">
            <h2 className="font-heading text-2xl font-semibold mb-6">Built With</h2>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-4 py-2 text-sm font-medium hover-elevate"
                  data-testid={`badge-tech-${tech.name.toLowerCase()}`}
                >
                  <tech.icon className="h-4 w-4 mr-2" />
                  {tech.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
