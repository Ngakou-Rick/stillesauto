import apiClient from '../api';

export interface ContactDto {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ImportExportDto {
  type: 'IMPORT' | 'EXPORT';
  description: string;
  documents?: File[];
}

export const contactService = {
  async sendMessage(dto: ContactDto): Promise<void> {
    await apiClient.post('/contact', dto);
  },

  async submitImportExport(dto: ImportExportDto): Promise<void> {
    const formData = new FormData();
    formData.append('type', dto.type);
    formData.append('description', dto.description);
    if (dto.documents) {
      dto.documents.forEach((file) => formData.append('files', file));
    }
    await apiClient.post('/import-export', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};