export function HashToSlice(hash: string, left: number, right: number) {
  return (
    hash.substring(0, left + 2) + "..." + hash.substring(hash.length - right)
  );
}
