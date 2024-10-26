"use client";

import { Calendar, ExternalLink, Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface StartupCardProps {
  author: {
    username: string;
    avatar?: string;
  };
  title: string;
  slug: string;
  description: string;
  category: string;
  image?: string;
  views: number;
  createdAt: Date;
}

const StartupCard = ({
  author,
  title,
  slug,
  description,
  category,
  image,
  views,
  createdAt,
}: StartupCardProps) => {
  const router = useRouter();

  return (
    <Card className="group hover:-translate-y-1 relative overflow-hidden bg-background transition-all duration-300 hover:shadow-lg">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/startup/${slug}`)}
      >
        <CardHeader>
          <div className="flex flex-col gap-3">
            <Badge className="w-fit" variant="secondary">
              {category}
            </Badge>
            <h3 className="font-semibold text-xl tracking-tight transition-colors group-hover:text-primary">
              {title}
            </h3>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="line-clamp-2 text-muted-foreground text-sm">
            {description}
          </p>

          {image && (
            <div className="relative h-48 w-full overflow-hidden rounded-md">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          <div
            className="flex items-center gap-3"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/profile/${author.username}`);
            }}
          >
            <Avatar className="h-9 w-9 cursor-pointer transition-opacity hover:opacity-80">
              <AvatarImage src={author.avatar} alt={author.username} />
              <AvatarFallback className="font-medium">
                {author.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="cursor-pointer font-medium text-sm hover:text-primary">
                {author.username}
              </p>
              <p className="text-muted-foreground text-xs">Founder</p>
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="border-t bg-muted/10">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-4 text-muted-foreground text-xs">
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              {views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="opacity-0 transition-all duration-300 group-hover:opacity-100"
            onClick={() => router.push(`/startup/${slug}`)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StartupCard;
