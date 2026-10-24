// Standard Olympic plate sets
export const OLYMPIC_PLATES_KG = [
  { weight: 25, color: '#EF4444', label: '25kg' },
  { weight: 20, color: '#3B82F6', label: '20kg' },
  { weight: 15, color: '#EAB308', label: '15kg' },
  { weight: 10, color: '#10B981', label: '10kg' },
  { weight: 5, color: '#F8FAFC', label: '5kg', darkText: true },
  { weight: 2.5, color: '#1E293B', label: '2.5kg' },
  { weight: 1.25, color: '#94A3B8', label: '1.25kg' }
];

export const OLYMPIC_PLATES_LBS = [
  { weight: 45, color: '#3B82F6', label: '45lb' },
  { weight: 35, color: '#EAB308', label: '35lb' },
  { weight: 25, color: '#10B981', label: '25lb' },
  { weight: 10, color: '#1E293B', label: '10lb' },
  { weight: 5, color: '#F8FAFC', label: '5lb', darkText: true },
  { weight: 2.5, color: '#94A3B8', label: '2.5lb' }
];

/**
 * Calculates plates required per barbell sleeve
 */
export function calculatePlates(targetWeight, barWeight = 20, unit = 'kg') {
  const plates = unit === 'kg' ? OLYMPIC_PLATES_KG : OLYMPIC_PLATES_LBS;
  let perSide = (targetWeight - barWeight) / 2;
  if (perSide <= 0) return [];

  const result = [];
  for (const plate of plates) {
    const count = Math.floor(perSide / plate.weight);
    for (let i = 0; i < count; i++) {
      result.push(plate);
    }
    perSide = Math.round((perSide - count * plate.weight) * 100) / 100;
  }
  return result;
}

/**
 * Calculates estimated 1-Rep Max using Epley formula
 */
export function calculate1RM(weight, reps) {
  const safeWeight = Math.max(0, Number(weight) || 0);
  const safeReps = Math.max(1, Number(reps) || 1);
  if (safeReps === 1) return safeWeight;
  return Math.round(safeWeight * (1 + safeReps / 30));
}
