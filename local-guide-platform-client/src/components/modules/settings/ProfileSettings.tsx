"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { iUser } from "@/interfaces/user.interfaces";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import CreateGuideForm from "../Admin/guideManagement/CreateGuideForm";
import AccountVerification from "./AccountVerification";

interface TagInputProps {
  label: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder: string;
}

const TagInput = ({ label, tags, setTags, placeholder }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-input/50 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50 mt-1">
        {tags.map((tag) => (
          <Badge
            key={tag}
            className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer transition-colors"
            onClick={() => removeTag(tag)}
          >
            {tag}
            <XCircle className="w-3 h-3 ml-1" />
          </Badge>
        ))}
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[100px] border-none focus-visible:ring-0 shadow-none p-0 h-auto bg-transparent"
        />
      </div>
    </div>
  );
};
// =========================================================================

export function ProfileSettings({ initialData }: { initialData: iUser }) {
  // State management for Guide form (for demonstration)
  const [guideExpertise, setGuideExpertise] = useState(
    initialData.guide?.expertise || [],
  );
  const [guideLanguages, setGuideLanguages] = useState(
    initialData.guide?.languages || [],
  );
  const [guideAbout, setGuideAbout] = useState(initialData.guide?.about || "");
  const [guideFormDialog, setGuideFormDialog] = useState(false);

  return (
    <div className="space-y-10">
      {!initialData.isVerified && (
        <div className="bg-destructive/80 rounded-xl text-white py-4 px-3 text-xl md:text-2xl">
          <p>
            Your account is not verified yet! Verify your account by sending an
            OTP from below
          </p>
        </div>
      )}

      {/* 1. General Profile Status Card (Animated Entrance) */}
      <Card className="shadow-xl border-t-4 border-primary/70 bg-card/70 backdrop-blur-md animate-fade-in-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Account Status</CardTitle>
          <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-1">
            {initialData.role}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-2">
              {initialData.isVerified ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className="text-lg">
                Email Verified:
                <span
                  className={`font-semibold ml-2 ${initialData.isVerified ? "text-green-400" : "text-red-400"}`}
                >
                  {initialData.isVerified ? "Verified" : "Unverified"}
                </span>
              </span>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-2">Role Overview</h3>
              <p className="text-muted-foreground">
                {initialData.role === "GUIDE" &&
                  "You are currently registered as a Guide. Manage your specialized profile below."}
                {initialData.role === "ADMIN" &&
                  "You have Administrator privileges. Manage your access and verification below."}
                {initialData.role === "TOURIST" &&
                  "You are a general user. You can apply to become a Guide or Admin anytime."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {!initialData.isVerified && (
        <AccountVerification email={initialData.email} />
      )}

      {/* ========================================================================= */}
      {/* 2. Guide Profile Settings (Conditional Rendering) */}
      {/* ========================================================================= */}
      {initialData.role === "GUIDE" && initialData.guide && (
        <Card className="shadow-xl bg-card/70 backdrop-blur-md animate-fade-in-up delay-[200ms]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-yellow-500" /> Guide
              Specific Details
            </CardTitle>
            <CardDescription>
              Update your professional details, rates, and expertise to attract
              travelers.
            </CardDescription>
            <Separator className="mt-4" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Verification Status */}
            <div className="p-4 rounded-lg bg-yellow-900/10 border border-yellow-500/30">
              <div className="flex items-center">
                {initialData.guide.isVerifiedGuide ? (
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-orange-500 mr-2" />
                )}
                <p className="font-semibold text-lg">
                  Verification Status:
                  <span
                    className={`ml-2 ${initialData.guide.isVerifiedGuide ? "text-green-400" : "text-orange-400"}`}
                  >
                    {initialData.guide.isVerifiedGuide
                      ? "Verified"
                      : "Pending/Required"}
                  </span>
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Your guide status must be verified by an Admin to appear in
                search results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expertise (Tag Input) */}
              <TagInput
                label="Areas of Expertise (Press Enter to add)"
                tags={guideExpertise}
                setTags={setGuideExpertise}
                placeholder="History, Food, Hiking..."
              />

              {/* Languages (Tag Input) */}
              <TagInput
                label="Spoken Languages (Press Enter to add)"
                tags={guideLanguages}
                setTags={setGuideLanguages}
                placeholder="English, Spanish, Bengali..."
              />
            </div>

            {/* About */}
            <div>
              <Label htmlFor="guide-about">About Me</Label>
              <Textarea
                id="guide-about"
                value={guideAbout}
                onChange={(e) => setGuideAbout(e.target.value)}
                rows={4}
                placeholder="Write a brief, engaging description about your guiding style and experience."
                className="bg-input/80 border-border focus:border-primary"
              />
            </div>

            {/* Rates and Experience */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <Label className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-green-500" /> Hourly
                  Rate
                </Label>
                <Input
                  type="number"
                  defaultValue={initialData.guide.hourlyRate}
                  placeholder="0.00"
                  className="bg-input/80"
                />
              </div>
              <div className="space-y-1">
                <Label className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-green-500" /> Daily
                  Rate
                </Label>
                <Input
                  type="number"
                  defaultValue={initialData.guide.dailyRate}
                  placeholder="0.00"
                  className="bg-input/80"
                />
              </div>
              <div className="space-y-1">
                <Label>Experience (Years)</Label>
                <Input
                  type="number"
                  defaultValue={initialData.guide.experienceYears}
                  placeholder="0"
                  className="bg-input/80"
                />
              </div>
              <div className="space-y-1">
                <Label>Average Rating</Label>
                <Input
                  type="number"
                  value={initialData.guide.averageRating}
                  disabled
                  className="bg-muted/50 text-muted-foreground"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>City</Label>
                <Input
                  defaultValue={initialData.guide.city}
                  placeholder="City of Operation"
                  className="bg-input/80"
                />
              </div>
              <div className="space-y-1">
                <Label>Country</Label>
                <Input
                  defaultValue={initialData.guide.country}
                  placeholder="Country of Operation"
                  className="bg-input/80"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 font-semibold transition-all group"
              >
                Save Guide Profile{" "}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* 3. Admin Profile Settings (Conditional Rendering) */}
      {/* ========================================================================= */}
      {(initialData.role === "ADMIN" || initialData.role === "SUPER_ADMIN") &&
        initialData.admin && (
          <Card className="shadow-xl bg-card/70 backdrop-blur-md animate-fade-in-up delay-[400ms]">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-red-500" />{" "}
                Administrator Panel
              </CardTitle>
              <CardDescription>
                View your assigned permissions and verification status as an
                administrator.
              </CardDescription>
              <Separator className="mt-4" />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Permissions Display (Read-only) */}
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Assigned Permissions
                </h4>
                <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-red-500/30 bg-red-900/10">
                  {/* Dummy Admin Permissions */}
                  {[
                    "MANAGE_USERS",
                    "DELETE_TOURS",
                    "VERIFY_GUIDES",
                    "VIEW_REPORTS",
                  ].map((perm) => (
                    <Badge
                      key={perm}
                      variant="destructive"
                      className="bg-red-600/80 hover:bg-red-600"
                    >
                      {perm}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Permissions are set by a supervising administrator and cannot
                  be edited here.
                </p>
              </div>

              {/* Admin Verification Status */}
              <div className="p-4 rounded-lg bg-gray-900/10 border border-gray-500/30">
                <div className="flex items-center">
                  {initialData.admin.isVerifiedAdmin ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <p className="font-semibold text-lg">
                    Admin Verification:
                    <span
                      className={`ml-2 ${initialData.admin.isVerifiedAdmin ? "text-green-400" : "text-red-400"}`}
                    >
                      {initialData.admin.isVerifiedAdmin
                        ? "Verified"
                        : "Unverified"}
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {/* 4. Upgrade/CTA Card (If not Guide/Admin) */}
      {initialData.role === "TOURIST" && (
        <Card className="shadow-xl border-l-4 border-blue-500 bg-card/70 backdrop-blur-md animate-fade-in-up delay-[200ms]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Become a Guide</CardTitle>
            <CardDescription>
              Interested in sharing your local knowledge? Apply to become a
              certified guide today!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setGuideFormDialog(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start Guide Application
            </Button>
            <CreateGuideForm
              guideFormDialog={guideFormDialog}
              setGuideFormDialog={setGuideFormDialog}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
