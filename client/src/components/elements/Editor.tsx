import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

const Editor = () => {
  const [site, setSite] = useState<string | null>(localStorage.getItem("site"));
  const [innerText, setInnerText] = useState("");
  const [renderInnerText, setRenderInnerText] = useState<string[] | null>([]);
  const [loading, setLoading] = useState(true);
  const siteName = localStorage.getItem("siteName");

  useEffect(() => {
    const fetchData = async () => {
      if (siteName) {
        setLoading(true);
        try {
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
      }
    };

    fetchData();
  }, [siteName]);

  const getInnerText = async () => {
    setLoading(true);
    const words = innerText.match(/\b\w+\b/g);

    const groupedWords = {};

    words.forEach((word) => {
      const lowercaseWord = word.toLowerCase();
      if (groupedWords[lowercaseWord]) {
        groupedWords[lowercaseWord].push(`"${word}"`);
      } else {
        groupedWords[lowercaseWord] = [`"${word}"`];
      }
    });

    const resultArray = Object.values(groupedWords).flat();

    return resultArray;
  };

  useEffect(() => {
    const fetchData = async () => {
      const arr = await getInnerText();
      setRenderInnerText(arr);
    };

    fetchData();
  }, [innerText]); 

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal" className="border-2">
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
              {renderInnerText &&
                renderInnerText.map((string, id) => <p key={id}>{string}</p>)}
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
