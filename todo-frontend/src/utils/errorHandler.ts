function handleError(error: any): Promise<never> {
  const message =
    error.response?.data?.message || error.message || "Unknown error occurred";
  console.error("API Error:", message);
  throw new Error(message);
}

export default handleError;
