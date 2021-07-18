export function handleDate(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const ugly = new Date(date["seconds"] * 1000);
  
    const modified = `${
      months[ugly.getMonth()]
    } ${ugly.getDate()}, ${ugly.getFullYear()} `;
  
    return modified;
  }