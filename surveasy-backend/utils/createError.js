const createError = (status, message) => {
  let error = new Error(message);
  error.status = status;
  return error;
};

export default createError;
