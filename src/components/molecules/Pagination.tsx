import { useSearchStore } from "../../store/useSearchStore";
import Button from "../atoms/Button";

export default function Pagination() {
  const page = useSearchStore(({ page }) => page);
  const totalPages = useSearchStore(({ totalPages }) => totalPages);

  const setPage = useSearchStore(({ setPage }) => setPage);

  if (totalPages === 0) return;

  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        onClick={() => setPage(page - 1)}
        label="Vorige"
        disabled={page === 1}
      />

      <span>
        {page} van {totalPages}
      </span>

      <Button
        onClick={() => setPage(page + 1)}
        label="Volgende"
        disabled={page === totalPages}
      />
    </div>
  );
}
