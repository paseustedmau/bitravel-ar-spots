import { useCallback, useState, type DragEvent, type ChangeEvent } from 'react';

interface FileUploadProps {
  label: string;
  accept: string;
  hint?: string;
  currentUrl?: string;
  onFileSelected: (file: File) => void;
}

export default function FileUpload({ label, accept, hint, currentUrl, onFileSelected }: FileUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFile = useCallback(
    (file: File) => {
      setFileName(file.name);
      onFileSelected(file);
    },
    [onFileSelected],
  );

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div>
      <label
        className="block text-xs font-semibold mb-1.5"
        style={{ color: 'var(--color-text)' }}
      >
        {label}
      </label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${dragging ? 'var(--color-primary)' : 'var(--color-border)'}`,
          borderRadius: 12,
          padding: '20px 16px',
          textAlign: 'center',
          backgroundColor: dragging ? 'rgba(50,52,218,0.04)' : 'var(--color-surface)',
          transition: 'all 0.15s ease',
          cursor: 'pointer',
        }}
        onClick={() => document.getElementById(`file-${label}`)?.click()}
      >
        <input
          id={`file-${label}`}
          type="file"
          accept={accept}
          onChange={onChange}
          style={{ display: 'none' }}
        />
        {fileName ? (
          <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
            ✅ {fileName}
          </p>
        ) : (
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Arrastra un archivo o haz click para seleccionar
          </p>
        )}
      </div>
      {hint && (
        <p className="text-xs mt-1" style={{ color: 'var(--color-muted-light)' }}>{hint}</p>
      )}
      {currentUrl && !fileName && (
        <p className="text-xs mt-1 truncate" style={{ color: 'var(--color-muted)', fontFamily: 'monospace' }}>
          Actual: {currentUrl.split('/').pop()}
        </p>
      )}
    </div>
  );
}
