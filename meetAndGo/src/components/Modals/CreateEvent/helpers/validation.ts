export const validateName = (title: string) => {
  if (title.length <= 2) {
    throw new Error("Название события слишком короткое");
  } else if (title.length > 30) {
    throw new Error("Название события слишком длинное");
  }

  return 1;
};

export const validateLocation = (location: string) => {
  if (location.length < 2) {
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
  if (address.length < 5) {
    throw new Error("Адрес события слишком короткий");
  } else if (address.length > 50) {
    throw new Error("Адрес события слишком длинный");
  }

  return 1;
};
