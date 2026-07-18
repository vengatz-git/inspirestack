"use client";

import {
  Copy,
  Download,
  ExternalLink,
  Info,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PinCardMenuProps {
  children: React.ReactNode;
}

export function PinCardMenu({ children }: PinCardMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-2xl"
      >
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy Link
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Download className="mr-2 h-4 w-4" />
          Download Image
        </DropdownMenuItem>

        <DropdownMenuItem>
          <ExternalLink className="mr-2 h-4 w-4" />
          Open Original
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Info className="mr-2 h-4 w-4" />
          Image Details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}