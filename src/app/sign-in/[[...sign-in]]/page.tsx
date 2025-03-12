import { routes } from "@/config/routes"
import { redirect } from "next/navigation"

export default function SignInPage() {
  // Redirect to the existing sign-in page
  redirect(routes.signIn)
}
