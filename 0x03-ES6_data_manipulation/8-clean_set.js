export default function cleanSet(stringSet, prefix) {
  const strippedStrings = [];
  if (!stringSet || !prefix || !(stringSet instanceof Set) || typeof prefix !== 'string') {
    return '';
  }
  for (const item of stringSet.values()) {
    if (typeof item === 'string' && item.startsWith(prefix)) {
      const strippedString = item.substring(prefix.length);

      if (strippedString && strippedString !== item) {
        strippedStrings.push(strippedString);
      }
    }
  }
  return strippedStrings.join('-');
}
