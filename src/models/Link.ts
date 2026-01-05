// src/models/Link.ts

// Interface principal do Link
export interface Link {
  id: string;
  originalUrl: string;
  customAlias: string;
  title: string;
  emoji?: string;           // ? significa opcional
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  isActive: boolean;
}

// DTO (Data Transfer Object) para criação
export interface CreateLinkDTO {
  originalUrl: string;
  customAlias: string;
  title: string;
  emoji?: string;
}

// DTO para resposta da API
export interface LinkResponseDTO {
  id: string;
  shortUrl: string;
  originalUrl: string;
  title: string;
  emoji?: string;
  clicks: number;
  createdAt: string;       // String para JSON
}

// Enum para status de resposta
export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}

// Interface padrão de resposta da API
export interface ApiResponse<T = any> {
  status: ResponseStatus;
  message: string;
  data?: T;
  error?: string;
}