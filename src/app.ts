type Point = {
  x: number;
  y: number;
};

type Circle = {
  type: 'circle';
  center: Point;
  radius: number;
};

type Square = {
  type: 'square';
  topLeft: Point;
  sideLength: number;
};

type Shape = Circle | Square;

function drawCircle(ctx: CanvasRenderingContext2D, circle: Circle) {
  ctx.beginPath();
  ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawSquare(ctx: CanvasRenderingContext2D, square: Square) {
  ctx.strokeRect(square.topLeft.x, square.topLeft.y, square.sideLength, square.sideLength);
}

function drawShape(ctx: CanvasRenderingContext2D, shape: Shape) {
  if (shape.type === 'circle') {
    drawCircle(ctx, shape);
  } else if (shape.type === 'square') {
    drawSquare(ctx, shape);
  }
}

document.getElementById('drawButton').addEventListener('click', () => {
  const textarea = document.getElementById('shapeData') as HTMLTextAreaElement;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  try {
    const shape: Shape = JSON.parse(textarea.value);
    drawShape(ctx, shape);
  } catch (error) {
    console.error('Hiba történt a formák rajzolása közben:', error);
  }
});
