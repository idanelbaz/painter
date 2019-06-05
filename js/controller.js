'use strict'
let canvas;
let ctx;
let newX, newY, mouseDown = 0
let lastX, lastY;

function init() {
    canvas = document.querySelector('.canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 20;
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);

}

function draw(ev) {
    let color = document.querySelector('.color').value;
    let shape = document.querySelector('.actions-select').value;
    let size = document.querySelector('.size-select').value;
    const { offsetX, offsetY } = ev;

    switch (shape) {
        case 'square':
            drawSquare(color, offsetX, offsetY, size);
            break;
        case 'line':
            drawLine(color, offsetX, offsetY, size);
            break;
        case 'circle':
            drawCircle(color, offsetX, offsetY, size);
            break;
    }


}


function drawCircle(color, offsetX, offsetY, size) {
    ctx.beginPath();
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctx.arc(offsetX, offsetY, 50, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
}

function drawLine(color, offsetX, offsetY, size) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(offsetX, offsetY);
    ctx.closePath();
    ctx.stroke();

}

function drawSquare(color, offsetX, offsetY, size) {
    ctx.beginPath();
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctx.rect(offsetX, offsetY, 150, 100);
    ctx.closePath();
    ctx.stroke();
}


function onClearCanvas() {
    if (confirm('Are you sure?')) {
        ctx.fillStyle = "white";
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    } else return;
}

function onSaveCanvas(elLink) {
    const data = canvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg'
}

function onMouseDown(e) {
    var xy = getMousePos(e);
    lastX = xy.mouseX;
    lastY = xy.mouseY;
    mouseDown = 1;
}

function onMouseUp() {
    mouseDown = 0
}

function onMouseMove(e) {
    if (mouseDown == 1) {
        var xy = getMousePos(e);
        draw(e);
        lastX = xy.mouseX, lastY = xy.mouseY;
    }
}

function getMousePos(e) {
    var o = {};
    if (!e)
        var e = event
    if (e.offsetX) {
        o.mouseX = e.offsetX
        o.mouseY = e.offsetY
    } else if (e.layerX) {
        o.mouseX = e.layerX
        o.mouseY = e.layerY
    }
    return o;
}

function handleImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}