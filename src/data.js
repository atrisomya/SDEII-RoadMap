export const weeks = [
  {
    id: 1, phase: 1, color: 'blue',
    title: 'Arrays & Strings — the warmup', problems: 8,
    tip: 'Don\'t set up a "study space." Just open NeetCode on your phone on the metro. First day: just watch 1 video. That\'s it. Lower the bar to start.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Watch NeetCode videos for Two Sum and Best Time to Buy/Sell Stock (video only, no coding). Evening (30 min) — Type out the Two Sum solution, understand it line by line.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Read Contains Duplicate and Valid Anagram problem statements, think through the approach without coding. Evening (30 min) — Code one of these two problems.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Watch explanation for Valid Palindrome and Product of Array Except Self. Evening — Rest. Seriously. ADHD needs recovery days.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Watch Kadane\'s Algorithm explanation for Maximum Subarray. Evening (45 min) — Code it and add a comment on each line explaining what it does in your own words.' },
      { id: 'fri', label: 'Friday', task: 'Commute — Revisit any problem you didn\'t fully understand this week. Evening — Light revision only, no new problems.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Solve 3 fresh problems from this week\'s topic. Time yourself at 20 minutes each. After each one, read the optimal solution even if you got it right.' },
      { id: 'sun', label: 'Sunday', task: 'Resume task — Write down your company name and a one-liner describing what the company does. That is this week\'s only resume job.' }
    ]
  },
  {
    id: 2, phase: 1, color: 'blue',
    title: 'Two Pointers & Sliding Window', problems: 8,
    tip: 'You might feel like skipping. That\'s normal at week 2 — the novelty has worn off. Use body doubling: study on a video call with someone or in a café. Change your environment at least once this week.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Watch Valid Palindrome II explanation and think through the two-pointer approach. Evening (30 min) — Code it.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Think through 3Sum. It\'s tricky — just watch the video and understand why sorting helps. Evening — Rest day.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Watch Container With Most Water. Evening (30 min) — Code it.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Watch Longest Substring Without Repeating Characters (sliding window pattern). Evening (30 min) — Code it.' },
      { id: 'fri', label: 'Friday', task: 'Commute — Think through Minimum Window Substring — this is harder, just watch and absorb. Evening — Rest, no coding.' },
      { id: 'sat', label: 'Saturday', task: '2-hour mock session — 3 problems timed. After each one, write down the pattern you used in one line (e.g. "shrink left pointer when condition is met").' },
      { id: 'sun', label: 'Sunday', task: 'Resume task — Rewrite your 3 weakest bullet points from your current work experience with stronger, more specific metrics.' }
    ]
  },
  {
    id: 3, phase: 1, color: 'blue',
    title: 'Binary Search — deceptively tricky', problems: 7,
    tip: 'Binary search feels easy until it isn\'t. Off-by-one errors will frustrate you. When stuck, write the loop invariant on paper. Physical writing helps ADHD brains process logic differently than staring at a screen.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Watch classic Binary Search explanation. Understand lo, hi, mid, and when to use lo <= hi vs lo < hi. Evening (30 min) — Code the classic binary search from memory.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Think through Search in Rotated Sorted Array — what changes when the array is rotated? Evening (30 min) — Code it.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Watch Find Minimum in Rotated Sorted Array. Evening — Rest.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Watch Koko Eating Bananas — this introduces binary search on answer space, a different pattern. Evening (30 min) — Code it.' },
      { id: 'fri', label: 'Friday', task: 'Commute — Think through Search a 2D Matrix. Evening (25 min) — Code it. If you can\'t solve in 25 minutes, read the solution with zero guilt.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Revisit any 2 problems you got wrong this week. Then attempt Time Based Key-Value Store as a stretch goal — it\'s harder and combines hashmaps with binary search.' },
      { id: 'sun', label: 'Sunday', task: 'Resume task — Write a first draft of your Professional Summary section (3–4 lines). It doesn\'t need to be perfect.' }
    ]
  },
  {
    id: 4, phase: 1, color: 'blue',
    title: 'Linked Lists & Stack/Queue', problems: 8,
    tip: 'You\'re a month in and energy naturally dips here. Switch your commute mode — instead of watching videos, try solving on paper by drawing pointer arrows. Physical sketching prevents phone doom-scrolling and engages a different part of your brain.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Draw a linked list reversal on paper, step by step with arrows. Watch Reverse Linked List video. Evening (30 min) — Code it from memory.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Think through Merge Two Sorted Lists with a dummy head approach. Evening (30 min) — Code it.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Watch Reorder List explanation. Evening — Rest day.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Think through Remove Nth Node From End of List — why does a two-pointer with a gap of N work? Evening (30 min) — Code it.' },
      { id: 'fri', label: 'Friday', task: 'Commute — Watch Detect Cycle in a Linked List (Floyd\'s algorithm). Evening (25 min) — Code it.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Valid Parentheses, Min Stack, Daily Temperatures. These are stack problems. For Daily Temperatures, draw the monotonic stack state on paper before coding.' },
      { id: 'sun', label: 'Sunday', task: 'Buffer day — if you\'re behind, catch up on one missed problem. If you\'re on track, rest completely. Do not add new topics on buffer days.' }
    ]
  },
  {
    id: 5, phase: 1, color: 'blue',
    title: 'Trees — the interview favourite', problems: 9,
    tip: 'Trees are visual — draw every single tree before writing a single line of code. ADHD brains are often highly visual. A drawn tree is worth 10 minutes of staring at code.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Watch Invert Binary Tree and Maximum Depth of Binary Tree. These are warm-up tree problems. Evening (30 min) — Code both.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Think through Diameter of Binary Tree — the trick is that the diameter at each node is left height plus right height. Evening (30 min) — Code it.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Watch Balanced Binary Tree and Same Tree. Evening — Rest.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Think through Subtree of Another Tree and Level Order Traversal (BFS on trees). Evening (30 min) — Code Level Order Traversal.' },
      { id: 'fri', label: 'Friday', task: 'Commute — Watch Right Side View and Validate BST explanations. Evening (30 min) — Code Validate BST.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Kth Smallest in BST and Construct Binary Tree from Preorder and Inorder Traversal. These are harder. It is okay to look at hints after 20 minutes.' },
      { id: 'sun', label: 'Sunday', task: 'Resume task — Finalize your Projects section. Choose one new project idea to build over the coming weeks and write it down with its tech stack.' }
    ]
  },
  {
    id: 6, phase: 1, color: 'blue',
    title: 'Heaps & Priority Queues', problems: 6,
    tip: 'This is a consolidation week. Friday and Saturday, go back to Week 1 and Week 2 problems and resolve them cold without looking at anything. This is spaced repetition and it is critical for ADHD memory retention. Your brain needs retrieval practice, not re-reading.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Watch Kth Largest Element in an Array and Last Stone Weight. Heaps feel abstract — just think of them as a sorted structure that gives you the min or max in O(1). Evening (30 min) — Code Kth Largest.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Think through K Closest Points to Origin. Evening (30 min) — Code it.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Watch Task Scheduler explanation. Evening — Rest.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Think through Design Twitter (top K tweets). Evening (30 min) — Code a simplified version.' },
      { id: 'fri', label: 'Friday', task: 'Spaced repetition — redo 3 problems from Week 1 and Week 2 cold, without looking at any solution or notes.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Spaced repetition continues. Redo 3 more problems from Weeks 1–3. Then attempt Merge K Sorted Lists as a stretch goal — it is hard and combines heaps with linked lists.' },
      { id: 'sun', label: 'Sunday', task: 'Resume task — Write your Skills section using the cleaned-up grouped format from the Resume tab.' }
    ]
  },
  {
    id: 7, phase: 2, color: 'green',
    title: 'Graphs: BFS & DFS', problems: 8,
    tip: 'Graphs are the most confusing topic visually. Before touching any problem this week, spend 15 minutes drawing a few graphs by hand — nodes as circles, edges as lines. Make it physical before making it digital.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Watch Number of Islands explanation. Understand the DFS flood-fill pattern. Evening (30 min) — Code it.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Think through Clone Graph. The key insight is using a hashmap to track visited nodes. Evening (30 min) — Code it.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Watch Max Area of Island. Evening — Rest.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Watch Pacific Atlantic Water Flow — think about why doing reverse DFS from oceans works better. Evening (30 min) — Code it.' },
      { id: 'fri', label: 'Friday', task: 'Commute — Watch Rotting Oranges (BFS multi-source). Evening (30 min) — Code it.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Surrounded Regions and Walls & Gates. Then attempt Course Schedule I using topological sort — this is an important interview pattern.' },
      { id: 'sun', label: 'Sunday', task: 'System Design — Read Chapter 1 of Designing Data-Intensive Applications by Martin Kleppmann. Just read, no notes required. Get a feel for how engineers think about systems at scale.' }
    ]
  },
  {
    id: 8, phase: 2, color: 'green',
    title: 'Graphs: Advanced + Union Find', problems: 6,
    tip: 'You might feel overwhelmed by graphs still. Reduce scope this week — just one problem per evening maximum. Six problems total is the goal. Quality of understanding over speed of completion.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Watch Redundant Connection using Union Find. Union Find is a new data structure — understand find() and union() with path compression. Evening (30 min) — Code it.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Think through Number of Connected Components using Union Find. Evening (30 min) — Code it.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Watch Graph Valid Tree. Evening — Rest.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Watch Word Ladder explanation — this is BFS on an implicit graph, a different way to think about graphs. Evening (30 min) — Think through it, attempt a partial solution.' },
      { id: 'fri', label: 'Friday', task: 'Commute — Watch a 45-minute YouTube video on Dijkstra\'s Algorithm conceptually. Do not code it. Just understand why it works and where it applies.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Revisit 3 graph problems you found shaky. Focus on writing the BFS template and DFS template completely from memory without reference.' },
      { id: 'sun', label: 'Sunday', task: 'System Design — Watch ByteByteGo "Scalability for Dummies" video on YouTube. Take exactly 5 bullet-point notes — no more, no less.' }
    ]
  },
  {
    id: 9, phase: 2, color: 'green',
    title: 'Dynamic Programming: 1D', problems: 8,
    tip: 'DP is the hardest topic in this entire roadmap. Do not try to "understand DP" as an abstract concept. Just pattern-match problems one at a time. For every single problem before coding, write on paper: "What is the subproblem?" That one question unlocks DP more than any tutorial.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Watch Climbing Stairs and understand why it\'s Fibonacci. Evening (30 min) — Code it, then code House Robber back to back.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Think through House Robber II — what changes when the array is circular? Evening (30 min) — Code it.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Watch Longest Palindromic Substring. Evening — Rest.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Watch Decode Ways — the branching conditions are tricky, pay attention. Evening (30 min) — Code it.' },
      { id: 'fri', label: 'Friday', task: 'Commute — Think through Coin Change. This is the classic DP problem. Evening (30 min) — Code it. If stuck after 25 minutes, read the solution.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Maximum Product Subarray, Jump Game I, Jump Game II. These are classic greedy/DP hybrids and appear frequently in interviews.' },
      { id: 'sun', label: 'Sunday', task: 'System Design — Read ByteByteGo System Design Interview Volume 1, Chapters 1 and 2 covering scale from zero to millions of users and back-of-envelope estimation.' }
    ]
  },
  {
    id: 10, phase: 2, color: 'green',
    title: 'Dynamic Programming: 2D', problems: 6,
    tip: '2D DP is genuinely dense and confusing. If you feel lost after 20 minutes on a problem, look at the solution. Studying solutions teaches you patterns significantly faster than brute-forcing alone, especially for ADHD brains that need concrete examples before abstract understanding clicks.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Watch Unique Paths and understand how the 2D grid DP table fills up. Evening (30 min) — Code it.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Watch Longest Common Subsequence — draw the DP table for a small example by hand. Evening (30 min) — Code it.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Watch Edit Distance. This is a classic and hard. Evening — Rest.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Think through Coin Change 2 — how does it differ from Coin Change 1? Evening (30 min) — Code it.' },
      { id: 'fri', label: 'Friday', task: 'Commute — Watch Target Sum explanation (can also be solved with DP or DFS+memo). Evening (25 min) — Attempt it.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Buy and Sell Stock with Cooldown, then attempt Interleaving String and Distinct Subsequences as hard stretch goals.' },
      { id: 'sun', label: 'Sunday', task: 'System Design — Design a URL Shortener. Read one blog post about it, then write a half-page design in your own words covering: API design, hash generation, database schema, and redirection flow.' }
    ]
  },
  {
    id: 11, phase: 2, color: 'green',
    title: 'System Design Deep Dive Part 1', problems: 2,
    tip: 'System design is open-ended and ADHD can spiral into rabbit holes here. Use a strict 5-minute time-box per section with this template for every design: Requirements (5 min) → Capacity Estimate (5 min) → API Design (5 min) → Data Model (5 min) → High-Level Architecture (10 min) → Bottlenecks and scaling (5 min). Set a timer for each.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Spaced repetition. Pick 4 problems from Weeks 1 through 4 that you found difficult and redo them mentally on the commute, then code them in the evening.' },
      { id: 'tue', label: 'Tuesday', task: 'Continue spaced repetition — 2 more shaky problems from early weeks.' },
      { id: 'wed', label: 'Wednesday', task: 'System Design — Design a Rate Limiter. Read the ByteByteGo chapter on rate limiting. Understand token bucket vs leaky bucket vs sliding window algorithms.' },
      { id: 'thu', label: 'Thursday', task: 'Write your own Rate Limiter design document in bullet points covering: what algorithm you\'d use, where the counter lives (Redis), API gateway integration, and edge cases.' },
      { id: 'fri', label: 'Friday', task: 'Learn Kafka basics — watch one 45-minute YouTube video covering producers, consumers, partitions, consumer groups, and offset management. Do not code anything, just conceptual understanding.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Design a Notification System from scratch. Draw the full architecture including: API layer, message queue (Kafka or RabbitMQ), worker services, retry logic, database for notification history, and push/email/SMS delivery channels.' },
      { id: 'sun', label: 'Sunday', task: 'Resume task — Write your final polished Work Experience section with all 6 bullet points refined using the templates from the Resume tab.' }
    ]
  },
  {
    id: 12, phase: 2, color: 'green',
    title: 'System Design Deep Dive Part 2', problems: 2,
    tip: 'At 3 months in, many people quit or plateau. Schedule a meaningful reward for the end of this week before the week starts — a meal out, a purchase you\'ve been holding off, a full day off from all prep. Dopamine scheduling is a real and evidence-backed ADHD strategy. Put it in your calendar now.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Watch ByteByteGo video on designing a Twitter/X feed. Understand fan-out on write vs fan-out on read and when each is appropriate. Evening (45 min) — Write out the design in your own words.' },
      { id: 'tue', label: 'Tuesday', task: 'Learn Redis in depth — caching patterns (cache-aside, write-through, write-behind), TTL management, Redis pub/sub, and Redis as a rate limiter. One blog post or video, 45 minutes.' },
      { id: 'wed', label: 'Wednesday', task: 'AWS basics conceptual awareness — understand EC2 (compute), S3 (object storage), RDS (managed database), API Gateway, and Lambda at a high level. 30 minutes total, no hands-on required.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Think through how you would design WhatsApp. What makes it different from a notification system — real-time delivery, WebSocket connections, online status, read receipts, message ordering.' },
      { id: 'fri', label: 'Friday', task: 'Evening — Write your WhatsApp design document covering: client connection management, WebSocket servers, message queue, database choice (Cassandra for messages), online presence service, and encryption at rest.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Do a full design review of both systems you designed this week. Can you explain each one clearly in 5 minutes without notes? Practice out loud.' },
      { id: 'sun', label: 'Sunday', task: 'Full resume review — go through every section in the Resume tab and make sure all placeholders are filled with real data.' }
    ]
  },
  {
    id: 13, phase: 3, color: 'pink',
    title: 'Java Depth + Concurrency', problems: 0,
    tip: 'This week is comfort zone material — you are a Java developer. Use this week intentionally to rebuild your confidence after the difficulty of DP and system design. The hard weeks are behind you.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Review Java concurrency concepts: what is a ThreadPool, how does ExecutorService work, what is the difference between submit() and execute(). Evening (45 min) — Write a small ThreadPool example using ExecutorService with a fixed thread pool of 4 threads.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Understand CompletableFuture: thenApply, thenCompose, thenCombine, exceptionally. Evening (45 min) — Write a CompletableFuture chain that calls two async methods and combines their results.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Review volatile vs synchronized vs AtomicInteger. Understand when to use each. Evening — Rest.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — JVM internals: how garbage collection works (GC types — Serial, G1, ZGC), heap vs stack memory, and classloading. Evening (45 min) — Write a summary of these concepts in your own words as if explaining to a junior developer.' },
      { id: 'fri', label: 'Friday', task: 'Commute — Spring internals: Bean lifecycle, how @Transactional works under the hood using AOP proxies. Evening (30 min) — Write a code example that demonstrates the self-invocation @Transactional pitfall.' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Redis deep dive. Implement a cache-aside pattern example in Spring Boot using Redis. Walk through TTL setting, cache invalidation, and what happens on a cache miss.' },
      { id: 'sun', label: 'Sunday', task: 'Commute — Review Elasticsearch internals you already know from work. Can you explain inverted indexes, shards, replicas, and when to use Elasticsearch vs a relational DB? Write a one-page explanation.' }
    ]
  },
  {
    id: 14, phase: 3, color: 'pink',
    title: 'Mock Interviews: DSA', problems: 0,
    tip: 'Mock interviews feel terrifying and the first one will go badly. That is the entire point. Book it before you feel ready because with ADHD, ready never arrives on its own. Use Pramp which is free and peer-to-peer, or find a friend in tech.',
    days: [
      { id: 'mon', label: 'Monday', task: 'Commute — Go through the full NeetCode 150 list. Mentally rate each: Easy, Medium, or Hard for you. Evening — Write down every Hard-rated problem. That is your retry list.' },
      { id: 'tue', label: 'Tuesday', task: 'Commute — Redo 2 Hard-rated problems mentally, think through approach. Evening (45 min) — Code them without any reference.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Redo 2 more Hard-rated problems. Evening (45 min) — Code them.' },
      { id: 'thu', label: 'Thursday', task: 'First live DSA mock interview on Pramp.com or with a peer engineer. Set a 45-minute timer. Try to record yourself or have your peer give written feedback immediately after.' },
      { id: 'fri', label: 'Friday', task: 'Review the mock. Write down exactly 3 specific things to fix — not vague things like "be faster" but specific things like "I forgot to check for null input" or "I didn\'t clarify the problem constraints before coding."' },
      { id: 'sat', label: 'Saturday', task: '2-hour session — Second mock or self-interview. Set a 45-minute timer, pick 2 medium problems you haven\'t seen before, solve them on paper with no IDE, then type and run them in the last 15 minutes.' },
      { id: 'sun', label: 'Sunday', task: 'Apply to 5 Tier 1 companies this week — Razorpay, PhonePe, CRED, Meesho, Groww. Use referrals where possible. Do not cold apply without first checking for a LinkedIn connection.' }
    ]
  },
  {
    id: 15, phase: 3, color: 'pink',
    title: 'Mock Interviews: System Design + Behavioral', problems: 0,
    tip: 'Behavioral prep is almost always skipped by technical people and it is a mistake. At SDE-2 level, 30% of the interview signal comes from behavioral questions at many companies. Write 5 STAR stories this week and rehearse each one out loud on your commute.',
    days: [
      { id: 'mon', label: 'Monday', task: 'System Design mock interview — use interviewing.io or a senior peer. Design Uber or YouTube. Record it if possible. Afterwards, identify the one biggest gap in your design.' },
      { id: 'tue', label: 'Tuesday', task: 'Based on Monday\'s feedback — fill the gap. If you missed the database choice, read about it. If you missed the scaling bottleneck, draw it out. Evening (45 min) — Redo the weak part of the design.' },
      { id: 'wed', label: 'Wednesday', task: 'Commute — Write STAR stories for: a time you took ownership of something that wasn\'t your responsibility, and a time you resolved a conflict with a teammate. Evening (45 min) — Type them out, each under 250 words.' },
      { id: 'thu', label: 'Thursday', task: 'Commute — Write STAR stories for: a time you failed and what you learned, a time you worked across teams, and a time you handled ambiguity. Evening — Type them out.' },
      { id: 'fri', label: 'Friday', task: 'Apply to 5 more companies — Atlassian India, Adobe India, Swiggy, Slice, BrowserStack. Check for LinkedIn connections first.' },
      { id: 'sat', label: 'Saturday', task: '2-hour full simulation — 45 minutes DSA (2 problems, timed, on paper), 30 minutes system design (design a search autocomplete system), 15 minutes behavioral (answer 2 STAR questions out loud).' },
      { id: 'sun', label: 'Sunday', task: 'Side project — publish something public this week. A GitHub repo with a Spring AI demo, a Medium blog post about your Elasticsearch optimization work, or a Dev.to article.' }
    ]
  },
  {
    id: 16, phase: 3, color: 'pink',
    title: 'Active Interview Phase', problems: 0,
    tip: 'Do not stop practicing while actively interviewing. This is where most people go cold and then perform badly after a 2-week gap. The hiring pipeline takes 2 to 4 weeks to convert. Keep your skills warm. 2 problems per day minimum, every day.',
    days: [
      { id: 'mon', label: 'Daily Habit', task: '2 LeetCode problems on the commute. Rotate topics — do not just do Easy problems to feel productive. Mix in a Medium from a topic you find shaky.' },
      { id: 'tue', label: 'Every 2 Days', task: 'Review one system design you\'ve done before. Can you explain it clearly and completely in 3 minutes without any notes? If not, practice until you can.' },
      { id: 'wed', label: 'Weekly Habit', task: 'Apply to 10 or more companies. Track every application in the Job Tracker in the Job Search tab. Update status as you hear back.' },
      { id: 'thu', label: 'Before Interviews', task: 'The night before, review your STAR stories. The morning of, solve one easy LC problem to warm up your brain. Do not attempt hard problems the morning of an interview.' },
      { id: 'fri', label: 'Salary Negotiation', task: 'Check levels.fyi for SDE-2 compensation benchmarks at each specific company before any offer call. Know your number and your floor before they ask. Never give a number first.' },
      { id: 'sat', label: 'Ongoing', task: 'Keep sending 2 referral messages per weekday even while interviewing. The pipeline you build now converts in 4 to 6 weeks. Plant seeds continuously.' },
      { id: 'sun', label: 'Rest & Recover', task: 'Interviewing is exhausting. Take this day off completely if you don\'t have a Monday morning interview.' }
    ]
  }
];

