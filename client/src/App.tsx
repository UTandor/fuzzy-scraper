import axios from "axios";
import { FormEvent, useState } from "react";

function App() {
  const [site, setSite] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/scrape/", {
        url: site,
      });
      setHtml(response.data.html);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter site..."
          onChange={(e) => setSite(e.target.value)}
        />
        {loading ? (
          <button disabled>Send</button>
        ) : (
          <button type="submit">Send</button>
        )}
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          width: "500px",
          height: "300px",
          overflow: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <iframe
          title="Scraped Content"
          srcDoc={`<!DOCTYPE html><html><head><style>*{box-sizing: border-box; margin: 0; padding: 0;}</style></head><body>${html}</body></html>`}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}

export default App;
