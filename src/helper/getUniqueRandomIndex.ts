// Helper function to get a unique random index from 0 to 25
export function getUniqueRandomIndex(usedIndexes: Set<number>): number {
  let randomIndex: number;
  do {
    randomIndex = Math.floor(Math.random() * 25);
  } while (usedIndexes.has(randomIndex));
  usedIndexes.add(randomIndex);
  return randomIndex;
}
