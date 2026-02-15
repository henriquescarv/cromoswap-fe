import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Toast, ToastType } from '@/components/Toast';

interface ToastContextProps {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextProps>({
  showToast: () => { },
});

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastState {
  visible: boolean;
  type: ToastType;
  message: string;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    type: 'success',
    message: '',
  });

  const showToast = (type: ToastType, message: string) => {
    setToast({
      visible: true,
      type,
      message,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        type={toast.type}
        message={toast.message}
        visible={toast.visible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
