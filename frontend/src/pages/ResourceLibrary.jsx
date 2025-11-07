import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ResourceLibrary() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedType, setSelectedType] = useState("All Types");

  const subjects = [
    "All Subjects",
    "Biology",
    "Physics",
    "Chemistry",
    "Mathematics",
  ];
  const types = ["All Types", "Study Notes", "Past Papers", "Verified Answer"];

  // Mock data - Verified Answers
  const verifiedAnswers = [
    {
      _id: "1",
      title: "Calculating Projectile Motion",
      subject: "Physics",
      level: "A'Level",
      type: "Verified Answer",
      description:
        "Detailed derivation and worked example for projectile motion formula, including max height...",
      upvotes: 12,
    },
    {
      _id: "2",
      title: "Ionic vs. Covalent Bonds",
      subject: "Chemistry",
      level: "O'Level",
      type: "Verified Answer",
      description:
        "A clear breakdown of the differences between ionic (electron transfer) and covalent (electron sharing) bonds.",
      upvotes: 28,
    },
    {
      _id: "3",
      title: "The Process of Mitosis",
      subject: "Biology",
      level: "O'Level",
      type: "Verified Answer",
      description:
        "A simplified explanation of all stages (Prophase, Metaphase, Anaphase, Telophase) with diagrams.",
      upvotes: 8,
    },
  ];

  // Mock data - Study Notes & Past Papers
  const studyMaterials = [
    {
      _id: "4",
      title: "O'Level Biology Notes",
      subject: "Biology",
      type: "Study Notes",
      description: "Complete chapter on Cell Biology.",
      author: "A. Nanteza",
      pages: 15,
      image:
        "https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_1280.jpg",
    },
    {
      _id: "5",
      title: "UCE Physics Paper 1 2019",
      subject: "Physics",
      type: "Past Paper",
      description: "Official UNEB Past Paper.",
      author: "UNEB",
      pages: 12,
      icon: "quiz",
    },
    {
      _id: "6",
      title: "A'Level Math Formulas",
      subject: "Mathematics",
      type: "Study Notes",
      description: "Quick reference sheet for calculus.",
      author: "J. Doe",
      pages: 2,
      icon: "calculate",
    },
    {
      _id: "7",
      title: "UACE Chemistry Paper 2 2020",
      subject: "Chemistry",
      type: "Past Paper",
      description: "Official UNEB Past Paper.",
      author: "UNEB",
      pages: 14,
      icon: "biotech",
    },
  ];

  const getSubjectColor = (subject) => {
    const colors = {
      Physics:
        "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300",
      Chemistry:
        "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300",
      Biology: "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300",
      Mathematics:
        "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
    };
    return (
      colors[subject] ||
      "bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300"
    );
  };

  const getLevelColor = (level) => {
    return level === "O'Level"
      ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300"
      : "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300";
  };

  return (
    <div className="flex min-h-screen w-full bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <aside className="flex-shrink-0 w-72 bg-card-light dark:bg-card-dark shadow-sm hidden lg:flex flex-col fixed h-screen overflow-y-auto">
        <div className="flex flex-col h-full p-6">
          {/* Header with Flag and Motto */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-black"></div>
                <div className="w-4 h-3 bg-yellow-400"></div>
                <div className="w-4 h-3 bg-red-600"></div>
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-text-light-secondary dark:text-text-dark-secondary">
                For God and My Country
              </p>
            </div>

            {/* User Profile */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-center">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full size-10 flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-text-light-primary dark:text-text-dark-primary text-base font-bold leading-normal">
                    {user?.name || "User"}
                  </h1>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal">
                    {user?.educationLevel || "Student"}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2 mt-4">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-3 py-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark rounded-lg"
                >
                  <span className="material-symbols-outlined">dashboard</span>
                  <p className="text-sm font-medium leading-normal">
                    Community Feed
                  </p>
                </Link>
                <Link
                  to="/ask-question"
                  className="flex items-center gap-3 px-3 py-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark rounded-lg"
                >
                  <span className="material-symbols-outlined">
                    help_outline
                  </span>
                  <p className="text-sm font-medium leading-normal">
                    My Questions
                  </p>
                </Link>
                <Link
                  to="/sessions"
                  className="flex items-center gap-3 px-3 py-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark rounded-lg"
                >
                  <span className="material-symbols-outlined">groups</span>
                  <p className="text-sm font-medium leading-normal">
                    Study Sessions
                  </p>
                </Link>
                <Link
                  to="/resources"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary"
                >
                  <span className="material-symbols-outlined filled">
                    auto_stories
                  </span>
                  <p className="text-sm font-semibold leading-normal">
                    Resources
                  </p>
                </Link>
              </nav>
            </div>
          </div>

          {/* Settings at bottom */}
          <div className="mt-auto">
            <div className="flex flex-col gap-1">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-3 py-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark rounded-lg"
              >
                <span className="material-symbols-outlined">settings</span>
                <p className="text-sm font-medium leading-normal">Settings</p>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-3 px-3 py-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark rounded-lg text-left w-full"
              >
                <span className="material-symbols-outlined">logout</span>
                <p className="text-sm font-medium leading-normal">Logout</p>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 lg:p-10">
        <div className="mx-auto max-w-7xl w-full">
          <div className="flex flex-col gap-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-text-light-primary dark:text-text-dark-primary text-4xl font-black leading-tight tracking-[-0.033em]">
                  Resource Library
                </h1>
                <p className="text-text-light-secondary dark:text-text-dark-secondary mt-1">
                  Explore study notes, past papers, and verified answers.
                </p>
              </div>
              <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:bg-gray-300 disabled:cursor-not-allowed w-full md:w-auto">
                <span className="material-symbols-outlined mr-2">
                  upload_file
                </span>
                <span>Upload a Resource</span>
              </button>
            </header>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary">
                  search
                </span>
                <input
                  className="form-input w-full rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark py-3.5 pl-12 pr-4 text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Search for topics, past papers..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="form-select w-full md:w-48 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark py-3.5 pl-4 pr-10 text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  {subjects.map((subject) => (
                    <option key={subject}>{subject}</option>
                  ))}
                </select>
                <select
                  className="form-select w-full md:w-48 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark py-3.5 pl-4 pr-10 text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {types.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Verified Answers Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  Verified Answers
                </h2>
                <span className="material-symbols-outlined text-green-500 filled">
                  verified
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {verifiedAnswers.map((resource) => (
                  <div
                    key={resource._id}
                    className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col overflow-hidden group hover:border-primary/30 transition-colors cursor-pointer"
                    onClick={() => navigate(`/resources/${resource._id}`)}
                  >
                    <div className="p-5 flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${getSubjectColor(
                            resource.subject
                          )}`}
                        >
                          {resource.subject}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${getLevelColor(
                            resource.level
                          )}`}
                        >
                          {resource.level}
                        </span>
                      </div>
                      <h3 className="font-bold text-text-light-primary dark:text-text-dark-primary">
                        {resource.title}
                      </h3>
                      <p className="text-sm mt-1 text-text-light-secondary dark:text-text-dark-secondary line-clamp-2">
                        {resource.description}
                      </p>
                    </div>
                    <div className="bg-surface-light dark:bg-surface-dark px-5 py-3 border-t border-border-light dark:border-border-dark flex items-center justify-between text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">
                          thumb_up
                        </span>
                        <span>{resource.upvotes}</span>
                      </div>
                      <span className="font-semibold text-primary hover:underline">
                        View Answer
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Notes & Past Papers Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-text-light-primary dark:text-text-dark-primary">
                Study Notes &amp; Past Papers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {studyMaterials.map((resource) => (
                  <div
                    key={resource._id}
                    className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col overflow-hidden group hover:border-primary/30 transition-colors cursor-pointer"
                    onClick={() => navigate(`/resources/${resource._id}`)}
                  >
                    <div className="relative">
                      {resource.image ? (
                        <img
                          alt={`${resource.title} Thumbnail`}
                          className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                          src={resource.image}
                        />
                      ) : (
                        <div className="aspect-video w-full bg-surface-light dark:bg-surface-dark flex items-center justify-center">
                          <span className="material-symbols-outlined text-5xl text-text-light-secondary dark:text-text-dark-secondary">
                            {resource.icon}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {resource.type}
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="font-bold text-text-light-primary dark:text-text-dark-primary">
                        {resource.title}
                      </h3>
                      <p className="text-sm mt-1 text-text-light-secondary dark:text-text-dark-secondary flex-grow">
                        {resource.description}
                      </p>
                      <div className="mt-3 pt-3 border-t border-border-light dark:border-border-dark flex items-center justify-between text-xs text-text-light-secondary dark:text-text-dark-secondary">
                        <span>By {resource.author}</span>
                        <span>{resource.pages} Pages</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating AI Chatbot Button */}
      <button className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark">
        <span className="material-symbols-outlined text-4xl">smart_toy</span>
      </button>
    </div>
  );
}
