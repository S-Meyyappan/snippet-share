import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Disp() {
  const path = import.meta.env.VITE_API_URL;

  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [searchText, setSearchText] = useState("");

  // ✅ Get initial data via React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const res = await axios.get(`${path}/submissions`);
      return res.data;
    },
  });

  // ✅ Initialize submissions once data is fetched
  useEffect(() => {
    if (data) {
      setSubmissions(data);
      setFilteredSubmissions(data); // show full list initially
    }
  }, [data]);


  const handleSearch = () => {
    const filtered = submissions.filter((s) =>
      s.title.toLowerCase().includes(searchText))
    setFilteredSubmissions(filtered);
  };

  const handleFilter = (e) => {
    const selected = e.target.value;
    if (!selected) {
      setFilteredSubmissions(submissions); // reset
    } else {
      const filtered = submissions.filter((s) =>
        s.tags.includes(selected)
      );
      setFilteredSubmissions(filtered);
    }
  };

  // ✅ Unique tags (from initial data)
  const uniqueTags = Array.from(new Set(submissions.flatMap((s) => s.tags)));

  const getFileIcon = (mime) => {
    if (mime.startsWith("image/")) return "🖼️";
    if (mime === "application/pdf") return "📄";
    if (mime.includes("word")) return "📂";
    if (mime.includes("excel")) return "📊";
    return "📎";
  };

  // ✅ Loading & error states
  if (isLoading)
    return <p className="text-center text-blue-300">Loading...</p>;
  if (error)
    return <p className="text-center text-red-400">Unable to load data</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-10">
      <div className="max-w-7xl mx-auto p-2">
        {/* Header */}
        <h3 className="text-3xl font-bold text-white mb-6 text-center">
          Submissions
        </h3>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              name="search"
              type="text"
              placeholder="Search with tags..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-md bg-[#1f2937] px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-600 pr-10"
            />
            <MagnifyingGlassIcon
              onClick={handleSearch}
              className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-sky-500"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center">
            <span className="text-white mr-2">Filter:</span>
            <select
              name="filter"
              onChange={handleFilter}
              className="rounded-md bg-[#1f2937] text-white px-2 py-2"
            >
              <option value="">-- All tags --</option>
              {uniqueTags.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredSubmissions.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">No submissions found</p>
          ) : (
            filteredSubmissions.map((item) => (
              <div
                key={item._id}
                className="relative rounded-xl border border-white/10 bg-white/10 dark:bg-black/40 backdrop-blur-md shadow-xl p-6 hover:shadow-2xl transition"
              >
                {/* Title */}
                <h4 className="text-xl font-semibold text-sky-400 mb-3">
                  {item.title}
                </h4>

                {/* Code Snippet */}
                <div className="rounded-lg overflow-hidden border border-slate-700">
                  <SyntaxHighlighter
                    language={item.language}
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      padding: "15px",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      maxHeight: "400px",
                      overflow: "auto",
                    }}
                  >
                    {item.description}
                  </SyntaxHighlighter>
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-sky-900/40 text-sky-300 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Files */}
                <div className="mt-4 space-y-2">
                  {item.files.map((f, index) => {
                    const base64url = `data:${f.mime};base64,${f.data}`;
                    return (
                      <a
                        key={index}
                        href={base64url}
                        download={f.name}
                        className="flex items-center text-sm text-gray-300 hover:text-sky-400 transition"
                      >
                        {getFileIcon(f.mime)}{" "}
                        <span className="ml-2">{f.name}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Author */}
                <p className="mt-4 text-xs text-gray-400 italic">
                  Submitted by <span className="font-medium text-sky-300">{item.user?.username}</span>
                </p>

                {/* Share Button */}
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/snippet/${item._id}`;
                    navigator.clipboard.writeText(shareUrl);
                    alert("Share link copied to clipboard!");
                  }}
                  className="absolute top-5 right-5 flex items-center gap-2 bg-sky-600 text-white px-3 py-1 rounded-full text-sm hover:bg-sky-500 transition"
                >
                  Share ➦
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Disp;
