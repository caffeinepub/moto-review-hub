import { useGetAllGearReviews, useGetAllVideos, useMotorcycleReviewsQuery } from '../hooks/useQueries';
import ReviewCard from '../components/ReviewCard';
import VideoCard from '../components/VideoCard';
import MotorcycleReviewCard from '../components/MotorcycleReviewCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Star, Video, Bike } from 'lucide-react';

export default function Home() {
  const { data: reviews = [], isLoading: reviewsLoading } = useGetAllGearReviews();
  const { data: videos = [], isLoading: videosLoading } = useGetAllVideos();
  const { data: motorcycleReviews = [], isLoading: motorcycleReviewsLoading } = useMotorcycleReviewsQuery();
  const navigate = useNavigate();

  const featuredReviews = reviews.slice(0, 3);
  const featuredVideos = videos.slice(0, 3);
  const featuredMotorcycleReviews = motorcycleReviews
    .sort((a, b) => Number(b.publicationDate - a.publicationDate))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/hero-banner.dim_1920x600.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            MOTO REVIEW HUB
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-semibold">
            Professional motorcycle and safety gear reviews. Expert insights to keep you safe on the road.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate({ to: '/reviews' })}
              size="lg"
              className="bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              Browse Reviews
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              onClick={() => navigate({ to: '/videos' })}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wider text-lg px-8 py-6 shadow-2xl transition-all duration-300"
            >
              Watch Videos
              <Video className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Reviews Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 flex items-center gap-3">
                <Star className="text-moto-orange fill-moto-orange" size={40} />
                Featured Gear Reviews
              </h2>
              <p className="text-muted-foreground text-lg">
                Expert reviews on the latest motorcycle safety gear
              </p>
            </div>
            <Button
              onClick={() => navigate({ to: '/reviews' })}
              variant="outline"
              className="hidden md:flex border-2 border-moto-orange text-moto-orange hover:bg-moto-orange hover:text-white font-bold uppercase tracking-wider"
            >
              View All
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>

          {reviewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-card rounded-lg animate-pulse" />
              ))}
            </div>
          ) : featuredReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredReviews.map((review, index) => (
                <ReviewCard key={index} review={review} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-6">No reviews yet. Be the first to submit one!</p>
              <Button
                onClick={() => navigate({ to: '/submit-review' })}
                className="bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider"
              >
                Submit Review
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Motorcycle Reviews Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 flex items-center gap-3">
                <Bike className="text-moto-orange" size={40} />
                Featured Motorcycle Reviews
              </h2>
              <p className="text-muted-foreground text-lg">
                Real rider experiences with the latest motorcycles
              </p>
            </div>
            <Button
              onClick={() => navigate({ to: '/motorcycles' })}
              variant="outline"
              className="hidden md:flex border-2 border-moto-orange text-moto-orange hover:bg-moto-orange hover:text-white font-bold uppercase tracking-wider"
            >
              View All
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>

          {motorcycleReviewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-background rounded-lg animate-pulse" />
              ))}
            </div>
          ) : featuredMotorcycleReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMotorcycleReviews.map((review, index) => (
                <MotorcycleReviewCard 
                  key={index} 
                  review={review} 
                  index={motorcycleReviews.indexOf(review)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-6">No motorcycle reviews yet. Be the first to submit one!</p>
              <Button
                onClick={() => navigate({ to: '/submit-motorcycle-review' })}
                className="bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider"
              >
                Submit Motorcycle Review
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 flex items-center gap-3">
                <Video className="text-moto-orange" size={40} />
                Featured Videos
              </h2>
              <p className="text-muted-foreground text-lg">
                Watch our latest motorcycle gear reviews and riding cinematics
              </p>
            </div>
            <Button
              onClick={() => navigate({ to: '/videos' })}
              variant="outline"
              className="hidden md:flex border-2 border-moto-orange text-moto-orange hover:bg-moto-orange hover:text-white font-bold uppercase tracking-wider"
            >
              View All
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>

          {videosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-card rounded-lg animate-pulse" />
              ))}
            </div>
          ) : featuredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVideos.map((video, index) => (
                <VideoCard key={index} video={video} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-6">No videos yet. Be the first to submit one!</p>
              <Button
                onClick={() => navigate({ to: '/submit-video' })}
                className="bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider"
              >
                Submit Video
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Sponsor CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/sponsor-cta-bg.dim_1200x400.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Partner With Us
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join leading motorcycle brands in reaching passionate riders and safety-conscious enthusiasts
          </p>
          <Button
            onClick={() => navigate({ to: '/submit-review' })}
            size="lg"
            className="bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider text-lg px-12 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            Become a Sponsor
          </Button>
        </div>
      </section>
    </div>
  );
}
