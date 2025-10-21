export async function POST(req: Request) {
  // TODO: persist AnalyticsEvent
  try {
    const body = await req.json()
    // Accept but do nothing yet
    return new Response(null, { status: 202 })
  } catch {
    return new Response(null, { status: 400 })
  }
}

