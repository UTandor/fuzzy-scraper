const Webview = ({ site }) => {
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
