import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Chat() {
  return (
    <div className="flex flex-col w-[100%] h-[100vh] justify-between bg-[var(--background)]">
      {/* messages */}
      <div className="flex-grow">{/* Chat messages can go here */}</div>

      <div className="w-[100%] p-4 sticky bottom-0 ">
        <Textarea className="resize-none p-2 max-h-[100px] overflow-y-auto" />
        <Button variant={"outline"}>Click me</Button>
      </div>
    </div>
  );
}

export default Chat;
