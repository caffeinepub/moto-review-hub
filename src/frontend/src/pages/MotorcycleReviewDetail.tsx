import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { useMotorcycleReviewsQuery } from '../hooks/useQueries';
import StarRating from '../components/StarRating';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Bike } from 'lucide-react';

export default function MotorcycleReviewDetail() {
  const { id } = useParams({ from: '/motorcycles/$id' });
  const navigate = useNavigate();
  const { data: reviews = [], isLoading } = useMotorcycleReviewsQuery();

  const reviewIndex = parseInt(id);
  const review = reviews[reviewIndex];

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="h-96 bg-card rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-black text-foreground mb-4">Review Not Found</h1>
            <p className="text-muted-foreground mb-8">The motorcycle review you're looking for doesn't exist.</p>
            <Button
              onClick={() => navigate({ to: '/motorcycles' })}
              className="bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="mr-2" size={18} />
              Back to Motorcycles
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/motorcycles"
            className="inline-flex items-center text-moto-orange hover:text-moto-red font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Motorcycles
          </Link>

          {/* Review Header */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8 shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3">
                  {review.model}
                </h1>
                <div className="flex items-center gap-4 text-lg text-muted-foreground mb-4">
                  <span className="font-bold">{review.manufacturer}</span>
                  <span>•</span>
                  <span className="font-semibold">{review.year}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StarRating value={review.rating} readonly size={28} />
                <span className="text-sm text-muted-foreground font-semibold">
                  {review.rating} out of 5 stars
                </span>
              </div>
            </div>

            {/* Motorcycle Icon */}
            <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center mb-6">
              <Bike size={120} className="text-moto-orange/30" />
            </div>

            {/* Review Content */}
            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                {review.reviewText}
              </p>
            </div>

            {/* Review Meta */}
            <div className="flex items-center gap-6 pt-6 border-t border-border text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="font-semibold">Reviewed by {review.reviewerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(review.publicationDate)}</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-moto-orange/10 to-moto-red/10 border border-moto-orange/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-black text-foreground mb-4">
              Have you ridden this motorcycle?
            </h2>
            <p className="text-muted-foreground mb-6">
              Share your experience and help other riders make informed decisions
            </p>
            <Button
              onClick={() => navigate({ to: '/submit-motorcycle-review' })}
              className="bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider"
            >
              Submit Your Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
