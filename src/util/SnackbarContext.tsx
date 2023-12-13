import React, { createContext, useContext, useMemo, useState } from 'react';
import CustomSnackbar from './CustomSnackbar';

type SnackbarContextType = {
  openSnackbar: (newMessage: React.SetStateAction<string>, newSeverity?: Severity) => void;
  closeSnackbar: () => void;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

type SnackbarProviderProps = {
  children: React.ReactNode;
};

export type Severity = 'success' | 'error' | 'info' | 'warning';

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<Severity>('success');

  const openSnackbar = (newMessage: React.SetStateAction<string>, newSeverity: Severity = 'success') => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  };
  const closeSnackbar = () => {
    setOpen(false);
  };

  const value = useMemo(() => ({ openSnackbar, closeSnackbar }), [openSnackbar, closeSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <CustomSnackbar open={open} handleClose={closeSnackbar} message={message} severity={severity} />
    </SnackbarContext.Provider>
  );
}

// Create a hook to use the SnackbarContext, this is what you can call in your components
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
};
