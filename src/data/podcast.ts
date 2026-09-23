import sources from "../../docs/podcast-research/episodes.json";

type Story = {
  name: string;
  slug: string;
  role: string;
  headline: string;
  summary: string;
  story: string;
  shift: string;
  topics: string[];
  takeaways: string[];
  questions: string[];
};
const stories: Story[] = [
  {
    name: "Reshma Nichani",
    slug: "reshma-nichani",
    role: "Exploring a creative next chapter",
    headline: "A life you would choose for decades.",
    summary:
      "Reshma reconnects with her creativity and begins imagining work that feels meaningful on her own terms.",
    story:
      "Professional success can coexist with a quiet sense that something is missing. In her conversation with Jack, Reshma describes rediscovering a creative part of herself that had been dormant. Her emerging idea connects traditional Indian craftsmanship with contemporary life: a possibility she is exploring, rather than a finished destination.",
    shift:
      "Reshma describes how her work with Jack helped her move beyond people pleasing toward greater confidence, contentment, and clarity. The question becomes less about reaching the next milestone quickly and more about finding work she would be happy to keep doing for decades.",
    topics: ["Purpose", "Creativity"],
    takeaways: [
      "Creativity can become a source of direction, even after years spent focused elsewhere.",
      "A clearer sense of what fits can change your relationship with urgency and other people’s expectations.",
      "Money and risk look different when the aim is meaningful work over the long term.",
    ],
    questions: [
      "What interest have you quietly put aside?",
      "Whose expectations are shaping your next decision?",
      "What work would you gladly keep exploring for twenty years?",
    ],
  },
  {
    name: "Rodrigo Herrera Aspra",
    slug: "rodrigo-herrera-aspra",
    role: "Entrepreneur",
    headline: "Give ambition a direction that matters.",
    summary:
      "Rodrigo explores the difference between constant activity and work guided by a clear, personal vision.",
    story:
      "For an entrepreneur, movement can become its own measure of progress. Rodrigo Herrera Aspra joins Jack to explore a different question: what makes that activity meaningful? Their conversation considers the point at which professional success alone no longer provides a satisfying answer.",
    shift:
      "Rodrigo shares how reconnecting with a clear vision and deeper purpose changed his approach to work, ambition, and life. His story invites accomplished people to examine what they are building toward, and why that destination matters to them.",
    topics: ["Purpose", "Leadership"],
    takeaways: [
      "A personal vision gives daily activity a larger context.",
      "Achievement and satisfaction deserve separate attention.",
      "Purpose can change how you approach ambition without requiring you to abandon it.",
    ],
    questions: [
      "What is your current ambition in service of?",
      "Which activities feel meaningful after the work is done?",
      "How would you describe your vision without mentioning a financial target?",
    ],
  },
  {
    name: "Allegra Poschmann",
    slug: "allegra-poschmann",
    role: "Brand builder & entrepreneur",
    headline: "Find your North Star. Bring your gifts with you.",
    summary:
      "Allegra reflects on building businesses while staying connected to the creative gifts that make her work her own.",
    story:
      "Allegra’s conversation brings together two ambitions that can feel difficult to hold at once: growing a business and protecting the creative contribution that gives it life. She and Jack discuss the assumptions that shape choices, and what changes when those assumptions are examined.",
    shift:
      "Allegra describes The Roadmap as helping her clarify what she wants and find a North Star for decisions in business and life. The value is a more personal basis for choosing where her energy and creativity belong.",
    topics: ["Creativity", "Leadership"],
    takeaways: [
      "Your creative gifts belong in the conversation about business growth.",
      "Questioning an assumption can open up a different set of choices.",
      "A clear North Star can connect decisions at work with the life you want.",
    ],
    questions: [
      "Which part of your work most needs your particular creativity?",
      "What assumption about growth deserves a second look?",
      "What would make your next decision feel aligned?",
    ],
  },
  {
    name: "David Riggs",
    slug: "david-riggs",
    role: "Entrepreneur & business turnaround specialist",
    headline: "See possibility where others see a mess.",
    summary:
      "After selling his agency, David finds a clearer connection between his natural gifts and the businesses he wants to help.",
    story:
      "David built and sold the marketing agency NUMA. His next chapter draws on an unusual combination: financial economics, rhetoric, and an interest in making sense of complex businesses. He talks with Jack about reading both the numbers and the story behind them, and the human value of helping a company recover.",
    shift:
      "David credits The Roadmap with helping him distinguish what he can do from what he actually enjoys doing. Recognizing his affinity for bringing order to messy businesses gives a clearer shape to his work in turnarounds and his desire to contribute beyond financial success.",
    topics: ["Next chapters", "Leadership"],
    takeaways: [
      "Competence and enjoyment are different clues about where you belong.",
      "Financial information and a company’s story can illuminate each other.",
      "A business turnaround can be a way to contribute to people as well as performance.",
    ],
    questions: [
      "What kind of difficult problem naturally draws you in?",
      "Where are you capable but no longer engaged?",
      "Who benefits when you put your strongest gifts to work?",
    ],
  },
  {
    name: "Josh Williamson",
    slug: "josh-williamson",
    role: "Entrepreneur",
    headline: "Recognize the strength that was there all along.",
    summary:
      "Josh finds a new way to understand his work and contribution by recognizing his gift for optimization.",
    story:
      "Feeling stuck does not always mean a person lacks ability. Josh joins Jack to discuss uncertainty, misalignment, and the shift that comes with a clearer understanding of a natural strength. For Josh, that strength is optimization: seeing how a system or situation could work better.",
    shift:
      "Josh describes The Roadmap as helping him recognize this gift and reframe how he approaches work, business, and life. Their conversation also considers relationships and meaning beyond material goals, broadening the question from what can be improved to what is worth improving.",
    topics: ["Natural strengths", "Purpose"],
    takeaways: [
      "Naming a natural strength can bring coherence to experiences that once felt disconnected.",
      "The way you approach a challenge can itself reveal a gift.",
      "Meaning reaches beyond business outcomes into relationships and everyday life.",
    ],
    questions: [
      "What do you instinctively notice could work better?",
      "What do people repeatedly ask you to help with?",
      "Where could your strengths improve life for someone else?",
    ],
  },
  {
    name: "Joel Hakala",
    slug: "joel-hakala",
    role: "Entrepreneur",
    headline: "Build for significance beyond the scoreboard.",
    summary:
      "Joel explores the connection between his natural gifts, customer experience, and a more meaningful definition of success.",
    story:
      "Finnish entrepreneur Joel Hakala joins Jack for a conversation about success and significance. The discussion turns attention from the scoreboard to the qualities a person brings to the work, including the ability to understand a customer’s experience and bring a product to market.",
    shift:
      "Joel’s Roadmap experience helped him recognize gifts in customer experience and taking products to market. His conversation offers a perspective on contribution that goes beyond measuring achievement alone, asking how natural strengths can shape what a leader chooses to build.",
    topics: ["Natural strengths", "Leadership"],
    takeaways: [
      "Measures of success do not capture every form of contribution.",
      "Understanding customer experience is a valuable natural strength.",
      "Recognizing your gifts can bring a more personal meaning to the work you build.",
    ],
    questions: [
      "What matters in your work that a scoreboard cannot capture?",
      "Where do you understand customers especially well?",
      "What would significance look like in your next chapter?",
    ],
  },
  {
    name: "Zach Kosturos",
    slug: "zach-kosturos",
    role: "Entrepreneur, husband & father",
    headline: "Make room for a fuller kind of success.",
    summary:
      "Zach and Jack explore purpose, identity, and the restlessness that can remain after achievement.",
    story:
      "Zach brings the perspective of an entrepreneur, husband, and father to a conversation about fulfillment. He and Jack consider why external achievement can leave deeper questions unanswered, and how work relates to identity, love, and the spiritual dimensions of life.",
    shift:
      "This conversation places clarity about who you are at the center of a meaningful life. For readers considering The Roadmap, it opens a useful question: how might professional ambition sit alongside the relationships and inner priorities that make life feel whole?",
    topics: ["Purpose", "Life beyond work"],
    takeaways: [
      "Achievement does not automatically settle questions of identity.",
      "Relationships deserve a place in any definition of a fulfilling life.",
      "Reflection on purpose can include the spiritual questions beneath professional ambition.",
    ],
    questions: [
      "Which part of your life needs attention beyond achievement?",
      "Who are you when your professional role is set aside?",
      "What does a meaningful day make room for?",
    ],
  },
  {
    name: "Juan Avilés",
    slug: "juan-aviles",
    role: "Attorney, investor & former Division I athlete",
    headline: "Turn understanding into forward movement.",
    summary:
      "Juan brings an athlete’s and investor’s perspective to the challenge of moving from analysis to action.",
    story:
      "Juan’s path includes Division I athletics, law, and investing. In his conversation with Jack, he examines a challenge that can affect highly capable people: spending so much energy on the process of thinking that actual progress becomes harder to see.",
    shift:
      "Juan describes The Roadmap as helping him recognize patterns that were getting in his way. The conversation centers on a more useful relationship with action, where insight supports movement rather than becoming an end in itself.",
    topics: ["Natural strengths", "Next chapters"],
    takeaways: [
      "A strong analytical ability is most useful when it informs a decision.",
      "Recognizing a recurring pattern can create room for a different response.",
      "Progress deserves to be evaluated separately from effort spent preparing.",
    ],
    questions: [
      "Where has preparation become a substitute for action?",
      "What pattern appears across your most difficult decisions?",
      "What is one concrete move your existing knowledge already supports?",
    ],
  },
  {
    name: "Rodrigo Herrera",
    slug: "rodrigo-herrera",
    role: "Technology-minded investor",
    headline: "Meet a crossroads with greater clarity.",
    summary:
      "Rodrigo shares how coaching helped him find confidence and direction at a consequential turning point.",
    story:
      "An investor based in Mexico City, Rodrigo Herrera joins Jack for a brief conversation about a critical crossroads. It is a story about the personal side of a decision: not simply evaluating opportunities, but understanding the direction that feels meaningful to the person choosing.",
    shift:
      "Rodrigo discusses how his work with Jack brought greater clarity, confidence, and a sense of purpose. The conversation offers a compact perspective on the value of finding direction when the next chapter is not yet obvious.",
    topics: ["Next chapters", "Purpose"],
    takeaways: [
      "A turning point can raise questions about purpose as well as opportunity.",
      "Clarity and confidence are closely connected in a consequential choice.",
      "A useful conversation can create space to consider what comes next.",
    ],
    questions: [
      "What makes your current crossroads personally significant?",
      "What would you need to understand to feel clearer?",
      "Which possibility connects most closely with your sense of purpose?",
    ],
  },
  {
    name: "Raghav Taparia",
    slug: "raghav-taparia",
    role: "Former marketing executive",
    headline: "Discover who you are beyond the image.",
    summary:
      "Raghav reflects on stepping away from a successful career and examining identity, fear, and inner peace.",
    story:
      "Raghav had worked in marketing for a global brand, with the outward markers of success. His conversation with Jack explores the internal questions beneath that image, including his decision to leave his job and spend a year in quiet reflection.",
    shift:
      "The episode looks at identity, surrender, and the search for peace beyond status. It is a personal account of reexamining success, offering Roadmap readers a perspective on the difference between maintaining an image and understanding what matters within it.",
    topics: ["Next chapters", "Life beyond work"],
    takeaways: [
      "Professional identity can become closely tied to an outward image.",
      "A pause can create space for questions that achievement has left unanswered.",
      "A personal account of change is an invitation to reflect, rather than a prescription to follow.",
    ],
    questions: [
      "What part of your identity depends on how others see you?",
      "What question becomes audible when you slow down?",
      "How do you recognize peace in your own life?",
    ],
  },
  {
    name: "Rob Fraser",
    slug: "rob-fraser",
    role: "Founder & CEO, Outway",
    headline: "Carry your competitive spirit into a new chapter.",
    summary:
      "Rob explores the transition from elite mountain bike racing to building a performance sock brand.",
    story:
      "Leaving elite sport brought questions of identity for Rob Fraser. As founder and CEO of Outway, he talks with Jack about the move from athlete to entrepreneur, and the relationship between business, sport, innovation, and authenticity.",
    shift:
      "Rob’s story considers what can travel with us when a defining role changes. The conversation gives Roadmap readers a grounded example of a next chapter shaped by an existing drive, with room to express it through a different kind of work.",
    topics: ["Next chapters", "Leadership"],
    takeaways: [
      "Leaving a defining role can raise questions beyond the next job.",
      "A competitive drive can find expression in a new setting.",
      "Authenticity and innovation can inform how a founder builds a business.",
    ],
    questions: [
      "Which qualities would remain if your current role ended?",
      "Where else could your strongest drive find expression?",
      "What would make a new chapter feel authentically yours?",
    ],
  },
  {
    name: "Terry Moss",
    slug: "terry-moss",
    role: "Educator & entrepreneur",
    headline: "Build something that brings joy back into the day.",
    summary:
      "Terry connects teaching, creativity, and community through a business built around LEGO experiences.",
    story:
      "A former teacher and stay-at-home dad, Terry describes a period of feeling stuck and burned out. His conversation with Jack follows the emergence of a creative business offering LEGO camps, parties, and enrichment experiences for children and adults.",
    shift:
      "Terry’s story places joy and community alongside work and entrepreneurship. For someone exploring The Roadmap, it offers a distinctive example of how familiar interests and experience can come together in a new direction.",
    topics: ["Creativity", "Next chapters"],
    takeaways: [
      "Play and creativity can have a place in meaningful work.",
      "Experience from an earlier role can contribute to a different kind of business.",
      "A new direction can bring people together as well as create a livelihood.",
    ],
    questions: [
      "What activity makes you feel curious and engaged?",
      "How could your past experience serve a new interest?",
      "What would you enjoy creating for your community?",
    ],
  },
  {
    name: "Anton Marano",
    slug: "anton-marano",
    role: "CEO, Anthony Marano Company",
    headline: "Lead by making room for other people’s gifts.",
    summary:
      "Anton shares a perspective on personal growth, humility, and leadership inside a third-generation family business.",
    story:
      "Leading a family business brings a relationship with both legacy and change. Anton Marano joins Jack to discuss the Anthony Marano Company and a leadership perspective centered on service, personal growth, and recognizing the abilities of other people.",
    shift:
      "Their conversation connects a leader’s own growth with the ability to hire talented people and make room for their contribution. It offers Roadmap readers a view of leadership in which recognizing natural gifts and practicing humility belong together.",
    topics: ["Leadership", "Natural strengths"],
    takeaways: [
      "Personal growth is part of the work of leading a business.",
      "Recognizing talent includes creating room for it to contribute.",
      "Humility can inform how a leader relates to both legacy and change.",
    ],
    questions: [
      "Whose strengths could you make more room for?",
      "Where might service change your approach to leadership?",
      "What personal growth would benefit the people you lead?",
    ],
  },
  {
    name: "Conor Kearney",
    slug: "conor-kearney",
    role: "Accountant & entrepreneur",
    headline: "Rediscover the creative part of your calling.",
    summary:
      "Conor explores the possibility that a thriving business and a long-standing creative passion can tell different parts of his story.",
    story:
      "Conor had built a thriving business in accounting, yet questions of alignment remained. In his conversation with Jack, he reflects on a long-buried interest in magic and creativity, and what it means to take that part of himself seriously again.",
    shift:
      "Conor describes The Roadmap as helping him reconnect with this creative passion. His story widens the discussion of calling beyond the work a person already does well, bringing renewed attention to the interests that have stayed with them over time.",
    topics: ["Creativity", "Natural strengths"],
    takeaways: [
      "A successful business can coexist with unanswered questions of alignment.",
      "An enduring creative interest may deserve renewed attention.",
      "Understanding a calling can include more than a person’s established professional identity.",
    ],
    questions: [
      "What early interest still feels alive to you?",
      "Where does your professional identity leave something out?",
      "How could you give a creative interest room this month?",
    ],
  },
  {
    name: "Jean Moran",
    slug: "jean-moran",
    role: "Business leader & community advocate",
    headline: "Let your contribution grow beyond a single role.",
    summary:
      "Jean reflects on leadership, family, community, and the freedom to live with greater authenticity.",
    story:
      "Jean’s experience spans five decades in packaging, leadership at LMI Packaging Solutions, and passing responsibility to a new generation. She also co-founded Building Our Future, a community initiative focused on children and education. Her conversation brings these contributions together with her life as a mother and grandmother.",
    shift:
      "Jean discusses how coaching with Jack helped her release expectations and live more authentically. Her story offers a view of contribution that continues across business, family, and community, with room for a person’s identity to grow beyond one position.",
    topics: ["Life beyond work", "Leadership"],
    takeaways: [
      "A contribution can continue as formal responsibilities change.",
      "Business experience can connect with a wider commitment to community.",
      "Releasing expectations can create room for a more authentic next chapter.",
    ],
    questions: [
      "Where could your experience contribute beyond your current role?",
      "What expectation are you ready to reconsider?",
      "What do you want the next generation to receive from you?",
    ],
  },
  {
    name: "Jeff Durkee",
    slug: "jeff-durkee",
    role: "Financial services leader",
    headline: "Find meaning in the work you are here to do.",
    summary:
      "Jeff looks beyond the corporate ladder to the strengths, relationships, and contribution that make work fulfilling.",
    story:
      "With decades in financial services, Jeff brings a long view of achievement to the first Inside the Circle conversation. He describes the limits of climbing toward increasingly senior roles and reflects on strengths in relating to people, communicating, and pursuing excellence.",
    shift:
      "Jeff describes how conversations with Jack challenged his view of career and life. He connects greater enjoyment in his work with a clearer sense of contribution, including mentoring others. His story introduces a central question of this collection: what makes success meaningful to the person living it?",
    topics: ["Purpose", "Life beyond work"],
    takeaways: [
      "A more senior title does not necessarily mean a better personal fit.",
      "Relating and communicating are meaningful strengths in their own right.",
      "Mentoring can become an important expression of professional contribution.",
    ],
    questions: [
      "Which parts of your work offer fulfillment beyond status?",
      "What strengths show up in your best relationships?",
      "Who could benefit from what your experience has taught you?",
    ],
  },
];

export const podcastEpisodes = stories.map((story, index) => ({
  ...sources[index],
  ...story,
}));
export type PodcastEpisode = (typeof podcastEpisodes)[number];
export const podcastTopics = [
  ...new Set(stories.flatMap((story) => story.topics)),
];
export function episodePath(episode: PodcastEpisode) {
  return `/inside-the-circle/${episode.slug}`;
}
export function durationLabel(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
export function publishedLabel(date: string) {
  return new Date(`${date.slice(0, 10)}T12:00:00Z`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    },
  );
}
