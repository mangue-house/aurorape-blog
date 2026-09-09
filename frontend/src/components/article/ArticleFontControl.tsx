"use client";

import { useState } from "react";

const SIZES = ["font-sm", "", "font-lg"];

export default function ArticleFontControl() {
  const [idx, setIdx] = useState(1);

  function apply(nextIdx: number) {
    const body = document.getElementById("article-body");
    if (!body) return;
    if (SIZES[idx]) body.classList.remove(SIZES[idx]);
    if (SIZES[nextIdx]) body.classList.add(SIZES[nextIdx]);
    setIdx(nextIdx);
  }

  return (
    <div className="font-controls" style={{ marginLeft: "auto" }}>
      <button
        className="font-btn"
        aria-label="Diminuir fonte"
        title="Diminuir fonte"
        disabled={idx <= 0}
        onClick={() => apply(idx - 1)}
      >
        A-
      </button>
      <button
        className="font-btn"
        aria-label="Aumentar fonte"
        title="Aumentar fonte"
        disabled={idx >= SIZES.length - 1}
        onClick={() => apply(idx + 1)}
      >
        A+
      </button>
    </div>
  );
}
