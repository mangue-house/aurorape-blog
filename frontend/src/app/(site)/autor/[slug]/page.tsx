import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api";
import { getAuthor } from "@/lib/public-api";

async function loadAuthor(slug: string) {
  try {
    return await getAuthor(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = await loadAuthor(slug);
  if (!author) return {};
  return { title: `${author.name} — Aurora PE`, description: author.bio ?? `Matérias de ${author.name} no Aurora PE.` };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await loadAuthor(slug);
  if (!author) notFound();

  return (
    <div className="container" style={{ padding: "3rem 0" }}>
      <div className="piaui-author" style={{ marginBottom: 0 }}>
        {author.photo_url && (
          <Image src={author.photo_url} alt={author.name} className="piaui-author__photo" width={72} height={72} />
        )}
        <div>
          <p className="piaui-author__label">Autor</p>
          <span className="piaui-author__name">{author.name}</span>
          {author.bio && <p className="piaui-author__bio">{author.bio}</p>}
        </div>
      </div>
    </div>
  );
}
