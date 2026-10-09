"use client";

import { useState } from "react";

import { Check, ChevronDown, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CreateBoardForm } from "@/features/board/components/create-board-form";
import type { BoardSummary } from "@/features/board/types/board";

interface PinCardBoardPickerProps {
  boards: BoardSummary[];
  selectedBoardId: string | null;
  selectedBoardName: string | null;
  onSelectBoard: (boardId: string) => void;
}

export function PinCardBoardPicker({
  boards,
  selectedBoardId,
  selectedBoardName,
  onSelectBoard,
}: PinCardBoardPickerProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [createBoardOpen, setCreateBoardOpen] = useState(false);

  const filteredBoards = boards.filter((board) =>
    board.name.toLowerCase().includes(query.toLowerCase()),
  );

  const topChoices = filteredBoards.slice(0, 2);

  function handleSelectBoard(boardId: string) {
    onSelectBoard(boardId);
    setQuery("");
  }

  async function handleBoardCreated() {
    setCreateBoardOpen(false);
    router.refresh();
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              aria-label={
                selectedBoardName
                  ? `Selected board: ${selectedBoardName}`
                  : "Choose board"
              }
              className="flex h-10 w-24 shrink-0 items-center justify-between gap-1 rounded-lg bg-transparent px-3 text-sm font-semibold text-white transition-colors hover:bg-black/60 active:bg-black/70"
            />
          }
        >
          <span className="min-w-0 truncate">
            {selectedBoardName ?? "Choose board"}
          </span>

          <ChevronDown size={16} className="shrink-0" aria-hidden="true" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          side="bottom"
          sideOffset={8}
          className="w-80 max-w-[calc(100vw-2rem)] rounded-2xl p-2"
        >
          <div className="relative px-1 pb-2">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="h-10 rounded-xl pl-9"
            />
          </div>

          {topChoices.length > 0 && (
            <DropdownMenuGroup>
              <DropdownMenuLabel>Top choices</DropdownMenuLabel>

              {topChoices.map((board) => (
                <DropdownMenuItem
                  key={`top-${board.id}`}
                  onClick={() => handleSelectBoard(board.id)}
                  className="rounded-xl"
                >
                  <span className="min-w-0 flex-1 truncate">{board.name}</span>

                  {selectedBoardId === board.id && (
                    <Check className="text-primary size-4 shrink-0" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          )}

          <DropdownMenuGroup>
            <DropdownMenuLabel>All boards</DropdownMenuLabel>

            {filteredBoards.length === 0 ? (
              <p className="text-muted-foreground px-3 py-4 text-center text-sm">
                No boards match your search.
              </p>
            ) : (
              filteredBoards.map((board) => (
                <DropdownMenuItem
                  key={board.id}
                  onClick={() => handleSelectBoard(board.id)}
                  className="rounded-xl"
                >
                  <span className="min-w-0 flex-1 truncate">{board.name}</span>

                  {selectedBoardId === board.id && (
                    <Check className="text-primary size-4 shrink-0" />
                  )}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setCreateBoardOpen(true)}
            className="rounded-xl"
          >
            <Plus className="size-4" />
            Create board
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={createBoardOpen} onOpenChange={setCreateBoardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Board</DialogTitle>

            <DialogDescription>
              Organize your favorite ideas into boards.
            </DialogDescription>
          </DialogHeader>

          <CreateBoardForm onSuccess={handleBoardCreated} />
        </DialogContent>
      </Dialog>
    </>
  );
}
