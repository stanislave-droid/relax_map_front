export const getSearch = (search: string) => {
  if (search && search != "") return decodeURIComponent(search);
  else return undefined;
};
