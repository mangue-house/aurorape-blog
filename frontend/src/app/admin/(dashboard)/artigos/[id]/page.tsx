import { redirect } from "next/navigation";

export default async function ArticleIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/admin/artigos/${id}/editar`);
}
