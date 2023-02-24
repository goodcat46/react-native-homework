export default function convertUnixTime(unixTime) {
  const date = new Date(unixTime * 1000); // конвертуємо Unix timestamp у JavaScript timestamp

  // форматуємо дату та час
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Europe/Kiev",
  };
  const formattedDate = new Intl.DateTimeFormat("ru-RU", options).format(date);

  const optionsHour = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Kiev",
  };
  const formattedHour = new Intl.DateTimeFormat("ru-RU", optionsHour).format(
    date
  );

  return `${formattedDate.slice(0, -2)}| ${formattedHour}`; // повертаємо дату та час у вигляді рядка
}
