import { ThemeProvider } from "@/components/theme-provider";
import Chat from "@/components/ui/chat";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Chat />
    </ThemeProvider>
  );
}

export default App;
