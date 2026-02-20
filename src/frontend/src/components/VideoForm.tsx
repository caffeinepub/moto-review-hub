import { useState } from 'react';
import { useAddVideo } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TagInput from './TagInput';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { CategoryType } from '../backend';

export default function VideoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [category, setCategory] = useState<CategoryType>(CategoryType.regular);
  const [categoryTags, setCategoryTags] = useState<string[]>([]);

  const addVideoMutation = useAddVideo();

  const isValidVideoUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+/;
    return youtubeRegex.test(url) || vimeoRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !videoUrl) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!isValidVideoUrl(videoUrl)) {
      toast.error('Please enter a valid YouTube or Vimeo URL');
      return;
    }

    try {
      await addVideoMutation.mutateAsync({
        title,
        description,
        videoUrl,
        thumbnailUrl: thumbnailUrl || '/assets/generated/vlog-thumbnail.dim_640x360.png',
        category,
        categoryTags,
      });

      toast.success('Video submitted successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnailUrl('');
      setCategory(CategoryType.regular);
      setCategoryTags([]);
    } catch (error) {
      toast.error('Failed to submit video. Please try again.');
      console.error('Error submitting video:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-foreground font-semibold">
          Title *
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Top 5 Motorcycle Helmets of 2026"
          required
          className="bg-background border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-foreground font-semibold">
          Description *
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your video content..."
          required
          rows={6}
          className="bg-background border-border resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoUrl" className="text-foreground font-semibold">
          Video URL (YouTube or Vimeo) *
        </Label>
        <Input
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          required
          type="url"
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Enter a YouTube or Vimeo video URL
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnailUrl" className="text-foreground font-semibold">
          Thumbnail URL (Optional)
        </Label>
        <Input
          id="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          placeholder="https://example.com/thumbnail.jpg"
          type="url"
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Leave blank to use default thumbnail
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-foreground font-semibold">
          Video Category *
        </Label>
        <Select value={category} onValueChange={(value) => setCategory(value as CategoryType)}>
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CategoryType.regular}>Regular</SelectItem>
            <SelectItem value={CategoryType.cinematics}>Cinematics</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Choose 'Cinematics' for artistic or cinematic content
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-semibold">
          Tags (Optional)
        </Label>
        <TagInput value={categoryTags} onChange={setCategoryTags} />
        <p className="text-xs text-muted-foreground">
          Add tags to help categorize your video (e.g., helmet, jacket, review)
        </p>
      </div>

      <Button
        type="submit"
        disabled={addVideoMutation.isPending}
        className="w-full bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider py-6 text-lg"
      >
        {addVideoMutation.isPending ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={20} />
            Submitting...
          </>
        ) : (
          'Submit Video'
        )}
      </Button>
    </form>
  );
}
