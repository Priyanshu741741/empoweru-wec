'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPosts } from '@/lib/posts';
import { PostGrid } from '@/components/post-grid';
import { CategoryFilter } from '@/components/category-filter';
import { PageTransition } from '@/components/page-transition';
import type { Post } from '@/types';

export default function BlogList() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts.filter(post => 
        !category || post.category === category
      ));
    };
    
    fetchPosts();
  }, [category]);

  return (
    <PageTransition>
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">All Stories</h1>
          <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-16" />
          <CategoryFilter />
          <PostGrid posts={posts} />
        </div>
      </section>
    </PageTransition>
  );
} 