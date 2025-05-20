import ProfileHeader from "./item/profile-header";
import ProfileInfo from "./item/profile-info";
import PostGrid from "../search/item/post-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex h-screen max-h-screen p-2">
      <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl overflow-y-auto overflow-x-hidden p-4 px-14">
       <ProfileHeader />
        <ProfileInfo />
        <Tabs className="bg-white dark:bg-zinc-900">
          <TabsList className="bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 rounded-none w-full justify-start h-12 px-0">
            <TabsTrigger
              value="post"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-gray-700 dark:text-gray-200 data-[state=active]:text-blue-500 dark:data-[state=active]:text-blue-400 rounded-none h-12 px-6"
            >
              <Grid className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="playlist"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-gray-700 dark:text-gray-200 data-[state=active]:text-blue-500 dark:data-[state=active]:text-blue-400 rounded-none h-12 px-6"
            >
              <Grid className="h-4 w-4 mr-2" />
              Playlists
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post" className="mt-6"></TabsContent>
          <TabsContent value="playlist" className="mt-6"></TabsContent>
        </Tabs>
        <PostGrid />
      </div>
    </div>
  );
}
