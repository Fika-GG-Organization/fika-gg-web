/** Returns an array with duplicate elements removed. */
export function removeDuplicates<T>(array: T[]): T[] {
	return [...new Set(array)]
}
