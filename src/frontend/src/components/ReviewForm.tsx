import { useState } from 'react';
import { useAddGearReview } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StarRating from './StarRating';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const categories = ['helmets', 'jackets', 'gloves', 'boots', 'pants', 'armor', 'accessories'];

export default function ReviewForm() {
  const [gearName, setGearName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  const addReviewMutation = useAddGearReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gearName || !category || !brand || rating === 0 || !reviewText || !reviewerName) {
      toast.error('Please fill in all fields');
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error('Rating must be between 1 and 5 stars');
      return;
    }

    try {
      await addReviewMutation.mutateAsync({
        gearName,
        category,
        brand,
        rating,
        reviewText,
        reviewerName,
      });

      toast.success('Review submitted successfully!');
      
      // Reset form
      setGearName('');
      setCategory('');
      setBrand('');
      setRating(0);
      setReviewText('');
      setReviewerName('');
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="gearName" className="text-foreground font-semibold">
          Gear Name *
        </Label>
        <Input
          id="gearName"
          value={gearName}
          onChange={(e) => setGearName(e.target.value)}
          placeholder="e.g., Shoei RF-1400"
          required
          className="bg-background border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-foreground font-semibold">
          Category *
        </Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="capitalize">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="brand" className="text-foreground font-semibold">
          Brand *
        </Label>
        <Input
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="e.g., Shoei"
          required
          className="bg-background border-border"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-semibold">Rating *</Label>
        <div className="flex items-center gap-4">
          <StarRating value={rating} onChange={setRating} size={32} />
          <span className="text-muted-foreground">
            {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select a rating'}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reviewText" className="text-foreground font-semibold">
          Review *
        </Label>
        <Textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience with this gear..."
          required
          rows={8}
          className="bg-background border-border resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reviewerName" className="text-foreground font-semibold">
          Your Name *
        </Label>
        <Input
          id="reviewerName"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="e.g., John Rider"
          required
          className="bg-background border-border"
        />
      </div>

      <Button
        type="submit"
        disabled={addReviewMutation.isPending}
        className="w-full bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {addReviewMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Review'
        )}
      </Button>
    </form>
  );
}
