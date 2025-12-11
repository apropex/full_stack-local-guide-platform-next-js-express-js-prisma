/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

//

export interface iChildren {
  children: Readonly<React.ReactNode>;
}

export interface iResponse<T> {
  statusCode?: number;
  success: boolean;
  message: string;
  meta?: {
    total_records?: number;
    filtered_records?: number;
    present_records?: number;
    total_pages?: number;
    present_page?: number;
    skip?: number;
    limit?: number;
    options?: Record<string, any>;
  };
  data: T;
}

export interface iImage {
  id: string;
  url: string;
  publicId: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  folder?: string;
  createdAt: string;
}
