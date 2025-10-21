import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"

const handler = NextAuth({
  ...authOptions,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user || !user.password) return null
        const ok = await bcrypt.compare(credentials.password, user.password)
        if (!ok) return null
        return { id: user.id, email: user.email, name: user.name || undefined }
      }
    })
  ],
})

export { handler as GET, handler as POST }
