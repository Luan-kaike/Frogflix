import randomColor from 'randomcolor';

export const getPaletteUser = () => {
  const hue = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  const rIndexHue = () => (Math.round(Math.random() * (hue.length - 1)));

  const colors = randomColor(
    { 
      luminosity: 'bright', 
      hue: hue[rIndexHue()],
      count: 2
    }
  );

  return colors;
}
