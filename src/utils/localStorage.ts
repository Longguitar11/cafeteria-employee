export const getItemLS = (item: string) => {
  if (typeof window !== 'undefined') return localStorage.getItem(item);
};
