import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
  CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type ModalPlacement =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export type ModalMotion = 'auto' | 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

export type ModalBackdrop = 'normal' | 'blur' | 'none';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;

  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;

  okText?: ReactNode;
  cancelText?: ReactNode;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  confirmLoading?: boolean;
  okDanger?: boolean;
  okDisabled?: boolean;
  hideCancel?: boolean;

  size?: ModalSize;
  width?: number | string;
  maxHeight?: number | string;

  /** Position on screen. `center` is the classic dead-center dialog. Sets also drive the enter animation direction. */
  placement?: ModalPlacement;
  /** Alias for placement === 'center' when set. Kept for backwards compat; placement wins if both passed. */
  centered?: boolean;
  /** Margin from the nearest viewport edge (applies to non-center placements). */
  edgeOffset?: number | string;
  /** Override the entrance/exit motion. `auto` picks based on placement. */
  motion?: ModalMotion;

  /** Backdrop style: normal (dark tint), blur (dark + blur), or none. */
  backdrop?: ModalBackdrop;

  /** Custom close icon (replaces the default ×). */
  closeIcon?: ReactNode;

  /** Submit on Enter when focus is inside a non-textarea field. */
  submitOnEnter?: boolean;

  /** Bare mode: hides the chromed header/body/footer layout and gives you a blank panel to fill however you like. */
  bare?: boolean;
  /** Remove the default 16px body padding when content wants to draw edge-to-edge (e.g. a full-bleed image header). */
  noPadding?: boolean;

  closable?: boolean;
  maskClosable?: boolean;
  closeOnEsc?: boolean;
  destroyOnClose?: boolean;
  lockScroll?: boolean;

  bgColor?: string;
  overlayColor?: string;
  borderRadius?: number | string;
  shadow?: string;
  animationDuration?: number;
  zIndex?: number;

  className?: string;
  style?: CSSProperties;
  headerClassName?: string;
  headerStyle?: CSSProperties;
  bodyClassName?: string;
  bodyStyle?: CSSProperties;
  footerClassName?: string;
  footerStyle?: CSSProperties;

  ariaLabel?: string;
  ariaLabelledBy?: string;

  afterOpen?: () => void;
  afterClose?: () => void;

  getContainer?: () => HTMLElement;
}

const SIZE_WIDTHS: Record<ModalSize, string> = {
  sm: '400px',
  md: '480px',
  lg: '560px',
  xl: '640px',
  '2xl': '768px',
  full: '100vw',
};

const FOCUSABLE_SELECTOR =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

const CloseIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#181918' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const DefaultButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'outline' | 'danger';
    loading?: boolean;
  }
