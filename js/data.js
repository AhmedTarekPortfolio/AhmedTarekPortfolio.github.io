// ============================================================
// PORTFOLIO DATA — Edit this file to update your portfolio.
// ============================================================

window.PORTFOLIO_DATA = {
  owner: {
    name: "Ahmed Tarek",
    tagline: "Data Organizer · Excel Specialist · n8n Automation Builder",
    bio: "I build practical data and automation solutions that turn messy raw information into organized, actionable results. My work spans Excel data cleaning, Google Sheets workflows, and n8n automation pipelines — including a CV-to-job matching system powered by AI that searches, scores, and tracks remote opportunities automatically. I am seeking entry-level roles and freelance work in data entry, data organization, and workflow automation.",
    photo: "assets/profile-photo.jpg", // Replace with: assets/profile-photo.jpg
    github: "https://github.com/AhmedTarekPortfolio",
    linkedin: "", // Paste your LinkedIn profile URL here
    fiverr: "",   // Paste your Fiverr profile URL here
    upwork: "",   // Paste your Upwork profile URL here
    email: "ahmedabntarek9@gmail.com"      // Example: ahmed@example.com
  },

  skills: [
    {
      category: "Data Skills",
      items: [
        { name: "Excel / Data Cleaning", level: 70, label: "Intermediate" },
        { name: "Google Sheets", level: 65, label: "Intermediate" },
        { name: "Data Entry & Organization", level: 70, label: "Intermediate" },
        { name: "Data Formatting", level: 68, label: "Intermediate" }
      ]
    },
    {
      category: "Automation",
      items: [
        { name: "n8n Workflow Builder", level: 55, label: "Intermediate" },
        { name: "AI Prompt Design", level: 50, label: "Intermediate" },
        { name: "API & HTTP Integration", level: 42, label: "Beginner" }
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "GitHub", level: 45, label: "Beginner" },
        { name: "Telegram Bot API", level: 42, label: "Beginner" },
        { name: "Remote Job Research", level: 65, label: "Intermediate" }
      ]
    }
  ],

  // Add future projects below the existing objects. Put a comma after
  // the object above before pasting another one.
  projects: [
    {
      id: 1,
      title: "Excel Employee Data Cleaning",
      summary: "Transformed a raw, inconsistent employee dataset into a clean, analysis-ready table. Fixed typos, standardized date and phone formats, corrected inconsistent category values, and retained records needing review instead of deleting useful data.",
      tools: ["Excel", "Data Cleaning", "Formatting", "Data Organization"],
      result: "A cleaner, standardized employee dataset ready for reporting and analysis.",
      image: "assets/projects/excel-cleaning.png",
      github: "https://github.com/AhmedTarekPortfolio/Excel-data-cleaning",
      demo: ""
    },
    {
      id: 2,
      title: "CV-to-Remote-Job Matching Workflow",
      summary: "An end-to-end n8n automation that reads a CV, extracts the candidate profile using AI, searches RemoteOK for relevant roles, scores each job from 1–10 by suitability, saves ranked results to Google Sheets, and sends a Telegram summary.",
      tools: ["n8n", "AI / LLM", "Google Sheets", "Telegram API", "HTTP Requests"],
      result: "CV in → ranked remote-job results in Google Sheets + a Telegram notification of the strongest matches.",
      image: "assets/projects/cv-job-matching.png",
      github: "https://github.com/AhmedTarekPortfolio/CV-Remote-Job-Matching-Workflow",
      demo: ""
    }
  ]
};
