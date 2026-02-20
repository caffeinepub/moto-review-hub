import { useState, useMemo } from 'react';
import { useGetAllGearReviews } from '../hooks/useQueries';
import ReviewCard from '../components/ReviewCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const categories = ['all', 'helmets', 'jackets', 'gloves', 'boots', 'pants', 'armor', 'accessories'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'highest', label: 'Highest Rated' },
];

export default function Reviews() {
  const { data: reviews = [], isLoading } = useGetAllGearReviews();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = [...reviews];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (review) =>
          review.gearName.toLowerCase().includes(query) ||
          review.brand.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((review) => review.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return Number(b.publicationDate - a.publicationDate);
      } else if (sortBy === 'oldest') {
        return Number(a.publicationDate - b.publicationDate);
      } else if (sortBy === 'highest') {
        return b.rating - a.rating;
      }
      return 0;
    });

    return filtered;
  }, [reviews, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
            Gear Reviews
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert reviews on motorcycle safety gear and equipment
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search by gear name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize">
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-card rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredAndSortedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedReviews.map((review, index) => (
              <ReviewCard key={index} review={review} index={reviews.indexOf(review)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {searchQuery || selectedCategory !== 'all'
                ? 'No reviews found matching your filters.'
                : 'No reviews yet. Be the first to submit one!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
