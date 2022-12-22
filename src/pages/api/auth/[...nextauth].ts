import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { prisma } from "../../../lib/prisma"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.userId = token.userId
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email
          }
        })
        token.userId = dbUser.id;
      }
      return token;
    }
  }
})