"use client";

import { CircleUserRoundIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface iProps {
  setAvatar: Dispatch<SetStateAction<File | null>>;
  preview?: string;
}

export default function AvatarUpload({ setAvatar, preview }: iProps) {
  const [isPreview, setIsPreview] = useState<string | null | undefined>(
    preview,
  );
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || isPreview || null;
  const fileName = files[0]?.file.name || null;

  useEffect(() => {
    if (files?.[0]) setAvatar(files[0].file as File);
    else setAvatar(null);
  }, [files, setAvatar]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        <Button
          aria-label={previewUrl ? "Change image" : "Upload image"}
          className="relative size-16 overflow-hidden p-0 shadow-none"
          onClick={openFileDialog}
          variant="outline"
        >
          {previewUrl ? (
            <Image
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFC..."
              className="size-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={64}
              height={64}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-4 opacity-60" />
            </div>
          )}
        </Button>
        {previewUrl && (
          <Button
            aria-label="Remove image"
            className="-top-2 -right-2 absolute size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
            onClick={() => {
              setIsPreview(null);
              removeFile(files[0]?.id);
            }}
            size="icon"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          aria-label="Upload image file"
          className="sr-only"
          tabIndex={-1}
        />
      </div>
      {fileName ? (
        <p className="text-muted-foreground text-xs">{fileName}</p>
      ) : (
        <p
          aria-live="polite"
          className="mt-2 text-muted-foreground text-xs"
          role="region"
        >
          Upload an Avatar
        </p>
      )}
    </div>
  );
}
