import { UseFormRegister } from "react-hook-form";

type Filters = {
  id: boolean;
  email: boolean;
  phone: boolean;
  searchText: string;
};

type Props = {
  register: UseFormRegister<Filters>;
};

const filterItems = [
  { name: "id", text: "会員番号" },
  { name: "email", text: "Email" },
  { name: "phone", text: "電話番号" },
];

const FilterLabel: React.FC<{
  filterItem: { name: string; text: string };
  register: UseFormRegister<Filters>;
}> = ({ filterItem, register }) => {
  return (
    <label className="flex items-center">
      <input
        className="mr-2"
        type="checkbox"
        {...register(filterItem.name as keyof Filters)}
      />
      {filterItem.text}
    </label>
  );
};

export default function SearchFilters({ register }: Props) {
  return (
    <div className="mb-4 flex items-center gap-4">
      {filterItems.map((filterItem) => (
        <FilterLabel
          key={filterItem.name}
          filterItem={filterItem as { name: keyof Filters; text: string }}
          register={register}
        />
      ))}
    </div>
  );
}