export const strategies = [
  { title: 'Commute = DSA time', desc: '4hr commute is an asset. Watch NeetCode videos going in, think through problems coming back. Evening session is just for typing what you absorbed.' },
  { title: '25-minute rule', desc: 'Not standard Pomodoro. Set 25 min timer. If in flow when it rings, keep going. If not, stop immediately. Never exceed 90 min total per evening.' },
  { title: 'Dopamine scheduling', desc: 'Micro-rewards after each session (only available post-session). Weekly rewards after 4+ days completed. End-of-phase rewards at Weeks 6, 12, 16.' },
  { title: 'Body doubling', desc: 'Study on video call with a friend or use Focusmate.com for Saturday 2-hour sessions. Virtual coworking Discord servers also work.' },
  { title: 'Spaced repetition', desc: 'Every Sunday of Weeks 5, 9, 13: redo 4–5 problems from 3 weeks ago without looking at solutions.' },
  { title: 'Skip days are built in', desc: 'Missing a day means continue from where you are, never try to catch up. Plan assumes 70% completion and still works. Never abandon the full plan over one missed day.' },
  { title: 'Environment design', desc: 'NeetCode bookmarked as homepage. Earphones on charger next to bag each night. Dedicated commute playlist only played during study.' },
  { title: 'Track visually', desc: 'Use a checkbox streak tracker. Mark any day with even 15 minutes done. Aim for 4–5 days per week, not perfection.' }
];

