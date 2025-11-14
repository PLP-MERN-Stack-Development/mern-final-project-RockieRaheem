import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

export default function AnswerDetail() {
  const { answerId } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnswer() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.answers.getById(answerId);
        const a = res.data?.data || res.data;
        setAnswer(a);
      } catch {
        setError("Failed to load answer");
        setAnswer(null);
      } finally {
        setLoading(false);
      }
    }
    fetchAnswer();
  }, [answerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }
  if (!answer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Answer not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-2xl mx-auto p-6 lg:p-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-light-secondary dark:text-text-dark-secondary hover:text-primary mb-6"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back</span>
        </button>
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
          <div className="flex items-start gap-4">
            <img
              src={
                answer.author?.avatar ||
                `https://ui-avatars.com/api/?name=${
                  answer.author?.name || "User"
                }`
              }
              alt={answer.author?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                  {answer.author?.name || "Anonymous"}
                </p>
                {answer.isVerified && (
                  <span className="material-symbols-outlined text-green-500 filled text-sm">
                    verified
                  </span>
                )}
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  · {new Date(answer.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                {answer.body || answer.content || "No answer provided."}
              </p>
              {/* Attachments if any */}
              {answer.attachments && answer.attachments.length > 0 && (
                <div className="mt-4 space-y-4">
                  {answer.attachments.map((file, idx) => {
                    // Try to get extension from filename, originalname, or url
                    const getExt = (f) => {
                      const sources = [f.filename, f.originalname, f.url];
                      for (const src of sources) {
                        if (src && src.includes(".")) {
                          return src.split(".").pop().toLowerCase();
                        }
                      }
                      return "";
                    };
                    const ext = getExt(file);
                    // Use backend base URL for /uploads paths
                    const backendBaseUrl = "http://localhost:5001";
                    let url = file.url || "";
                    if (url.startsWith("/uploads")) {
                      url = `${backendBaseUrl}${url}`;
                    }
                    const filename =
                      file.filename ||
                      file.originalname ||
                      url.split("/").pop() ||
                      "Attachment";
                    if (["mp4", "webm", "ogg"].includes(ext)) {
                      return (
                        <div key={idx}>
                          <video
                            controls
                            width="100%"
                            style={{ maxHeight: 400 }}
                          >
                            <source src={url} type={`video/${ext}`} />
                            Your browser does not support the video tag.
                          </video>
                          <div className="text-xs mt-1">{filename}</div>
                        </div>
                      );
                    } else if (["pdf"].includes(ext)) {
                      return (
                        <div key={idx}>
                          <iframe
                            src={url}
                            width="100%"
                            height="400"
                            title={filename}
                          />
                          <div className="text-xs mt-1">{filename}</div>
                        </div>
                      );
                    } else if (["doc", "docx"].includes(ext)) {
                      return (
                        <div key={idx}>
                          <div className="text-blue-500 underline mb-2">
                            {filename}
                          </div>
                          <iframe
                            src={`https://docs.google.com/gview?url=${encodeURIComponent(
                              url
                            )}&embedded=true`}
                            width="100%"
                            height="400"
                            title={filename}
                            style={{ border: "none" }}
                            onError={(e) => {
                              e.target.style.display = "none";
                              const msg = document.createElement("div");
                              msg.className = "text-xs mt-1 text-red-500";
                              msg.innerText =
                                "Preview unavailable. Download to view.";
                              e.target.parentNode.appendChild(msg);
                            }}
                          />
                          <button
                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                            onClick={() => {
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = filename;
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                            }}
                          >
                            Download DOC/DOCX
                          </button>
                          <div className="text-xs mt-1">
                            (Previewed via Google Docs Viewer; may not work for
                            local files)
                          </div>
                        </div>
                      );
                    } else if (["jpeg", "jpg", "png", "gif"].includes(ext)) {
                      return (
                        <div key={idx}>
                          <img
                            src={url}
                            alt={filename}
                            style={{ maxWidth: "100%", maxHeight: 400 }}
                          />
                          <div className="text-xs mt-1">{filename}</div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={idx}>
                          <div className="text-blue-500 underline mb-2">
                            {filename}
                          </div>
                          <div className="text-xs mt-1 text-red-500">
                            Preview not supported for this file type.
                          </div>
                          <button
                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                            onClick={() => {
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = filename;
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                            }}
                          >
                            Download
                          </button>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
              <div className="mt-4 flex items-center gap-4">
                <span className="material-symbols-outlined text-base">
                  thumb_up
                </span>
                <span className="text-sm font-medium">
                  {answer.upvotes || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
