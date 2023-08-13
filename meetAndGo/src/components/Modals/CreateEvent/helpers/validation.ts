export const validateName = (title: string) => {
  if (title.length < 4) {
    throw new Error("Имя события слишком короткое");
  } else if (title.length > 30) {
    throw new Error("Имя события слишком длинное");
  }

  return 1;
};

export const validateLocation = (location: string) => {
  if (location.length < 6) {
    throw new Error("Локация события слишком короткая");
  } else if (location.length > 20) {
    throw new Error("Локация события слишком длинная");
  }

  return 1;
};

export const validateDate = (date: Date) => {
  if (date.getTime() < Date.now()) {
    throw new Error("Неверная дата события");
  }

  return 1;
};

export const validateAddress = (address: string) => {
  if (address.length < 6) {
    throw new Error("Адрес события слишком короткий");
  } else if (address.length > 50) {
    throw new Error("Адрес события слишком длинный");
  }

  return 1;
};
