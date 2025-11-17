import { marked } from "marked";

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
  const tokens = marked.lexer(text);
  return tokens.map(token => token.raw)
    .join(' ')
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\s+/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .trim();
}