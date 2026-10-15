import { CreateBoardButton } from "../create-board-button";

export function BoardSearchEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-20 text-center">
      <h3 className="text-lg font-semibold">
        Create your first board
      </h3>

      <p className="text-muted-foreground mt-2 max-w-xs text-sm">
        Create a board to save and organize your Pins.
      </p>

      <div className="mt-5">
        <CreateBoardButton />
      </div>
    </div>
  );
}