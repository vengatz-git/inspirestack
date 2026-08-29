"use client";

import { useState } from "react";

import { CreatePinForm } from "./create-pin-form";
import { CreatePinNavbar } from "./create-pin-navbar";
import { DraftsSidebar } from "./drafts-sidebar";

import type { TopicOption } from "@/features/topic/types/topic";

interface CreatePinPageProps {
  topics: TopicOption[];
}

export function CreatePinPage({
  topics,
}: CreatePinPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <CreatePinNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() =>
          setIsSidebarOpen((current) => !current)
        }
      />

      <div className="flex min-h-0 flex-1">
        <DraftsSidebar isOpen={isSidebarOpen} />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-5xl px-6 py-8">
            <CreatePinForm topics={topics} />
          </div>
        </main>
      </div>
    </div>
  );
}