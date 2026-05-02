import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "uz" | "en" | "ru";

type Dict = Record<string, { uz: string; en: string; ru: string }>;

export const dict: Dict = {
  "nav.home": { uz: "Bosh sahifa", en: "Home", ru: "Главная" },
  "nav.products": { uz: "Mahsulotlar", en: "Products", ru: "Продукция" },
  "nav.about": { uz: "Biz haqimizda", en: "About", ru: "О нас" },
  "nav.faq": { uz: "Savol-javob", en: "FAQ", ru: "Вопросы" },
  "nav.contact": { uz: "Aloqa", en: "Contact", ru: "Контакты" },
  "nav.cart": { uz: "Savat", en: "Cart", ru: "Корзина" },

  "hero.title": {
    uz: "An’anaviy o‘zbek gilamlari va kigizlari",
    en: "Traditional Uzbek Carpets & Felt",
    ru: "Традиционные узбекские ковры и войлок",
  },
  "hero.subtitle": {
    uz: "Har bir mahsulot — xalqimiz tarixi va madaniyatining jonli aksi.",
    en: "Each piece is a living reflection of our people's history and culture.",
    ru: "Каждое изделие — живое отражение истории и культуры нашего народа.",
  },
  "hero.cta": { uz: "Mahsulotlarni ko‘rish", en: "View Products", ru: "Посмотреть товары" },

  "home.featured": { uz: "Tanlangan mahsulotlar", en: "Featured Products", ru: "Избранное" },
  "home.about.title": { uz: "Biz haqimizda", en: "About Us", ru: "О нас" },
  "home.about.text": {
    uz: "2012-yildan beri an’anaviy gilam to‘qish va kigiz yasash bilan shug‘ullanamiz. Har bir mahsulot o‘zbek hunarmandchiligini aks ettiradi.",
    en: "Since 2012, we have been engaged in traditional carpet weaving and felt making. Each product reflects Uzbek craftsmanship.",
    ru: "С 2012 года мы занимаемся традиционным ковроткачеством и валянием войлока. Каждое изделие отражает узбекское ремесло.",
  },
  "home.about.more": { uz: "Batafsil", en: "Read more", ru: "Подробнее" },

  "home.why.title": { uz: "Nega bizni tanlaysiz", en: "Why choose us", ru: "Почему мы" },
  "home.why.1.t": { uz: "Qo‘lda to‘qilgan", en: "Handcrafted", ru: "Ручная работа" },
  "home.why.1.d": {
    uz: "Har bir gilam tajribali ustalar tomonidan to‘qiladi.",
    en: "Each carpet is woven by master artisans.",
    ru: "Каждый ковёр соткан опытными мастерами.",
  },
  "home.why.2.t": {
    uz: "Tabiiy materiallar",
    en: "Natural materials",
    ru: "Натуральные материалы",
  },
  "home.why.2.d": {
    uz: "Faqat tabiiy jun va o‘simlik bo‘yoqlari ishlatiladi.",
    en: "Only natural wool and plant-based dyes are used.",
    ru: "Используются только натуральная шерсть и растительные красители.",
  },
  "home.why.3.t": { uz: "An’ana va sifat", en: "Tradition & quality", ru: "Традиции и качество" },
  "home.why.3.d": {
    uz: "Asrlar davomida saqlanib kelgan naqsh va texnikalar.",
    en: "Patterns and techniques preserved for centuries.",
    ru: "Узоры и техники, сохранившиеся веками.",
  },

  "home.awards.title": {
    uz: "Yutuqlar va mukofotlar",
    en: "Achievements & awards",
    ru: "Достижения и награды",
  },
  "home.awards.1": { uz: "10+ yillik tajriba", en: "10+ years of experience", ru: "10+ лет опыта" },
  "home.awards.2": {
    uz: "5000+ mamnun mijoz",
    en: "5000+ happy customers",
    ru: "5000+ довольных клиентов",
  },
  "home.awards.3": {
    uz: "Xalqaro ko‘rgazmalar ishtirokchisi",
    en: "International exhibitions participant",
    ru: "Участник международных выставок",
  },
  "home.awards.4": {
    uz: "Hunarmandchilik mukofoti g‘olibi",
    en: "Craftsmanship award winner",
    ru: "Лауреат премии ремёсел",
  },

  "products.title": { uz: "Barcha mahsulotlar", en: "All Products", ru: "Все товары" },
  "products.subtitle": {
    uz: "Qo‘lda to‘qilgan gilam va kigizlar to‘plami",
    en: "Collection of handwoven carpets and felts",
    ru: "Коллекция ковров и войлока ручной работы",
  },
  "product.price": { uz: "Narxi", en: "Price", ru: "Цена" },
  "product.qty": { uz: "Miqdori", en: "Quantity", ru: "Количество" },
  "product.add": { uz: "Savatga qo‘shish", en: "Add to Cart", ru: "В корзину" },
  "product.added": { uz: "Savatga qo‘shildi", en: "Added to cart", ru: "Добавлено в корзину" },
  "product.back": { uz: "Mahsulotlarga qaytish", en: "Back to products", ru: "Назад к товарам" },

  "cart.title": { uz: "Savat", en: "Cart", ru: "Корзина" },
  "cart.empty": { uz: "Savat bo‘sh", en: "Your cart is empty", ru: "Корзина пуста" },
  "cart.empty.cta": { uz: "Xaridni boshlash", en: "Start shopping", ru: "Начать покупки" },
  "cart.total": { uz: "Jami", en: "Total", ru: "Итого" },
  "cart.order": { uz: "Buyurtma berish", en: "Order Now", ru: "Оформить заказ" },
  "cart.remove": { uz: "O‘chirish", en: "Remove", ru: "Удалить" },

  "order.title": { uz: "Buyurtma berish", en: "Place Order", ru: "Оформить заказ" },
  "order.name": { uz: "To‘liq ism", en: "Full Name", ru: "Полное имя" },
  "order.phone": { uz: "Telefon raqami", en: "Phone Number", ru: "Номер телефона" },
  "order.location": { uz: "Manzil", en: "Location", ru: "Адрес" },
  "order.agree": {
    uz: "Men ofertani shartlariga roziman",
    en: "I agree to the offer terms",
    ru: "Я согласен с условиями оферты",
  },
  "order.offer": { uz: "oferta", en: "offer", ru: "оферта" },
  "order.submit": { uz: "Buyurtmani yuborish", en: "Submit Order", ru: "Отправить заказ" },
  "order.success": {
    uz: "Buyurtmangiz qabul qilindi! Tez orada bog‘lanamiz.",
    en: "Your order has been received! We'll contact you soon.",
    ru: "Ваш заказ принят! Мы свяжемся с вами в ближайшее время.",
  },
  "order.error": { uz: "Xatolik yuz berdi", en: "An error occurred", ru: "Произошла ошибка" },

  "about.title": { uz: "Biz haqimizda", en: "About Us", ru: "О нас" },
  "about.p1": {
    uz: "Biz turli xil gilam va kigiz mahsulotlarini ishlab chiqaramiz. Mahsulotlarimiz orasida an’anaviy to‘qish va kigiz buyumlari mavjud bo‘lib, ular ham bozor, ham uy uchun mosdir. Gilam va kigizlar nafaqat ichki bezakni go‘zallashtiradi, balki o‘zining nafisligi bilan ham ajralib turadi. Har bir mahsulot rang va naqshlari orqali xalqimizning tarixiy va madaniy merosini aks ettiradi.",
    en: "We produce various types of carpets and felt products. Our products include traditional weaving and felt items suitable for both markets and home use. Carpets and felts not only decorate interiors but also stand out with their elegance. Each product reflects the historical and cultural heritage of our people through colors and patterns.",
    ru: "Мы производим различные виды ковров и войлочных изделий. Наша продукция включает традиционные тканые и войлочные изделия, подходящие как для рынка, так и для дома. Ковры и войлок не только украшают интерьер, но и выделяются своей элегантностью. Каждое изделие отражает историческое и культурное наследие нашего народа через цвета и узоры.",
  },
  "about.activity": { uz: "Bizning faoliyatimiz", en: "Our Activity", ru: "Наша деятельность" },
  "about.p2": {
    uz: "2012-yildan beri an’anaviy gilam to‘qish va kigiz yasash bilan shug‘ullanamiz. Har bir mahsulot o‘zbek hunarmandchiligini aks ettiradi. Biz bir necha mukofot va yutuqlarga sazovor bo‘lganmiz.",
    en: "Since 2012, we have been engaged in traditional carpet weaving and felt making. Each product reflects Uzbek craftsmanship. We have received multiple awards and achievements.",
    ru: "С 2012 года мы занимаемся традиционным ковроткачеством и валянием войлока. Каждое изделие отражает узбекское мастерство. Мы получили множество наград и достижений.",
  },

  "faq.title": {
    uz: "Ko‘p so‘raladigan savollar",
    en: "Frequently Asked Questions",
    ru: "Часто задаваемые вопросы",
  },
  "faq.q1": {
    uz: "Qanday materiallar ishlatiladi?",
    en: "What materials are used?",
    ru: "Какие материалы используются?",
  },
  "faq.a1": {
    uz: "Faqat tabiiy qo‘y juni, paxta va o‘simlik bo‘yoqlari ishlatiladi.",
    en: "Only natural sheep wool, cotton, and plant-based dyes are used.",
    ru: "Используются только натуральная овечья шерсть, хлопок и растительные красители.",
  },
  "faq.q2": {
    uz: "Mahsulotlar qo‘lda tayyorlanadimi?",
    en: "Are products handmade?",
    ru: "Изделия ручной работы?",
  },
  "faq.a2": {
    uz: "Ha, barcha mahsulotlar tajribali ustalar tomonidan qo‘lda tayyorlanadi.",
    en: "Yes, all products are handmade by experienced master artisans.",
    ru: "Да, все изделия изготавливаются вручную опытными мастерами.",
  },
  "faq.q3": {
    uz: "Yetkazib berish muddati qancha?",
    en: "What is the delivery time?",
    ru: "Сроки доставки?",
  },
  "faq.a3": {
    uz: "Toshkent bo‘yicha 1-3 kun, viloyatlarga 3-7 kun.",
    en: "1–3 days within Tashkent, 3–7 days to other regions.",
    ru: "1–3 дня по Ташкенту, 3–7 дней в регионы.",
  },
  "faq.q4": {
    uz: "Maxsus buyurtma qabul qilasizmi?",
    en: "Do you accept custom orders?",
    ru: "Принимаете ли индивидуальные заказы?",
  },
  "faq.a4": {
    uz: "Ha, o‘lchov, rang va naqsh bo‘yicha individual buyurtmalar qabul qilinadi.",
    en: "Yes, custom orders by size, color, and pattern are accepted.",
    ru: "Да, принимаем индивидуальные заказы по размеру, цвету и узору.",
  },
  "faq.q5": {
    uz: "Qanday buyurtma berish mumkin?",
    en: "How can I order?",
    ru: "Как сделать заказ?",
  },
  "faq.a5": {
    uz: "Mahsulotni savatga qo‘shing, so‘ng buyurtma shaklini to‘ldiring.",
    en: "Add a product to the cart and fill in the order form.",
    ru: "Добавьте товар в корзину и заполните форму заказа.",
  },
  "faq.q6": {
    uz: "Qanday to‘lov usullari mavjud?",
    en: "What payment methods are available?",
    ru: "Какие способы оплаты?",
  },
  "faq.a6": {
    uz: "Naqd, plastik karta, Click, Payme orqali to‘lov qabul qilinadi.",
    en: "Cash, bank cards, Click, and Payme payments are accepted.",
    ru: "Принимаем наличные, банковские карты, Click и Payme.",
  },

  "contact.title": { uz: "Biz bilan bog‘laning", en: "Contact Us", ru: "Свяжитесь с нами" },
  "contact.name": { uz: "Ismingiz", en: "Your Name", ru: "Ваше имя" },
  "contact.email": { uz: "Emailingiz", en: "Your Email", ru: "Ваше email" },
  "contact.phone": { uz: "Telefon", en: "Phone", ru: "Телефон" },
  "contact.message": { uz: "Xabar", en: "Message", ru: "Сообщение" },
  "contact.send": { uz: "Yuborish", en: "Send", ru: "Отправить" },
  "contact.sent": { uz: "Xabar yuborildi", en: "Message sent", ru: "Сообщение отправлено" },
  "contact.info": { uz: "Aloqa ma’lumotlari", en: "Contact Info", ru: "Контактная информация" },
  "contact.address": { uz: "Manzil", en: "Address", ru: "Адрес" },
  "contact.address.val": {
    uz: "Shumanay tumani Monshakli MFY Mahallasi, O'zbekiston ko'chasi 125uy - yashovchi fuqaro NAUBETOVA ni qoldirining ALTINAY xx dan  ",
    en: "Shumanay district, Monshakli MFY neighborhood, 125 Uzbekiston street - resident of NAUBETOVA, from ALTINAY xx",
    ru: "Шуманайский район, микрорайон Моншакли МФЙ, улица Узбекистон 125 - жительница НАУБЕТОВА, с АЛТИНАЙ хх",
  },

  "offer.title": { uz: "Ofertaning shartlari", en: "Offer Terms", ru: "Условия оферты" },
  "offer.text": {
    uz: "Buyurtma berish orqali siz mahsulot tavsifi, narxi va yetkazib berish shartlari bilan tanishganingizni tasdiqlaysiz. Buyurtma tasdiqlangandan so‘ng bekor qilish faqat administrator bilan kelishilgan holda amalga oshiriladi. To‘lov qabul qilingach, buyurtma jarayoni boshlanadi.",
    en: "By placing an order, you confirm that you are familiar with the product description, price, and delivery terms. After confirmation, cancellation is possible only by agreement with the administrator. The order process begins after payment is received.",
    ru: "Размещая заказ, вы подтверждаете, что ознакомлены с описанием товара, ценой и условиями доставки. После подтверждения отмена возможна только по согласованию с администратором. Процесс заказа начинается после получения оплаты.",
  },

  "footer.tagline": {
    uz: "An’anaviy o‘zbek gilamlari va kigizlari",
    en: "Traditional Uzbek carpets and felt",
    ru: "Традиционные узбекские ковры и войлок",
  },
  "footer.rights": {
    uz: "Barcha huquqlar himoyalangan",
    en: "All rights reserved",
    ru: "Все права защищены",
  },
};

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
}>({
  lang: "uz",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved && ["uz", "en", "ru"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: string) => dict[k]?.[lang] ?? k;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);

export const formatPrice = (n: number, lang: Lang) => {
  const formatted = new Intl.NumberFormat("uz-UZ").format(n);
  const suffix = lang === "uz" ? "so‘m" : lang === "ru" ? "сум" : "UZS";
  return `${formatted} ${suffix}`;
};
