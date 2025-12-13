/* eslint-disable react-hooks/incompatible-library */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JwtPayload } from "jsonwebtoken";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";

// আপনার Prisma মডেলের উপর ভিত্তি করে স্কিমা তৈরি করুন
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  address: z.string().optional(),
  bio: z
    .string()
    .max(160, { message: "Bio cannot exceed 160 characters." })
    .optional(),
  language: z.string().optional(),
  country: z.string().optional(),
});

// ডামি ডিফল্ট মান
// const defaultValues = {
//   name: "Jane Doe",
//   email: "jane.doe@example.com",
//   phone: "+8801700000000",
//   gender: "FEMALE",
//   address: "123 Main St, Anytown",
//   bio: "Passionate traveler and food enthusiast.",
//   language: "Bengali",
//   country: "Bangladesh",
// };

interface iProps {
  user: JwtPayload;
}

export function MyDetailsForm({ user }: iProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    // defaultValues: defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with:", values);
    // এখানে API কল করার লজিক লিখুন
  }

  return (
    <Card className="max-w-4xl mx-auto bg-transparent border-none">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">
          Personal Information
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Update your account&apos;s personal information and email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* 1. Avatar Section (Unique) */}
            <div className="flex items-center space-x-4 mb-8 p-4 border border-dashed border-border rounded-lg bg-background/50">
              <Avatar className="h-20 w-20 ring-4 ring-primary ring-offset-2 ring-offset-background">
                <AvatarImage asChild src={user.avatar}>
                  {/* Next.js Image Component */}
                  <Image
                    src={user.avatar}
                    alt="User Avatar"
                    layout="fill"
                    objectFit="cover"
                  />
                </AvatarImage>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Profile Picture</p>
                <p className="text-sm text-muted-foreground">
                  Max 2MB. JPG or PNG.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-auto hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Change Photo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 2. Name */}
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
                        className="bg-input/80 border-border focus:border-primary transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 3. Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        disabled
                        {...field}
                        className="bg-muted/50 border-border"
                      />
                    </FormControl>
                    <FormDescription>
                      Your email is unique and non-editable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 4. Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1234567890"
                        {...field}
                        className="bg-input/80 border-border focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 5. Gender */}
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
                        <SelectTrigger className="w-full bg-input/80 border-border focus:ring-primary">
                          <SelectValue placeholder="Select your gender" />
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

              {/* 6. Language */}
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Language</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. English, Bengali"
                        {...field}
                        className="bg-input/80 border-border focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 7. Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Bangladesh"
                        {...field}
                        className="bg-input/80 border-border focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 8. Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your full address"
                      {...field}
                      className="resize-none bg-input/80 border-border focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 9. Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (Short Description)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little about yourself"
                      {...field}
                      className="resize-none bg-input/80 border-border focus:border-primary"
                    />
                  </FormControl>
                  <FormDescription>
                    {form.watch("bio")?.length || 0} / 160 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button in CardFooter */}
            <CardFooter className="p-0 pt-4 border-t border-border mt-8 -mx-6 -mb-6 flex justify-end">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-6 transition-all duration-300 group mr-3 mb-3"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Saving..." : "Update Details"}
                <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
