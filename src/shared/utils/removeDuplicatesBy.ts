/**
 * Returns an array with elements filtered by their property.
 * @param keyFn A callback function specifying the property of the array elements.
 * @example
 * ```ts
 * const myArray = [
 *   { id: 1, size: 6, color: "blue" },
 *   { id: 2, size: 8, color: "blue" },
 *   { id: 3, size: 6, color: "red" },
 * ];
 *
 * let filtered = removeDuplicatesBy(myArray, m => m.color);
 * ```
 *
 * In this example, we only want to remove array elements if they share duplicate values in the
 * color property.
 * This means that the second element will be removed, because it shares the same
 * color with the first element.
 */
export function removeDuplicatesBy<T>(array: T[], keyFn: (value: T) => unknown): T[] {
  const newSet = new Set();
  return array.filter((v: T) => {
    const key = keyFn(v);
    const isNew = !newSet.has(key);
    if (isNew) {
      newSet.add(key);
    }
    return isNew;
  });
}
