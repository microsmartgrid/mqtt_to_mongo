const CSV = require("csv-string");
const parseCSV = (dato) => {
  const enie = dato.toString();
  const parsedCsv = CSV.parse(enie, { output: "objects" });
  return parsedCsv;
};

module.exports = { parseCSV };