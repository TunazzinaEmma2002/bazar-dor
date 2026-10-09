import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "@/lib/mongodb";

// env value-r shuru/shesh-er extra space ke kete dey
const clean = (v?: string) => v?.trim() ?? "";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: clean(process.env.GOOGLE_CLIENT_ID),
      clientSecret: clean(process.env.GOOGLE_CLIENT_SECRET),
    },
    github: {
      clientId: clean(process.env.GITHUB_CLIENT_ID),
      clientSecret: clean(process.env.GITHUB_CLIENT_SECRET),
    },
  },
});