import { useState } from 'react';
import { useAddMotorcycleReview } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import StarRating from './StarRating';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function MotorcycleReviewForm() {
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  const addMotorcycleReview = useAddMotorcycleReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!model || !manufacturer || !year || rating === 0 || !reviewText || !reviewerName) {
      toast.error('Please fill in all fields');
      return;
    }

    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
      toast.error('Please enter a valid year');
      return;
    }

    try {
      await addMotorcycleReview.mutateAsync({
        model,
        manufacturer,
        year: yearNum,
        rating,
        reviewText,
        reviewerName,
      });

      toast.success('Motorcycle review submitted successfully!');
      
      // Reset form
      setModel('');
      setManufacturer('');
      setYear('');
      setRating(0);
      setReviewText('');
      setReviewerName('');
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
      console.error('Error submitting motorcycle review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="model">Motorcycle Model *</Label>
        <Input
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="e.g., Ninja 650"
          className="bg-background border-border"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="manufacturer">Manufacturer *</Label>
        <Input
          id="manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          placeholder="e.g., Kawasaki"
          className="bg-background border-border"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Year *</Label>
        <Input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g., 2024"
          min="1900"
          max={new Date().getFullYear() + 1}
          className="bg-background border-border"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Rating *</Label>
        <div className="flex items-center gap-2">
          <StarRating value={rating} onChange={setRating} size={32} />
          {rating > 0 && <span className="text-sm text-muted-foreground">({rating} stars)</span>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reviewText">Review *</Label>
        <Textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience with this motorcycle..."
          rows={8}
          className="bg-background border-border resize-none"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reviewerName">Your Name *</Label>
        <Input
          id="reviewerName"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Your name"
          className="bg-background border-border"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={addMotorcycleReview.isPending}
        className="w-full bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider"
      >
        {addMotorcycleReview.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Review'
        )}
      </Button>
    </form>
  );
}
