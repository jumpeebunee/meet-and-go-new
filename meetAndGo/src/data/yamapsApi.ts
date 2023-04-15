export const API_KEY = "bb874fcf-3722-4db8-8062-76756ffbcd45";

export const MAP_APP_LOCATION = {
  iconLayout: 'default#image',
  iconImageHref: '../point-small.png',
  iconImageSize: [52, 60],
}

export const getMapAppMark = (value: number) => {

  const image = `../mark${value}.png`;

  return {
    iconLayout: 'default#image',
    iconImageHref: image,
    iconImageSize: [52, 66],
  }
}

export const MAP_CENTER = {
  center: [55.751574, 37.573856],
  zoom: 10,
};
