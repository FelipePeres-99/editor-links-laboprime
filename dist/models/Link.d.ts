export interface Link {
    id: string;
    originalUrl: string;
    customAlias: string;
    title: string;
    emoji?: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
    isActive: boolean;
}
export interface CreateLinkDTO {
    originalUrl: string;
    customAlias: string;
    title: string;
    emoji?: string;
}
export interface LinkResponseDTO {
    id: string;
    shortUrl: string;
    originalUrl: string;
    title: string;
    emoji?: string;
    clicks: number;
    createdAt: string;
}
export declare enum ResponseStatus {
    SUCCESS = "success",
    ERROR = "error"
}
export interface ApiResponse<T = any> {
    status: ResponseStatus;
    message: string;
    data?: T;
    error?: string;
}
