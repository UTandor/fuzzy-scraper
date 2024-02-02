import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Selector = () => {
  const [site, setSite] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/scrape/", {
        url: site,
      });
      setHtml(response.data.html);
      localStorage.setItem("site", response.data.html);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid place-items-center">
      <form
        className="flex flex-row w-full items-center justify-center space-x-5 p-8"
        onSubmit={handleSubmit}
      >
        <Input
          className="w-1/4"
          type="text"
          placeholder="Enter site name..."
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <Button disabled={loading}>Send</Button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="w-[75vw] h-[75vh] overflow-auto border p-3 ">
        <iframe
          title="Scraped Content"
          srcDoc={`<!DOCTYPE html><html><head><style>*{box-sizing: border-box; margin: 0; padding: 0;}</style></head><body>${html}</body></html>`}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
      <div className="items-center">
        {loading !== undefined && loading !== true ? (
          <div>
            Is this the correct site? Click{" "}
            <Link to="/editor">
              <span className="text-blue-800 underline cursor-pointer hover:no-underline hover:text-blue-500 underline-offset-2">
                here
              </span>{" "}
            </Link>
            to open it in our Selector
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Selector;
