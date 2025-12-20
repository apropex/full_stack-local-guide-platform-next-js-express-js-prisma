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
      <span className="truncate md:block max-w-[150px] cursor-default">
        {id}
      </span>
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
