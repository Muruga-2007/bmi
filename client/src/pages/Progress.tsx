import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
  Calendar,
  Weight,
  Activity,
  Target,
  Award,
  LineChart as LineChartIcon,
  Plus,
  Trash2
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

type ProgressEntry = {
  id: string;
  date: string;
  weight: number;
  bmi: number;
  notes?: string;
};

export default function Progress() {
  const [entries, setEntries] = useState<ProgressEntry[]>([
    { id: "1", date: "2025-01-05", weight: 75, bmi: 24.2, notes: "Started fitness journey" },
    { id: "2", date: "2025-01-12", weight: 74, bmi: 23.9, notes: "First week completed" },
    { id: "3", date: "2025-01-19", weight: 73.5, bmi: 23.7, notes: "Feeling great!" }
  ]);

  const [newWeight, setNewWeight] = useState("");
  const [height] = useState(175); // Default height in cm

  const addEntry = () => {
    if (!newWeight || parseFloat(newWeight) <= 0) return;

    const weight = parseFloat(newWeight);
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    const newEntry: ProgressEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      weight,
      bmi: parseFloat(bmi.toFixed(1)),
      notes: ""
    };

    setEntries([...entries, newEntry]);
    setNewWeight("");
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const calculateProgress = () => {
    if (entries.length < 2) return null;
    const first = entries[0];
    const latest = entries[entries.length - 1];
    const weightChange = latest.weight - first.weight;
    const bmiChange = latest.bmi - first.bmi;
    return { weightChange, bmiChange };
  };

  const progress = calculateProgress();

  const chartData = entries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: entry.weight,
    bmi: entry.bmi
  }));

  const currentBMI = entries.length > 0 ? entries[entries.length - 1].bmi : 0;
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", bgColor: "bg-blue-500/10" };
    if (bmi < 25) return { category: "Normal", color: "text-green-500", bgColor: "bg-green-500/10" };
    if (bmi < 30) return { category: "Overweight", color: "text-orange-500", bgColor: "bg-orange-500/10" };
    return { category: "Obese", color: "text-red-500", bgColor: "bg-red-500/10" };
  };

  const bmiStatus = getBMICategory(currentBMI);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          Progress Tracker
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Monitor your health journey with comprehensive tracking and visual analytics
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover-elevate">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current BMI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-3xl font-bold ${bmiStatus.color}`}>{currentBMI.toFixed(1)}</p>
                  <Badge className={`${bmiStatus.bgColor} mt-2`}>{bmiStatus.category}</Badge>
                </div>
                <Activity className={`h-12 w-12 ${bmiStatus.color} opacity-20`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover-elevate">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Weight Change</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">
                    {progress ? `${progress.weightChange > 0 ? '+' : ''}${progress.weightChange.toFixed(1)}` : '0.0'} kg
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {progress && progress.weightChange < 0 ? (
                      <>
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">Losing weight</span>
                      </>
                    ) : progress && progress.weightChange > 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-orange-500">Gaining weight</span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">No change</span>
                    )}
                  </div>
                </div>
                <Weight className="h-12 w-12 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover-elevate">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{entries.length}</p>
                  <p className="text-sm text-muted-foreground mt-2">Data points tracked</p>
                </div>
                <Calendar className="h-12 w-12 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="charts" className="space-y-6" data-testid="tabs-progress">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto">
          <TabsTrigger value="charts" className="flex items-center gap-2" data-testid="tab-charts">
            <LineChartIcon className="h-4 w-4" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2" data-testid="tab-history">
            <Calendar className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-6 w-6 text-primary" />
                Weight Progress
              </CardTitle>
              <CardDescription>Track your weight changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1}
                      fill="url(#colorWeight)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-chart-2" />
                BMI Trend
              </CardTitle>
              <CardDescription>Monitor your BMI progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bmi" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--chart-2))', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-6 w-6 text-primary" />
                Add New Entry
              </CardTitle>
              <CardDescription>Log your current weight to track progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="Enter weight"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addEntry()}
                    data-testid="input-weight"
                  />
                </div>
                <Button onClick={addEntry} className="gap-2" data-testid="button-add-entry">
                  <Plus className="h-4 w-4" />
                  Add Entry
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Progress History
              </CardTitle>
              <CardDescription>Your complete weight tracking history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {entries.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No entries yet. Add your first weight entry above!</p>
                ) : (
                  entries.slice().reverse().map((entry, index) => {
                    const entryBMI = getBMICategory(entry.bmi);
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover-elevate"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${entryBMI.bgColor}`}>
                            <Weight className={`h-5 w-5 ${entryBMI.color}`} />
                          </div>
                          <div>
                            <p className="font-medium">{entry.weight} kg</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className={`font-semibold ${entryBMI.color}`}>BMI: {entry.bmi}</p>
                            <Badge variant="outline" className="text-xs">{entryBMI.category}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteEntry(entry.id)}
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-delete-entry-${entry.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 via-chart-2/10 to-background border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Achievements & Goals
              </CardTitle>
              <CardDescription>Stay motivated with progress milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Consistency Streak</h4>
                  </div>
                  <p className="text-2xl font-bold text-primary">{entries.length} entries</p>
                  <p className="text-xs text-muted-foreground mt-1">Keep logging to build your streak!</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="h-5 w-5 text-chart-2" />
                    <h4 className="font-semibold">BMI Status</h4>
                  </div>
                  <p className={`text-2xl font-bold ${bmiStatus.color}`}>{bmiStatus.category}</p>
                  <p className="text-xs text-muted-foreground mt-1">Current health category</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
