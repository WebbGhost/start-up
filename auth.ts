// auth.ts
import { prisma } from "@/lib/db";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
// Add this type declaration at the top of your file
declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username: string;
    bio: string;
    avatar: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (!user.email) return false;

      try {
        const existingUser = await prisma.author.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.author.create({
            data: {
              name: user.name || "",
              username: (profile?.login as string) || "",
              email: user.email,
              avatar: user.image || "",
              bio: (profile?.bio as string) || "",
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },

    async session({ session }) {
      if (session?.user?.email) {
        const user = await prisma.author.findUnique({
          where: { email: session.user.email },
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
            avatar: true,
            bio: true,
          },
        });

        if (user) {
          session.user.id = user.id;
          session.user.username = user.username ?? "";
          session.user.bio = user.bio ?? "";
          session.user.avatar = user.avatar ?? "";
        }
      }
      return session;
    },

    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id;
        token.username = profile?.login;
      }
      return token;
    },
  },
});
