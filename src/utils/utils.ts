export function formatDate(ISOString: string): string {
  const date = new Date(ISOString);
  const formatter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatter.format(date);
}
