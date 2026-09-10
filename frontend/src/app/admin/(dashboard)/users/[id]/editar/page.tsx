import { notFound } from "next/navigation";
import { requireAdminToken } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { getAuthorById } from "@/lib/admin-api";
import AuthorEditForm from "@/components/admin/AuthorEditForm";
import { updateAuthorAction } from "../../actions";

export const metadata = { title: "Editar colaborador — Aurora PE Admin" };

export default async function EditAuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = await requireAdminToken();

  let author;
  try {
    author = await getAuthorById(token, Number(id));
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="admin-topbar__breadcrumb">
            <a href="/admin/users" style={{ color: "var(--color-muted)" }}>
              Colaboradores
            </a>{" "}
            / Editar
          </p>
          <h1>Editar colaborador</h1>
        </div>
      </div>

      <div className="admin-body">
        <AuthorEditForm author={author} action={updateAuthorAction.bind(null, author.id)} />
      </div>
    </>
  );
}
