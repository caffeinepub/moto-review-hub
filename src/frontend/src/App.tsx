import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Videos from './pages/Videos';
import SubmitReview from './pages/SubmitReview';
import SubmitVideo from './pages/SubmitVideo';
import ReviewDetail from './pages/ReviewDetail';
import VideoPlayer from './pages/VideoPlayer';
import MotorcycleReviews from './pages/MotorcycleReviews';
import MotorcycleReviewDetail from './pages/MotorcycleReviewDetail';
import SubmitMotorcycleReview from './pages/SubmitMotorcycleReview';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const reviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reviews',
  component: Reviews,
});

const videosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/videos',
  component: Videos,
});

const submitReviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit-review',
  component: SubmitReview,
});

const submitVideoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit-video',
  component: SubmitVideo,
});

const reviewDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/review/$id',
  component: ReviewDetail,
});

const videoPlayerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/video/$id',
  component: VideoPlayer,
});

const motorcycleReviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/motorcycles',
  component: MotorcycleReviews,
});

const motorcycleReviewDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/motorcycles/$id',
  component: MotorcycleReviewDetail,
});

const submitMotorcycleReviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit-motorcycle-review',
  component: SubmitMotorcycleReview,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  reviewsRoute,
  videosRoute,
  submitReviewRoute,
  submitVideoRoute,
  reviewDetailRoute,
  videoPlayerRoute,
  motorcycleReviewsRoute,
  motorcycleReviewDetailRoute,
  submitMotorcycleReviewRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
