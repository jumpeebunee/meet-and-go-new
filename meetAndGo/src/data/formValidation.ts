export const loginConfig = () => {
  return {
    required: 'Обязательное поле',
  }
}

export const passwordConfig = () => {
  return {
    required: 'Обязательное поле',
    minLength: {
      value: 8,
      message: 'Пароль слишком маленький'
    },
    maxLength: {
      value: 16,
      message: 'Пароль слишком большой'
    },
    pattern: {
      value: /^[a-zA-Z\d]+$/,
      message: 'Невалидный пароль'
    }
  }
}

export const nameConfig = () => {
  return {
    required: 'Обязательное поле',
    minLength: {
      value: 8,
      message: 'Имя слишком короткое'
    },
    maxLength: {
      value: 20,
      message: 'Имя слишком большое'
    },
    pattern: {
      value: /^[a-zA-Zа-яА-Я\s]+$/,
      message: 'Невалидное имя'
    }
  }
}

export const emailConfig = () => {
  return {
    required: 'Обязательное поле',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Невалидная почта'
    }
  }
}