import React, { useState, useRef, useEffect } from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { hexWithAlpha, ErrorIcon } from './_theme';

export type FileUploadStatus = 'idle' | 'uploading' | 'done' | 'error';

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  url?: string;
  thumbnailUrl?: string;
  status: FileUploadStatus;
  progress: number;
  error?: string;
}

export interface FileUploadProps {
  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelExtra?: React.ReactNode;
  requiredMark?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: React.ReactNode;
  error?: string;
  helperText?: string;

  value?: UploadedFile[];
  defaultValue?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  onRemove?: (file: UploadedFile) => void;
  onPreview?: (file: UploadedFile) => void;
  showPreviewAction?: boolean;
  previewActionText?: string;
  previewButtonVariant?: 'pill' | 'text';
  showRemove?: boolean;

  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  fileTypesLabel?: string;

  uploadText?: React.ReactNode;
  browseText?: string | React.ReactNode;
  hintText?: React.ReactNode;
  dropZoneIcon?: React.ReactNode;

  onUpload?: (
    file: File,
    helpers: {
      onProgress: (pct: number) => void;
    }
  ) => Promise<{ url?: string; thumbnailUrl?: string } | void>;

  showPreview?: boolean;
  previewLayout?: 'list' | 'grid';
  keepInputOnUpload?: boolean;
  showCount?: boolean;

  className?: string;
  style?: React.CSSProperties;
  dropzoneClassName?: string;
  dropzoneStyle?: React.CSSProperties;

  accentColor?: string;
  errorColor?: string;
  borderColor?: string;
  dropzoneBgColor?: string;

