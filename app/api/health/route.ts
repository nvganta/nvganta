export async function GET() {
  return new Response(JSON.stringify({ ok: true, status: "up" }), {
    headers: { "content-type": "application/json" },
  })
}

