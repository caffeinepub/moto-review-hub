import ReviewForm from '../components/ReviewForm';
import { FileText } from 'lucide-react';

export default function SubmitReview() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="text-moto-orange" size={48} />
            <h1 className="text-5xl md:text-6xl font-black text-foreground">
              Submit Gear Review
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your experience with motorcycle safety gear and help fellow riders make informed decisions
          </p>
        </div>

        <ReviewForm />
      </div>
    </div>
  );
}
