# Nutri-Score Algorithm (TypeScript)

A clear and concise TypeScript implementation of the Nutri-Score calculation algorithm. Nutri-Score is a nutritional rating system used in Europe to grade foods from A (healthiest) to E (less healthy) based on their nutritional composition.

## 🌱 Features

- Calculates Nutri-Score grades accurately.
- Easy-to-use and integrate into web and mobile applications.
- Well-structured and readable codebase.
- Includes special scoring rules compliant with official Nutri-Score standards.

## 📦 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies (if needed):

```bash
npm install
```

## 🚀 Usage

```typescript
import { calculateNutriScore } from './nutriScore';

const productNutrition = {
  energy: 250,      // kcal per 100g
  sugars: 5,        // g per 100g
  satFat: 1.5,      // g per 100g
  sodium: 200,      // mg per 100g
  fruitsPct: 60,    // %
  fiber: 3.0,       // g per 100g
  protein: 4.0,     // g per 100g
};

const result = calculateNutriScore(productNutrition);
console.log(`Grade: ${result.grade}, Score: ${result.score}`);
```

## ⚙️ How it Works

Nutri-Score calculates a final score based on positive nutrients (fruits, fiber, protein) and negative nutrients (energy, sugars, saturated fats, sodium). Special rules are applied as defined by official Nutri-Score guidelines.

- **Negative points:** Based on calories, sugars, saturated fats, and sodium.
- **Positive points:** Based on fruit/vegetable content, fiber, and protein.
- **Special rule:** Protein points are excluded if negative points ≥ 11 and fruit content is < 80%.

## 📚 Resources

- [Nutri-Score Algorithm Documentation (PDF)](https://www.santepubliquefrance.fr/en/nutri-score)
- [Colruytgroup Nutri-Score Website](https://nutriscore.colruytgroup.com/)

## 📝 License

MIT License. See `LICENSE` file for more details.
