import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface VideoCardProps {
  videoId: string;
  hash: string;
  title?: string;
  description?: string;
  fullscreen?: boolean;
  isActive?: boolean;
}

const VideoCard = ({ videoId, hash, title, description, fullscreen = false, isActive = true }: VideoCardProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!fullscreen || !iframeRef.current) return;
    
    // Pause video when not active
    if (!isActive) {
      iframeRef.current.contentWindow?.postMessage('{"method":"pause"}', '*');
    }
  }, [isActive, fullscreen]);

  if (fullscreen) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-background via-card to-accent/5">
        <div className="relative w-full h-full flex items-center justify-center px-0 md:px-2 lg:px-4">
          <div className="w-full h-full md:aspect-video md:max-w-6xl">
            <iframe
              ref={iframeRef}
              title={title}
              src={`https://player.vimeo.com/video/${videoId}?h=${hash}&title=0&byline=0&portrait=0&controls=1&color=9d174d&playsinline=1&dnt=1`}
              className="w-full h-full border-0 rounded-none md:rounded-lg shadow-none md:shadow-[var(--shadow-elegant)]"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 animate-fade-in">
      <AspectRatio ratio={16 / 9}>
        <iframe
          title={title}
          src={`https://player.vimeo.com/video/${videoId}?h=${hash}`}
          className="w-full h-full border-0 rounded-lg"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
        />
      </AspectRatio>
      {(title || description) && (
        <div className="p-4 pt-2">
          {title && (
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default VideoCard;
