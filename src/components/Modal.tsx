import React, { useEffect, useState } from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string | number;
  closable?: boolean;
  maskClosable?: boolean;
  centered?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  width = '520px',
  closable = true,
  maskClosable = true,
  centered = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleMaskClick}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-200 ease-out ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
      />

      {/* Modal Container */}
      <div className={`flex min-h-full items-center justify-center p-4 ${centered ? 'items-center' : 'items-start pt-20'}`}>
        <div
          className={`relative bg-white rounded-lg shadow-xl transition-all duration-200 ease-out ${
            isAnimating
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-4'
          } ${className}`}
          style={{ width, maxWidth: '90vw' }}
          onClick={handleModalClick}
        >
          {/* Header */}
          {(title || closable) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
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
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
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
