export function shuffle(items, random = Math.random) {
  if (!Array.isArray(items)) {
    throw new TypeError("shuffle expects an array.");
  }

  if (typeof random !== "function") {
    throw new TypeError("shuffle expects random to be a function.");
  }

  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

export function shuffleInPlace(items, random = Math.random) {
  if (!Array.isArray(items)) {
    throw new TypeError("shuffleInPlace expects an array.");
  }

  if (typeof random !== "function") {
    throw new TypeError("shuffleInPlace expects random to be a function.");
  }

  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }

  return items;
}

export function createShuffledPairs(cards, pairsCount, random = Math.random) {
  if (!Array.isArray(cards)) {
    throw new TypeError("createShuffledPairs expects cards to be an array.");
  }

  if (!Number.isInteger(pairsCount) || pairsCount <= 0) {
    throw new RangeError("pairsCount must be a positive integer.");
  }

  if (pairsCount > cards.length) {
    throw new RangeError("pairsCount cannot be greater than the number of available cards.");
  }

  const selectedCards = cards.slice(0, pairsCount);

  const pairedCards = selectedCards.flatMap((card) => [
    {
      ...card,
      uid: `${card.id}-a`,
      pairId: card.id,
      isFlipped: false,
      isMatched: false,
      isWrong: false
    },
    {
      ...card,
      uid: `${card.id}-b`,
      pairId: card.id,
      isFlipped: false,
      isMatched: false,
      isWrong: false
    }
  ]);

  return shuffle(pairedCards, random);
}