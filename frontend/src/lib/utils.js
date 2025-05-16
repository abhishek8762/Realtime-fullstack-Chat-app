export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export const toUpperCase = (str) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt[0].toUpperCase() + txt.substr(1).toLowerCase()
  );
