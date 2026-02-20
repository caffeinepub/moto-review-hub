import { Link } from '@tanstack/react-router';
import { type Vlog } from '../backend';
import { Play, Calendar, Film } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CategoryType } from '../backend';

interface VideoCardProps {
  video: Vlog;
  index: number;
}

export default function VideoCard({ video, index }: VideoCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const thumbnailUrl = video.thumbnailUrl || '/assets/generated/vlog-thumbnail.dim_640x360.png';
  const isCinematics = video.category === CategoryType.cinematics;

  return (
    <Link
      to="/video/$id"
      params={{ id: index.toString() }}
      className="group block bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="aspect-video overflow-hidden bg-muted relative">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-moto-orange/90 group-hover:bg-moto-red group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-xl">
            <Play size={28} className="text-white fill-white ml-1" />
          </div>
        </div>
        {isCinematics && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-moto-orange to-moto-red text-white border-0 px-2 py-1 text-xs font-bold uppercase tracking-wider shadow-lg">
            <Film className="mr-1" size={12} />
            Cinematics
          </Badge>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-moto-orange transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{truncateText(video.description, 100)}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar size={14} />
            <span>{formatDate(video.publicationDate)}</span>
          </div>
          {video.categoryTags.length > 0 && (
            <div className="flex gap-2">
              {video.categoryTags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold uppercase tracking-wider text-moto-orange bg-moto-orange/10 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
