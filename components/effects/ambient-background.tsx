export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Top Left */}
      <div
        className="
          absolute
          left-[-12rem]
          top-[-8rem]
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-violet-500/12
          blur-[140px]
        "
      />

      {/* Bottom Right */}
      <div
        className="
          absolute
          bottom-[-12rem]
          right-[-8rem]
          h-[32rem]
          w-[32rem]
          rounded-full
          bg-cyan-500/10
          blur-[160px]
        "
      />

      {/* Center Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/3
          h-[18rem]
          w-[18rem]
          -translate-x-1/2
          rounded-full
          bg-primary/8
          blur-[120px]
        "
      />
    </div>
  );
}