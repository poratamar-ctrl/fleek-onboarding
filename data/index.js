export const TEAMMATES = [
  {
    name: "Maya Patel",
    role: "People Ops Associate",
    tenure: "joined 7 months ago",
    location: "London",
    ask: "Ask me about settling in quickly and navigating startup ambiguity.",
    pronouns: "she/her",
    tag: "Buddy",
  },
  {
    name: "Jordan Kim",
    role: "Operations Lead",
    tenure: "joined 1 year, 4 months ago",
    location: "London",
    ask: "Ask me how teams collaborate across London, Karachi, and Bengaluru.",
    pronouns: "they/them",
    tag: "Cross-region",
  },
  {
    name: "Sofia Rahman",
    role: "EA & Workspace Coordinator",
    tenure: "joined 11 months ago",
    location: "London HQ",
    ask: "Ask me about how the office actually runs day-to-day.",
    pronouns: "she/her",
    tag: "Workspace",
  },
  {
    name: "Dev Iyer",
    role: "Recruiting Lead",
    tenure: "joined 2 years ago",
    location: "Bengaluru",
    ask: "Ask me about the hiring bar and how we scout operators.",
    pronouns: "he/him",
    tag: "Hiring",
  },
  {
    name: "Ayesha Khan",
    role: "Head of People",
    tenure: "joined 1 year, 9 months ago",
    location: "London",
    ask: "Your manager. Bring me messy first thoughts. That's the most useful kind.",
    pronouns: "she/her",
    tag: "Manager",
  },
];

export const LEADERSHIP = [
  {
    name: "Sanya Acharya",
    role: "Co-founder & CEO",
    bio: "Previously scaled supply chain at a Series D logistics startup. Spent two years living in Karachi to understand the resale market from the ground up.",
    quote: "We're not selling a product. We're rebuilding an industry's plumbing. One shipment, one warehouse, one operator at a time.",
  },
  {
    name: "Rohan Mehta",
    role: "Co-founder & CTO",
    bio: "Ex-staff engineer at a marketplace unicorn. Believes AI is a substrate, not a feature, and that People Ops should benefit from it as much as engineering does.",
    quote: "If a human is doing the same thing three times this month, we owe them a system. That's the deal.",
  },
  {
    name: "Priya Balan",
    role: "VP People",
    bio: "Built People functions at two Series A to C startups. Joined Fleek because the problem is operationally huge and the team treats culture like product.",
    quote: "Culture isn't a poster. It's what happens in the messy seam between two teams at 4pm on a Friday.",
  },
];

export const COFFEE_SPOTS = [
  { name: "Allpress Espresso", dist: "3 min walk", note: "Buddy meetings happen here. Order the flat white." },
  { name: "Nude Espresso", dist: "5 min walk", note: "Quietest in the mornings. Good for thinking solo." },
  { name: "Old Spitalfields Market", dist: "2 min walk", note: "Lunch options. Tuesday + Friday markets are best." },
  { name: "Boundary Rooftop", dist: "8 min walk", note: "Where we take candidates after final rounds." },
];

export const DAY_DEFS = [
  {
    id: 1,
    value: "Embrace Diversity",
    theme: "You Belong Here",
    color: "var(--d1)",
    intent: "Make you feel welcomed, emotionally safe, and excited.",
    promise: "Today is about belonging. No deliverables, no proving. Just landing.",
    reflection: "What made you feel most welcomed today?",
    handoff: "Tomorrow you'll see why Fleek exists. The broken system we're rebuilding.",
  },
  {
    id: 2,
    value: "Talk to the Customer",
    theme: "Why Fleek Exists",
    color: "var(--d2)",
    intent: "Help you emotionally connect to the mission.",
    promise: "Today is about the why. The numbers, the customers, the founders' story.",
    reflection: "What part of Fleek's mission resonates with you most?",
    handoff: "You now understand the mission. Tomorrow, you'll learn how we operate.",
  },
  {
    id: 3,
    value: "Absolute Ownership",
    theme: "How We Operate",
    color: "var(--d3)",
    intent: "Teach operational culture and ownership mindset.",
    promise: "Today is the operating manual. How decisions get made. How operators think here.",
    reflection: "What kind of impact do you want to have here?",
    handoff: "You've seen how Fleek operates. Tomorrow we put tools in your hands.",
  },
  {
    id: 4,
    value: "Curiosity Leads the Way",
    theme: "Learn Fast",
    color: "var(--d4)",
    intent: "Encourage experimentation, learning, and AI fluency.",
    promise: "Today you build. The People Ops prompt library, AI workflows, your first automation.",
    reflection: "What's one process you'd improve in your first 30 days?",
    handoff: "Last day tomorrow. We zoom out and talk about what you'll shape.",
  },
  {
    id: 5,
    value: "Dream Big & Disrupt Yourself",
    theme: "The Future You'll Shape",
    color: "var(--d5)",
    intent: "Leave you inspired and emotionally invested.",
    promise: "Today is forward-looking. Your 30-day roadmap, the future of People Ops at Fleek.",
    reflection: "What do you want your impact at Fleek to be?",
    handoff: null,
  },
];

