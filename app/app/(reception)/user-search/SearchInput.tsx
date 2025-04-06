type Props = {
  searchText: string;
  setSearchText: (text: string) => void;
  onSearch: () => void;
};

export default function SearchInput({
  searchText,
  setSearchText,
  onSearch,
}: Props) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <input
        className="w-full rounded-md border p-3 focus:ring focus:ring-blue-300"
        placeholder="フリーテキストで検索"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className="rounded-md bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
        onClick={onSearch}
      >
        検索
      </button>
    </div>
  );
}
