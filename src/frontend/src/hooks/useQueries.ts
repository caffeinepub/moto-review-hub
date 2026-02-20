import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { type GearReview, type Vlog, type MotorcycleReview, CategoryType } from '../backend';

export function useGetAllGearReviews() {
  const { actor, isFetching } = useActor();

  return useQuery<GearReview[]>({
    queryKey: ['gearReviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGearReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMotorcycleReviewsQuery() {
  const { actor, isFetching } = useActor();

  return useQuery<MotorcycleReview[]>({
    queryKey: ['motorcycleReviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMotorcycleReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllVideos() {
  const { actor, isFetching } = useActor();

  return useQuery<Vlog[]>({
    queryKey: ['videos'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVlogs();
    },
    enabled: !!actor && !isFetching,
  });
}

// Alias for backward compatibility
export const useGetAllVlogs = useGetAllVideos;

export function useAddGearReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      gearName: string;
      category: string;
      brand: string;
      rating: number;
      reviewText: string;
      reviewerName: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addGearReview(
        params.gearName,
        params.category,
        params.brand,
        params.rating,
        params.reviewText,
        params.reviewerName
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gearReviews'] });
    },
  });
}

export function useAddMotorcycleReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      model: string;
      manufacturer: string;
      year: number;
      rating: number;
      reviewText: string;
      reviewerName: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addMotorcycleReview(
        params.model,
        params.manufacturer,
        params.year,
        params.rating,
        params.reviewText,
        params.reviewerName
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['motorcycleReviews'] });
    },
  });
}

export function useAddVideo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      videoUrl: string;
      thumbnailUrl: string;
      category: CategoryType;
      categoryTags: string[];
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addVlog(
        params.title,
        params.description,
        params.videoUrl,
        params.thumbnailUrl,
        params.category,
        params.categoryTags
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

// Alias for backward compatibility
export const useAddVlog = useAddVideo;
