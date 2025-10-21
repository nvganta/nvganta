"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const callbackUrl = params.get("callbackUrl") || "/admin"

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await signIn("credentials", { email, password, redirect: false, callbackUrl })
    setLoading(false)
    if (res?.ok) router.push(callbackUrl)
    else setError(res?.error || "Login failed")
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                 className="mt-1 w-full rounded-md border px-3 py-2 bg-transparent" required />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                 className="mt-1 w-full rounded-md border px-3 py-2 bg-transparent" required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  )
}

