import { tDifficulty, tTourDurationType, tTourStatus } from "@/constants";
import { iImage } from ".";
import { iGuide } from "./user.interfaces";

export interface iTour {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  price: number;
  duration: number;
  durationType: tTourDurationType;
  location: string;
  latitude?: number;
  longitude?: number;
  meetingPoint: string;
  maxGroupSize: number;
  category: string;
  tags: string[];
  languages: string[];
  difficulty: tDifficulty;
  includes: string[];
  excludes: string[];
  whatToBring: string[];
  cancellationPolicy: string;
  approveStatus: tTourStatus;
  isActive: boolean;
  isDeleted: boolean;
  deletedBy?: string;
  rating: number;
  totalReviews: number;

  // Relations
  images: iImage[];
  guideId: string;
  guide: iGuide;
  createdAt: string;
  updatedAt: string;
}
