// Helper function to get a unique random index from 0 to 24
let availableIndexes: number[] = [];

function resetAvailableIndexes() {
  availableIndexes = Array.from({ length: 25 }, (_, i) => i);
}
export function getUniqueRandomIndex(): number {
  if (availableIndexes.length === 0) {
    resetAvailableIndexes();
  }

  const randomPosition = Math.floor(Math.random() * availableIndexes.length);
  const [randomIndex] = availableIndexes.splice(randomPosition, 1);

  return randomIndex;
}

// Initialize the available indexes
resetAvailableIndexes();
