import carpet1 from "@/assets/product-carpet-1.jpg";
import carpet2 from "@/assets/product-carpet-2.jpg";
import carpet3 from "@/assets/product-carpet-3.jpg";
import felt1 from "@/assets/product-felt-1.jpg";
import felt2 from "@/assets/product-felt-2.jpg";
import felt3 from "@/assets/product-felt-3.jpg";

export type Product = {
  id: string;
  image: string;
  price: number;
  name: { uz: string; en: string; ru: string };
  description: { uz: string; en: string; ru: string };
};

export const products: Product[] = [
  {
    id: "qizil-gilam",
    image: carpet1,
    price: 1200000,
    name: {
      uz: "Qizil medalyon gilam",
      en: "Red Medallion Carpet",
      ru: "Красный медальонный ковёр",
    },
    description: {
      uz: "Qo‘lda to‘qilgan an’anaviy o‘zbek gilami. Markazida nafis medalyon naqshi.",
      en: "Hand-woven traditional Uzbek carpet with an elegant central medallion.",
      ru: "Традиционный узбекский ковёр ручной работы с элегантным центральным медальоном.",
    },
  },
  {
    id: "kok-kigiz",
    image: felt1,
    price: 850000,
    name: {
      uz: "Ko‘k kigiz gilam",
      en: "Indigo Felt Rug (Kigiz)",
      ru: "Индиго войлочный коврик (кигиз)",
    },
    description: {
      uz: "Tabiiy junidan tayyorlangan kigiz. Yorqin qabila naqshlari bilan bezatilgan.",
      en: "Felt rug made from natural wool, decorated with vivid tribal patterns.",
      ru: "Войлочный ковёр из натуральной шерсти, украшенный яркими племенными узорами.",
    },
  },
  {
    id: "tilla-gilam",
    image: carpet2,
    price: 1450000,
    name: {
      uz: "Tilla rangli gulli gilam",
      en: "Golden Floral Carpet",
      ru: "Золотистый цветочный ковёр",
    },
    description: {
      uz: "Gulli naqshlar bilan bezatilgan, issiq ranglardagi nafis gilam.",
      en: "Refined carpet in warm tones, decorated with intricate floral patterns.",
      ru: "Изысканный ковёр в тёплых тонах с замысловатыми цветочными узорами.",
    },
  },
  {
    id: "oq-kigiz",
    image: felt2,
    price: 720000,
    name: {
      uz: "Oq kigiz devor bezagi",
      en: "White Felt Wall Hanging",
      ru: "Белое войлочное настенное украшение",
    },
    description: {
      uz: "Devorga osiladigan an’anaviy kigiz, ramziy naqshlar bilan.",
      en: "Traditional wall-hanging felt with symbolic patterns.",
      ru: "Традиционный настенный войлок с символическими узорами.",
    },
  },
  {
    id: "kok-medalyon",
    image: carpet3,
    price: 1850000,
    name: {
      uz: "Ko‘k medalyon gilam",
      en: "Indigo Medallion Carpet",
      ru: "Индиго медальонный ковёр",
    },
    description: {
      uz: "Chuqur ko‘k va tilla ranglarda nafis medalyon naqshli gilam.",
      en: "Elegant medallion carpet in deep blue and gold colors.",
      ru: "Элегантный медальонный ковёр в глубоких синих и золотых тонах.",
    },
  },
  {
    id: "tabiiy-kigiz",
    image: felt3,
    price: 580000,
    name: {
      uz: "Tabiiy kigiz doira",
      en: "Natural Round Felt",
      ru: "Натуральный круглый войлок",
    },
    description: {
      uz: "Tabiiy ranglardagi qo‘lda yasalgan dumaloq kigiz.",
      en: "Handmade round felt mat in natural earthy tones.",
      ru: "Круглый войлочный коврик ручной работы в натуральных тонах.",
    },
  },
];

export const featuredProducts = products.slice(0, 3);
