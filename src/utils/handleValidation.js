const handleValidation = (schema, data) => {
  try {
    schema.validateSync(data);
    return true;
  } catch (error) {
    return false;
  }
};

export default handleValidation;
