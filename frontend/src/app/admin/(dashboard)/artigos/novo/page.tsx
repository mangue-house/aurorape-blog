import { requireAdminToken } from "@/lib/auth";
import { listAuthors, listCategoriesAdmin } from "@/lib/admin-api";
import ArticleForm from "@/components/admin/ArticleForm";
import { createArticleAction } from "../actions";

export const metadata = { title: "Nova matéria — Aurora PE Admin" };

export default async function NewArticlePage() {
  const token = await requireAdminToken();
  const [categories, authors] = await Promise.all([listCategoriesAdmin(token), listAuthors(token)]);

  return (
    <ArticleForm
      mode="create"
      categories={categories}
      authors={authors}
      action={createArticleAction}
    />
  );
}
