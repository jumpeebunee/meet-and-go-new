export const getIsoDate = (future?: boolean) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);

  const hours = future
    ? ("0" + (currentDate.getHours() + 2)).slice(-2)
    : ("0" + currentDate.getHours()).slice(-2);

  const minutes = ("0" + currentDate.getMinutes()).slice(-2);
  const seconds = ("0" + currentDate.getSeconds()).slice(-2);
  const localISOTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return localISOTime;
};
