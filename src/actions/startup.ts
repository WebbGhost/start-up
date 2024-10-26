// actions/startup.ts
import { StartupFormValues } from "@/app/(root)/startup/create/page";
import { prisma } from "@/lib/db";

import { Prisma } from "@prisma/client";
import { auth } from "../../auth";

// lib/utils.ts
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
export type Startup = Prisma.StartupGetPayload<{
  include: { author: true };
}>;

export type Author = Prisma.AuthorGetPayload<{
  include: { startups: true };
}>;

export async function getStartups(query?: string) {
  const startups = await prisma.startup.findMany({
    include: { author: true },
    where: query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });
  return startups;
}

export async function getStartup(slug: string) {
  const startup = await prisma.startup.findUnique({
    where: { slug },
    include: { author: true },
  });
  return startup;
}

export async function createStartup(data: StartupFormValues) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const author = await prisma.author.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!author) {
    throw new Error("Author not found");
  }

  const startup = await prisma.startup.create({
    data: {
      slug: slugify(data.title),
      title: data.title,
      description: data.description,
      pitch: data.pitch,
      category: data.category,
      image: data.image,
      authorId: author.id,
    },
    include: { author: true },
  });

  return startup;
}
