export const idString = (num) => {
  const words = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  return num >= 0 && num < words.length ? words[num] : num.toString();
};
