export type PageSection = {
  eyebrow?: string;
  title: string;
  note?: string;
};

export type PageSpec = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  sections: PageSection[];
  image?:
    | "/images/jack-skeen-coaching.jpg"
    | "/images/jack-skeen-office.jpg"
    | "/images/jack-skeen-portrait.jpg";
  kind?: "standard" | "about" | "library" | "form" | "legal";
};

export const topics = [
  {
    slug: "purpose",
    title: "Purpose",
    description:
      "Purpose is the connection between what matters to you, what you contribute, and how you choose to use the life in front of you.",
  },
  {
    slug: "success-fulfillment",
    title: "Success & Fulfillment",
    description:
      "Achievement can expand your options without answering the deeper questions of meaning, satisfaction, and what is enough.",
  },
  {
    slug: "leadership",
    title: "Leadership",
    description:
      "Leadership asks for clear judgment, honest perspective, and responsibility for the effect your choices have on other people.",
  },
  {
    slug: "personal-growth",
    title: "Personal Growth",
    description:
      "Growth begins with seeing your patterns clearly enough to decide which ones still serve you and which ones need to change.",
  },
  {
    slug: "relationships",
    title: "Relationships",
    description:
      "The quality of a life is shaped by how we listen, speak honestly, receive feedback, and stay connected when relationships become difficult.",
  },
  {
    slug: "your-genius",
    title: "Your Genius",
    description:
      "Your unique contribution often appears as a recurring combination of strengths, energy, perspective, and work that feels deeply worth doing.",
  },
  {
    slug: "circle-blueprint",
    title: "Circle Blueprint",
    description:
      "The Circle Blueprint explores a whole-life framework organized around Independence, Power, Humility, and Purpose.",
  },
  {
    slug: "reflections",
    title: "Reflections",
    description:
      "Stories and observations can reveal patterns that abstract advice misses. These reflections connect everyday moments to larger questions.",
  },
] as const;

