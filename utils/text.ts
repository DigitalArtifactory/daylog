export function truncateWord(text: string, limit: number = 15) {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
}
