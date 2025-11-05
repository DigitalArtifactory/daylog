export function truncateWord(text: string, limit: number = 15) {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
}

export function isBase64(str: string) {
  try {
    const isBase64 = /^data:image\/[a-zA-Z]+;base64,/.test(str);
    return isBase64;
  } catch (err) {
    return false;
  }
}

export function isUrl(str: string) {
  try {
    const isUnsecureUrl = /^http:\/\//.test(str);
    const isUrl = /^https:\/\//.test(str);
    return isUnsecureUrl || isUrl;
  } catch (_) {
    return false;
  }
}

export function removeMarkdownTags(text: string) {
  return text
    // Remove code blocks ```...```
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code `...`
    .replace(/`[^`]*`/g, '')
    // Remove images ![alt](url)
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove links [text](url)
    .replace(/\[.*?\]\(.*?\)/g, '')
    // Remove bold/italic markers (*, _, **, __)
    .replace(/(\*\*|__|\*|_)/g, '')
    // Remove headings (e.g. # Title)
    .replace(/^#+\s*/gm, '')
    // Remove blockquotes >
    .replace(/^\s*>+\s?/gm, '')
    // Remove lists (-, *, +, or numbered)
    .replace(/^\s*([-*+]|\d+\.)\s+/gm, '')
    // Remove HTML tags (optional if Markdown includes them)
    .replace(/<\/?[^>]+(>|$)/g, '')
    // Keep only letters, numbers, and spaces
    .replace(/[^a-zA-Z0-9\s]/g, '')
    // Collapse multiple spaces into one
    .replace(/\s+/g, ' ')
    .trim();
}
