/**
 * Simple markdown parser that converts markdown to HTML while preserving whitespace
 * and line breaks.
 */

/**
 * Converts markdown to HTML while preserving line breaks and whitespace
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  // Preserve line breaks by replacing them with a placeholder
  let html = markdown
    // Replace line breaks with placeholders
    .replace(/\n/g, '{{NEWLINE}}')
    
    // Bold: **text** -> <strong>text</strong>
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    
    // Italic: *text* -> <em>text</em>
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    
    // Headers: # Header -> <h1>Header</h1>
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    
    // Links: [text](url) -> <a href="url">text</a>
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    
    // Images: ![alt](url) -> <img src="url" alt="alt" />
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    
    // Unordered list items: - item -> <li>item</li>
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    
    // Ordered list items: 1. item -> <li>item</li>
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    
    // Code: `code` -> <code>code</code>
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    
    // Paragraphs: lines of text -> <p>text</p>
    // We use a placeholder first to avoid interference with other rules
    .replace(/^([^<][^\n]+)$/gm, '<p>$1</p>')
    
    // Restore line breaks with <br> tags
    .replace(/{{NEWLINE}}/g, '<br />')
    
    // Wrap lists in <ul> or <ol> tags
    .replace(/(<li>.*?<\/li>)(?=\s*<li>)/g, '$1');
  
  // Ensure there are no duplicated paragraph tags
  html = html.replace(/<p><p>/g, '<p>').replace(/<\/p><\/p>/g, '</p>');
  
  return html;
} 