"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface BoardSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function BoardSearch({ value, onChange }: BoardSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

      <Input
        ref={inputRef}
        value={value}
        placeholder="Search boards..."
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-xl pl-10"
      />
    </div>
  );
}
