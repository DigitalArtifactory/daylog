import { marked } from "marked";
import sanitizeHtml from 'sanitize-html';

export async function renderMarkdownToHtml(markdown: string) {
  const html = await marked.parse(markdown, {
    async: true,
    gfm: true,
    breaks: true,
  });
  return sanitizeHtml(html);
};
