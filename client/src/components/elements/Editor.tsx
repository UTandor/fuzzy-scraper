import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Key } from "lucide-react";

const Editor = () => {
  const [site, setSite] = useState<string | null>(localStorage.getItem("site"));
  const [innerText, setInnerText] = useState("");
  const [loading, setLoading] = useState(true);
  const siteName = localStorage.getItem("siteName");

  useEffect(() => {
    const fetchData = async () => {
      console.log(siteName);
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:3000/scrape/", {
          url: siteName,
        });
        setSite(response.data.html);
        setInnerText(response.data.innerText);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [siteName]);

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal">
        {/* Panel for the site content */}
        <ResizablePanel>
          {site !== null ? (
            <div className="w-full h-full overflow-auto border p-3">
              <iframe
                title="Scraped Content"
                srcDoc={`<!DOCTYPE html><html><head><style>*{box-sizing: border-box; margin: 0; padding: 0;}</style></head><body>${site}</body></html>`}
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
          ) : (
            <div className="h-full items-center justify-center flex flex-col">
              <Loader size={64} className="" />
              <h1 className="font-semibold text-center text-lg text-muted-foreground">
                Please wait while we load your site's preview
              </h1>
            </div>
          )}
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel>
          {loading ? (
            <div className="h-full items-center justify-center flex flex-col">
              <Loader size={64} className="" />
              <h1 className="font-semibold text-center text-lg text-muted-foreground">
                Please wait while we load your site's content
              </h1>
            </div>
          ) : (
            <div className="w-full h-full overflow-auto border p-3">
              {innerText.split(" ").map((string, id) => (
                <p key={id}>{string}</p>
              ))}
            </div>
          )}
        </ResizablePanel>
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
