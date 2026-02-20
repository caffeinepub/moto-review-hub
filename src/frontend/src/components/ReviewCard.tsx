import { Link } from '@tanstack/react-router';
import { type GearReview } from '../backend';
import StarRating from './StarRating';
import { Calendar, User } from 'lucide-react';

interface ReviewCardProps {
  review: GearReview;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Link
      to="/review/$id"
      params={{ id: index.toString() }}
      className="group block bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src="/assets/generated/featured-review.dim_800x600.png"
          alt={review.gearName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-moto-orange bg-moto-orange/10 px-3 py-1 rounded-full">
            {review.category}
          </span>
          <StarRating value={review.rating} readonly size={18} />
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-moto-orange transition-colors">
          {review.gearName}
        </h3>
        <p className="text-sm font-semibold text-muted-foreground mb-3">{review.brand}</p>
        <p className="text-muted-foreground mb-4 line-clamp-3">{truncateText(review.reviewText, 150)}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{review.reviewerName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(review.publicationDate)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
