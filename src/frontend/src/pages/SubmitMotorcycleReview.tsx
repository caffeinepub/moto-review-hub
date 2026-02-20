import MotorcycleReviewForm from '../components/MotorcycleReviewForm';
import { Bike } from 'lucide-react';

export default function SubmitMotorcycleReview() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-moto-orange to-moto-red rounded-full mb-6">
              <Bike size={40} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
              Submit Motorcycle Review
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your riding experience and help fellow motorcyclists make informed decisions
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <MotorcycleReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
}
