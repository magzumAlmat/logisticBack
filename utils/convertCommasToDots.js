function normalizeValues(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeValues(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    if (typeof value === "string") {
      const isPotentialNumber = /^[+-]?([0-9]+([.,][0-9]*)?|[.,][0-9]+)$/.test(
        value
      );

      if (isPotentialNumber) {
        acc[key] = parseFloat(value.replace(/,/g, "."));
      } else {
        acc[key] = value;
      }
    } else {
      acc[key] = normalizeValues(value);
    }

    return acc;
  }, {});
}

module.exports = normalizeValues;
