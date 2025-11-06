export default function transformDate(dateString) {
  return new Date(dateString).toISOString().split("T")[0];
}
