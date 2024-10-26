"use client";

import { createStartup } from "@/actions/startup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const startupFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(500, "Description cannot exceed 500 characters"),
  pitch: z
    .string()
    .min(100, "Pitch must be at least 100 characters")
    .max(1000, "Pitch cannot exceed 1000 characters"),
  category: z.enum([
    "SaaS",
    "AI/ML",
    "E-commerce",
    "FinTech",
    "HealthTech",
    "EdTech",
    "Gaming",
    "IoT",
    "Mobile",
    "Other",
  ]),
  image: z.string().url("Please enter a valid image URL").optional(),
});

export type StartupFormValues = z.infer<typeof startupFormSchema>;

export default function CreateStartupPage() {
  const router = useRouter();
  const form = useForm<StartupFormValues>({
    resolver: zodResolver(startupFormSchema),
    defaultValues: {
      title: "",
      description: "",
      pitch: "",
      category: undefined,
      image: "",
    },
  });

  const [state, formAction] = useActionState(
    async (formData: FormData) => {
      try {
        const rawFormData = Object.fromEntries(formData.entries());
        const data = startupFormSchema.parse(rawFormData);

        const startup = await createStartup(data);

        toast.success("Startup created successfully!");
        router.push(`/startup/${startup.slug}`);

        return { status: "success" };
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors = error.errors.map((e) => e.message);
          toast.error(errors.join("\n"));
          return { status: "error", errors };
        }

        toast.error("Failed to create startup");
        return {
          status: "error",
          errors: ["An unexpected error occurred"],
        };
      }
    },
    { status: "idle" },
  );

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Create Your Startup</CardTitle>
            <CardDescription>
              Share your startup idea with the community. Fill out the form
              below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form action={formAction} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Startup Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your startup name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Choose a memorable name for your startup
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SaaS">SaaS</SelectItem>
                          <SelectItem value="AI/ML">AI/ML</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="FinTech">FinTech</SelectItem>
                          <SelectItem value="HealthTech">HealthTech</SelectItem>
                          <SelectItem value="EdTech">EdTech</SelectItem>
                          <SelectItem value="Gaming">Gaming</SelectItem>
                          <SelectItem value="IoT">IoT</SelectItem>
                          <SelectItem value="Mobile">Mobile</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the category that best describes your startup
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly describe your startup"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A short, compelling description of your startup (50-500
                        characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pitch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pitch</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your startup pitch"
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your detailed startup pitch (100-1000 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter an image URL for your startup"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add a cover image URL for your startup (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={state.status === "pending"}>
                    {state.status === "pending"
                      ? "Creating..."
                      : "Create Startup"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