> = ({ variant = 'outline', loading, children, className = '', style, ...props }) => {
  const styles: Record<string, CSSProperties> = {
    primary: {
      backgroundColor: props.disabled ? '#F9CECC' : '#EC615B',
      color: '#FFFFFF',
      borderColor: props.disabled ? '#F9CECC' : '#EC615B',
    },
    danger: {
      backgroundColor: props.disabled ? '#F9CECC' : '#C21919',
      color: '#FFFFFF',
      borderColor: props.disabled ? '#F9CECC' : '#C21919',
    },
    outline: {
      backgroundColor: '#FFFFFF',
      color: '#181918',
      borderColor: '#D9D9D9',
    },
  };
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 h-10 rounded-lg text-sm font-medium border transition-colors ${
        props.disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-90'
      } ${className}`}
      style={{ ...styles[variant], ...style }}
    >
      {loading && (
        <svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          style={{ animation: 'shekel-modal-spin 0.8s linear infinite', transformOrigin: 'center' }}
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
          <path d="M12 3a9 9 0 019 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  okText = 'OK',
  cancelText = 'Cancel',
  onOk,
  onCancel,
  confirmLoading,
  okDanger,
  okDisabled,
  hideCancel,
  size = 'md',
  width,
  maxHeight,
  placement,
  centered = true,
  edgeOffset = 40,
  motion = 'auto',
  backdrop = 'normal',
  closeIcon,
  submitOnEnter = false,
  bare = false,
  noPadding = false,
  closable = true,
  maskClosable = true,
  closeOnEsc = true,
  destroyOnClose = false,
  lockScroll = true,
  bgColor = '#FFFFFF',
  overlayColor = 'rgba(0, 0, 0, 0.45)',
  borderRadius = 16,
  shadow = '0 6px 16px rgba(0,0,0,0.08), 0 9px 28px 8px rgba(0,0,0,0.05)',
  animationDuration = 200,
  zIndex = 1000,
  className = '',
  style,
  headerClassName = '',
  headerStyle,
  bodyClassName = '',
  bodyStyle,
  footerClassName = '',
  footerStyle,
  ariaLabel,
  ariaLabelledBy,
  afterOpen,
  afterClose,
  getContainer,
}) => {
  const [mounted, setMounted] = useState<boolean>(open);
  const [entered, setEntered] = useState<boolean>(false);
  const [internalConfirmLoading, setInternalConfirmLoading] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useRef(`shekel-modal-title-${Math.random().toString(36).slice(2, 8)}`);
  const prevActiveEl = useRef<HTMLElement | null>(null);

  const requestClose = useCallback(() => {
    onCancel?.();
    onClose?.();
  }, [onCancel, onClose]);

  useEffect(() => {
    if (open) {
      prevActiveEl.current = (typeof document !== 'undefined'
        ? document.activeElement
        : null) as HTMLElement | null;
      setMounted(true);
      let raf2: number | undefined;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setEntered(true);
          afterOpen?.();
        });
      });
      return () => {
        cancelAnimationFrame(raf1);
        if (raf2) cancelAnimationFrame(raf2);
      };
    } else {
      if (!mounted) return;
      setEntered(false);
      const t = setTimeout(() => {
        setMounted(false);
        afterClose?.();
        if (prevActiveEl.current && typeof prevActiveEl.current.focus === 'function') {
          prevActiveEl.current.focus();
        }
      }, animationDuration);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, animationDuration]);

  useEffect(() => {
    if (!lockScroll || !mounted) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [mounted, lockScroll]);

  useEffect(() => {
    if (!mounted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        e.stopPropagation();
        requestClose();
        return;
      }
      if (e.key !== 'Tab' || !contentRef.current) return;
      const focusables = contentRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mounted, closeOnEsc, requestClose]);

  useEffect(() => {
    if (!entered || !contentRef.current) return;
    const focusables = contentRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const first = focusables[0];
    if (first) first.focus();
    else contentRef.current.focus();
  }, [entered]);

  const handleMaskClick = (e: React.MouseEvent) => {
    if (!maskClosable) return;
    if (e.target === overlayRef.current) requestClose();
  };

  const handleOk = async () => {
    if (!onOk) return;
    try {
      const maybe = onOk();
      if (maybe && typeof (maybe as Promise<void>).then === 'function') {
        setInternalConfirmLoading(true);
        await maybe;
      }
    } finally {
      setInternalConfirmLoading(false);
    }
  };

  if (!mounted) return null;
  void destroyOnClose; // reserved for future use

  const resolvedPlacement: ModalPlacement = placement ?? (centered ? 'center' : 'top');
  const placementAlignment: Record<ModalPlacement, { justify: string; align: string }> = {
    'top-left': { justify: 'flex-start', align: 'flex-start' },
    top: { justify: 'center', align: 'flex-start' },
    'top-right': { justify: 'flex-end', align: 'flex-start' },
    left: { justify: 'flex-start', align: 'center' },
    center: { justify: 'center', align: 'center' },
    right: { justify: 'flex-end', align: 'center' },
    'bottom-left': { justify: 'flex-start', align: 'flex-end' },
    bottom: { justify: 'center', align: 'flex-end' },
    'bottom-right': { justify: 'flex-end', align: 'flex-end' },
  };
  const { justify, align } = placementAlignment[resolvedPlacement];

  const autoMotionForPlacement: Record<ModalPlacement, ModalMotion> = {
    'top-left': 'slide-down',
    top: 'slide-down',
    'top-right': 'slide-down',
    left: 'slide-right',
    center: 'scale',
    right: 'slide-left',
    'bottom-left': 'slide-up',
    bottom: 'slide-up',
    'bottom-right': 'slide-up',
  };
  const resolvedMotion: ModalMotion = motion === 'auto' ? autoMotionForPlacement[resolvedPlacement] : motion;

  const motionTransforms: Record<Exclude<ModalMotion, 'auto'>, { closed: string; open: string }> = {
    fade: { closed: 'none', open: 'none' },
    scale: { closed: 'translateY(-10px) scale(0.96)', open: 'translateY(0) scale(1)' },
    'slide-up': { closed: 'translateY(20px)', open: 'translateY(0)' },
    'slide-down': { closed: 'translateY(-20px)', open: 'translateY(0)' },
    'slide-left': { closed: 'translateX(20px)', open: 'translateX(0)' },
    'slide-right': { closed: 'translateX(-20px)', open: 'translateX(0)' },
  };
  const motionKey = (resolvedMotion === 'auto' ? 'scale' : resolvedMotion) as Exclude<ModalMotion, 'auto'>;
  const { closed: closedTransform, open: openTransform } = motionTransforms[motionKey];

  const resolvedEdgeOffset =
    typeof edgeOffset === 'number' ? `${edgeOffset}px` : edgeOffset;

  const resolvedBackdrop: CSSProperties =
    backdrop === 'none'
      ? { backgroundColor: 'transparent' }
      : backdrop === 'blur'
        ? {
            backgroundColor: overlayColor,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)' as any,
          }
        : { backgroundColor: overlayColor };

  const resolvedWidth = width ?? SIZE_WIDTHS[size];
  const resolvedRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
  const resolvedMaxHeight =
    maxHeight !== undefined
      ? typeof maxHeight === 'number'
        ? `${maxHeight}px`
        : maxHeight
      : size === 'full'
        ? '100vh'
        : 'calc(100vh - 40px)';

  const showDefaultFooter = footer === undefined && (onOk || onCancel);
  const resolvedFooter =
    footer === null || footer === false
      ? null
      : footer === undefined
        ? showDefaultFooter
          ? (
            <>
              {!hideCancel && (
                <DefaultButton variant="outline" onClick={() => requestClose()}>
                  {cancelText}
                </DefaultButton>
              )}
              {onOk && (
                <DefaultButton
                  variant={okDanger ? 'danger' : 'primary'}
                  onClick={handleOk}
                  disabled={okDisabled}
                  loading={confirmLoading ?? internalConfirmLoading}
                >
                  {okText}
                </DefaultButton>
              )}
            </>
          )
          : null
        : footer;

  const labelId = ariaLabelledBy ?? (typeof title === 'string' ? titleId.current : undefined);

  const container =
    getContainer ? getContainer() : typeof document !== 'undefined' ? document.body : null;
  if (!container) return null;

  const modalNode = (
    <div
      ref={overlayRef}
      onMouseDown={handleMaskClick}
      role="presentation"
      aria-hidden={!entered}
      className="shekel-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex,
        display: 'flex',
        alignItems: align,
        justifyContent: justify,
        padding: size === 'full' ? 0 : resolvedEdgeOffset,
        opacity: entered ? 1 : 0,
        transition: `opacity ${animationDuration}ms ease-out, backdrop-filter ${animationDuration}ms ease-out`,
        overflowY: 'auto',
        willChange: 'opacity',
        ...resolvedBackdrop,
      }}
    >
      <style>{`
        @keyframes shekel-modal-spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .shekel-modal-overlay { padding: 12px !important; }
          .shekel-modal-panel { max-height: calc(100vh - 24px) !important; }
          .shekel-modal-panel .shekel-modal-header { padding-left: 16px !important; padding-right: 16px !important; }
          .shekel-modal-panel .shekel-modal-body { padding-left: 16px !important; padding-right: 16px !important; }
          .shekel-modal-panel .shekel-modal-footer { padding-left: 16px !important; padding-right: 16px !important; flex-direction: column-reverse !important; gap: 8px !important; }
          .shekel-modal-panel .shekel-modal-footer > * { width: 100% !important; }
        }
      `}</style>
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={labelId}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (
            submitOnEnter &&
            e.key === 'Enter' &&
            !e.shiftKey &&
            (e.target as HTMLElement).tagName !== 'TEXTAREA' &&
            onOk
          ) {
            e.preventDefault();
            handleOk();
          }
        }}
        className={`shekel-modal-panel ${className}`}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: resolvedWidth,
          maxHeight: resolvedMaxHeight,
          backgroundColor: bgColor,
          borderRadius: size === 'full' ? 0 : resolvedRadius,
          boxShadow: shadow,
          display: 'flex',
          flexDirection: 'column',
          opacity: entered ? 1 : 0,
          transform: entered ? openTransform : closedTransform,
          transition: `opacity ${animationDuration}ms cubic-bezier(0.23, 1, 0.32, 1), transform ${animationDuration}ms cubic-bezier(0.23, 1, 0.32, 1)`,
          outline: 'none',
          ...style,
        }}
      >
        {bare ? (
          <>
            {closable && (
              <button
                type="button"
                aria-label="Close"
                onClick={requestClose}
                className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-md bg-white/80 hover:bg-white shadow-sm transition-colors"
              >
                {closeIcon ?? <CloseIcon />}
              </button>
            )}
            <div
              className={`flex-1 overflow-auto ${bodyClassName}`}
              style={bodyStyle}
            >
              {children}
            </div>
          </>
        ) : (
          <>
            {(title || closable) && (
              <div
                className={`shekel-modal-header flex items-start justify-between gap-4 px-6 pt-5 pb-3 ${headerClassName}`}
                style={headerStyle}
              >
                <div className="min-w-0 flex-1">
                  {title && (
                    <div id={labelId} className="text-lg font-semibold text-[#181918]">
                      {title}
                    </div>
                  )}
                  {description && (
                    <div className="text-sm text-[#595959] mt-1">{description}</div>
                  )}
                </div>
                {closable && (
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={requestClose}
                    className="shrink-0 flex items-center justify-center w-8 h-8 rounded-md hover:bg-[#F5F5F5] transition-colors"
                  >
                    {closeIcon ?? <CloseIcon />}
                  </button>
                )}
              </div>
            )}

            <div
              className={`shekel-modal-body flex-1 overflow-auto ${noPadding ? '' : 'px-6'} ${title || closable ? '' : noPadding ? '' : 'pt-5'} ${
                resolvedFooter || noPadding ? '' : 'pb-5'
              } ${bodyClassName}`}
              style={bodyStyle}
            >
              {children}
            </div>

            {resolvedFooter && (
              <div
                className={`shekel-modal-footer flex items-center justify-end gap-2 px-6 py-4 ${footerClassName}`}
                style={footerStyle}
              >
                {resolvedFooter}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalNode, container);
};

export default Modal;
