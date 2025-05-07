import { useState } from 'react';

interface LoginFormData {
  email: string;
  password: string;
  rememberDevice: boolean;
}

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberDevice: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberDevice' ? checked : value,
    }));
  };

  return {
    formData,
    handleChange,
  };
}; 