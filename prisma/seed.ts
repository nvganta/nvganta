import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME || "Admin"
  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set for seeding")
    process.exit(1)
  }
  const hash = await bcrypt.hash(password, 10)
  await prisma.user.upsert({
    where: { email },
    create: { email, password: hash, role: "admin", name },
    update: { password: hash, name },
  })
  console.log("Seeded admin user:", email, "(name:", name + ")")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
