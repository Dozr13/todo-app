import { useState } from "react";
import handleError from "../utils/errorHandler";

const useAuthForm = <T extends Record<string, any>>(
  initialState: T,
  submitHandler: (data: T) => Promise<void>,
) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitHandler(formData);
    } catch (error) {
      return handleError(error);
    }
  };

  return { formData, handleChange, handleSubmit, error, setError };
};

export default useAuthForm;
