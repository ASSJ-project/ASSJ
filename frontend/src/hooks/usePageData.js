fetch('/api/company/items');
const params = new URLSearchParams();
params.append('page', page);
params.append('size', 10);
params.append('filteredData', filteredData);
