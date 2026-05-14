const PHOTO = (n) => `https://i.pravatar.cc/160?img=${n}`;

export const TEAMMATES = [
  {
    name: "Maya Patel",
    role: "Operations Associate",
    tenure: "joined 7 months ago",
    location: "London",
    ask: "Ask me about settling in quickly and navigating startup ambiguity.",
    photo: PHOTO(44),
    tag: "Buddy",
  },
  {
    name: "Jordan Kim",
    role: "Operations Lead",
    tenure: "joined 1 year, 4 months ago",
    location: "London",
    ask: "Ask me how teams collaborate across London, Karachi, and Bengaluru.",
    photo: PHOTO(12),
    tag: "Cross-region",
  },
  {
    name: "Sofia Rahman",
    role: "Executive Assistant",
    tenure: "joined 11 months ago",
    location: "London HQ",
    ask: "I've been holding the office together. Ask me everything about how it actually runs, then take it from me.",
    photo: PHOTO(47),
    tag: "Handover",
  },
  {
    name: "Dev Iyer",
    role: "Talent Lead",
    tenure: "joined 2 years ago",
    location: "Bengaluru",
    ask: "Ask me about the hiring bar and how we scout operators.",
    photo: PHOTO(11),
    tag: "Hiring",
  },
  {
    name: "Alex Nikityuk",
    role: "Head of AI",
    tenure: "joined 1 year, 9 months ago",
    location: "London",
    ask: "Your manager. Bring me messy first thoughts. That's the most useful kind.",
    photo: null,
    tag: "Manager",
  },
];

export const MANAGER = {
  name: "Alex Nikityuk",
  role: "Head of AI",
  photo: null,
};

export const LEADERSHIP = [
  {
    name: "Abhi",
    role: "Co-founder",
    photo: "/assets/abhi.png",
    bio: "Got the idea for Fleek living on Brick Lane during the pandemic, watching vintage resellers source inventory the hard way. MBA from Cambridge, BS from UC Berkeley. Previously co-founded Verchable (video AI) and was an early employee at Dubsmash, where he led growth to 300M users (acquired by Reddit).",
    quote: "I lived above the vintage shops. I watched buyers fly to Pakistan with cash to source bales. The supply chain wasn't broken because the people were broken. The tools were.",
  },
  {
    name: "Sanket",
    role: "Co-founder",
    photo: "/assets/sanket.png",
    bio: "Veteran technologist with more than a decade in Silicon Valley. Built product and engineering at Google, Suki, and Uber. Most recently at Postmates, where he led consumer product (20M MAU) and marketing tech ($5M/month).",
    quote: "If a human is doing the same thing three times this month, we owe them a system. That's the deal at Fleek.",
  },
];

export const COFFEE_SPOTS = [
  { name: "Allpress Espresso", dist: "3 min walk", note: "Where buddy coffees happen. Order the flat white." },
  { name: "Nude Espresso", dist: "5 min walk", note: "Quietest in the mornings. Good for thinking solo." },
  { name: "Old Spitalfields Market", dist: "2 min walk", note: "Lunch options. Tuesday and Friday markets are the move." },
  { name: "Beigel Bake (Brick Lane)", dist: "6 min walk", note: "24/7. Salt beef bagel after a late one." },
  { name: "Dishoom Shoreditch", dist: "8 min walk", note: "Book ahead. Where we take candidates after final rounds." },
  { name: "Pophams (Hanbury St)", dist: "4 min walk", note: "Sausage roll and a flat white. Walk-in only." },
];

