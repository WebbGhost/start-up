// app/startup/[id]/page.tsx
import { getStartup } from "@/actions/startup";
import { StartupActions } from "@/components/shared/startup-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Eye } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export const experimental_ppr = true;

export default async function StartupPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const id = (await params).id;
  const startup = await getStartup(id);

  if (!startup) {
    notFound();
  }

  return (
    <main className="container min-h-screen py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Badge variant="secondary" className="text-sm">
              {startup.category}
            </Badge>
            <h1 className="font-bold text-4xl tracking-tight">
              {startup.title}
            </h1>
          </div>
          <StartupActions startup={startup} />
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          {/* Main Content */}
          <div className="space-y-6">
            {startup.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={startup.image}
                  alt={startup.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 font-semibold text-xl">About</h2>
                <p className="text-muted-foreground">{startup.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 font-semibold text-xl">Pitch</h2>
                <p className="text-muted-foreground">{startup.pitch}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="font-semibold text-lg">Founder</h2>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={startup.author.avatar ?? ""} />
                      <AvatarFallback>
                        {startup.author.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{startup.author.username}</p>
                      <p className="text-muted-foreground text-sm">
                        Founder & CEO
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 font-semibold text-lg">Details</h2>
                <div className="space-y-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    {startup.views.toLocaleString()} views
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {startup.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
