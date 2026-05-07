export default function ARLoadingSkeleton() {
  return (
    <div className="flex flex-col h-full" aria-busy="true" aria-label="Cargando experiencia AR">
      {/* Header skeleton */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-8 h-8 rounded-lg animate-pulse"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          <div
            className="h-4 w-20 rounded-full animate-pulse"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
        </div>

        <div
          className="h-7 w-3/4 rounded-xl mb-3 animate-pulse"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
        <div
          className="h-4 w-full rounded-lg mb-2 animate-pulse"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
        <div
          className="h-4 w-5/6 rounded-lg animate-pulse"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
      </div>

      {/* Model viewer skeleton */}
      <div
        className="mx-5 rounded-2xl flex-1 flex items-center justify-center animate-pulse"
        style={{
          backgroundColor: 'var(--color-surface)',
          minHeight: '280px',
        }}
      >
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-3 animate-pulse"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          <div
            className="h-3 w-32 rounded-full mx-auto animate-pulse"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
        </div>
      </div>

      {/* Button skeleton */}
      <div className="px-5 py-4">
        <div
          className="h-14 w-full rounded-2xl animate-pulse"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
      </div>
    </div>
  );
}
