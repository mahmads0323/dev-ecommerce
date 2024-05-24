import { useLocation } from "react-router-dom";
import FilterAndSearch from "./filterAndSearch";
import Products from "./products";
import React, { useEffect, useState } from "react";

const ProductsPage = () => {
  const [searchvalue, setSearchValue] = useState("");
  const [debounceSearchvalue, setDebounceSearchValue] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const pathName = useLocation().pathname;
  console.log("pathName: ", pathName)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchValue(searchvalue);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchvalue]);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSetFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (filters.includes(e.target.value)) {
      const tempFilter = filters.filter(
        (filterItem) => filterItem != e.target.value
      );
      setFilters(tempFilter);
      return;
    }
    const tempFilter = [...filters, e.target.value];
    setFilters(tempFilter);
    return;
  };

  const handleClearFilters = () => {
    setFilters([]);
  };

  return (
    <>
      <section className="bg-lightWhite text-bunker h-[40vh] flex w-full justify-center items-center border-y border-bunker">
        <h4 className="text-base font-semibold sm:text-lg md:font-bold md:text-xl lg:text-2xl">
          Everything under one domain.
        </h4>
      </section>
      <FilterAndSearch
        searchvalue={searchvalue}
        handleChangeSearchValue={handleChangeSearchValue}
        filters={filters}
        handleSetFilters={handleSetFilters}
        handleClearFilters={handleClearFilters}
      />
      <Products filters={filters} searchvalue={debounceSearchvalue} mode={pathName.includes("admin") ? "admin" : "user"}/>
    </>
  );
};

export default ProductsPage;
