import { auth } from "@/auth";

import { getBoardsByUserService } from "../services/get-boards-by-user";

import { SaveButton } from "./board-save-button";

interface SaveButtonServerProps {
  pinId: string;
}

export async function SaveButtonServer({ pinId }: SaveButtonServerProps) {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const boards = await getBoardsByUserService({
    userId: session.user.id,
  });

  async function handleSave(boardId: string) {
    "use server";

    // Temporary.
    console.log({
      boardId,
      pinId,
    });
  }

  return <SaveButton boards={boards} onSave={handleSave} />;
}
