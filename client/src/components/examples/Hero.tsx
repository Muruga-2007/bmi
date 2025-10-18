import Hero from "../Hero";
import { Router } from "wouter";

export default function HeroExample() {
  return (
    <Router>
      <div className="bg-background">
        <Hero />
      </div>
    </Router>
  );
}