export const ASSISTANT_RESPONSES = [
  {
    match: /buddy|maya|mentor/i,
    text: "Your onboarding buddy is Maya Patel. She joined the People Ops team 7 months ago. She blocked off Tuesday and Thursday afternoons this week specifically for you. The pattern most new joiners find useful: bring her the questions you feel slightly silly asking. That's exactly what she's there for.",
  },
  {
    match: /office|hq|address|london/i,
    text: "Our London HQ is at 22 Commercial Street, just off Spitalfields. Doors open at 8:30am, closes at 7pm. Sofia coordinates after-hours access. The People Ops desks are on the second floor, near the window overlooking the market. Wednesday and Thursday are our in-office anchor days.",
  },
  {
    match: /coffee|lunch|food/i,
    text: "Allpress is the unofficial Fleek meeting room. 3 min walk. For lunch, Old Spitalfields Market is right next door (Tue/Fri are best). Sofia keeps a running list pinned in #london-office on Slack.",
  },
  {
    match: /standup|meeting|all-hands|rituals/i,
    text: "People Ops standup is Monday and Thursday, 9:30am London time. Company all-hands is Friday 2pm London / 6:30pm Karachi / 7pm Bengaluru. We record it. Your first 30 days, you're not expected to present. After that, you'll co-lead the People Ops update once a month.",
  },
  {
    match: /tool|stack|software|notion|slack/i,
    text: "Core stack: Slack for sync, Notion for docs, Rippling for HRIS, Linear for our People Ops sprints (yes, we run People Ops in sprints), and a few internal AI tools. You'll get accounts provisioned automatically on Day 1, but ping Sofia if anything's missing.",
  },
  {
    match: /scared|nervous|imposter|overwhelmed|anxious/i,
    text: "Honest answer: most operators here felt the same in their first two weeks. Fleek moves fast and the ambiguity is real. The thing that helped me most: pick one small system you can visibly improve in the first 30 days. Ownership is the antidote to overwhelm here.",
  },
  {
    match: /value|culture|mission/i,
    text: "Five values: Dream Big & Disrupt Yourself, Absolute Ownership, Curiosity Leads the Way, Talk to the Customer, Embrace Diversity. They're not poster words. Each day this week walks you through what one of them actually looks like in practice.",
  },
  {
    match: /people ops|role|what.*i.*do|expectations/i,
    text: "Your first 30 days, the bar is: understand the system before you change it. Sit in on a few onboarding sessions, shadow Sofia on a workspace walkthrough, ride along on two new-joiner Day 1s. Then propose one thing to improve. You're not joining a support function. You're helping design how Fleek operates as it scales.",
  },
  {
    match: /salary|pay|comp|equity|benefit/i,
    text: "Comp specifics live in Rippling under your offer letter. Benefits doc is in Notion under People then London Benefits. For anything sensitive or off-record, Ayesha (your manager) is the right person. She'd rather you ask early than guess.",
  },
];

export const FALLBACK_RESPONSE =
  "Good question. I'd point you to Maya (your buddy) or Ayesha (your manager) on that one. They'll have more context than I can fake. You can also drop it in #ask-people on Slack, that channel is judgment-free.";

export const SUGGESTED_PROMPTS = [
  "Who is my onboarding buddy?",
  "What does success look like in my first 30 days?",
  "I feel a bit overwhelmed. Is that normal?",
  "What tools do I need on day one?",
];

export const DAY_TASKS = {
  1: [
    { id: "welcome", label: "Read your welcome message" },
    { id: "waiting", label: "See what's waiting for you on your desk" },
    { id: "office", label: "Explore the London HQ" },
    { id: "buddy", label: "Meet your onboarding buddy" },
    { id: "team", label: "Find three people to talk to this week" },
  ],
  2: [
    { id: "supply", label: "Walk the secondhand supply chain" },
    { id: "impact", label: "Read the impact numbers" },
    { id: "customer", label: "Hear from a customer" },
    { id: "founders", label: "Meet the founders" },
  ],
  3: [
    { id: "principles", label: "Read the operating principles" },
    { id: "scenario1", label: "Scenario: the missing laptop" },
    { id: "scenario2", label: "Scenario: the slack thread at 11pm" },
    { id: "operators", label: "How operators think here" },
  ],
  4: [
    { id: "ai-use", label: "See how People Ops uses AI today" },
    { id: "library", label: "Open the prompt library" },
    { id: "build", label: "Build your first workflow" },
    { id: "honest", label: "Read what we're still figuring out" },
  ],
  5: [
    { id: "vision", label: "Read the People Ops vision" },
    { id: "roadmap", label: "Review your 30-day roadmap" },
    { id: "final", label: "Open the final message" },
  ],
};
