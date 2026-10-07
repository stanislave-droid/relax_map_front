export const getSearch = (search: string) => {
  return search ? decodeURIComponent(search) : "";
};
