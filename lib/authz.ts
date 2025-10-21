import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return { ok: false as const, status: 401, message: "Unauthorized" }
  }
  // Single-admin model; extend with role if needed
  return { ok: true as const, email: session.user.email }
}

