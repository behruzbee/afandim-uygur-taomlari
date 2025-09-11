export enum Category {
  Shashlik = "shashlik",
  HotDishes = "hot_dishes",
  Salad = "salad",
  Seafood = "seafood",
  Lagman = "lagman",
  Soups = "soups",
  Drinks = "drinks",
}

export const FOODS = [
  {
    id: 1,
    category: Category.Shashlik,
    image:
      "https://cdn.lifehacker.ru/wp-content/uploads/2019/04/Depositphotos_74432563_xl-2015_1556195455-e1556195544193-1500x750.jpg",
    title: {
      ru: "Шашлык из баранины",
      uz: "Qo‘y go‘shti shashlik",
      en: "Lamb Shashlik",
      zh: "羊肉串",
    },
    description: {
      ru: "Сочный шашлык из баранины",
      uz: "Sharbatli qo‘y go‘shti shashlik",
      en: "Juicy lamb shashlik",
      zh: "多汁的羊肉串",
    },
    price: 20000,
    time: "15 min",
  },
  {
    id: 2,
    category: Category.Shashlik,
    image:
      "https://restoran-mimi.ru/assets/cache_image/assets/content/shashlik-iz-govyadini-7_1866x0_8a8.webp",
    title: {
      ru: "Шашлык из говядины",
      uz: "Mol go‘shtidan shashlik",
      en: "Beef Shashlik",
      zh: "牛肉串",
    },
    description: {
      ru: "Нежный шашлык из говядины с ароматными специями",
      uz: "Xushbo‘y ziravorlar bilan mol go‘shtidan shashlik",
      en: "Tender beef shashlik with aromatic spices",
      zh: "嫩牛肉串配香料",
    },
    price: 25000,
    time: "20 min",
  },
  {
    id: 3,
    category: Category.Shashlik,
    image:
      "https://cdn.lifehacker.ru/wp-content/uploads/2023/12/111_1703863050-1800x900.jpg",
    title: {
      ru: "Жареные бараньи ребрышки",
      uz: "Qovurilgan qo‘y qovurg‘alari",
      en: "Fried Lamb Ribs",
      zh: "烤羊排",
    },
    description: {
      ru: "Сочные жареные бараньи ребрышки на гриле",
      uz: "Sharbatli qovurilgan qo‘y qovurg‘alari",
      en: "Juicy fried lamb ribs on the grill",
      zh: "多汁的烤羊排",
    },
    price: 30000,
    time: "15 min",
  },
];
