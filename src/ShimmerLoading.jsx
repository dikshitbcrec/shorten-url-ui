export const ShimmerLoading = ()=> {
  return (
    <div className="
      bg-gradient-to-r from-gray-900/80 to-gray-800/80
      backdrop-blur-3xl
      rounded-3xl shadow-2xl
      w-full max-w-lg
      p-10 mx-4
      flex flex-col gap-4
      animate-pulse
    ">
      <div className="h-8 w-3/4 mx-auto rounded bg-gray-700" />
      <div className="h-14 rounded bg-gray-700" />
      <div className="h-14 rounded bg-gray-700" />
      <div className="h-20 rounded bg-gray-700" />
    </div>
  );
}
