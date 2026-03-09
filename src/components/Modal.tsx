import { useEffect, useState, CSSProperties } from 'react';
import type { FC, ReactNode, MouseEvent } from 'react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'responsive';

const widthMap: Record<ModalSize, string> = {
  sm: '384px',
  md: '448px',
  lg: '512px',
  xl: '600px',
  full: '100%',
  responsive: '90vw',
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string | number;
  size?: ModalSize;
  closable?: boolean;
  maskClosable?: boolean;
  centered?: boolean;
  className?: string;
  bgColor?: string;
  headerBgColor?: string;
  overlayColor?: string;
  bodyClassName?: string;
  headerClassName?: string;
  maxHeight?: string | number;
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  width,
  size = 'md',
  closable = true,
  maskClosable = true,
  centered = true,
  className = '',
  bgColor = '#ffffff',
  headerBgColor = '#ffffff',
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  bodyClassName = '',
  headerClassName = '',
  maxHeight = '70vh',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Determine effective width
  const effectiveWidth = width || widthMap[size];
  const effectiveWidthNum = typeof effectiveWidth === 'number' ? `${effectiveWidth}px` : effectiveWidth;

  // Prepare modal style
  const modalStyle: CSSProperties = {
    width: effectiveWidthNum,
    maxWidth: '90vw',
    backgroundColor: bgColor,
  };

  // Prepare header style
  const headerStyle: CSSProperties = {
    backgroundColor: headerBgColor,
  };

  // Prepare overlay style
  const overlayStyle: CSSProperties = {
    backgroundColor: overlayColor,
  };

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      // Small delay to trigger animation
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 200);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose, closable]);

  if (!isVisible) return null;

  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  };

  const handleModalClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleMaskClick}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 transition-opacity duration-200 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        style={overlayStyle}
      />

      {/* Modal Container */}
      <div className={`flex min-h-full items-center justify-center p-4 ${centered ? 'items-center' : 'items-start pt-20'}`}>
        <div
          className={`relative rounded-lg shadow-xl transition-all duration-200 ease-out overflow-y-auto ${
            isAnimating
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-4'
          } ${className}`}
          style={{...modalStyle, maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight}}
          onClick={handleModalClick}
        >
          {/* Header */}
          {(title || closable) && (
            <div
              className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 ${headerClassName}`}
              style={headerStyle}
            >
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {closable && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 ease-out"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div
            className={`px-6 py-4 ${bodyClassName}`}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