export const BUSINESS_FACTS = [
  { k: "What", v: "A B2B marketplace where vintage stores, online resellers and retail buyers source graded secondhand inventory from wholesalers and rag houses." },
  { k: "How", v: "FleekSort, an AI model fine-tuned on secondhand fashion that grades, prices and categorises any item from a single photo." },
  { k: "Where", v: "Live across the UK, Europe and the US. Suppliers in Pakistan, India and beyond." },
  { k: "Scale", v: "Founded Nov 2021. 9 million items routed away from landfill. Tripled in size year on year." },
  { k: "Backed by", v: "~$50M from a16z, Y Combinator, Burda Principal Investments, HV Capital. Advisors from Depop, Shopify, Postmates." },
  { k: "Market", v: "Secondhand fashion projected to hit $350B by 2027." },
];

export const YOUTUBE_VIDEOS = [
  { title: "Inside the Karachi sorting facility", duration: "4:12", tag: "Operations" },
  { title: "How FleekSort grades a bale in seconds", duration: "2:48", tag: "Product" },
  { title: "Why secondhand fashion is broken (and how we fix it)", duration: "6:30", tag: "Mission" },
  { title: "Day in the life: vintage reseller in Berlin", duration: "5:05", tag: "Customer" },
];

export const SWAG = [
  { kind: "tee", label: "Fleek tee", note: "Heavyweight, fits true to size." },
  { kind: "hoodie", label: "Crew hoodie", note: "London winters edition." },
  { kind: "tote", label: "Canvas tote", note: "For market runs at Spitalfields." },
  { kind: "notebook", label: "Field notebook", note: "Take messy notes in week one." },
  { kind: "bottle", label: "Reusable bottle", note: "Kitchen has a still and sparkling tap." },
  { kind: "stickers", label: "Sticker pack", note: "For your laptop and the office fridge." },
];

export const DAY_DEFS = [
  {
    id: 1,
    value: "Embrace Diversity",
    theme: "You Belong Here",
    color: "var(--d1)",
    intent: "Make you feel welcomed, and oriented enough to walk in on Monday with confidence.",
    promise: "Today is about landing. The building, the people, the gear, and the why behind all of it.",
    reflection: "What made you feel most welcomed today?",
    handoff: "Tomorrow you'll see why Fleek exists. The broken system we're rebuilding.",
  },
  {
    id: 2,
    value: "Talk to the Customer",
    theme: "Why Fleek Exists",
    color: "var(--d2)",
    intent: "Help you emotionally connect to the mission.",
    promise: "Today is the why. The numbers, the customers, the founders' story.",
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
    theme: "Learn Fast, Build Faster",
    color: "var(--d4)",
    intent: "Get you fluent in the AI-native toolkit you'll run People Ops on.",
    promise: "Today is the toolkit. Deel, the AI stack, the prompt library, and what we're still figuring out.",
    reflection: "What's one process you'd improve in your first 30 days?",
    handoff: "Last day tomorrow. We zoom out and talk about what you'll shape.",
  },
  {
    id: 5,
    value: "Dream Big & Disrupt Yourself",
    theme: "The Future You'll Shape",
    color: "var(--d5)",
    intent: "Leave you inspired and emotionally invested.",
    promise: "Today is forward looking. Your 30-day roadmap, and the role you'll grow into.",
    reflection: "What do you want your impact at Fleek to be?",
    handoff: null,
  },
];

