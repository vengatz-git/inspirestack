import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/constants/categories";

interface CategoryFilterProps {
  activeCategory?: string;
}

export function CategoryFilter({
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
      <Link href="/feed">
        <Badge
          variant={
            !activeCategory
              ? "default"
              : "secondary"
          }
          className="
            whitespace-nowrap
            rounded-full
            px-4
            py-2
            transition-colors
          "
        >
          All
        </Badge>
      </Link>

      {CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/category/${category.toLowerCase()}`}
        >
          <Badge
            variant={
              activeCategory === category
                ? "default"
                : "secondary"
            }
            className="
              whitespace-nowrap
              rounded-full
              px-4
              py-2
              transition-colors
              hover:bg-primary
              hover:text-primary-foreground
            "
          >
            {category}
          </Badge>
        </Link>
      ))}
    </div>
  );
}