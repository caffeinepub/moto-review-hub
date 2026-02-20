import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetAllGearReviews } from '../hooks/useQueries';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Package } from 'lucide-react';

export default function ReviewDetail() {
  const { id } = useParams({ from: '/review/$id' });
  const navigate = useNavigate();
  const { data: reviews = [], isLoading } = useGetAllGearReviews();

  const reviewIndex = parseInt(id);
  const review = reviews[reviewIndex];

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const relatedReviews = reviews
    .filter((r, i) => i !== reviewIndex && r.category === review?.category)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-card rounded w-1/3" />
            <div className="h-96 bg-card rounded" />
            <div className="h-64 bg-card rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black text-foreground mb-4">Review Not Found</h1>
          <Button onClick={() => navigate({ to: '/reviews' })}>
            <ArrowLeft className="mr-2" size={18} />
            Back to Reviews
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <Button
          onClick={() => navigate({ to: '/reviews' })}
          variant="ghost"
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2" size={18} />
          Back to Reviews
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/assets/generated/featured-review.dim_800x600.png"
              alt={review.gearName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Review Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm font-bold uppercase tracking-wider text-moto-orange bg-moto-orange/10 px-4 py-2 rounded-full">
                {review.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              {review.gearName}
            </h1>
            <p className="text-2xl font-bold text-muted-foreground mb-6">{review.brand}</p>
            
            <div className="flex items-center gap-4 mb-8">
              <StarRating value={review.rating} readonly size={32} />
              <span className="text-2xl font-bold text-foreground">
                {review.rating}.0 / 5.0
              </span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <User size={20} />
                <span className="font-semibold">Reviewed by {review.reviewerName}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar size={20} />
                <span>{formatDate(review.publicationDate)}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Package size={20} />
                <span className="capitalize">Category: {review.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Review Text */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-3xl font-black text-foreground mb-6">Full Review</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {review.reviewText}
            </p>
          </div>
        </div>

        {/* Specifications */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-3xl font-black text-foreground mb-6">Specifications</h2>
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="font-semibold text-muted-foreground">Brand</span>
              <span className="font-bold text-foreground">{review.brand}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="font-semibold text-muted-foreground">Category</span>
              <span className="font-bold text-foreground capitalize">{review.category}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="font-semibold text-muted-foreground">Overall Rating</span>
              <span className="font-bold text-foreground">{review.rating} / 5 Stars</span>
            </div>
          </div>
        </div>

        {/* Related Reviews */}
        {relatedReviews.length > 0 && (
          <div>
            <h2 className="text-3xl font-black text-foreground mb-8">Related Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedReviews.map((relatedReview, index) => (
                <ReviewCard
                  key={index}
                  review={relatedReview}
                  index={reviews.indexOf(relatedReview)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
