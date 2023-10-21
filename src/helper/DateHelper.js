function formatDateToDDMMMMYYYY(launchDate) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const day = launchDate.getDate();
  const month = months[launchDate.getMonth()];
  const year = launchDate.getFullYear();

  return `${day} ${month}, ${year}`;
}

export default formatDateToDDMMMMYYYY;