import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Webview from "./Webview";
import Editor from "./Editor";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [siteName, setSiteName] = useState(localStorage.getItem("siteName"));
  const [site, setSite] = useState<string | null>(localStorage.getItem("site"));
  const [modifiedSite, setModifiedSite] = useState<string | null>(site);
  const [findItem, setFindItem] = useState(""); // State to store findItem

  const changeSiteData = (siteData: string, enteredText: string) => {
    setSite(siteData);
    setFindItem(enteredText);
    updateModifiedSite(siteData, enteredText); 
  };

  const updateModifiedSite = (newSite: string, enteredText: string) => {
    if (newSite.includes(enteredText)) {
      const updatedSite = newSite.replace(
        new RegExp(`(${findItem})`, "g"),
        "s $1"
      );
      setModifiedSite(updatedSite);
    } else {
      setModifiedSite(newSite);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (siteName) {
        try {
          const response = await axios.post("http://localhost:3000/scrape/", {
            url: siteName,
          });
          setSite(response.data.html);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [siteName]);

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <Webview site={modifiedSite} /> {/* Pass modifiedSite to Webview */}
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel>
          <Editor site={site} changeSiteData={changeSiteData} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Main;