  control?: Control<any>;
  name?: string;
  id?: string;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const getFileExt = (name: string): string => {
  const parts = name.split('.');
  return parts.length > 1 ? (parts.pop() as string).toLowerCase() : '';
};

const isImage = (file: File | UploadedFile): boolean => {
  const type = 'type' in file ? file.type : (file as File).type;
  return type?.startsWith('image/') || false;
};

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const DownloadArrowIcon: React.FC<{ color?: string; size?: number }> = ({
  color = '#181918',
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 12.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V12.5M14.1667 8.33333L10 12.5M10 12.5L5.83333 8.33333M10 12.5V2.5"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileIcon: React.FC<{ ext: string; size?: number }> = ({ ext, size = 36 }) => {
  const palette: Record<string, string> = {
    pdf: '#EC615B',
    doc: '#4A9FD8',
    docx: '#4A9FD8',
    xls: '#5FB894',
    xlsx: '#5FB894',
    png: '#9B59D8',
    jpg: '#9B59D8',
    jpeg: '#9B59D8',
  };
  const color = palette[ext] ?? '#8C8C8C';
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M8 4h14l6 6v22a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
        fill={hexWithAlpha(color, 0.1)}
        stroke={color}
        strokeWidth="1.3"
      />
      <path d="M22 4v6h6" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <text
        x="18"
        y="26"
        textAnchor="middle"
        fill={color}
        fontSize="7"
        fontFamily="sans-serif"
        fontWeight="700"
      >
        {ext.toUpperCase().slice(0, 4)}
      </text>
    </svg>
  );
};

const TrashIcon: React.FC<{ color?: string; size?: number }> = ({
  color = '#181918',
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 2.5H12.5M2.5 5H17.5M15.8333 5L15.2489 13.7661C15.1612 15.0813 15.1174 15.7389 14.8333 16.2375C14.5833 16.6765 14.206 17.0294 13.7514 17.2497C13.235 17.5 12.5759 17.5 11.2578 17.5H8.74221C7.42409 17.5 6.76503 17.5 6.24861 17.2497C5.79396 17.0294 5.41674 16.6765 5.16665 16.2375C4.88259 15.7389 4.83875 15.0813 4.75107 13.7661L4.16667 5M8.33333 8.75V12.9167M11.6667 8.75V12.9167"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Spinner: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#EC615B' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="shekel-spin"
    style={{ color }}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
    <path d="M12 3a9 9 0 019 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const FileUploadBase: React.FC<Omit<FileUploadProps, 'control'>> = (props) => {
  const {
    label,
    labelClassName = '',
    labelStyle,
    labelExtra,
    requiredMark,
    required,
    disabled,
    loading,
    loadingText = 'Uploading…',
    error,
    helperText,
    value: externalValue,
    defaultValue,
    onChange,
    onRemove,
    onPreview,
    showPreviewAction = true,
    previewActionText = 'View',
    previewButtonVariant = 'pill',
    showRemove = true,
    accept,
    multiple = false,
    maxSize,
    maxFiles,
    fileTypesLabel,
    uploadText = 'Drag and drop your document here or',
    browseText = 'Browse',
    hintText,
    dropZoneIcon,
    onUpload,
    showPreview = true,
    previewLayout = 'list',
    keepInputOnUpload = true,
    showCount = true,
    className = '',
    style,
    dropzoneClassName = '',
    dropzoneStyle,
    accentColor = '#EC615B',
    errorColor = '#C21919',
    borderColor = '#D9D9D9',
    dropzoneBgColor = '#FFFFFF',
    id,
  } = props;

  const reactId = React.useId();
  const inputId = id ?? reactId;
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = externalValue !== undefined;
  const [innerFiles, setInnerFiles] = useState<UploadedFile[]>(defaultValue ?? []);
  const files = isControlled ? (externalValue as UploadedFile[]) : innerFiles;

  const [isDragging, setIsDragging] = useState(false);
  const [dropError, setDropError] = useState<string>('');

  const isError = !!error || !!dropError;
  const resolvedRequiredMark =
    requiredMark === undefined ? <span style={{ color: errorColor }}>*</span> : requiredMark;

  const resolvedHint =
    hintText ??
    (fileTypesLabel
      ? `Supported file types: ${fileTypesLabel}${
          maxSize ? `. Max file size, ${formatBytes(maxSize)}` : ''
        }`
      : null);

  const commit = (next: UploadedFile[]) => {
    if (!isControlled) setInnerFiles(next);
    onChange?.(next);
  };

  const updateFile = (id: string, patch: Partial<UploadedFile>) => {
    setInnerFiles((prev) => {
      const next = prev.map((f) => (f.id === id ? { ...f, ...patch } : f));
      if (!isControlled) return next;
      return prev;
    });
    if (isControlled && externalValue) {
      const next = externalValue.map((f) => (f.id === id ? { ...f, ...patch } : f));
      onChange?.(next);
    }
  };

  const validate = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `"${file.name}" exceeds max size of ${formatBytes(maxSize)}`;
    }
    if (accept) {
      const accepted = accept.split(',').map((a) => a.trim().toLowerCase());
      const ext = '.' + getFileExt(file.name);
      const typeMatch = accepted.some((a) => {
        if (a.startsWith('.')) return a === ext;
        if (a.endsWith('/*')) return file.type.startsWith(a.replace('/*', '/'));
        return file.type === a;
      });
      if (!typeMatch) return `"${file.name}" is not an allowed file type`;
    }
    return null;
  };

