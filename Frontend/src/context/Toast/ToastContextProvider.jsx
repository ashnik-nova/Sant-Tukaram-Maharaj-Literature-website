import { useCallback, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ToastContext from './ToastContext';

const defaultConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const ToastContextProvider = ({ children }) => {
  const showToast = useCallback((message, type = 'info', options = {}) => {
    toast[type](message, {
      ...defaultConfig,
      ...options,
    });
  }, []);

  const success = useCallback((message, options = {}) => {
    showToast(message, 'success', options);
  }, [showToast]);

  const error = useCallback((message, options = {}) => {
    showToast(message, 'error', options);
  }, [showToast]);

  const info = useCallback((message, options = {}) => {
    showToast(message, 'info', options);
  }, [showToast]);

  const warning = useCallback((message, options = {}) => {
    showToast(message, 'warning', options);
  }, [showToast]);

  const value = useMemo(() => ({
    showToast,
    success,
    error,
    info,
    warning
  }), [showToast, success, error, info, warning]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;