-- Disable RLS completely for testing
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Make sure storage bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true) 
ON CONFLICT (id) DO UPDATE SET public = true;

-- Update storage policies to be more permissive
DROP POLICY IF EXISTS "Blog images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload blog images" ON storage.objects;

CREATE POLICY "Anyone can view blog images" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Anyone can upload blog images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog-images');
