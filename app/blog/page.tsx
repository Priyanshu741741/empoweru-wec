import { Suspense } from "react"
import { PageTransition } from "@/components/page-transition"
import { PostGrid } from "@/components/post-grid"
import { getPosts } from "@/lib/posts"
import { CategoryFilter } from "@/components/category-filter"
import BlogList from '@/components/blog/BlogList'

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogList />
    </Suspense>
  )
}

