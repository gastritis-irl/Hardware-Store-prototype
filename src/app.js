function drawCircle(ctx, circle) {
    ctx.beginPath();
    ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
    ctx.stroke();
}
function drawSquare(ctx, square) {
    ctx.strokeRect(square.topLeft.x, square.topLeft.y, square.sideLength, square.sideLength);
}
function drawShape(ctx, shape) {
    if (shape.type === 'circle') {
        drawCircle(ctx, shape);
    }
    else if (shape.type === 'square') {
        drawSquare(ctx, shape);
    }
}
document.getElementById('drawButton').addEventListener('click', function () {
    var textarea = document.getElementById('shapeData');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    try {
        var shape = JSON.parse(textarea.value);
        drawShape(ctx, shape);
    }
    catch (error) {
        console.error('Hiba történt a formák rajzolása közben:', error);
    }
});