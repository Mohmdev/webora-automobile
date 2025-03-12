import { bcryptPasswordHash } from "@/lib/bcrypt"
import type { PrismaClient, User } from "@prisma/client"

export async function seedAdmin(prisma: PrismaClient) {
  const password = await bcryptPasswordHash("BiaBokhoresh420")
  const email = "ymo@webora.app"

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  let admin: User

  if (existingAdmin) {
    // Update existing admin
    admin = await prisma.user.update({
      where: {
        email,
      },
      data: {
        hashedPassword: password,
      },
    })
    console.log("Admin updated: ", admin)
  } else {
    // Create new admin
    admin = await prisma.user.create({
      data: {
        email,
        hashedPassword: password,
      },
    })
    console.log("Admin created: ", admin)
  }

  return admin
}
