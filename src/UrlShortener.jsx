import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080/";

  const shortenUrl = async () => {
    if (!url) return;
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(apiUrl+"tiny-url", { url });
      setShortUrl(res.data.shortUrl);
      setTotalCount(res.data.Count);
    } catch (err) {
      console.error(err);
      setError("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  // This code runs after the component mounts
  const fetchTotalCount = async () => {
    try {
      const res = await axios.get(apiUrl+"count");
       setTotalCount(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchTotalCount();
},[]);
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="
        bg-gradient-to-r from-gray-900/80 to-gray-800/80 
        backdrop-blur-3xl 
        rounded-3xl shadow-2xl text-white 
        w-full max-w-lg 
        p-10
        mx-4
        flex flex-col gap-4
      "
    >
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-indigo-400">
        Shorten Your URL
      </h1>

      <input
        className="
          w-full p-4 rounded-xl bg-black/30 
          outline-none text-white placeholder-gray-400 
          focus:ring-2 focus:ring-indigo-500 transition
        "
        placeholder="Paste your long URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={shortenUrl}
        disabled={loading}
        className="
          w-full bg-indigo-500 hover:bg-indigo-600 p-4 rounded-xl 
          font-semibold text-lg transition disabled:opacity-50
        "
      >
        {loading ? "Shortening..." : "Shorten 🚀"}
      </button>

      {error && <p className="text-red-400 mt-2 text-center">{error}</p>}

      {shortUrl && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-sm text-gray-300">Short URL:</p>
          <div className="flex items-center gap-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 break-all font-medium"
            >
              {shortUrl}
            </a>
            <button
              onClick={() => window.open(shortUrl, "_blank")}
              className="text-sm bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded transition"
            >
              Open
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400 mb-1">Total URLs generated</p>
        <AnimatedNumber number={totalCount} />
      </div>
    </motion.div>
  );
}
