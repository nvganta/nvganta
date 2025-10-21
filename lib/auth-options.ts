import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string | undefined
        session.user.name = token.name as string | undefined
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

