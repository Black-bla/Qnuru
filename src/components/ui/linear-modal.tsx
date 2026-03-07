'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

function useDialog() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a Dialog');
  }
  return context;
}

interface DialogProps {
  children: React.ReactNode;
}

export function Dialog({ children }: DialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function DialogTrigger({ children, className, style }: DialogTriggerProps) {
  const { setIsOpen } = useDialog();

  return (
    <div
      onClick={() => setIsOpen(true)}
      className={cn('cursor-pointer', className)}
      style={style}
    >
      {children}
    </div>
  );
}

interface DialogContainerProps {
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

export function DialogContainer({ children, className, overlayClassName }: DialogContainerProps) {
  const { isOpen, setIsOpen } = useDialog();

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className={cn(
              'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
              overlayClassName
            )}
          />
          {/* Content */}
          <div className={cn('fixed inset-0 z-50 overflow-y-auto', className)}>
            <div className="flex min-h-full items-center justify-center p-4">
              {children}
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function DialogContent({ children, className, style }: DialogContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', bounce: 0.05, duration: 0.5 }}
      className={cn('relative', className)}
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}

interface DialogImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function DialogImage({ src, alt, className }: DialogImageProps) {
  return <img src={src} alt={alt} className={className} />;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return <h3 className={cn('font-semibold', className)}>{children}</h3>;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: any;
}

export function DialogDescription({
  children,
  className,
  disableLayoutAnimation,
  variants,
}: DialogDescriptionProps) {
  if (disableLayoutAnimation || variants) {
    return (
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
}

interface DialogCloseProps {
  className?: string;
}

export function DialogClose({ className }: DialogCloseProps) {
  const { setIsOpen } = useDialog();

  return (
    <button
      onClick={() => setIsOpen(false)}
      className={cn(
        'absolute top-4 right-4 rounded-full p-2 transition-colors',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        className
      )}
    >
      <X className="h-5 w-5" />
      <span className="sr-only">Close</span>
    </button>
  );
}
