import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewer = (version: number): CreateAssistantDTO => (
    {
      name: "Interviewer",
      firstMessage:
          "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
      },
      voice: {
        provider: "11labs",
        voiceId: "sarah",
        stability: 0.4,
        similarityBoost: 0.8,
        speed: 0.9,
        style: 0.5,
        useSpeakerBoost: true,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

${version > 1
    ? `Welcome the candidate back. Let them know this is their ${version}th attempt, and ask if they're now fully ready to ace the interview. Inform them that you'll be stricter in your analysis this time and expect significant improvement.`
    : `Welcome the candidate to the interview and briefly explain that you'll be evaluating their performance across several key categories.`
}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
          },
        ],
      },
    }
);

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const feedbackPrompt = ({previousFeedback, version, transcript} : {previousFeedback?: string; version: number; transcript: string}) => {
  return `
      You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and critical in your assessment.

       This is attempt number ${version} by the candidate. Because this is version ${version}, your expectations should be ${version === 1 ? "standard" : version === 2 ? "higher" : "significantly higher"}. Be ${version === 1 ? "firm" : "strict"} in your evaluation — expect more clarity, depth, and confidence in responses as the attempts increase. If the candidate still makes the same mistakes, deduct more points and highlight those areas clearly.

      That is: 
      - ${version >= 3 ? "Be twice as strict." : ""}
      - Mention repeated mistakes clearly
      - Expect more nuanced response

      ${previousFeedback && `
          Here is the candidate's previous feedback from version ${version - 1}: ${previousFeedback}
          
         Review the new transcript, and:
          - Look for signs of improvement or repeated weaknesses.
          - Score accordingly.
          - Do not repeat identical feedback unless the mistake was truly repeated
      `}

      Transcript:
      ${transcript}
      
      Do not be lenient. The goal is to push the candidate toward real-world readiness by showing them exactly where they need to grow.

      Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
      - Communication Skills: Clarity, articulation, structured responses.
      - Technical Knowledge: Understanding of key concepts for the role.
      - Problem-Solving: Ability to analyze problems and propose solutions.
      - Cultural & Role Fit: Alignment with company values and job role.
      - Confidence & Clarity: Confidence in responses, engagement, and clarity.
        `
}