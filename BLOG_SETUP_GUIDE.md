# Blog Publishing System Setup Guide

## 🎉 **System Overview**

I've implemented a complete blog publishing system with the following features:

### ✅ **Features Implemented:**

1. **Rich Text Editor** - Users can format text with bold, italic, underline, headings, lists, and alignment
2. **Image Upload** - Users can upload featured images for their posts
3. **Admin Approval System** - All posts require admin approval before going live
4. **Blog Listing Page** - Shows all approved posts in a beautiful grid layout
5. **Individual Post Pages** - Full post view with rich formatting
6. **Admin Dashboard** - Complete admin interface for managing posts
7. **Navigation System** - Updated header with all new pages

### 🔗 **New Pages Created:**

- `/publish` - Submit new blog posts
- `/blog` - View all approved posts  
- `/blog/[id]` - Individual post view
- `/admin` - Admin dashboard for post management

---

## 🗄️ **Supabase Setup Instructions**

### **Step 1: Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for project to be ready
4. Note down your **Project URL** and **Anon Key**

### **Step 2: Run SQL Schema**
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire content from `supabase-setup.sql`
4. Click **Run** to execute all the SQL commands

### **Step 3: Configure Storage**
1. Go to **Storage** in your Supabase dashboard
2. The `blog-images` bucket should be created automatically by the SQL
3. Verify it exists and is public

### **Step 4: Environment Variables**
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 👤 **Admin Access**

### **Test Admin Credentials:**
- **Email:** `admin@wec.com`
- **Password:** `wec@EmpowerU`

### **Admin Features:**
- View all submitted posts (pending, approved, rejected)
- Approve or reject posts
- See submission statistics
- Manage content workflow

---

## 🚀 **How to Use the System**

### **For Users (Publishing Posts):**

1. **Navigate to Publish Page:**
   - Click "Publish" button in header
   - Or go to `/publish`

2. **Fill Out Form:**
   - Enter your name and email
   - Add an engaging title
   - Upload a featured image (optional)
   - Write your content using the rich text editor

3. **Rich Text Features:**
   - **Bold**, *Italic*, <u>Underline</u> text
   - Headers (H1, H2, H3)
   - Bullet and numbered lists
   - Text alignment (left, center, right)

4. **Submit for Review:**
   - Click "Submit for Review"
   - Post goes to admin for approval
   - You'll be notified via email when approved

### **For Admins (Managing Posts):**

1. **Access Admin Dashboard:**
   - Click "Admin" in navigation
   - Login with admin credentials

2. **Review Posts:**
   - See all pending posts
   - View post content and images
   - Check author information

3. **Approve/Reject:**
   - Click "Approve" to publish
   - Click "Reject" to decline
   - Posts appear on blog immediately after approval

### **For Readers (Viewing Blog):**

1. **Browse Posts:**
   - Click "Blog" in navigation
   - See all approved posts in grid layout

2. **Read Full Posts:**
   - Click any post card
   - View full content with formatting
   - See author information and date

---

## 🔧 **Technical Details**

### **Database Schema:**
- `admin_users` - Admin authentication
- `blog_posts` - All blog content and metadata
- `approved_blog_posts` - View for public posts only

### **File Structure:**
```
app/
├── admin/page.tsx          # Admin dashboard
├── blog/
│   ├── page.tsx           # Blog listing
│   └── [id]/page.tsx      # Individual post
├── publish/page.tsx        # Submit new posts
└── about/page.tsx         # Existing about page

components/
├── rich-text-editor.tsx   # TipTap editor
├── image-upload.tsx       # File upload component
└── header.tsx             # Updated navigation

lib/
└── supabase.ts            # Database functions
```

### **Dependencies Added:**
- `@supabase/supabase-js` - Database client
- `@tiptap/react` + extensions - Rich text editor
- `react-dropzone` - File upload
- `sonner` - Toast notifications

---

## 🎨 **Design Features**

### **Consistent Styling:**
- Same ShaderBackground on all pages
- Instrument Serif for headings
- Poppins for body text  
- Elegant glass-morphism design

### **Responsive Design:**
- Works on mobile, tablet, desktop
- Optimized image display
- Touch-friendly interface

### **User Experience:**
- Toast notifications for feedback
- Loading states
- Error handling
- Intuitive navigation

---

## 🔐 **Security Features**

### **Row Level Security (RLS):**
- Users can only submit posts
- Admins can view/manage all posts
- Public can only see approved posts

### **Data Validation:**
- Required fields validation
- Email format checking
- Content sanitization
- File type restrictions

---

## 🚀 **Getting Started**

1. **Complete Supabase setup** (see above)
2. **Add environment variables**
3. **Start development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
4. **Test the system:**
   - Submit a test post at `/publish`
   - Login to admin at `/admin`
   - Approve the post
   - View it at `/blog`

---

## 📧 **Next Steps**

1. **Email Notifications:** Set up email alerts for post approvals
2. **User Accounts:** Add user registration/login system
3. **Post Categories:** Add tagging/categorization
4. **Comments:** Add comment system to posts
5. **Analytics:** Track post views and engagement

---

Your blog publishing system is now fully functional! Users can submit rich content with images, admins can manage everything through a beautiful dashboard, and readers can enjoy a great blog experience. 🎉