  const addFiles = async (newFiles: File[]) => {
    setDropError('');
    if (newFiles.length === 0) return;

    if (!multiple) newFiles = newFiles.slice(0, 1);
    if (maxFiles && files.length + newFiles.length > maxFiles) {
      setDropError(`Max ${maxFiles} files allowed`);
      return;
    }

    const validationErrors: string[] = [];
    const accepted: UploadedFile[] = [];

    for (const file of newFiles) {
      const err = validate(file);
      if (err) {
        validationErrors.push(err);
        continue;
      }
      const thumbnailUrl = isImage(file) ? URL.createObjectURL(file) : undefined;
      accepted.push({
        id: makeId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        thumbnailUrl,
        status: onUpload ? 'uploading' : 'done',
        progress: onUpload ? 0 : 100,
      });
    }

    if (validationErrors.length > 0) setDropError(validationErrors[0]);

    let next = multiple ? [...files, ...accepted] : accepted;
    if (maxFiles) next = next.slice(0, maxFiles);
    commit(next);

    if (onUpload) {
      for (const uploaded of accepted) {
        try {
          const result = await onUpload(uploaded.file, {
            onProgress: (pct) => updateFile(uploaded.id, { progress: pct }),
          });
          updateFile(uploaded.id, { status: 'done', progress: 100, ...(result ?? {}) });
        } catch (e: any) {
          updateFile(uploaded.id, {
            status: 'error',
            progress: 0,
            error: e?.message ?? 'Upload failed',
          });
        }
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addFiles(Array.from(e.target.files));
    if (!keepInputOnUpload && inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const dt = e.dataTransfer;
    addFiles(Array.from(dt.files));
  };

  const handleRemove = (file: UploadedFile) => {
    if (file.thumbnailUrl) URL.revokeObjectURL(file.thumbnailUrl);
    const next = files.filter((f) => f.id !== file.id);
    commit(next);
    onRemove?.(file);
  };

  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.thumbnailUrl) URL.revokeObjectURL(f.thumbnailUrl);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const anyUploading = files.some((f) => f.status === 'uploading');
  const doneCount = files.filter((f) => f.status === 'done').length;
  const totalCount = files.length;
  const isBusy = !!loading || anyUploading;
  const zoneDisabled = disabled || isBusy;

  const dropzoneBorder = isError
    ? errorColor
    : isDragging
    ? accentColor
    : isBusy
    ? accentColor
    : borderColor;
  const dropzoneBg = isDragging
    ? hexWithAlpha(accentColor, 0.04)
    : isBusy
    ? hexWithAlpha(accentColor, 0.02)
    : dropzoneBgColor;

  const busyText = isBusy
    ? anyUploading && multiple && totalCount > 1 && showCount
      ? `Uploading ${doneCount + 1} of ${totalCount}…`
      : loadingText
    : null;

  const shouldHideDropzone =
    !multiple && files.length > 0 && showPreview && previewLayout === 'list';

  return (
    <div className={`w-full ${className}`} style={style}>
      <style>{`
        @keyframes shekel-spin { to { transform: rotate(360deg); } }
        .shekel-spin { animation: shekel-spin 0.8s linear infinite; transform-origin: center; }
        @keyframes shekel-file-in {
          from { opacity: 0; transform: translateY(-4px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .shekel-file-item {
          animation: shekel-file-in 220ms cubic-bezier(0.23, 1, 0.32, 1);
          transition: box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease;
        }
        .shekel-file-item:hover {
          box-shadow: 0 4px 12px rgba(17, 24, 39, 0.06);
          transform: translateY(-1px);
        }
        .shekel-progress-bar {
          transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms ease;
        }
        .shekel-dropzone-dragging {
          transform: scale(1.01);
          box-shadow: 0 6px 20px rgba(17, 24, 39, 0.08);
        }
      `}</style>
      {label && (
        <div className="flex items-center justify-between mb-2 gap-2">
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium ${labelClassName}`}
            style={{ color: isError ? errorColor : '#181918', ...labelStyle }}
          >
            {label}
            {required && resolvedRequiredMark}
          </label>
          {labelExtra && <div className="shrink-0">{labelExtra}</div>}
        </div>
      )}

      {!shouldHideDropzone && (
        <div
          onClick={() => !zoneDisabled && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            if (!zoneDisabled) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          aria-busy={isBusy}
          className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-4 sm:px-6 py-5 sm:py-6 rounded-[12px] transition-all duration-200 ${
            zoneDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
          } ${disabled ? 'opacity-60' : ''} ${isDragging ? 'shekel-dropzone-dragging' : ''} ${dropzoneClassName}`}
          style={{
            border: `1.5px dashed ${dropzoneBorder}`,
            backgroundColor: dropzoneBg,
            ...dropzoneStyle,
          }}
        >
          <div className="shrink-0">
            {isBusy ? (
              <Spinner size={40} color={accentColor} />
            ) : (
              dropZoneIcon ?? (
                <DownloadArrowIcon color={isDragging ? accentColor : '#181918'} size={20} />
              )
            )}
          </div>
          <div className="flex-1 min-w-0 text-center">
            {isBusy ? (
              <div className="text-[#181918] text-sm" style={{ color: accentColor }}>
                {busyText}
              </div>
            ) : (
              <div className="text-[#181918] text-sm">
                {uploadText}{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!zoneDisabled) inputRef.current?.click();
                  }}
                  className="underline font-medium"
                  style={{ color: accentColor }}
                  disabled={zoneDisabled}
                >
                  {browseText}
                </button>{' '}
                to upload
              </div>
            )}
            {resolvedHint && !isBusy && (
              <div className="text-xs text-[#616161] mt-1">{resolvedHint}</div>
            )}
          </div>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={zoneDisabled}
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}

      {showPreview && showCount && files.length > 0 && multiple && totalCount > 1 && (
        <div className="flex items-center justify-between mt-3 mb-1 text-xs text-[#616161]">
          <span>
            {anyUploading
              ? `Uploading ${doneCount} of ${totalCount}`
              : `${totalCount} ${totalCount === 1 ? 'file' : 'files'}`}
          </span>
          {maxFiles && (
            <span className="text-[#8C8C8C]">
              {totalCount} / {maxFiles}
            </span>
          )}
        </div>
      )}
      {showPreview && files.length > 0 && (
        <div
          className={
            previewLayout === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 gap-3 mt-3'
              : 'flex flex-col gap-2 mt-3'
          }
        >
          {files.map((file) =>
            previewLayout === 'grid' ? (
              <GridPreviewItem
                key={file.id}
                file={file}
                onRemove={handleRemove}
                onPreview={onPreview}
                showPreviewAction={showPreviewAction}
                previewActionText={previewActionText}
                previewButtonVariant={previewButtonVariant}
                showRemove={showRemove}
                accentColor={accentColor}
                errorColor={errorColor}
                disabled={disabled}
              />
            ) : (
              <ListPreviewItem
                key={file.id}
                file={file}
                onRemove={handleRemove}
                onPreview={onPreview}
                showPreviewAction={showPreviewAction}
                previewActionText={previewActionText}
                previewButtonVariant={previewButtonVariant}
                showRemove={showRemove}
                accentColor={accentColor}
                errorColor={errorColor}
                disabled={disabled}
              />
            )
          )}
        </div>
      )}

      {(error || dropError) && (
        <div className="flex items-center mt-2 text-xs gap-1" style={{ color: errorColor }}>
          <ErrorIcon color={errorColor} size={14} />
          {error || dropError}
        </div>
      )}
      {!error && !dropError && helperText && (
        <div className="mt-1 text-xs text-gray-500">{helperText}</div>
      )}
    </div>
  );
};

