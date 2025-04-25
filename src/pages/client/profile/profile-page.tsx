import { useLocation, useSearchParams } from 'react-router-dom';
import ProfileHeader from './item/profile-header';
import ProfileInfo from './item/profile-info';
import ContentTabs from './item/content-tabs';


function PostDetail({ type }: { type: 'post' | 'playlist' }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        {type === 'post' ? 'Post Detail' : 'Playlist Detail'}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        This is a placeholder for the {type} detail page.
      </p>
    </div>
  );
}

export default function ProfilePage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const renderContent = () => {
    switch (true) {
      case location.pathname === '/client/profile/post' && Boolean(id):
        return <PostDetail type="post" />;
      case location.pathname === '/client/profile/playlist' && Boolean(id):
        return <PostDetail type="playlist" />;
      default:
        return (
          <>
            <ProfileHeader />
            <ProfileInfo />
            <ContentTabs />
          </>
        );
    }
  };

  return (
    <div className="h-screen max-h-screen p-2">
      <div className="h-full rounded-xl overflow-y-auto overflow-x-hidden scroll-but-hidden bg-white/50 dark:bg-zinc-800/70">
        {renderContent()}
      </div>
    </div>
  );
}