import { UseFormRegister } from "react-hook-form";

export type Filters = {
  id?: boolean;
  email?: boolean;
  phone?: boolean;
  name?: boolean;
  pronunciation?: boolean;
  searchText: string;
};

type Props = {
  register: UseFormRegister<Filters>;
};

type FilterItemKey = Exclude<keyof Filters, "searchText">;

const filterItems: { name: FilterItemKey; text: string }[] = [
  { name: "id", text: "会員番号" },
  { name: "name", text: "名前" },
  { name: "pronunciation", text: "フリガナ" },
  { name: "email", text: "Email" },
  { name: "phone", text: "電話番号" },
];

const FilterLabel: React.FC<{
  filterItem: { name: FilterItemKey; text: string };
  register: UseFormRegister<Filters>;
}> = ({ filterItem, register }) => {
  return (
    <label className="flex items-center">
      <input className="mr-2" type="checkbox" {...register(filterItem.name)} />
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
          filterItem={filterItem}
          register={register}
        />
      ))}
    </div>
  );
}
