import { useEffect, useState } from "react";
import axios from "axios";
const Webview = () => {
  const [site, setSite] = useState<string | null>(localStorage.getItem("site"));
  const siteName = localStorage.getItem("siteName");

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
    <div className="w-full h-full overflow-auto flex flex-col ">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b  px-6 ">
        <h1 className="font-semibold text-lg md:text-2xl ">Webview</h1>
      </header>
      <iframe
        title="Scraped Content"
        srcDoc={`<!DOCTYPE html><html><head><style>*{box-sizing: border-box; margin: 0; padding: 0;}</style></head><body>${site}</body></html>`}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
};

export default Webview;
