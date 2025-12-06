import { cn } from "@/lib/utils";
import {
  CircleCheckBig,
  LoaderPinwheel,
  OctagonAlert,
  TriangleAlert,
} from "lucide-react";
import hot_toast from "react-hot-toast";

interface LoadingOptions {
  id?: string;
  description?: string;
}

const commonTostStyle = (visible?: boolean, className?: string): string => {
  return cn(
    {
      "animate-enter": visible,
      "animate-leave": !visible,
    },
    "w-[330px] border border-neutral-800 rounded p-4 shadow-xl flex gap-3 items-center",
    className,
  );
};

export const _alert = {
  success: (message: string, description?: string) => {
    hot_toast.custom(({ visible }) => (
      <div className={commonTostStyle(visible, "bg-teal-600 border-teal-900")}>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
          <CircleCheckBig className="size-8 text-green-500" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-white font-semibold">{message}</p>
          {description && (
            <p className="text-white/80 text-sm mt-0.5">{description}</p>
          )}
        </div>
      </div>
    ));
  },
  error: (message: string, description?: string) => {
    hot_toast.custom(({ visible }) => (
      <div className={commonTostStyle(visible, "bg-rose-600 border-rose-900")}>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
          <OctagonAlert className="size-8 text-red-500" />
        </div>

        <div className="flex flex-col">
          <p className="text-white font-semibold">{message}</p>
          {description && (
            <p className="text-white/80 text-sm mt-0.5">{description}</p>
          )}
        </div>
      </div>
    ));
  },

  warn: (message: string, description?: string) => {
    hot_toast.custom(({ visible }) => (
      <div
        className={commonTostStyle(visible, "bg-amber-500 border-amber-900")}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
          <TriangleAlert className="size-8 text-yellow-500" />
        </div>

        <div className="flex flex-col">
          <p className="text-white font-semibold">{message}</p>
          {description && (
            <p className="text-white/80 text-sm mt-0.5">{description}</p>
          )}
        </div>
      </div>
    ));
  },

  loading: (message: string, options?: LoadingOptions): string => {
    return hot_toast.custom(
      ({ visible }) => (
        <div
          className={commonTostStyle(
            visible,
            "bg-purple-600 border-purple-900",
          )}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
            <LoaderPinwheel className="size-8 text-purple-500 animate-spin" />
          </div>

          <div className="flex flex-col">
            <p className="text-white font-semibold">{message}</p>
            {options?.description && (
              <p className="text-white/80 text-sm mt-0.5">
                {options?.description}
              </p>
            )}
          </div>
        </div>
      ),
      {
        id: options?.id ?? "api-loading-hot_toast",
        duration: Infinity,
      },
    );
  },

  dismiss: (id: string) => hot_toast.dismiss(id),
};
