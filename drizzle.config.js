/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://Ai-Content-generator_owner:gcU90bVaAErf@ep-icy-voice-a5guoa14.us-east-2.aws.neon.tech/Ai-Content-generator?sslmode=require',
    }
  };