export const resumeSections = [
  { title: 'Header', content: 'Name\nFull Stack Engineer · Java · Spring Boot · Angular\nContact Info | Delhi NCR' },
  { title: 'Summary', content: 'Full Stack Engineer with 3 years of experience building production-grade systems at [Company Name], a [company type]. Specialized in Java, Spring Boot, Angular, with hands-on experience in microservices, Elasticsearch, RabbitMQ, gRPC, and AI-powered feature development using Spring AI. Delivered [metric 1] and [metric 2]. Looking to bring backend systems depth and full-stack capability to a senior engineering role.' },
  { title: 'Skills', content: 'Languages: Java 8/11, SQL\nBackend: Spring Boot, Hibernate, JPA, Spring AI, Microservices\nMessaging: RabbitMQ, gRPC, REST APIs\nFrontend: Angular v16–v19, NgRx, RxJS, Angular Material, AG Grid\nDatabases: PostgreSQL, MySQL, Elasticsearch, Redis basic\nDevOps: Docker, Jenkins, OpenShift, Git\nTesting: JUnit, Jasmine\nConcepts: System Design, REST API Design, Performance Optimization, Event-Driven Architecture' },
  { title: 'Work Experience', content: 'Software Development Engineer · [Company] · June 2023–Present\n[One-liner about company]\n• Owned 3 critical modules: [Module 1], [Module 2], [Module 3], ensuring high availability and scalability.\n• Improved Elasticsearch API latency by [X]% by optimizing queries and indexing strategies.\n• Developed and integrated Spring AI KAI chatbot, enabling [business impact/metric] (Key Differentiator).\n• Enhanced frontend performance utilizing NgRx for state management and lazy loading modules, reducing load time by [X]%.\n• Designed and implemented microservices architecture using Spring Boot and gRPC for inter-service communication.\n• Built Task Analytics dashboards providing actionable insights for [target users], increasing user engagement by [X]%.' },
  { title: 'Projects', content: 'Option A: Distributed URL shortener with Redis + Spring Boot. [Provide brief architecture description]\nOption B: Blog post about Spring AI integration. [Link to post]\n\nOnline Ticketing System: Designed an end-to-end ticketing platform using JWT authentication and clean architecture principles. Handled concurrent bookings and optimized database transactions.' },
  { title: 'Education', content: 'Master of Computer Applications (MCA) - Part-time/Distance · Expected Graduation: 2027\nMasai School Bootcamp · 2023\nBachelor of Science (B.Sc.) & Bachelor of Education (B.Ed)' },
  { title: 'Achievements', content: 'Masai Mithali Raj Scholarship: Top 5% cohort · 50% tuition waiver for excellence in DSA and full-stack development, selected from [N] students.' }
];

