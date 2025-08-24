-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Create storage policy for blog images
CREATE POLICY "Blog images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Users can upload blog images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog-images');

-- Create admin_users table
CREATE TABLE admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert test admin user (password: admin123)
INSERT INTO admin_users (email, password_hash) VALUES 
('admin@wec.com', '$2b$10$rQqKvkzfvQzoIVZx8YMbJeJ3YzEt8rQz9u6vQf5F7z9ZqMJvBYvG2');

-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID REFERENCES admin_users(id)
);

-- Enable RLS on blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
CREATE POLICY "Anyone can view approved blog posts" ON blog_posts
FOR SELECT USING (status = 'approved');

CREATE POLICY "Anyone can create blog posts" ON blog_posts
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all blog posts" ON blog_posts
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

CREATE POLICY "Admins can update blog posts" ON blog_posts
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create view for approved posts with author info
CREATE VIEW approved_blog_posts AS
SELECT 
    id,
    title,
    content,
    image_url,
    author_name,
    author_email,
    created_at,
    approved_at
FROM blog_posts 
WHERE status = 'approved'
ORDER BY approved_at DESC;
