export function get_average_data(data, dataKey){
  if (!Array.isArray(data) || data.length === 0) return null;

  const values = data
    .map(item => parseFloat(item[dataKey]))
    .filter(value => !isNaN(value));

  if (values.length === 0) return null;

  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / values.length;
 
  return Number(average.toFixed(2)); 
};