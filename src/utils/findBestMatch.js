export function findBestMatch(source, candidates) {

  if (!source) {
    console.warn("❌ Kein Objekt mit dem gegebenen Titel gefunden:", sourceTitle);
    return null; // oder throw new Error(...) je nach gewünschtem Verhalten
  }

  const weights = {
    qm: 0.5,
    rooms: 0.15,
    floor: 0.05,
    location: 0.3
  };

  let bestMatch = null;
  let bestScore = -Infinity;

  for (const candidate of candidates) {
    let score = 0;

    const qmDiff = Math.abs(source.qm - candidate.qm);
    const maxQm = Math.max(source.qm, candidate.qm);
    const qmScore = 1 - (qmDiff / maxQm);
    score += weights.qm * qmScore;

    const roomDiff = Math.abs(parseInt(source.rooms) - parseInt(candidate.rooms));
    const roomScore = roomDiff <= 1 ? 1 - (roomDiff / 1) : 0;
    score += weights.rooms * roomScore;

    const floorDiff = Math.abs(parseInt(source.floor) - parseInt(candidate.floor));
    const floorScore = 1 / (1 + floorDiff);
    score += weights.floor * floorScore;

    if (
      typeof source.distance_to_center === "number" &&
      typeof candidate.distance_to_center === "number"
    ) {
      const distanceDiff = Math.abs(source.distance_to_center - candidate.distance_to_center);
      const locScore = 1 / (1 + Math.log1p(distanceDiff));
      score += weights.location * locScore;
    } else {
      continue;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = candidate;
      
    }
  }
  return bestMatch;
}
