export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  imageUrl: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Founder & CEO',
    bio: 'John has over 15 years of experience in technology and entrepreneurship.',
    imageUrl: '/images/team/john-doe.jpg',
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'CTO',
    bio: 'Jane is a full-stack developer with expertise in React and Node.js.',
    imageUrl: '/images/team/jane-smith.jpg',
    socialLinks: {
      twitter: 'https://twitter.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith'
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Lead Designer',
    bio: 'Mike specializes in UI/UX design and brand identity.',
    imageUrl: '/images/team/mike-johnson.jpg',
    socialLinks: {
      twitter: 'https://twitter.com/mikejohnson',
      linkedin: 'https://linkedin.com/in/mikejohnson'
    }
  }
]

export function getTeamMembers(): TeamMember[] {
  return teamMembers
}

export function getTeamMember(id: string): TeamMember | undefined {
  return teamMembers.find(member => member.id === id)
}

