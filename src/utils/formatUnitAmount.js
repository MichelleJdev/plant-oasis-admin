const formatUnitAmount = (amount) => {
  const amountInPounds = amount / 100;
  return amountInPounds.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });
};

export default formatUnitAmount;
