"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import CreateGuideForm from "../../Admin/guideManagement/CreateGuideForm";

export default function GuideApplyButton() {
  const [guideFormDialog, setGuideFormDialog] = useState(false);
  return (
    <>
      <Button
        size="lg"
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-base h-12 px-8 rounded-full shadow-lg shadow-orange-600/20 transition-all hover:scale-105"
        onClick={() => setGuideFormDialog(true)}
      >
        Apply Now
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
      <CreateGuideForm
        guideFormDialog={guideFormDialog}
        setGuideFormDialog={setGuideFormDialog}
      />
    </>
  );
}
