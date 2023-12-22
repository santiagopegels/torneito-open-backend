export default function arrayWithUniqueElements<T>(array: T[]): T[] {
  return [...new Set(array)];
}