import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import "@/styling/chat.css";
import { Toggle } from "@/components/ui/toggle";
import usePromptOptionsStore from "@/stores/promptOptionsStore";

function Chat() {
  const {
    doubt,
    toggleDoubt,
    mode,
    setMode,
    useProjectMemory,
    toggleProjectMemory,
    triggerEnter,
  } = usePromptOptionsStore();

  return (
    <div className="flex flex-col w-[100%] h-[100vh] justify-between bg-[var(--background)]">
      <div className="flex-grow"></div>
      <div className="w-[100%] p-4 sticky bottom-0">
        <div className="relative">
          <Textarea
            className="resize-none overflow-y-auto text-[0.8rem] textarea-custom-scroll"
            placeholder="What do you need?"
          >
            <div className="flex flex-wrap gap-2 p-2 border-t border-input">
              <Toggle
                pressed={doubt}
                onPressedChange={toggleDoubt}
                size="sm"
                variant="outline"
                aria-label="Toggle doubt"
              >
                Socrates (Doubt)
              </Toggle>
              <Toggle
                pressed={mode === "document"}
                onPressedChange={() => setMode("document")}
                size="sm"
                variant="outline"
                aria-label="Toggle document mode"
              >
                Document
              </Toggle>
              <Toggle
                pressed={mode === "implement"}
                onPressedChange={() => setMode("implement")}
                size="sm"
                variant="outline"
                aria-label="Toggle implement mode"
              >
                Implement
              </Toggle>

              <Toggle
                pressed={useProjectMemory}
                onPressedChange={toggleProjectMemory}
                size="sm"
                variant="outline"
                aria-label="Toggle project memory"
              >
                Project Memory
              </Toggle>

              <Button
                onClick={triggerEnter}
                size="sm"
                variant="default"
                className="ml-auto"
              >
                Enter
              </Button>
            </div>
          </Textarea>
        </div>
      </div>
    </div>
  );
}

export default Chat;
