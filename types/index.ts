export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author_id: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  category?: string | null;
  cover_image?: string | null;
  featured: boolean;
  rejection_reason?: string | null;
  created_at: string;
  updated_at: string;
} 