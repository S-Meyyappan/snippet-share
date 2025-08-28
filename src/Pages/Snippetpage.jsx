
import { useParams } from "react-router-dom";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useQuery } from "@tanstack/react-query";

function SnippetPage() {
  const { id } = useParams();
  const path = import.meta.env.VITE_API_URL;

  const {data,isLoading,error}=useQuery({
    queryKey:["snippet",id],
    queryFn:async ()=>{
      const res=await axios.get(`${path}/snippet/${id}`)
      return res.data
    }
  })

  if (isLoading) return <p className="text-center text-blue-300">Loading...</p>;
  if (error) {
  console.error("Error:", error);
  return (
    <p className="text-center text-red-400">
      Unable to load snippet – {error.response?.data?.message || error.message}
    </p>
  );
}
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-10 flex justify-center">
      <div className="max-w-3xl w-full">
        <div className="rounded-xl border border-white/10 bg-white/10 dark:bg-black/40 backdrop-blur-md shadow-xl p-6">
          <h4 className="text-2xl font-semibold text-sky-400 mb-3">{data.title}</h4>

          <div className="rounded-lg overflow-hidden border border-slate-700">
            <SyntaxHighlighter
              language={data.language}
              style={oneDark}
              customStyle={{ 
                margin: 0, padding: "15px" ,
                whiteSpace: "pre-wrap", // wrap long lines
                wordBreak: "break-word", // break words if needed
                maxHeight: "400px",      // limit height
                overflow: "auto",        // scrollbars if too big
              }}
            >
              {data.description}
            </SyntaxHighlighter>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {data.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-sky-900/40 text-sky-300 px-3 py-1 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            {data.files.map((f, index) => {
              const base64url = `data:${f.mime};base64,${f.data}`;
              return (
                <a
                  key={index}
                  href={base64url}
                  download={f.name}
                  className="flex items-center text-sm text-gray-300 hover:text-sky-400 transition"
                >
                  📎 {f.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnippetPage;
