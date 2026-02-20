import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GearReview {
    gearName: string;
    reviewText: string;
    reviewerName: string;
    publicationDate: bigint;
    category: string;
    brand: string;
    rating: number;
}
export interface MotorcycleReview {
    model: string;
    manufacturer: string;
    year: number;
    reviewText: string;
    reviewerName: string;
    publicationDate: bigint;
    rating: number;
}
export interface Vlog {
    title: string;
    categoryTags: Array<string>;
    thumbnailUrl: string;
    description: string;
    publicationDate: bigint;
    category: CategoryType;
    videoUrl: string;
}
export enum CategoryType {
    regular = "regular",
    cinematics = "cinematics"
}
export interface backendInterface {
    addGearReview(gearName: string, category: string, brand: string, rating: number, reviewText: string, reviewerName: string): Promise<void>;
    addMotorcycleReview(model: string, manufacturer: string, year: number, rating: number, reviewText: string, reviewerName: string): Promise<void>;
    addVlog(title: string, description: string, videoUrl: string, thumbnailUrl: string, category: CategoryType, categoryTags: Array<string>): Promise<void>;
    getAllGearReviews(): Promise<Array<GearReview>>;
    getAllMotorcycleReviews(): Promise<Array<MotorcycleReview>>;
    getAllVlogs(): Promise<Array<Vlog>>;
}
