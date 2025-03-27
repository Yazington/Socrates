import { create } from "zustand";

interface PromptOptionsState {
  doubt: boolean;
  toggleDoubt: () => void;
  mode: "document" | "implement";
  setMode: (newMode: "document" | "implement") => void;
  useProjectMemory: boolean;
  toggleProjectMemory: () => void;
  triggerEnter: () => void;
}

const usePromptOptionsStore = create<PromptOptionsState>((set) => ({
  // Option 1: Think and Question like Socrates (doubt)
  doubt: false,
  toggleDoubt: () => set((state) => ({ doubt: !state.doubt })),

  // Option 2: Document or Implement
  mode: "document",
  setMode: (newMode) => set({ mode: newMode }),

  // Option 3: Use project memory or not
  useProjectMemory: false,
  toggleProjectMemory: () =>
    set((state) => ({ useProjectMemory: !state.useProjectMemory })),

  // Option 4: Enter button (trigger action)
  triggerEnter: () => {
    console.log("Enter button triggered");
    // Add custom logic here
  },
}));

export default usePromptOptionsStore;
