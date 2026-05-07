interface ARInstructionsProps {
  instruction: string;
  visible: boolean;
}

export default function ARInstructions({ instruction, visible }: ARInstructionsProps) {
  if (!visible) return null;

  return (
    <div
      className="mx-5 mb-3 px-4 py-3 rounded-xl flex items-start gap-3"
      style={{ backgroundColor: 'rgba(50, 52, 218, 0.06)' }}
      role="note"
    >
      {/* Compass icon */}
      <span className="text-lg mt-0.5 shrink-0">🧭</span>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--color-primary)' }}
      >
        {instruction}
      </p>
    </div>
  );
}
