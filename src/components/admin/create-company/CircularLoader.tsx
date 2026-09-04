export function CircularLoader() {
  return (
    <span
      aria-hidden="true"
      className="relative grid h-5 w-5 place-items-center rounded-full border border-white/20"
    >
      <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-white animate-spin" />
    </span>
  );
}
