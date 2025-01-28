export type KeyValue = { key: string | number; value: string };

export type TodTom = "Today" | "Tomorrow";

export type RiderOwner = "Rider" | "Owner";

export type LoadingState = 'loading' | 'not-loaded'| 'loaded' | 'failed';

export interface NotLoadedResource {
    loadingState: 'loading' | 'not-loaded';
}

export interface LoadedResource<T> {
    loadingState: 'loaded';
    data: T;
}

export interface FailedResource {
    loadingState: 'failed';
    errorMessage: string;
}

export type Resource<T> = NotLoadedResource | LoadedResource<T> | FailedResource;
