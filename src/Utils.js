export function createPairs(points) {
  const array = [];
  for (let i = 1; i < points.length; i += 2) {
    let p1 = points[i - 1],
      p2 = points[i];
    array.push({
      id: p1.id,
      p1: { x: p1.x, y: p1.y },
      p2: { x: p2.x, y: p2.y }
    });
  }
  if (points.length % 2 === 1) {
    let point = points[points.length - 1];
    array.push({
      id: point.id,
      p1: { x: point.x, y: point.y },
      p2: { x: point.x, y: point.y }
    });
  }
  return array;
}
