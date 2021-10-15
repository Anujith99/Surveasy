export const isEmpty = (obj) => {
  if (obj) {
    if (Object.keys(obj).length === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const getRandomColor = () => {
  let color = "hsl(" + Math.random() * 360 + ", 100%,80%)";
  return color;
};
