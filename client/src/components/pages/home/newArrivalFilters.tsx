
const filters = [
  "Men's cloth",
  "Women's cloth",
  "Men's Asscesories",
  "Women's Accesories",
];

type NewArrivalFiltersProps = {
  selectedCategory: string[],
  handleSelectCategory: (item:string)=>void
}

const NewArrivalFilters = ({selectedCategory, handleSelectCategory}:NewArrivalFiltersProps) => {
  return (
    <div className="flex items-center w-full justify-center space-x-2 overflow-hidden px-4">
      {filters.map((item, index) => (
        <button
          key={index}
          onClick={()=>handleSelectCategory(item)}
          className={`${
            selectedCategory[0] ===item
              ? "bg-bunker text-lightWhite shadow shadow-bunker"
              : "bg-lightWhite text-bunker"
          } p-1 rounded-lg text-xs sm:text-sm md:text-base md:px-2 lg:px-3 lg:py-2`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default NewArrivalFilters;
