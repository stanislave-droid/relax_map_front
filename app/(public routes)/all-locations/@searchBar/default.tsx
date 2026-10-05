import { fetchLocationTypes, fetchRegions } from "@/lib/api/serverApi";
import { SearchBarClient } from "./searchBar.client";

export default async function SearchBar() {
  const [types, regions] = await Promise.all([
    fetchLocationTypes(),
    fetchRegions(),
  ]);

  return (
    <SearchBarClient
      types={Array.isArray(types) ? types : []}
      regions={Array.isArray(regions) ? regions : []}
      activeType="istorychne-mistse"
      activeRegion="podillya"
      search="dsa"
    />
  );
}
