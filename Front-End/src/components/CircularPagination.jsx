import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function CircularPagination({
  handlePageChange,
  activePage,
  totalPages,
}) {
  // const totalPages = 5;
  const next = () => {
    if (activePage === totalPages) return;
    handlePageChange(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;
    handlePageChange(activePage - 1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <IconButton
          key={i}
          variant={activePage === i ? "filled" : "text"}
          color="gray"
          onClick={() => handlePageChange(i)}
          className={`rounded-full w-10 h-10 ${
            activePage === i ? "bg-blue-400 text-gray-900" : "a"
          }`}
        >
          {i}
        </IconButton>
      );
    }

    return buttons;
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">{renderPaginationButtons()}</div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={activePage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
