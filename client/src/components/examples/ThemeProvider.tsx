import { ThemeProvider } from "../ThemeProvider";

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background text-foreground min-h-screen">
        <h1 className="text-2xl font-bold">Theme Provider Example</h1>
        <p className="mt-4">This component wraps the app and provides theme context.</p>
      </div>
    </ThemeProvider>
  );
}
