import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetAllVideos } from '../hooks/useQueries';
import VideoEmbed from '../components/VideoEmbed';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, Film } from 'lucide-react';
import { CategoryType } from '../backend';

export default function VideoPlayer() {
  const { id } = useParams({ from: '/video/$id' });
  const navigate = useNavigate();
  const { data: videos = [], isLoading } = useGetAllVideos();

  const videoIndex = parseInt(id);
  const video = videos[videoIndex];

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCategoryLabel = (category: CategoryType) => {
    return category === CategoryType.cinematics ? 'Cinematics' : 'Regular';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-card rounded w-1/3" />
            <div className="aspect-video bg-card rounded" />
            <div className="h-64 bg-card rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black text-foreground mb-4">Video Not Found</h1>
          <Button onClick={() => navigate({ to: '/videos' })}>
            <ArrowLeft className="mr-2" size={18} />
            Back to Videos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          onClick={() => navigate({ to: '/videos' })}
          variant="ghost"
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2" size={18} />
          Back to Videos
        </Button>

        {/* Video Player */}
        <div className="mb-8">
          <VideoEmbed videoUrl={video.videoUrl} />
        </div>

        {/* Video Info */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-black text-foreground">
              {video.title}
            </h1>
            {video.category === CategoryType.cinematics && (
              <Badge className="bg-gradient-to-r from-moto-orange to-moto-red text-white border-0 px-3 py-1 text-sm font-bold uppercase tracking-wider">
                <Film className="mr-1" size={14} />
                Cinematics
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={18} />
              <span>{formatDate(video.publicationDate)}</span>
            </div>
            <Badge variant="outline" className="border-moto-orange text-moto-orange">
              {getCategoryLabel(video.category)}
            </Badge>
            {video.categoryTags.length > 0 && (
              <div className="flex gap-2">
                {video.categoryTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold uppercase tracking-wider text-moto-orange bg-moto-orange/10 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-black text-foreground mb-4">About This Video</h2>
          <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}