export const ASSISTANT_RESPONSES = [
  {
    match: /buddy|maya|mentor/i,
    text: "Your onboarding buddy is Maya Patel. She joined the Operations team 7 months ago. She blocked off Tuesday and Thursday afternoons this week specifically for you. The pattern most new joiners find useful: bring her the questions you feel slightly silly asking.",
  },
  {
    match: /alex|manager|head of ai/i,
    text: "Alex Nikityuk is your manager. He's Head of AI and runs the founder's office work that touches every function. He hired you because People Ops at Fleek runs on AI by default. Bring him messy first thoughts, that's the most useful kind.",
  },
  {
    match: /office|hq|address|london|commercial/i,
    text: "London HQ is at 22 Commercial Street, E1, just off Spitalfields. Front desk is open 8am to 7pm. The Operations desks are on the second floor near the east-facing windows. Your desk is the third one from the corner. This is a 5-day in-office role, by the way.",
  },
  {
    match: /coffee|lunch|food|eat/i,
    text: "Walkable list: Allpress (3 min, flat white), Nude (5 min, quiet mornings), Pophams (4 min, sausage roll), Old Spitalfields Market (2 min, Tue/Fri), Beigel Bake (6 min, 24/7), Dishoom (8 min, book ahead).",
  },
  {
    match: /deel|payroll|hris/i,
    text: "Deel is the system. Payroll runs through Deel. Benefits, pensions, visas, contracts, all of it. You'll be the source of truth, and Alex expects payroll to run flawlessly every cycle. The London cycle closes on the 25th.",
  },
  {
    match: /standup|meeting|all-hands|all hands|rituals|offsite/i,
    text: "Operations standup is Monday and Thursday, 9:30am London time. Company all-hands is Friday 2pm London / 6:30pm Karachi / 7pm Bengaluru. We record it. You'll be owning All Hands logistics by month two. Offsites are quarterly. Next one is in Lisbon, Q2.",
  },
  {
    match: /tool|stack|software|notion|slack|zapier|make|n8n/i,
    text: "Core stack: Slack, Notion, Deel, Linear, Google Workspace. AI: ChatGPT and Claude (paid seats for everyone). Automation: Zapier and Make today, n8n is being trialed. You'll have opinions on which actually pay back, we want to hear them.",
  },
  {
    match: /scared|nervous|imposter|overwhelmed|anxious/i,
    text: "Honest answer: most operators here felt the same in their first two weeks. Fleek moves fast and the ambiguity is real. The thing that helped most: pick one small system you can visibly improve in the first 30 days. Ownership is the antidote to overwhelm here.",
  },
  {
    match: /value|culture|mission/i,
    text: "Five values: Dream Big & Disrupt Yourself, Absolute Ownership, Curiosity Leads the Way, Talk to the Customer, Embrace Diversity. They're not poster words. Each day this week walks you through what one of them actually looks like in practice.",
  },
  {
    match: /people ops|role|what.*i.*do|expectations|swag|workspace/i,
    text: "Your first 30 days, the bar is: understand the system before you change it. Sit in on a new joiner Day 1, shadow Sofia on a workspace walkthrough, watch one full payroll cycle in Deel. Then propose one thing to improve. You're not joining a support function, you're designing how Fleek operates.",
  },
  {
    match: /salary|pay|comp|equity|benefit/i,
    text: "Comp specifics live in Deel under your offer letter. Benefits doc is in Notion → People → London Benefits. For anything sensitive, Alex is the right person. He'd rather you ask early than guess.",
  },
];

export const FALLBACK_RESPONSE =
  "Good question. I'd point you to Maya (your buddy) or Alex (your manager) on that one. They'll have more context than I can fake. You can also drop it in #ask-operations on Slack, that channel is judgment-free.";

export const SUGGESTED_PROMPTS = [
  "Who is my onboarding buddy?",
  "What does success look like in my first 30 days?",
  "How does payroll work in Deel?",
  "I feel a bit overwhelmed. Is that normal?",
];

export const DAY_TASKS = {
  1: [
    { id: "welcome", label: "Read your welcome note" },
    { id: "why", label: "Get the business in 60 seconds" },
    { id: "waiting", label: "See your gear and swag" },
    { id: "office", label: "Find your desk on the floor plan" },
    { id: "watch", label: "Watch a few Fleek videos" },
    { id: "people", label: "Meet the people you'll lean on" },
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
    { id: "stack", label: "Your toolkit, top to bottom" },
    { id: "ai-use", label: "See how People Ops uses AI today" },
    { id: "library", label: "Open the prompt library" },
    { id: "honest", label: "Read what we're still figuring out" },
  ],
  5: [
    { id: "vision", label: "Read the People Ops vision" },
    { id: "roadmap", label: "Review your 30-day roadmap" },
    { id: "final", label: "Open the final message" },
  ],
};
