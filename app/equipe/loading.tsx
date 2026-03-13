export default function LoadingEquipePage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        <div className="h-44 rounded-sm border border-white/10 skeleton-shimmer" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-64 rounded-sm border border-white/10 skeleton-shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}
