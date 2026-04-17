import React, { useState } from 'react';
import cardPatternSvg from '../../assets/card-pattern.svg';

export interface DashboardCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  showVisibilityToggle?: boolean;
  onVisibilityToggle?: () => void;
  valuePrefix?: string;
  ledgerBalance?: string | number;
  bottomLabel?: string;
  bottomValue?: string | number;
  showLedgerValuePrefix?: boolean;
  bottomIcon?: React.ReactNode | null;
  showCopyButton?: boolean;
  copyValue?: string;
  onCopy?: (value: string) => void;
  copyIconColor?: string;
  bottomTextColor?: string;
  valueFontSize?: number | string;
  backgroundPattern?: 'wave' | 'grid' | 'none';
  backgroundImage?: string;
  topRight?: React.ReactNode;
  width?: string | number;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  label,
  value,
  icon,
  showVisibilityToggle = true,
  onVisibilityToggle,
  valuePrefix = '₦',
  ledgerBalance,
  bottomLabel = 'Ledger Balance',
  bottomValue,
  showLedgerValuePrefix = true,
  bottomIcon,
  showCopyButton = false,
  copyValue,
  onCopy,
  copyIconColor,
  bottomTextColor,
  valueFontSize = 32,
  backgroundPattern = 'wave',
  backgroundImage,
  topRight,
  width = 348,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
    if (onVisibilityToggle) {
      onVisibilityToggle();
    }
  };

  const resolvedBottomValue = bottomValue ?? ledgerBalance;
  const hasBottomSection = resolvedBottomValue !== undefined && resolvedBottomValue !== null && resolvedBottomValue !== '';
  const formattedValueFontSize =
    typeof valueFontSize === 'number'
      ? `clamp(${Math.max(18, Math.round(valueFontSize * 0.7))}px, 6vw, ${valueFontSize}px)`
      : valueFontSize;

  const handleCopy = async () => {
    const textToCopy = copyValue ?? (resolvedBottomValue !== undefined ? String(resolvedBottomValue) : '');
    if (!textToCopy) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      onCopy?.(textToCopy);
    } catch {
      onCopy?.(textToCopy);
    }
  };
  const defaultIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M7 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <div
        className={`relative overflow-hidden flex flex-col rounded-[20px] px-3 sm:px-[18px] pt-3 transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer self-start ${hasBottomSection ? 'pb-1' : 'pb-3'} ${className}`}
        style={{
          background: backgroundImage
            ? `url(${backgroundImage}) center / cover no-repeat`
            : 'radial-gradient(circle at 50% 136%, #7A7F7A 0%, #181918 100%)',
          width: typeof width === 'number' ? `${width}px` : width,
          maxWidth: '100%',
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
          transition: 'all 0.3s ease-in-out',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 24px 0 rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
        }}
      >
        {backgroundPattern !== 'none' && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none transition-opacity duration-300"
            style={{
              backgroundImage: `url(${cardPatternSvg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
        <div className="relative z-10 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#616161] rounded-full flex items-center justify-center text-white transition-transform duration-300 ease-in-out hover:scale-110 shrink-0">
              {icon || defaultIcon}
            </div>
            {topRight && <div className="shrink-0">{topRight}</div>}
          </div>
          <div className="flex items-center gap-2 mt-3 min-w-0">
            <span className="text-xs sm:text-sm text-[#E6E6E6] font-light transition-colors duration-200 truncate">
              {label}
            </span>
            {showVisibilityToggle && (
              <button
                className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200"
                onClick={handleToggleVisibility}
                aria-label="Toggle visibility"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.61342 8.47806C1.52262 8.3343 1.47723 8.26242 1.45182 8.15155C1.43273 8.06827 1.43273 7.93694 1.45182 7.85366C1.47723 7.74279 1.52262 7.67091 1.61341 7.52715C2.36369 6.33916 4.59693 3.33594 8.00027 3.33594C11.4036 3.33594 13.6369 6.33916 14.3871 7.52715C14.4779 7.67091 14.5233 7.74279 14.5487 7.85366C14.5678 7.93694 14.5678 8.06827 14.5487 8.15155C14.5233 8.26242 14.4779 8.3343 14.3871 8.47806C13.6369 9.66604 11.4036 12.6693 8.00027 12.6693C4.59693 12.6693 2.36369 9.66604 1.61342 8.47806Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.00027 10.0026C9.10484 10.0026 10.0003 9.10717 10.0003 8.0026C10.0003 6.89803 9.10484 6.0026 8.00027 6.0026C6.8957 6.0026 6.00027 6.89803 6.00027 8.0026C6.00027 9.10717 6.8957 10.0026 8.00027 10.0026Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
          <div
            className="font-bold text-white transition-all duration-200 break-words leading-tight"
            style={{ fontSize: formattedValueFontSize }}
          >
            {isVisible ? `${valuePrefix} ${value}` : '****'}
          </div>
          {hasBottomSection && (
            <div className="mt-1.5 mb-1">
              <div className="w-full h-px bg-white/10 mb-1.5 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between gap-2 transition-all duration-200">
                <div className="flex items-center gap-2 min-w-0">
                  {bottomIcon === undefined ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.0026 13.3307H3.46927C2.72253 13.3307 2.34917 13.3307 2.06395 13.1854C1.81307 13.0576 1.60909 12.8536 1.48126 12.6027C1.33594 12.3175 1.33594 11.9441 1.33594 11.1974V4.7974C1.33594 4.05066 1.33594 3.67729 1.48126 3.39208C1.60909 3.14119 1.81307 2.93722 2.06395 2.80939C2.34917 2.66406 2.72253 2.66406 3.46927 2.66406H3.73594C5.22941 2.66406 5.97615 2.66406 6.54658 2.95471C7.04834 3.21037 7.45629 3.61832 7.71195 4.12009C8.0026 4.69052 8.0026 5.43726 8.0026 6.93073M8.0026 13.3307V6.93073M8.0026 13.3307H12.5359C13.2827 13.3307 13.656 13.3307 13.9413 13.1854C14.1921 13.0576 14.3961 12.8536 14.5239 12.6027C14.6693 12.3175 14.6693 11.9441 14.6693 11.1974V4.7974C14.6693 4.05066 14.6693 3.67729 14.5239 3.39208C14.3961 3.14119 14.1921 2.93722 13.9413 2.80939C13.656 2.66406 13.2827 2.66406 12.5359 2.66406H12.2693C10.7758 2.66406 10.0291 2.66406 9.45863 2.95471C8.95686 3.21037 8.54892 3.61832 8.29325 4.12009C8.0026 4.69052 8.0026 5.43726 8.0026 6.93073"
                        stroke="#EC615B"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    bottomIcon
                  )}
                  <span
                    className="text-xs font-light transition-all duration-200 truncate"
                    style={{ color: bottomTextColor ?? '#E6E6E6' }}
                  >
                    {isVisible
                      ? showLedgerValuePrefix
                        ? `${bottomLabel} ${valuePrefix} ${resolvedBottomValue}`
                        : `${bottomLabel}${resolvedBottomValue !== undefined && resolvedBottomValue !== '' ? ` ${resolvedBottomValue}` : ''}`
                      : '****'}
                  </span>
                </div>
                {showCopyButton && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? 'Copied' : 'Copy'}
                    className="bg-transparent border-none cursor-pointer p-0.5 flex items-center justify-center transition-colors duration-200 shrink-0 hover:opacity-80"
                    style={{ color: copyIconColor ?? '#EC615B' }}
                  >
                    {copied ? (
                      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.3335 8.33594L6.66683 11.6693L13.3335 4.33594" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5.33594" y="5.33594" width="8.66667" height="8.66667" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M10.6693 5.33594V4.16927C10.6693 3.05036 10.6693 2.4909 10.4515 2.0633C10.2598 1.68723 9.95418 1.3816 9.57811 1.18987C9.15051 0.972097 8.59105 0.972097 7.47214 0.972097H4.16927C3.05036 0.972097 2.4909 0.972097 2.0633 1.18987C1.68723 1.3816 1.3816 1.68723 1.18987 2.0633C0.972097 2.4909 0.972097 3.05036 0.972097 4.16927V7.47214C0.972097 8.59105 0.972097 9.15051 1.18987 9.57811C1.3816 9.95418 1.68723 10.2598 2.0633 10.4515C2.4909 10.6693 3.05036 10.6693 4.16927 10.6693H5.33594" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
    </div>
  );
};
