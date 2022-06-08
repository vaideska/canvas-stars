const dataStars = [
  {smallRadius: 60, xCenter: 140, yCenter: 140, color: 'red'},
  {smallRadius: 60, xCenter: 460, yCenter: 140, color: 'blue'},
  {smallRadius: 60, xCenter: 300, yCenter: 300, color: 'green'},
  {smallRadius: 60, xCenter: 140, yCenter: 460, color: 'yellow'},
  {smallRadius: 60, xCenter: 460, yCenter: 460, color: 'black'},
];

const canvas = document.querySelector('.figure');
const ctx = canvas.getContext('2d');

const canvasLittle = document.querySelector('.little');
const little = canvasLittle.getContext('2d');


const fillLittleCanvas = (color) => {
  little.fillStyle = color;
  little.fillRect(0, 0, canvas.width, canvas.height);
}

const drowStar = ({ smallRadius, xCenter, yCenter, color }) => {
  const largeRadius = smallRadius * 2;
  const star = new Path2D();
  ctx.beginPath();

  for (let i = 0; i < 5; i++) {
    star.lineTo(Math.cos( (18+i*72)/180*Math.PI )*largeRadius + xCenter, -Math.sin( (18+i*72)/180*Math.PI )*largeRadius + yCenter);
    star.lineTo(Math.cos( (54+i*72)/180*Math.PI )*smallRadius + xCenter, -Math.sin( (54+i*72)/180*Math.PI )*smallRadius + yCenter);
  }
  star.closePath();
  ctx.strokeStyle  = color;
  ctx.fillStyle = color;
  ctx.fill(star);
  ctx.stroke(star);
  return star;
}

const handleFigureClick = (figure, color) => (event) => {
  if (ctx.isPointInPath(figure, event.offsetX, event.offsetY)) {
    fillLittleCanvas(color);
  } 
}

canvas.addEventListener('click', () => {
  fillLittleCanvas('white');
});

dataStars.forEach(data => {
  const star = drowStar(data);
  canvas.addEventListener('click', handleFigureClick(star, data.color));
});

