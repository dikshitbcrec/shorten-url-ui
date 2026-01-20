import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";
import { ShimmerLoading } from "./ShimmerLoading";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [countLoading, setCountLoading] = useState(true);
  const [showWakeMessage, setShowWakeMessage] = useState(false);

  const [error, setError] = useState("");

  const apiUrlRef = useRef(
    process.env.REACT_APP_API_URL || "http://localhost:8080/"
  );

  const retryRef = useRef(null);
  const thresholdRef = useRef(null);

  // ================= SHORTEN URL =================
  const shortenUrl = async () => {
    if (!url) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        apiUrlRef.current + "tiny-url",
        { url },
        { timeout: 8000 }
      );

      setShortUrl(res.data.shortUrl);
      setTotalCount(res.data.Count);
    } catch (err) {
      console.error(err);
      setError("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH COUNT (CONTINUOUS RETRY) =================
  useEffect(() => {
    // 20s threshold UI
    thresholdRef.current = setTimeout(() => {
      setShowWakeMessage(true);
    }, 20000);

    const fetchTotalCount = async () => {
      try {
        const res = await axios.get(apiUrlRef.current + "count", {
          timeout: 8000,
        });

        // ✅ SUCCESS
        setTotalCount(res.data);
        setCountLoading(false);
        setShowWakeMessage(false);

        clearTimeout(thresholdRef.current);
        clearTimeout(retryRef.current);
      } catch (err) {
        // 🔁 retry forever every 4s
        retryRef.current = setTimeout(fetchTotalCount, 4000);
      }
    };

    fetchTotalCount();

    return () => {
      clearTimeout(thresholdRef.current);
      clearTimeout(retryRef.current);
    };
  }, []);

  // ================= SHIMMER =================
  if (countLoading && !showWakeMessage) {
    return <ShimmerLoading />;
  }

  // ================= SERVER WAKE MESSAGE =================
  if (countLoading && showWakeMessage) {
    return (
      <div
        className="
          bg-gradient-to-r from-gray-900/80 to-gray-800/80
          backdrop-blur-3xl
          rounded-3xl shadow-2xl
          text-white
          w-full max-w-lg
          p-10 mx-4
          text-center
        "
      >
        <p className="text-xl font-semibold text-yellow-400">
          Render Server is waking up 🚀
        </p>
        <p className="text-sm text-gray-400 mt-3">
         This may take up to 50 seconds on the free tier.
Please stay on this page — it will load automatically once the server is ready.
        </p>
      </div>
    );
  }

  // ================= MAIN UI =================
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

      {error && (
        <p className="text-red-400 mt-2 text-center">
          {error}
        </p>
      )}

      {shortUrl && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-sm text-gray-300">Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 break-all font-medium"
          >
            {shortUrl}
          </a>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400 mb-1">
          Total URLs generated
        </p>
        <AnimatedNumber number={totalCount} />
      </div>
    </motion.div>
  );
}
