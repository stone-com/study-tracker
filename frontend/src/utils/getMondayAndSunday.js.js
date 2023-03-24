const getMondayAndSunday = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const monday = new Date(today);
  const sunday = new Date(today);

  // Set Monday to the most recent occurrence
  monday.setDate(monday.getDate() - currentDay + 1);
  monday.setHours(0, 0, 0, 0);

  // Set Sunday to the soonest occurrence
  sunday.setDate(sunday.getDate() + (7 - currentDay));
  sunday.setHours(23, 59, 59, 999);

  // Return Monday and Sunday as Date objects
  return { monday, sunday };
};

export default getMondayAndSunday;
