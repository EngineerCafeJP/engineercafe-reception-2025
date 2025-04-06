type Filters = {
  id: boolean;
  email: boolean;
  phone: boolean;
};

type Props = {
  filters: { id: boolean; email: boolean; phone: boolean };
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function SearchFilters({ filters, setFilters }: Props) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev: Filters) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="mb-4 flex items-center gap-4">
      {["id", "email", "phone"].map((key) => (
        <label key={key} className="flex items-center">
          <input
            checked={filters[key as keyof typeof filters]}
            className="mr-2"
            name={key}
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          {key === "id" ? "会員番号" : key === "email" ? "Email" : "電話番号"}
        </label>
      ))}
    </div>
  );
}
