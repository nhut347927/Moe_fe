// UserCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { User } from "../types";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border rounded-xl">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold">{user.name}</h3>
              {user.verified && (
                <Badge
                  variant="outline"
                  className="ml-1 h-5 bg-blue-500/10 text-blue-500 border-blue-500/20"
                >
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{user.username}</p>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
              {user.bio}
            </p>

            <div className="flex items-center gap-4 mt-2">
              <div className="text-xs">
                <span className="font-semibold">{user.followers.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">Người theo dõi</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold">{user.following.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">Đang theo dõi</span>
              </div>
            </div>
          </div>

          <Button size="sm" className="rounded-xl">
            <UserPlus className="h-4 w-4 mr-1" />
            Theo dõi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}