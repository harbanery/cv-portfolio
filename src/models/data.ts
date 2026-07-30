import type { CvData } from "./types";

/**
 * Data CV hardcode (lorem ipsum placeholder).
 *
 * Setiap item ditandai dengan `source` (kategori sumber data):
 * linkedin, github, gitlab, personal, freelance, portfolio, behance,
 * dribbble, stackoverflow, medium, kaggle, hackerrank, coursera, udemy,
 * volunteer, academic, certification, conference, open_source.
 *
 * Skill groups & projects menggunakan `categoryId` yang merefer ke
 * SKILL_CATEGORIES / PROJECT_CATEGORIES di categories.ts.
 *
 * Nantinya akan diintegrasikan dengan API LinkedIn dan data personal.
 */
export const CV_DATA: CvData = {
  profile: {
    name: "Raihan Yusuf",
    title: {
      id: "Full-Stack Developer",
      en: "Full-Stack Developer",
    },
    avatar: "/images/avatar.svg",
    contact: {
      email: "raihan.yusuf@example.com",
      phone: "+62 812 3456 7890",
      location: {
        id: "Jakarta, Indonesia",
        en: "Jakarta, Indonesia",
      },
      website: "raihanyusuf.dev",
      linkedin: "linkedin.com/in/raihanyusuf",
      github: "github.com/raihanyusuf",
    },
    summary: {
      id: "Full-Stack Developer dengan pengalaman lebih dari 5 tahun membangun aplikasi web yang scalable menggunakan React, Next.js, dan Node.js. Bersemangat dalam menciptakan pengalaman pengguna yang intuitif dan arsitektur backend yang tangguh. Terbiasa bekerja dalam tim Agile dan memiliki rekam jejak dalam mengantarkan produk dari konsep hingga produksi.",
      en: "Full-Stack Developer with over 5 years of experience building scalable web applications using React, Next.js, and Node.js. Passionate about creating intuitive user experiences and robust backend architectures. Experienced in Agile team environments with a proven track record of delivering products from concept to production.",
    },
  },
  experiences: [
    {
      source: "linkedin",
      company: "Tech Innovate Solutions",
      position: {
        id: "Senior Full-Stack Developer",
        en: "Senior Full-Stack Developer",
      },
      startDate: "2023-01",
      endDate: null,
      location: {
        id: "Jakarta, Indonesia",
        en: "Jakarta, Indonesia",
      },
      description: [
        {
          id: "Memimpin pengembangan platform SaaS dengan lebih dari 50.000 pengguna aktif bulanan",
          en: "Led the development of a SaaS platform serving over 50,000 monthly active users",
        },
        {
          id: "Mengarsiteki migrasi monolith ke microservices, mengurangi latency sebesar 40%",
          en: "Architected migration from monolith to microservices, reducing latency by 40%",
        },
        {
          id: "Membimbing 4 developer junior melalui code review dan sesi pairing",
          en: "Mentored 4 junior developers through code reviews and pairing sessions",
        },
      ],
    },
    {
      source: "linkedin",
      company: "Digital Nusantara",
      position: {
        id: "Frontend Developer",
        en: "Frontend Developer",
      },
      startDate: "2020-06",
      endDate: "2022-12",
      location: {
        id: "Bandung, Indonesia",
        en: "Bandung, Indonesia",
      },
      description: [
        {
          id: "Membangun design system reusable dengan React dan Storybook untuk 10+ produk",
          en: "Built a reusable design system with React and Storybook used across 10+ products",
        },
        {
          id: "Meningkatkan skor Lighthouse dari 65 ke 95 melalui optimasi performance",
          en: "Improved Lighthouse score from 65 to 95 through performance optimization",
        },
        {
          id: "Mengimplementasikan CI/CD pipeline dengan GitHub Actions dan Vercel",
          en: "Implemented CI/CD pipeline using GitHub Actions and Vercel",
        },
      ],
    },
    {
      source: "freelance",
      company: "Freelance Projects",
      position: {
        id: "Web Developer Independen",
        en: "Independent Web Developer",
      },
      startDate: "2019-01",
      endDate: "2020-05",
      location: {
        id: "Remote",
        en: "Remote",
      },
      description: [
        {
          id: "Mengembangkan 15+ website untuk UMKM dengan Next.js dan Tailwind CSS",
          en: "Developed 15+ websites for small businesses using Next.js and Tailwind CSS",
        },
        {
          id: "Membangun sistem manajemen inventori custom untuk klien retail",
          en: "Built a custom inventory management system for retail clients",
        },
      ],
    },
  ],
  education: [
    {
      source: "academic",
      institution: "Universitas Indonesia",
      degree: {
        id: "Sarjana Komputer",
        en: "Bachelor of Computer Science",
      },
      field: {
        id: "Teknik Informatika",
        en: "Computer Science",
      },
      startDate: "2015",
      endDate: "2019",
      gpa: "3.78 / 4.00",
      description: [
        {
          id: "Tugas akhir: Implementasi machine learning untuk deteksi anomali jaringan",
          en: "Thesis: Machine learning implementation for network anomaly detection",
        },
      ],
    },
  ],
  skills: [
    {
      source: "linkedin",
      category: {
        id: "Frontend",
        en: "Frontend",
      },
      skills: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Ant Design", "Redux"],
    },
    {
      source: "linkedin",
      category: {
        id: "Backend",
        en: "Backend",
      },
      skills: ["Node.js", "Express", "NestJS", "Python", "Go"],
    },
    {
      source: "github",
      category: {
        id: "Bahasa Pemrograman",
        en: "Programming Languages",
      },
      skills: ["TypeScript", "JavaScript", "Python", "Go", "Java", "Dart"],
    },
    {
      source: "github",
      category: {
        id: "Mobile",
        en: "Mobile",
      },
      skills: ["React Native", "Flutter", "Android"],
    },
    {
      source: "stackoverflow",
      category: {
        id: "Database",
        en: "Database",
      },
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma"],
    },
    {
      source: "github",
      category: {
        id: "DevOps & Cloud",
        en: "DevOps & Cloud",
      },
      skills: ["Docker", "Kubernetes", "Nginx", "Linux", "Bash"],
    },
    {
      source: "coursera",
      category: {
        id: "Cloud Platform",
        en: "Cloud Platform",
      },
      skills: ["AWS", "Google Cloud", "Vercel", "Cloudflare"],
    },
    {
      source: "github",
      category: {
        id: "API & Integration",
        en: "API & Integration",
      },
      skills: ["REST API", "GraphQL", "gRPC", "WebSocket", "tRPC"],
    },
    {
      source: "github",
      category: {
        id: "Testing",
        en: "Testing",
      },
      skills: ["Jest", "Vitest", "Cypress", "Playwright", "Testing Library"],
    },
    {
      source: "kaggle",
      category: {
        id: "AI & Machine Learning",
        en: "AI & Machine Learning",
      },
      skills: ["TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Pandas"],
    },
    {
      source: "personal",
      category: {
        id: "Design & UI/UX",
        en: "Design & UI/UX",
      },
      skills: ["Figma", "Adobe XD", "Tailwind CSS", "Storybook"],
    },
    {
      source: "personal",
      category: {
        id: "Tools & Workflow",
        en: "Tools & Workflow",
      },
      skills: ["Git", "GitHub Actions", "Jira", "VS Code", "Vim"],
    },
    {
      source: "personal",
      category: {
        id: "Security",
        en: "Security",
      },
      skills: ["OWASP", "JWT", "OAuth 2.0", "HTTPS/TLS"],
    },
    {
      source: "personal",
      category: {
        id: "Soft Skills",
        en: "Soft Skills",
      },
      skills: ["Leadership", "Public Speaking", "Problem Solving", "Mentoring"],
    },
  ],
  certifications: [
    {
      source: "certification",
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2024-03",
    },
    {
      source: "coursera",
      name: "Meta Front-End Developer",
      issuer: "Coursera",
      date: "2022-08",
    },
    {
      source: "udemy",
      name: "Complete Python Bootcamp",
      issuer: "Udemy",
      date: "2021-05",
    },
    {
      source: "hackerrank",
      name: "Problem Solving (Intermediate)",
      issuer: "HackerRank",
      date: "2023-11",
    },
  ],
  languages: [
    {
      language: {
        id: "Bahasa Indonesia",
        en: "Indonesian",
      },
      proficiency: {
        id: "Penutur Asli",
        en: "Native",
      },
    },
    {
      language: {
        id: "Bahasa Inggris",
        en: "English",
      },
      proficiency: {
        id: "Profesional (IELTS 7.5)",
        en: "Professional (IELTS 7.5)",
      },
    },
    {
      language: {
        id: "Bahasa Jepang",
        en: "Japanese",
      },
      proficiency: {
        id: "Dasar (JLPT N4)",
        en: "Basic (JLPT N4)",
      },
    },
  ],
  projects: [
    {
      source: "github",
      name: "Progress-Self Dashboard",
      description: {
        id: "Aplikasi dashboard evaluasi diri harian dengan integrasi notifikasi web push, grafik analitik, dan dukungan multi-bahasa.",
        en: "Daily self-evaluation dashboard app with web push notifications, analytics charts, and multi-language support.",
      },
      techStack: ["Next.js", "React", "Ant Design", "Prisma", "Tailwind CSS"],
      link: "github.com/raihanyusuf/progress-self",
    },
    {
      source: "github",
      name: "E-Commerce Platform",
      description: {
        id: "Platform e-commerce full-stack dengan pembayaran terintegrasi, manajemen inventori real-time, dan dashboard analitik.",
        en: "Full-stack e-commerce platform with integrated payments, real-time inventory management, and analytics dashboard.",
      },
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
      link: "github.com/raihanyusuf/ecommerce-platform",
    },
    {
      source: "github",
      name: "AI Chat Assistant",
      description: {
        id: "Asisten chat berbasis AI dengan kemampuan streaming response, riwayat percakapan, dan dukungan multiple model LLM.",
        en: "AI-powered chat assistant with streaming responses, conversation history, and multiple LLM model support.",
      },
      techStack: ["React", "TypeScript", "OpenAI API", "Socket.io"],
    },
    {
      source: "github",
      name: "Fitness Tracker App",
      description: {
        id: "Aplikasi mobile pelacak kebugaran dengan statistik real-time, reminder notifikasi, dan sinkronisasi cloud.",
        en: "Fitness tracker mobile app with real-time statistics, notification reminders, and cloud sync.",
      },
      techStack: ["React Native", "Expo", "Firebase", "TypeScript"],
      link: "github.com/raihanyusuf/fitness-tracker",
    },
    {
      source: "open_source",
      name: "react-simplify",
      description: {
        id: "Library React open-source untuk penyederhanaan manajemen state dengan hook yang minimal dan type-safe.",
        en: "Open-source React library for simplifying state management with minimal and type-safe hooks.",
      },
      techStack: ["React", "TypeScript", "Vite"],
      link: "github.com/raihanyusuf/react-simplify",
    },
    {
      source: "kaggle",
      name: "Data Pipeline ETL",
      description: {
        id: "Pipeline ETL untuk analisis data retail dengan visualisasi interaktif dan reporting otomatis.",
        en: "ETL pipeline for retail data analytics with interactive visualizations and automated reporting.",
      },
      techStack: ["Python", "Apache Airflow", "Pandas", "PostgreSQL"],
    },
  ],
};
