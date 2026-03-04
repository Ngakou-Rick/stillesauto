import apiClient from '../api';
import { Review, EntityType, PaginatedResponse } from '@/types';

export interface CreateReviewDto {
  entityType: EntityType;
  entityId: string;
  rating: number;
  comment: string;
}

export const reviewService = {
  async getReviews(
    entityType: EntityType,
    entityId: string
  ): Promise<PaginatedResponse<Review>> {
    const { data } = await apiClient.get('/reviews', {
      params: { entity_type: entityType, entity_id: entityId },
    });
    return data;
  },

  async createReview(dto: CreateReviewDto): Promise<Review> {
    const { data } = await apiClient.post('/reviews', dto);
    return data;
  },
};