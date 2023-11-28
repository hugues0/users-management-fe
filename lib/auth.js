//import type { NextAuthOptions } from "next-auth";
import { login } from "@/services/api.service";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          return await login({
            email,
            password,
          });
        } catch (error) {
          throw new Error(JSON.stringify({ ...error.response.data }));
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },
    async jwt({ token, user }) {
      return { ...user, ...token };
    },

    async session({ session, token }) {
      const jwt = token;
      session.accessToken = jwt.accessToken;
      session.user = jwt.user;
      return session;
    },
  },
  pages: {
    signIn: "/tasks",
  },
};
