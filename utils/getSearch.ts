export const getSearch = (search: string) => {
  return search && search !== "undefined" ? decodeURIComponent(search) : "";
};
