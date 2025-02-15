import {
    Heart ,
    MessageCircle,
    Ellipsis
} from "lucide-react";

interface PostMultiImgProps {
  images: string[];
  audioSrc?: string;
  initialMuted?: boolean;
  initialPlaying?: boolean;
}

const ActionBar: React.FC<PostMultiImgProps> = ({

}: PostMultiImgProps) => {


  return (
    <div className="h-screen flex items-center">
    <Heart/>
    <MessageCircle />\
    <Ellipsis />
    </div>
  );
};

export default ActionBar;
