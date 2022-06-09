const dataStars = [
  {smallRadius: 60, xCenter: 140, yCenter: 140, color: 'red'},
  {smallRadius: 60, xCenter: 460, yCenter: 140, color: 'blue'},
  {smallRadius: 60, xCenter: 300, yCenter: 300, color: 'green'},
  {smallRadius: 60, xCenter: 140, yCenter: 460, color: 'yellow'},
  {smallRadius: 60, xCenter: 460, yCenter: 460, color: 'black'},
];

const largeСanvas = document.querySelector('.large');
const lgCtx = largeСanvas.getContext('2d');

const smallCanvas = document.querySelector('.small');
const smCtx = smallCanvas.getContext('2d');


const fillCanvas = (color, canvas, context) => {
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

const drowStar = ({ smallRadius, xCenter, yCenter, color }, context) => {
  const largeRadius = smallRadius * 2;
  const star = new Path2D();
  context.beginPath();

  for (let i = 0; i < 5; i++) {
    star.lineTo(Math.cos( (18+i*72)/180*Math.PI )*largeRadius + xCenter, -Math.sin( (18+i*72)/180*Math.PI )*largeRadius + yCenter);
    star.lineTo(Math.cos( (54+i*72)/180*Math.PI )*smallRadius + xCenter, -Math.sin( (54+i*72)/180*Math.PI )*smallRadius + yCenter);
  }
  star.closePath();
  context.strokeStyle  = color;
  context.fillStyle = color;
  context.fill(star);
  context.stroke(star);
  return star;
}

const handleFigureClick = (figure, color) => (event) => {
  if (lgCtx.isPointInPath(figure, event.offsetX, event.offsetY)) {
    fillCanvas(color, smallCanvas, smCtx);
  } 
}

largeСanvas.addEventListener('click', () => {
  fillCanvas('white', smallCanvas, smCtx);
});

dataStars.forEach(data => {
  const star = drowStar(data, lgCtx);
  largeСanvas.addEventListener('click', handleFigureClick(star, data.color));
});

