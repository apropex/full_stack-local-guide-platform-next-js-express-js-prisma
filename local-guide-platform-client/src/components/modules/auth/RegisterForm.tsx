/* eslint-disable react-hooks/incompatible-library */
"use client";

import AvatarUpload from "@/components/AvatarUpload";
import { _alert } from "@/components/custom-toast/CustomToast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Gender } from "@/constants";
import { iUser } from "@/interfaces/user.interfaces";
import { cn } from "@/lib/utils";
import { createUser } from "@/services/user.services";
import { getDefaultDashboardRoute } from "@/utils/proxy";
import { CreateUserPayload, CreateUserSchema } from "@/zod/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm({ dest }: { dest?: string }) {
  const [bioLength, setBioLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: Gender.MALE,
      bio: "",
      address: "",
      language: "",
      country: "Bangladesh",
      nationality: "Bangladeshi",
      password: "",
      confirmPass: "",
    },
  });

  const bio = form.watch("bio");

  useEffect(() => {
    setBioLength(bio?.length ?? 0);
  }, [bio]);

  async function onSubmit(values: CreateUserPayload) {
    if (!file) return setError("Avatar is required, upload an avatar");

    setError(null);
    setLoading(true);

    _alert.loading("Trying to register an user", { id: values.email });

    const result = await createUser(values, file);

    _alert.dismiss(values.email);
    if (!result.success) {
      _alert.error(
        "We are sorry to say that, an error occurred during registering",
        result.message,
      );
      setError(
        result.message ??
          "We are sorry to say that, an error occurred during registering",
      );
    } else {
      _alert.success("User registered successfully!");
      if ((result.data as iUser)?.isVerified === false) {
        router.push("/settings/profile");
      } else {
        router.push(
          dest ?? getDefaultDashboardRoute((result.data as iUser)?.role),
        );
      }
    }

    setLoading(false);
  }

  const commonInputStyles = (className?: string) => {
    return cn(
      "rounded-xs bg-white dark:bg-white text-[#4B4458] border-[#4B4458]/30 focus-visible:border-ring focus-visible:ring-rose-500/30 focus-visible:ring-[2px] focus-visible:border-rose-500/30 ",
      className,
    );
  };

  return (
    <div>
      {error && (
        <p className="bg-red-50 px-1 pb-0.5 rounded-xs mb-1.5 text-xs sm:text-sm text-red-600/90">
          {error}
        </p>
      )}

      <div className="space-y-4 overflow-y-auto max-h-[52vh] custom_scrollbar pl-1 pr-2 py-2">
        <AvatarUpload setAvatar={setFile} />

        <Form {...form}>
          <form
            id="user_register_form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className={commonInputStyles()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio (about you)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your bio here..."
                        {...field}
                        className={commonInputStyles("max-h-30")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <span
                className={cn(
                  "absolute right-0 top-0 text-[#4B4458]/70 text-sm",
                  {
                    "text-red-500": bioLength > 160,
                  },
                )}
              >
                {bioLength}/160
              </span>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      className={commonInputStyles()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01800000000"
                      {...field}
                      className={commonInputStyles()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={commonInputStyles(
                          `${form.formState.errors.gender && "border-red-500"} w-full`,
                        )}
                      >
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="street, city, state, zip"
                      {...field}
                      className={commonInputStyles()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language(s)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bangla, English, Spanish"
                      {...field}
                      className={commonInputStyles()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bangladesh"
                      {...field}
                      className={commonInputStyles()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bangladeshi"
                      {...field}
                      className={commonInputStyles()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} className={commonInputStyles()} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} className={commonInputStyles()} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  */}
          </form>
        </Form>
      </div>

      <div className="flex justify-end pr-2 mt-4">
        <button
          form="user_register_form"
          type="submit"
          disabled={loading}
          className={cn(
            "bg-rose-500 text-white hover:bg-rose-600 py-2 w-44 rounded-xs flex justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-default",
            {
              "animate-pulse": loading,
            },
          )}
        >
          {loading ? (
            <>
              <span>
                <span>
                  <Spinner className="size-5 text-white-500" />
                </span>
              </span>
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}
