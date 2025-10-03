export function isHTMLString(str: string): boolean {
  const htmlRegex = /<[^>]+>/g;
  return htmlRegex.test(str);
}
