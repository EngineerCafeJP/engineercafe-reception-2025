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

export default function SearchFilters({ register }: Props) {
  return (
    <div className="mb-4 flex items-center gap-4">
      {["id", "email", "phone"].map((key) => (
        <label key={key} className="flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            {...register(key as keyof Filters)}
          />
          {key === "id" ? "会員番号" : key === "email" ? "Email" : "電話番号"}
        </label>
      ))}
    </div>
  );
}
