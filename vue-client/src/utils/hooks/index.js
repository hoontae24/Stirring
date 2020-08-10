export const onLoad = (src, handler) => {
  const image = new Image();
  image.onload = handler;
  image.src = src;
};