interface PreviewItemProps {
  file: UploadedFile;
  onRemove: (f: UploadedFile) => void;
  onPreview?: (f: UploadedFile) => void;
  showPreviewAction?: boolean;
  previewActionText?: string;
  previewButtonVariant?: 'pill' | 'text';
  showRemove?: boolean;
  accentColor: string;
  errorColor: string;
  disabled?: boolean;
}

const defaultPreview = (file: UploadedFile) => {
  const url = file.url ?? file.thumbnailUrl;
  if (!url) return;
  if (typeof window !== 'undefined') window.open(url, '_blank', 'noopener');
};

const ListPreviewItem: React.FC<PreviewItemProps> = ({
  file,
  onRemove,
  onPreview,
  showPreviewAction = true,
  previewActionText = 'View',
  previewButtonVariant = 'pill',
  showRemove = true,
  accentColor,
  errorColor,
  disabled,
}) => {
  const ext = getFileExt(file.name);
  const isImg = isImage(file);
  const isUploading = file.status === 'uploading';
  const isErr = file.status === 'error';
  const handlePreview = () => {
    if (onPreview) onPreview(file);
    else defaultPreview(file);
  };
  const canPreview = !!(onPreview || file.url || file.thumbnailUrl);

  return (
    <div className="shekel-file-item flex items-center gap-3 border border-[#E6E6E6] rounded-[12px] px-3 py-2 bg-white">
      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#F5F5F5] overflow-hidden">
        {isImg && file.thumbnailUrl ? (
          <img src={file.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <FileIcon ext={ext} size={28} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-[#181918] truncate">{file.name}</div>
        {(isUploading || isErr) && (
          <div className="text-xs mt-0.5 flex items-center gap-2">
            {isUploading && <span className="text-[#8C8C8C]">Uploading {file.progress}%</span>}
            {isErr && <span style={{ color: errorColor }}>{file.error ?? 'Upload failed'}</span>}
          </div>
        )}
        {isUploading && (
          <div className="mt-1 h-1 bg-[#F0F0F0] rounded overflow-hidden">
            <div
              className="h-full shekel-progress-bar"
              style={{ width: `${file.progress}%`, backgroundColor: accentColor }}
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {showPreviewAction && canPreview && !isUploading && (
          previewButtonVariant === 'pill' ? (
            <button
              type="button"
              onClick={handlePreview}
              className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-[#F5F5F5] text-sm font-medium text-[#181918] hover:bg-[#EBEBEB] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M1.6 8c1-2.4 3.6-4.4 6.4-4.4s5.4 2 6.4 4.4c-1 2.4-3.6 4.4-6.4 4.4s-5.4-2-6.4-4.4z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              {previewActionText}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePreview}
              className="text-sm font-medium hover:underline"
              style={{ color: accentColor }}
            >
              {previewActionText}
            </button>
          )
        )}
        {showRemove && !disabled && (
          <button
            type="button"
            onClick={() => onRemove(file)}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-[#F5F5F5] transition-colors"
            aria-label="Remove file"
          >
            <TrashIcon color="#181918" size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

const GridPreviewItem: React.FC<PreviewItemProps> = ({
  file,
  onRemove,
  onPreview,
  showPreviewAction = true,
  previewActionText = 'Preview',
  accentColor,
  errorColor,
  disabled,
}) => {
  const ext = getFileExt(file.name);
  const isImg = isImage(file);
  const handlePreview = () => {
    if (onPreview) onPreview(file);
    else defaultPreview(file);
  };
  const canPreview = !!(onPreview || file.url || file.thumbnailUrl);

  return (
    <div className="shekel-file-item relative border border-[#E6E6E6] rounded-[12px] overflow-hidden bg-white group">
      <div className="aspect-square flex items-center justify-center bg-[#F5F5F5]">
        {isImg && file.thumbnailUrl ? (
          <img src={file.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <FileIcon ext={ext} size={48} />
        )}
      </div>
      <div className="p-2">
        <div className="text-xs text-[#181918] truncate font-medium">{file.name}</div>
        <div className="text-[10px] text-[#8C8C8C] mt-0.5 flex items-center gap-1">
          <span>{formatBytes(file.size)}</span>
          {file.status === 'uploading' && <span>· {file.progress}%</span>}
          {file.status === 'error' && <span style={{ color: errorColor }}>· Failed</span>}
        </div>
        {file.status === 'uploading' && (
          <div className="mt-1 h-1 bg-[#F0F0F0] rounded overflow-hidden">
            <div
              className="h-full shekel-progress-bar"
              style={{ width: `${file.progress}%`, backgroundColor: accentColor }}
            />
          </div>
        )}
      </div>
      <div className="absolute top-2 right-2 flex gap-1">
        {showPreviewAction && canPreview && file.status !== 'uploading' && (
          <button
            type="button"
            onClick={handlePreview}
            aria-label={previewActionText}
            className="flex items-center justify-center w-7 h-7 rounded-full bg-white/90 border border-[#E6E6E6] hover:bg-white shadow-sm text-xs font-medium"
            style={{ color: accentColor }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M1.6 8c1-2.4 3.6-4.4 6.4-4.4s5.4 2 6.4 4.4c-1 2.4-3.6 4.4-6.4 4.4s-5.4-2-6.4-4.4z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        )}
        {!disabled && (
          <button
            type="button"
            onClick={() => onRemove(file)}
            aria-label="Remove file"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-white/90 border border-[#E6E6E6] hover:bg-white shadow-sm"
          >
            <TrashIcon color="#181918" size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

const ControlledFileUpload: React.FC<
  FileUploadProps & { control: NonNullable<FileUploadProps['control']>; name: string }
> = ({ control, name, error: errorProp, ...rest }) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <FileUploadBase
      {...rest}
      value={field.value ?? []}
      onChange={(files) => {
        field.onChange(files);
        rest.onChange?.(files);
      }}
      error={errorProp ?? fieldState.error?.message}
    />
  );
};

export const FileUpload: React.FC<FileUploadProps> = ({ control, name, ...props }) => {
  if (control && name) {
    return <ControlledFileUpload control={control} name={name} {...props} />;
  }
  return <FileUploadBase name={name} {...props} />;
};

export default FileUpload;
