"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({
  confirmMessage,
  onDelete,
}: {
  confirmMessage: string;
  onDelete: () => Promise<void>;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (!window.confirm(confirmMessage)) return;
    setPending(true);
    try {
      await onDelete();
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button className="btn-icon btn-icon--danger" title="Excluir" onClick={handleClick} disabled={pending}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4h6v2" />
      </svg>
    </button>
  );
}
