import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Webview from "./Webview";
import Editor from "./Editor";

const Main = () => {

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <Webview />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel>
          <Editor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Main;
