import { useState } from 'react';
import { useGetAllVideos } from '../hooks/useQueries';
import VideoCard from '../components/VideoCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoryType } from '../backend';

export default function Videos() {
  const { data: videos = [], isLoading } = useGetAllVideos();
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryType>('all');

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
            Motorcycle Videos
          </h1>
          <p className="text-xl text-muted-foreground">
            Watch our latest motorcycle gear reviews and riding cinematics
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as 'all' | CategoryType)}>
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="all" className="data-[state=active]:bg-moto-orange data-[state=active]:text-white">
                All Videos
              </TabsTrigger>
              <TabsTrigger value={CategoryType.regular} className="data-[state=active]:bg-moto-orange data-[state=active]:text-white">
                Regular
              </TabsTrigger>
              <TabsTrigger value={CategoryType.cinematics} className="data-[state=active]:bg-moto-orange data-[state=active]:text-white">
                Cinematics
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-card rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <VideoCard key={index} video={video} index={videos.indexOf(video)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {selectedCategory === 'all' 
                ? 'No videos yet. Be the first to submit one!' 
                : `No ${selectedCategory} videos yet.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
