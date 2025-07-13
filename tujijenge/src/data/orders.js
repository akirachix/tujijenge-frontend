export const orders = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  community: `Group ${((i % 3) + 1)}`,
  date: "2025-04-22",
  location: "Juja, Nairobi",
  amount: "400 kgs",
  total: "1000KSH",
}));