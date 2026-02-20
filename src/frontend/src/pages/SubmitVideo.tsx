import VideoForm from '../components/VideoForm';
import { Video } from 'lucide-react';

export default function SubmitVideo() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="text-moto-orange" size={48} />
            <h1 className="text-5xl md:text-6xl font-black text-foreground">
              Submit a Video
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your motorcycle video content with our community of passionate riders
          </p>
        </div>

        <VideoForm />
      </div>
    </div>
  );
}
