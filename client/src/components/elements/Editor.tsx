import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Editor = () => {
  const [site, setSite] = useState<string | null>(localStorage.getItem("site"));
  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          {site !== null ? (
            <div className="w-full h-full overflow-auto border p-3 ">
              <iframe
                title="Scraped Content"
                srcDoc={`<!DOCTYPE html><html><head><style>*{box-sizing: border-box; margin: 0; padding: 0;}</style></head><body>${site}</body></html>`}
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
          ) : (
            <div className="h-full items-center justify-center flex flex-col ">
              <Loader size={64} className={""} />
              <h1 className="font-semibold text-lg text-muted-foreground">
                Please wait while we load your site's preview
              </h1>
            </div>
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;

const Loader = ({ size = 24, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
