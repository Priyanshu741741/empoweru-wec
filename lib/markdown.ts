export function parseMarkdown(text: string): string {
  let html = text

  html = html.replace(/\n/g, '{{br}}')
  html = html.replace(/\r/g, '')

  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

  html = html.replace(/^#{1,6}\s+(.+)$/gm, (match, text) => {
    const level = match.trim().indexOf(' ')
    return `<h${level}>${text.trim()}</h${level}>`
  })

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

  html = html.replace(/^-\s+(.+)$/gm, '<li>$1</li>')

  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')

  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  html = html.replace(/([^\n]+)\n?/g, '<p>$1</p>')

  html = html.replace(/{{br}}/g, '<br>')

  html = html.replace(/<li>.*?<\/li>/gs, match => {
    return match.startsWith('<li>-') ? `<ul>${match}</ul>` : `<ol>${match}</ol>`
  })

  html = html.replace(/<p><(h[1-6]|ul|ol|li|a|img|code|strong|em)[^>]*>.*?<\/\1><\/p>/g, match => {
    return match.slice(3, -4)
  })

  return html
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}