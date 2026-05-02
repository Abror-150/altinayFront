export type ProductCategory = "carpet" | "felt";

export type Product = {
  id: string;
  slug: string;
  category: ProductCategory;
  name: { en: string; uz: string; ru: string };
  shortDesc: { en: string; uz: string; ru: string };
  longDesc: { en: string; uz: string; ru: string };
  materials: { en: string; uz: string; ru: string };
  process: { en: string; uz: string; ru: string };
  price: number;
  image: string;
  video?: string;
};

const BASE_URL = "https://api.altinay.uz";

export const mapApiProduct = (item: any): Product => {
  console.log("RAW VIDEO:", item.video);

  return {
    id: item.id,
    slug: item.id,
    category: item.category ?? "carpet",
    name: {
      en: item.name_en ?? "",
      uz: item.name_uz ?? "",
      ru: item.name_ru ?? "",
    },
    shortDesc: {
      en: item.description_en ?? "",
      uz: item.description_uz ?? "",
      ru: item.description_ru ?? "",
    },
    longDesc: {
      en: item.description_en ?? "",
      uz: item.description_uz ?? "",
      ru: item.description_ru ?? "",
    },
    materials: { en: "", uz: "", ru: "" },
    process: { en: "", uz: "", ru: "" },
    price: parseFloat(item.price),
    image: item.image
      ? item.image.startsWith("http")
        ? item.image
        : `${BASE_URL}/images/${item.image}`
      : "",
    video: item.video
      ? item.video.startsWith("http")
        ? item.video
        : `${BASE_URL}/uploads/videos/${item.video}`
      : undefined,
  };
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/product`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.map(mapApiProduct);
};

export const fetchProduct = async (id: string): Promise<Product | null> => {
  const res = await fetch(`${BASE_URL}/product/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return mapApiProduct(data);
};
