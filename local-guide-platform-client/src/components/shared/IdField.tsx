"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function IdField({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div className="relative flex items-center gap-1.5 font-mono text-sm group">
      <span className="cursor-default absolute top-0 border border-border/30 bg-foreground text-background inline-block py-px px-1 scale-0 opacity-0 group-hover:scale-100 group-hover:-top-8 group-hover:opacity-100 transition-all duration-150">
        {id}
      </span>
      <span className="truncate max-w-[150px] cursor-default">{id}</span>
      <button
        onClick={handleCopy}
        className="relative flex items-center justify-center w-5 h-5 transition-all active:scale-90"
        aria-label="Copy ID"
      >
        {copied ? (
          <CheckIcon
            size={14}
            className="text-green-500 animate-in zoom-in duration-300"
          />
        ) : (
          <CopyIcon
            size={14}
            className="text-muted-foreground hover:text-foreground transition-colors"
          />
        )}
      </button>
    </div>
  );
}
