import { UseFormRegister } from "react-hook-form";

type SearchFormValues = {
  searchText: string;
  id?: boolean;
  email?: boolean;
  phone?: boolean;
};

type Props = {
  register: UseFormRegister<SearchFormValues>;
  onSubmit: () => void;
};

export default function SearchInput({ register, onSubmit }: Props) {
  return (
    <form
      className="mb-4 flex items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="w-full rounded-md border p-3 focus:ring focus:ring-blue-300"
        placeholder="フリーテキストで検索"
        type="text"
        {...register("searchText")}
      />
      <button
        className="rounded-md bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
        type="submit"
      >
        検索
      </button>
    </form>
  );
}
