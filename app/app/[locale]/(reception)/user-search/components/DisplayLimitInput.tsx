type Props = {
  limit: number;
  onLimitChange: (limit: number) => void;
};

export default function DisplayLimitInput({ limit, onLimitChange }: Props) {
  const handleLimitChange = (limit: number) => {
    onLimitChange(limit);
  };

  return (
    <div className="flex justify-end">
      <div>
        <label className="mr-2" htmlFor="limit">
          表示件数
        </label>
        <input
          className="input-bordered w-24"
          min={100}
          step={100}
          type="number"
          value={limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
