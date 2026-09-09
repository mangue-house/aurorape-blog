import { redirect } from "next/navigation";

export default function EditarFallbackPage() {
  redirect("/admin");
}
