export const validateNameInput = (value: string) => {
  if (value.length < 3) {
    return 'Слишком короткое название';
  } else if (value.length > 20) {
    return 'Слишком длинное название';
  } else {
    return `Неккоректное название события`;
  }
}
export const validateLocationInput = (value: string) => {
  if (value.length < 3) {
    return 'Локация слишком короткая';
  } else if (value.length > 20) {
    return 'Локация слишком длинная';
  } else {
    return `Неккоректное название локации`;
  }
}
export const validateAddressInput = (value: string) => {
  if (value.length < 3) {
    return 'Адрес слишком короткий';
  } else if (value.length > 40) {
    return 'Адрес слишком длинный';
  } else {
    return `Неккоректный адрес события`;
  }
}