module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getMonth()} ${new Date(date).getDate()}, ${
        new Date(date).getFullYear()} at ${new Date(date).getHours}${new Date(date).getMinutes}`;
    },
  };
  