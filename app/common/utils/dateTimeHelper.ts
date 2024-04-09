export function FromDateToDisplayTime(date: Date): string {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function FromTimeNumberToDisplayTime(time?: number): string | void {
  if (time) {
    return FromDateToDisplayTime(new Date(time));
  }
}
