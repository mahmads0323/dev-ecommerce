import React, { useState } from "react";
import Search_Icon from "/magnifying-glass-solid.svg";
import Filter_Icon from "/filter-solid.svg";
import Exit_Icon from "/circle-xmark-solid.svg";
import availableFilter from "../../reusable/availableFilters";

type FilterAndSearchProps = {
  searchvalue: string;
  handleChangeSearchValue: (e:React.ChangeEvent<HTMLInputElement>) => void;
  filters: string[];
  handleSetFilters: (e:React.ChangeEvent<HTMLInputElement>) => void;
  handleClearFilters: ()=>void
};

const FilterAndSearch = ({
  searchvalue,
  handleChangeSearchValue,
  filters,
  handleSetFilters,
  handleClearFilters,
}: FilterAndSearchProps) => {

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const toggleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

 

  return (
    <section className="py-4 flex px-4 justify-between items-center sm:px-6 md:px-8 lg:px-10 lg:flex-row-reverse lg:justify-end lg:space-x-0 lg:gap-x-4">
      <div className="flex w-min justify-center items-center border-b border-lightBunker focus-within:pb-1 ">
        <input
          type="text"
          value={searchvalue}
          placeholder="Search here"
          onChange={handleChangeSearchValue}
          className="bg-transparent py-1 px-2 border-none focus:outline-none"
        />
        <img src={Search_Icon} alt="Search_Icon" className="h-4 w-4" />
      </div>

      <div className="relative">
        <div className="flex space-x-2">
          <button
            className="flex space-x-1 items-center"
            onClick={toggleFilterMenu}
          >
            <img src={Filter_Icon} alt="Filter_Icon" className="h-4 w-4" />
            <span>Filters</span>
          </button>
          {filters.length > 0 && (
            <button
              onClick={handleClearFilters}
              className="flex items-center mx-2 space-x-1 bg-lightWhite px-1 py-1 text-sm rounded-sm border border-customBlue hover:scale-105"
            >
              <p>Clear filters</p>
              <img src={Exit_Icon} alt="Exit_Icon" className="h-4 w-4" />
            </button>
          )}
        </div>
        <div
          className={`${
            filterMenuOpen ? "block" : "hidden"
          } absolute top-0 right-0 bg-lightWhite py-4 px-2 rounded-lg transition-all z-50 lg:left-0 lg:w-max`}
        >
          <button
            onClick={toggleFilterMenu}
            className="w-full flex justify-end pb-2"
          >
            <img src={Exit_Icon} alt="Exit_Icon" className="h-4 w-4" />
          </button>
          {availableFilter.map((filterItem, index) => (
            <label className="block text-nowrap space-x-2">
              <input
                type="checkbox"
                value={filterItem}
                key={index}
                onChange={handleSetFilters}
                checked={filters.includes(filterItem)}
              />
              <span>{filterItem}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterAndSearch;
