/**
 * Master CV Data Model for Gazi Fahim Hasan
 * Used by the Interactive CV Editor
 */

window.CV_MASTER_DATA = {
  personal: {
    fullName: "GAZI FAHIM HASAN",
    title: "Senior Executive SEO",
    location: "Dhaka, Bangladesh",
    phone: "+880 1857571304",
    email: "gazifahimhasan1@gmail.com",
    portfolioUrl: "https://gazifahimhasan.com",
    githubUrl: "https://github.com/hasangazifahim",
    linkedinUrl: "",
    photoUrl: "assets/images/gazi-portrait.png",
    photoMode: "square" // "square", "rounded", "hidden"
  },

  summary: "Results-driven Senior Executive SEO and Computer Science & Engineering graduate with demonstrable expertise leading search marketing teams, architecting technical search engine visibility, and engineering organic revenue growth. Proven track record of delivering exponential organic traffic lift, ranking high-value commercial keywords in Google Top positions, and driving exceptional client return on investment. Merges core computer science disciplines (crawling mechanics, JavaScript rendering, site architecture, and Schema.org structured data) with analytical search intelligence to resolve complex indexing bottlenecks and capture high-converting search intent.",

  metrics: [],

  skills: {
    technicalSeo: "Core Web Vitals (LCP, INP, CLS), Crawl Budget Optimization, Screaming Frog Audits, XML Sitemaps, Robots.txt, Canonicalization, Hreflang, JS Rendering & Hydration, HTTP Status Codes (301, 404, 500), Indexation Architecture",
    localSeo: "Google Business Profile (GBP) Optimization, Local Pack (3-Pack) Ranking, NAP Consistency, Geo-Targeted Landing Pages, Local Citations & Directory Listings, Local Schema (LocalBusiness Markup), Review Management",
    onPage: "Schema.org JSON-LD Structured Data, Search Intent & Entity Mapping, Keyword Clustering & Cannibalization Fixes, Heading Hierarchy (H1–H6), Internal Linking Silos, Image SEO",
    offPageAuthority: "High-DR Editorial Outreach, Competitor Backlink Gap Analysis, Digital PR, Link Profile Audits, Toxic Link Disavowal, Brand Mention Acquisition",
    analyticsTools: "Google Search Console (GSC), Google Analytics 4 (GA4), Ahrefs, SEMrush, SurferSEO, Google PageSpeed Insights, Google Lighthouse, Looker Studio Dashboards",
    webProgramming: "HTML5, CSS3, JavaScript, RESTful APIs, Git / GitHub, Computational Algorithms, Web Performance Optimization"
  },

  experience: [
    {
      id: "exp-1",
      role: "SEO Executive",
      company: "Scaleup Ads Agency",
      period: "Jan 2025 – Present",
      location: "",
      bullets: [
        "Lead and supervise the cross-functional SEO team to achieve organic acquisition and revenue KPIs across high-growth international client accounts.",
        "Architect and execute end-to-end full-funnel search strategies, coordinating technical on-page fixes, content roadmaps, and white-hat link acquisition.",
        "Perform deep-dive technical crawls via Screaming Frog, remediating crawl budget waste, orphaned URLs, redirect loops, and structured data errors.",
        "Monitor Google Search Console and GA4 telemetry to engineer weekly growth sprints, identifying emerging search queries and SERP feature opportunities."
      ]
    },
    {
      id: "exp-2",
      role: "SEO Expert & Consultant",
      company: "Freelance Client Engagements",
      period: "Jan 2024 – Present",
      location: "",
      bullets: [
        "Conducted in-depth keyword research, competitor intelligence, and comprehensive Technical SEO audits for international e-commerce and SaaS brands.",
        "Built automated, transparent executive reporting dashboards consolidating GA4 conversions, Google Search Console clicks, and Ahrefs visibility trends.",
        "Partnered with engineering stakeholders to implement Core Web Vitals optimizations, achieving sub-1.0s LCP and 95+ PageSpeed scores.",
        "Formulated tailored local SEO roadmaps, optimizing Google Business Profiles and localized content to dominate 3-Pack map rankings."
      ]
    },
    {
      id: "exp-3",
      role: "Training Assistant / Interpreter",
      company: "United Interpreters Bangladesh",
      period: "Jan 2024 – Dec 2024",
      location: "",
      bullets: [
        "Translated and interpreted complex technical instruction between English and Bangla with precision and contextual clarity.",
        "Mentored and supported trainees throughout intensive development modules, maintaining structured communication workflows."
      ]
    }
  ],

  caseStudies: [
    {
      id: "cs-1",
      title: "E-Commerce Organic Search Surge: Scaled from 15K to 68K Monthly Visits (+340% Traffic, +215% Revenue)",
      bullets: [
        "Identified critical faceted navigation crawl bloat that depleted crawl budget across 40,000+ duplicate category parameter URLs.",
        "Engineered automated canonicalization rules, deployed Schema.org Product/Review markup, and clustered long-tail commercial intent keywords into targeted collection silos.",
        "Captured Top 3 Google positions for 45+ primary commercial terms, resulting in a +340% organic traffic surge and +215% YoY attributed revenue."
      ]
    },
    {
      id: "cs-2",
      title: "B2B SaaS Technical SEO Overhaul: 99% Health Score, Core Web Vitals Pass & +85% Crawl Efficiency",
      bullets: [
        "Resolved client-side rendering bottlenecks preventing Googlebot from parsing dynamically injected documentation and pricing components.",
        "Coordinated with development to implement dynamic rendering, reduced render-blocking JavaScript (slashing LCP to 0.8s), and eliminated 1,200+ crawl errors.",
        "Crawl efficiency surged by +85%, trial sign-ups from organic traffic grew by +180%, and zero indexation regressions occurred."
      ]
    }
  ],

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science & Engineering (B.Sc. in CSE)",
      institution: "Sonargaon University",
      period: "2016 – 2019",
      description: "Rigorous academic training in computational algorithms, web systems, database design, and software engineering. Provides an unmatched advantage in technical SEO audits, JavaScript rendering diagnostics, and server-side crawl optimizations."
    }
  ],

  languages: [
    { name: "English", level: "Professional Working Proficiency (Technical Documentation & Client Communication)" },
    { name: "Bangla", level: "Native / Bilingual" }
  ],

  references: [
    {
      id: "ref-1",
      name: "Bulbul Ahamed",
      title: "Associate Professor & Head",
      department: "Department of Computer Science & Engineering, Sonargaon University",
      email: "bulbul_cse@su.edu.bd",
      phone: "+880 1977880888"
    },
    {
      id: "ref-2",
      name: "Arifur Rahaman",
      title: "Assistant Professor & Coordinator",
      department: "Department of Computer Science & Engineering, Sonargaon University",
      email: "helpyarifur@gmail.com",
      phone: "+880 01820995191"
    }
  ]
};