export const jobSearchSections = [
  {
    id: 's1',
    title: "Why You're Not Getting Callbacks",
    description: "The market is tough but your problem is specific and fixable. Here are the most common reasons for no callbacks at the 3-year mark.",
    tasks: [
      { id: 's1-1', text: 'Add company name to resume — missing company name gets you auto-filtered by ATS and human screeners' },
      { id: 's1-2', text: 'Retitle your role from "Development Engineer" to "Software Development Engineer" or "Senior Software Engineer"' },
      { id: 's1-3', text: 'Stop mass-applying to FAANG cold — conversion rate is under 1% without a referral at your level' },
      { id: 's1-4', text: 'Ensure resume has no MCA 2027 confusion — add "part-time / distance" next to it' },
      { id: 's1-5', text: 'Verify your LinkedIn headline mentions Java, Spring Boot, and "Open to SDE-2 Roles"' }
    ]
  },
  {
    id: 's2',
    title: "Referrals: The Only Strategy That Consistently Works in India",
    description: "80% of SDE-2 hires at Indian product companies happen through referrals or recruiter outreach — not cold applications. This is where you should spend 60% of your job search energy.",
    tasks: [
      { id: 's2-1', text: 'Go to LinkedIn → search "[Target Company] + Software Engineer + Java" → filter by 2nd degree connections' },
      { id: 's2-2', text: 'Message 2 people per day using this template: "Hi [Name], I\'m a Java/Spring Boot engineer with 3 years of experience exploring SDE-2 roles. I noticed you\'re at [Company] — would you be open to a 15-minute chat about what engineering looks like there?"' },
      { id: 's2-3', text: 'Search "Masai School + [target company]" on LinkedIn — alumni are most likely to respond and refer' },
      { id: 's2-4', text: 'After the call, ask directly: "Would you be comfortable submitting a referral if you think I\'d be a fit?"' },
      { id: 's2-5', text: 'Target 10 referral conversations per week (2 per weekday)' },
      { id: 's2-6', text: 'Track every conversation in the Job Tracker section below' },
      { id: 's2-7', text: 'Follow up with anyone who hasn\'t responded in 5 days — one polite nudge is fine' }
    ]
  },
  {
    id: 's3',
    title: "Where To Apply: Tiered Target List",
    description: "Apply in this order. Do not skip to Tier 3 before exhausting Tier 1. Tier 1 has the highest callback rate for a 3-year Java engineer right now.",
    tasks: [
      { id: 's3-1', text: 'Apply to at least 5 Tier 1 companies this week with tailored resume' },
      { id: 's3-2', text: 'Apply to at least 3 Tier 2 companies this week' },
      { id: 's3-3', text: 'Submit 1–2 Tier 3 applications (treat as lottery tickets, not pipeline)' },
      { id: 's3-4', text: 'Never apply to more than 30 companies per week — quality targeting beats spray-and-pray' },
      { id: 's3-5', text: 'For each application, check if you have a 2nd degree LinkedIn connection at that company first' }
    ],
    tiers: {
      tier1: ['Razorpay', 'PhonePe', 'CRED', 'Zepto', 'Meesho', 'Groww', 'Slice', 'Fi Money', 'Juspay', 'BrowserStack', 'Postman', 'Atlassian India', 'Adobe India'],
      tier2: ['Swiggy', 'Urban Company', 'Freshworks', 'Zoho', 'Nutanix', 'Rubrik', 'Palo Alto Networks India', 'Sharechat', 'Dailyhunt'],
      tier3: ['Google', 'Amazon', 'Microsoft', 'Flipkart', 'Uber India', 'Walmart Global Tech', 'Salesforce India']
    }
  },
  {
    id: 's4',
    title: "LinkedIn Optimization (One-Time Setup + Weekly Habit)",
    description: "LinkedIn is your most underused tool. Recruiters are actively searching for Java + Spring Boot candidates. Make sure they find you.",
    tasks: [
      { id: 's4-1', text: 'Change headline to: "Full Stack Engineer | Java · Spring Boot · Angular · Microservices | Open to SDE-2 Roles"' },
      { id: 's4-2', text: 'Turn on Open to Work → set to "Recruiters only" (not public green banner)' },
      { id: 's4-3', text: 'Rewrite About section with your resume summary (3–4 lines, end with what you\'re looking for)' },
      { id: 's4-4', text: 'Add all skills: Java, Spring Boot, Microservices, Elasticsearch, RabbitMQ, gRPC, Angular, NgRx, PostgreSQL, Docker, Spring AI' },
      { id: 's4-5', text: 'Turn on Creator Mode in LinkedIn settings' },
      { id: 's4-6', text: 'Connect with 10 technical recruiters this week — search "technical recruiter Java India" and send a note: "Hi, I\'m a Java/Spring Boot SDE with 3 years of experience exploring SDE-2 roles — happy to connect"' },
      { id: 's4-7', text: 'Post once per week — technical content only (debugging lesson, Spring AI tip, Elasticsearch optimization, system design thought)' },
      { id: 's4-8', text: 'Comment meaningfully on 3 posts from people at your target companies' },
      { id: 's4-9', text: 'Send 2 referral messages per day (weekdays only)' },
      { id: 's4-10', text: 'Check who viewed your profile — if it\'s a recruiter, message them first' }
    ]
  },
  {
    id: 's5',
    title: "Platforms Beyond LinkedIn (Setup This Week)",
    description: "These platforms have better signal-to-noise than Naukri for product companies. Set them up once and let inbound come to you.",
    tasks: [
      { id: 's5-1', text: 'Instahyre — create profile, upload resume, add all skills. Funded startups actively recruit here. Check weekly.' },
      { id: 's5-2', text: 'Cutshort — fill profile completely. Good for Series A/B startups. Your Spring AI experience stands out here.' },
      { id: 's5-3', text: 'Wellfound (AngelList India) — good for well-funded startups. Set job preferences to SDE-2, Java, remote/hybrid.' },
      { id: 's5-4', text: 'Naukri — update profile every 3 days (even one word change) to stay at top of recruiter searches' },
      { id: 's5-5', text: 'Set Naukri current salary to 9 LPA, expected to 15 LPA, notice period accurately' },
      { id: 's5-6', text: 'Get Naukri Resume Score above 80 — fill every section' },
      { id: 's5-7', text: 'Apply to maximum 20–30 targeted roles per week on Naukri, not hundreds' }
    ]
  },
  {
    id: 's6',
    title: "The Spring AI Differentiator: Your Unfair Advantage",
    description: "You shipped an AI-powered chatbot using Spring AI in production at 3 years of experience. This is rare. Recruiters are actively searching for Spring AI right now and almost no one is writing about it. Use this aggressively.",
    tasks: [
      { id: 's6-1', text: 'Write a LinkedIn post this week: "How my team integrated Spring AI into our product — what worked, what didn\'t" — 200 words, technical, honest. Use hashtags #SpringAI #Java #SpringBoot #AI' },
      { id: 's6-2', text: 'Write the same content as a blog post on Medium or Dev.to — link it from your LinkedIn and resume' },
      { id: 's6-3', text: 'Add a GitHub repo (even a demo/simplified version of the AI integration) with a good README' },
      { id: 's6-4', text: 'In every interview intro, mention Spring AI in your first 60 seconds — it will always prompt a follow-up question and that\'s where you shine' },
      { id: 's6-5', text: 'When messaging recruiters or asking for referrals, include one line about Spring AI: "I\'ve also shipped an AI-powered feature using Spring AI in production which has been a unique experience"' },
      { id: 's6-6', text: 'Monitor LinkedIn for people posting about Spring AI — comment with genuine insight. This gets you noticed by the right people.' }
    ]
  },
  {
    id: 's7',
    title: "This Week's Action Plan (Start Here)",
    description: "Stop reading, start doing. These 7 actions in the next 7 days will move the needle more than any amount of planning.",
    tasks: [
      { id: 's7-1', text: 'Day 1 (Today): Add company name to resume. Retitle role. Add city. Save as PDF.' },
      { id: 's7-2', text: 'Day 2: Update LinkedIn headline, About section, turn on Open to Work (recruiters only)' },
      { id: 's7-3', text: 'Day 3: Write and post the Spring AI LinkedIn post' },
      { id: 's7-4', text: 'Day 4: Message 5 Masai School alumni at Tier 1 target companies' },
      { id: 's7-5', text: 'Day 5: Create Instahyre and Cutshort profiles fully' },
      { id: 's7-6', text: 'Day 6 (Weekend): Update Naukri completely. Apply to 10 targeted Tier 1 roles.' },
      { id: 's7-7', text: 'Day 7 (Weekend): Write the Spring AI Medium/Dev.to blog post. Publish it.' },
      { id: 's7-8', text: 'After Week 1: 2 referral messages per weekday (10/week)' },
      { id: 's7-9', text: 'After Week 1: 1 LinkedIn post per week (technical content)' },
      { id: 's7-10', text: 'After Week 1: 10–20 targeted applications per week across all platforms' },
      { id: 's7-11', text: 'After Week 1: Follow up on any application older than 7 days with no response' },
      { id: 's7-12', text: 'After Week 1: Add every new contact and application to the Job Tracker' }
    ]
  }
];

export const DEFAULT_TRACKER_ROWS = [
  { id: '1', company: '', role: '', appliedVia: '', date: '', referral: 'No', status: 'Applied', notes: '' },
  { id: '2', company: '', role: '', appliedVia: '', date: '', referral: 'No', status: 'Applied', notes: '' },
  { id: '3', company: '', role: '', appliedVia: '', date: '', referral: 'No', status: 'Applied', notes: '' },
  { id: '4', company: '', role: '', appliedVia: '', date: '', referral: 'No', status: 'Applied', notes: '' },
  { id: '5', company: '', role: '', appliedVia: '', date: '', referral: 'No', status: 'Applied', notes: '' }
];
