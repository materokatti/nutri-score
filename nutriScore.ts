interface ProductNutrition {
  energy: number;      // kcal per 100g
  sugars: number;      // g per 100g
  satFat: number;      // g per 100g
  sodium: number;      // mg per 100g
  fruitsPct: number;   // % (0-100)
  fiber: number;       // g per 100g
  protein: number;     // g per 100g
}

const getNegativePoints = ({ energy, sugars, satFat, sodium }: ProductNutrition): number => {
  const energyPoints = [335, 670, 1005, 1340, 1675, 2010, 2345, 2680, 3015, 3350];
  const sugarPoints = [4.5, 9, 13.5, 18, 22.5, 27, 31, 36, 40, 45];
  const satFatPoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sodiumPoints = [90, 180, 270, 360, 450, 540, 630, 720, 810, 900];

  const calcPoints = (value: number, thresholds: number[]) =>
    thresholds.reduce((acc, curr) => acc + (value > curr ? 1 : 0), 0);

  return (
    calcPoints(energy, energyPoints) +
    calcPoints(sugars, sugarPoints) +
    calcPoints(satFat, satFatPoints) +
    calcPoints(sodium, sodiumPoints)
  );
};

const getPositivePoints = ({ fruitsPct, fiber, protein }: ProductNutrition): number => {
  const fruitsPoints = [40, 60, 80];
  const fiberPoints = [0.9, 1.9, 2.8, 3.7, 4.7];
  const proteinPoints = [1.6, 3.2, 4.8, 6.4, 8.0];

  const calcPoints = (value: number, thresholds: number[]) =>
    thresholds.reduce((acc, curr) => acc + (value > curr ? 1 : 0), 0);

  return (
    calcPoints(fruitsPct, fruitsPoints) +
    calcPoints(fiber, fiberPoints) +
    calcPoints(protein, proteinPoints)
  );
};

const calculateNutriScore = (nutrition: ProductNutrition): { grade: string; score: number } => {
  const negative = getNegativePoints(nutrition);
  let positive = getPositivePoints(nutrition);

  // Special condition: exclude protein points if negative >=11 and fruits < 80%
  if (negative >= 11 && nutrition.fruitsPct < 80) {
    const proteinPoints = [1.6, 3.2, 4.8, 6.4, 8.0];
    const proteinScore = proteinPoints.reduce((acc, curr) => acc + (nutrition.protein > curr ? 1 : 0), 0);
    positive -= proteinScore;
  }

  const finalScore = negative - positive;

  // Determine grade
  let grade: string;

  if (nutrition.fruitsPct >= 80) {
    grade = 'A';
  } else if (finalScore <= -1) {
    grade = 'A';
  } else if (finalScore <= 2) {
    grade = 'B';
  } else if (finalScore <= 10) {
    grade = 'C';
  } else if (finalScore <= 18) {
    grade = 'D';
  } else {
    grade = 'E';
  }

  return { grade, score: finalScore };
};

// Example
const exampleProduct: ProductNutrition = {
  energy: 250,      // kcal
  sugars: 5,        // g
  satFat: 1.5,      // g
  sodium: 200,      // mg
  fruitsPct: 60,    // %
  fiber: 3.0,       // g
  protein: 4.0,     // g
};

const result = calculateNutriScore(exampleProduct);
console.log(`Nutri-Score 등급: ${result.grade} (점수: ${result.score})`);
