import type { Pin } from "@/types/pin";

interface PinInfoProps {
  pin: Pin;
}

export function PinInfo({ pin }: PinInfoProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {pin.title}
        </h1>

        {pin.description && (
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            {pin.description}
          </p>
        )}
      </div>

      <div className="border-t" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Posted by
          </p>

          <p className="mt-1 text-base font-semibold">
            @{pin.authorId}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Published
          </p>

          <p className="mt-1 text-base font-medium">
            {pin.createdAt.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}