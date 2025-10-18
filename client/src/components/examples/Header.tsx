import Header from "../Header";
import { ThemeProvider } from "../ThemeProvider";
import { Router } from "wouter";

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="p-8">
            <p className="text-muted-foreground">Header component with navigation and theme toggle</p>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}