export const sitePages: PageSpec[] = [
  {
    path: "/roadmap",
    eyebrow: "The Roadmap",
    title: "The Roadmap",
    description:
      "A clearer way to understand the gap between the life you have built and the life you want to choose next.",
    image: "/images/jack-skeen-coaching.jpg",
    sections: [
      {
        eyebrow: "The problem",
        title: "When success stops answering the deeper question",
        note: "The Roadmap is for accomplished people who have built a meaningful life and still feel uncertain about what deserves the next part of it.",
      },
      {
        eyebrow: "The tension",
        title:
          "Achievement can expand your life without making it feel like your own",
        note: "Responsibility, opportunity, and momentum can grow while the most personal questions remain unresolved.",
      },
      {
        eyebrow: "What gets lost",
        title: "Your strengths can become harder to see from the inside",
        note: "A life built around responsibility can make it difficult to recognize what is most alive in you and where it belongs now.",
      },
      {
        eyebrow: "The solution",
        title: "Clarity for the next chapter",
        note: "The Roadmap brings the real question into focus: what matters now, what feels true, and what kind of life you want to choose.",
      },
      {
        eyebrow: "What changes",
        title: "A more grounded direction",
        note: "The value is not a prescribed answer. It is a clearer understanding of yourself and the choices that deserve your attention.",
      },
      {
        eyebrow: "Outcomes",
        title: "What the work can clarify",
        note: "The Roadmap is intended to clarify strengths, priorities, tensions, and possible directions. It does not promise a particular personal or business result.",
      },
      {
        eyebrow: "Questions",
        title: "Frequently asked questions",
        note: "Explore the fit, purpose, privacy, commitment, and next step before beginning a conversation.",
      },
    ],
  },
  {
    path: "/roadmap/results",
    eyebrow: "The Roadmap",
    title: "Results",
    description:
      "The Roadmap is intended to create clearer understanding and direction. Individual experiences vary, and no specific personal or business outcome is guaranteed.",
    sections: [
      { eyebrow: "Outcomes", title: "Approved outcome language required" },
      { eyebrow: "Client stories", title: "Approved proof required" },
      {
        eyebrow: "Next chapter",
        title: "Approved transition language required",
      },
    ],
  },
  {
    path: "/roadmap/faq",
    eyebrow: "The Roadmap",
    title: "Frequently asked questions",
    description:
      "Answers to the most common questions about the purpose, fit, privacy, commitment, and next step for The Roadmap.",
    sections: [
      { eyebrow: "The purpose", title: "What is The Roadmap?" },
      { eyebrow: "The fit", title: "Who is The Roadmap for?" },
      { eyebrow: "The commitment", title: "What should I expect?" },
      { eyebrow: "The next step", title: "What happens after I inquire?" },
    ],
  },
  {
    path: "/work-with-jack",
    eyebrow: "Work with Jack",
    title: "Work With Jack",
    description:
      "Different questions call for different kinds of work. Explore the available paths and begin with the one that best matches the clarity or support you need.",
    image: "/images/jack-skeen-office.jpg",
    sections: [
      { eyebrow: "01", title: "The Roadmap" },
      { eyebrow: "02", title: "Executive coaching" },
      { eyebrow: "03", title: "Roadmap Essentials" },
      { eyebrow: "04", title: "Roadmap Discovery Group" },
      { eyebrow: "05", title: "Corporate advisory" },
    ],
  },
  {
    path: "/work-with-jack/executive-coaching",
    eyebrow: "Work with Jack",
    title: "Executive coaching",
    description:
      "One-to-one work for leaders who want an experienced outside perspective on how they lead, decide, communicate, and use their strengths.",
    sections: [
      {
        eyebrow: "For leaders",
        title: "Who this work is for",
        note: "For leaders who are willing to examine their patterns, receive direct perspective, and take responsibility for how they show up in consequential work.",
      },
      {
        eyebrow: "The work",
        title: "A thoughtful working relationship",
        note: "The work creates space to step outside the immediate pressure of leadership, examine what is happening, and make more deliberate choices.",
      },
      {
        eyebrow: "The fit",
        title: "Start with the question you need to examine",
        note: "A first conversation can clarify whether ongoing coaching, The Roadmap, or another path is the most useful place to begin.",
      },
    ],
  },
  {
    path: "/work-with-jack/roadmap-essentials",
    eyebrow: "Work with Jack",
    title: "Roadmap Essentials",
    description:
      "A focused option for people who want greater clarity around one important question or transition.",
    sections: [
      {
        eyebrow: "Overview",
        title: "Clarity around a more focused question",
        note: "Roadmap Essentials is intended for a narrower question than the full Roadmap. Exact boundaries and inclusions remain to be confirmed.",
      },
      {
        eyebrow: "The value",
        title: "A clearer view of what matters now",
        note: "The aim is to help you see the central tension, the choices in front of you, and the direction that feels most aligned. Final offer details remain to be confirmed.",
      },
      {
        eyebrow: "Next step",
        title: "Determine whether the focused format fits",
        note: "Begin with a conversation about the question you want to clarify and the depth of work that would be most useful.",
      },
    ],
  },
  {
    path: "/work-with-jack/roadmap-discovery-group",
    eyebrow: "Work with Jack",
    title: "Roadmap Discovery Group",
    description:
      "A group-based Roadmap offering is under consideration. The program will remain unavailable until its audience, format, curriculum, timing, and outcomes are fully defined.",
    sections: [
      {
        eyebrow: "Overview",
        title: "A future group-based discovery experience",
        note: "This route is reserved for a possible facilitated group offering built around Roadmap ideas. No enrollment or availability is implied.",
      },
      {
        eyebrow: "Experience",
        title: "Program definition is still required",
        note: "Cohort size, curriculum, facilitator, live or asynchronous format, timing, deliverable, and participant expectations have not been confirmed.",
      },
      {
        eyebrow: "Next step",
        title: "Explore the individual Roadmap instead",
        note: "Until the group program is defined, visitors seeking personal clarity should begin with the flagship Roadmap page.",
      },
    ],
  },
  {
    path: "/work-with-jack/corporate",
    eyebrow: "Work with Jack",
    title: "Corporate advisory",
    description:
      "Advisory and development work for organizations examining leadership, team effectiveness, and the culture created by everyday decisions and behavior.",
    sections: [
      {
        eyebrow: "Organizations",
        title: "For leaders, teams, and organizations",
        note: "This work is for organizations willing to look closely at leadership behavior, team patterns, and the conditions shaping performance and culture.",
      },
      {
        eyebrow: "Engagements",
        title: "Work shaped around the real organizational question",
        note: "Potential areas include executive coaching, team development, leadership development, and culture. Scope and delivery are defined through conversation.",
      },
      {
        eyebrow: "Conversation",
        title: "Begin with the context",
        note: "Use the contact page to describe the organization, the people involved, and the question or pattern that needs attention.",
      },
    ],
  },
  {
    path: "/about",
    eyebrow: "About Jack",
    title: "About Jack Skeen",
    description:
      "Jack's work centers on helping accomplished people see their strengths, patterns, purpose, and possibilities with greater clarity.",
    image: "/images/jack-skeen-portrait.jpg",
    kind: "about",
    sections: [
      {
        eyebrow: "Biography",
        title: "Jack Skeen",
        note: "Jack works with accomplished leaders and professionals who want a clearer understanding of themselves and the next chapter they are choosing to build.",
      },
      {
        eyebrow: "Background",
        title: "Psychology, theology, and coaching",
        note: "A verified account of Jack's education, professional history, and chronology will be added when the supporting records are supplied.",
      },
      {
        eyebrow: "The Roadmap",
        title: "How the work developed",
        note: "The Roadmap reflects a central idea in Jack's work: people make better choices when they can see the patterns connecting their strengths, motivations, relationships, and priorities.",
      },
      {
        eyebrow: "The Circle Blueprint",
        title: "A framework for a whole life",
        note: "The Circle Blueprint organizes questions of growth around Independence, Power, Humility, and Purpose. Verified publication details and framework definitions remain to be added.",
      },
      {
        eyebrow: "Ideas and media",
        title: "Books, podcast, and writing",
        note: "Jack's articles and future podcast, video, and book records bring the same questions into specific stories, observations, and conversations.",
      },
      { eyebrow: "Credentials", title: "Verified credentials required" },
    ],
  },
  {
    path: "/insights",
    eyebrow: "Insights",
    title: "Insights",
    description:
      "Explore Jack's writing and future conversations about purpose, success, leadership, personal growth, relationships, and the patterns that shape a life.",
    kind: "library",
    sections: [
      { eyebrow: "Articles", title: "Writing by Jack" },
      { eyebrow: "Inside the Circle", title: "Podcast episodes" },
      { eyebrow: "Watch", title: "Videos and conversations" },
      { eyebrow: "Topics", title: "Explore the core ideas" },
    ],
  },
  {
    path: "/insights/articles",
    eyebrow: "Insights",
    title: "Articles",
    description:
      "Browse the retained article library by date and primary topic while the audited WordPress content is prepared for migration.",
    kind: "library",
    sections: [],
  },
  {
    path: "/insights/podcast",
    eyebrow: "Inside the Circle",
    title: "Podcast",
    description:
      "Inside the Circle is the planned home for long-form conversations about leadership, purpose, growth, and the choices behind a meaningful life.",
    kind: "library",
    sections: [
      { eyebrow: "Episodes", title: "Approved episode records required" },
    ],
  },
  {
    path: "/insights/videos",
    eyebrow: "Insights",
    title: "Videos",
    description:
      "A future library of conversations and short-form teaching, organized around the same core topics as Jack's writing and Roadmap work.",
    kind: "library",
    sections: [{ eyebrow: "Watch", title: "Approved video records required" }],
  },
  {
    path: "/books",
    eyebrow: "Books",
    title: "Books",
    description:
      "Books and frameworks associated with Jack's body of work, presented with verified publication information and approved purchase sources.",
    sections: [
      { eyebrow: "Featured book", title: "The Circle Blueprint" },
      { eyebrow: "Library", title: "Approved book records required" },
    ],
  },
  {
    path: "/books/circle-blueprint",
    eyebrow: "Books",
    title: "The Circle Blueprint",
    description:
      "A framework for examining a whole life through four connected ideas: Independence, Power, Humility, and Purpose.",
    sections: [
      {
        eyebrow: "The framework",
        title: "Independence, Power, Humility, and Purpose",
      },
      {
        eyebrow: "About the book",
        title: "Approved book description required",
      },
      { eyebrow: "Authors", title: "Approved author details required" },
      { eyebrow: "Purchase", title: "Approved purchase links required" },
    ],
  },
  {
    path: "/success-stories",
    eyebrow: "Success stories",
    title: "Success Stories",
    description:
      "Client experiences will be presented here in their own words, with clear context, exact attribution, and publication permission.",
    sections: [
      { eyebrow: "Featured story", title: "Approved client story required" },
      { eyebrow: "More perspectives", title: "Approved testimonials required" },
    ],
  },
  {
    path: "/contact",
    eyebrow: "Contact",
    title: "Contact Jack Skeen",
    description:
      "For general, organizational, media, or non-Roadmap inquiries, share enough context to help route the conversation appropriately.",
    kind: "form",
    sections: [],
  },
  {
    path: "/start",
    eyebrow: "Start Your Roadmap",
    title: "Start Your Roadmap",
    description:
      "Tell us what you want to understand more clearly and why The Roadmap feels relevant to this point in your life or work.",
    kind: "form",
    sections: [],
  },
  {
    path: "/privacy",
    eyebrow: "Legal",
    title: "Privacy",
    description: "[Approved legal copy required]",
    kind: "legal",
    sections: [],
  },
  {
    path: "/terms",
    eyebrow: "Legal",
    title: "Terms",
    description: "[Approved legal copy required]",
    kind: "legal",
    sections: [],
  },
];

export function findSitePage(path: string) {
  return sitePages.find((page) => page.path === path);
}
