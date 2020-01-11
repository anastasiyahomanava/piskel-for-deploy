const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
let isMouseDown = false;

canvas.width = 512;
canvas.height = 512;

let myColor;
let penLineWidth;

document.querySelector('.one-px').onclick = function () {
  penLineWidth = '1';
};

document.querySelector('.two-px').onclick = function () {
  penLineWidth = '2';
};

document.querySelector('.three-px').onclick = function () {
  penLineWidth = '3';
};

document.querySelector('.four-px').onclick = function () {
  penLineWidth = '4';
};

document.getElementById('color').oninput = function () {
  myColor = this.value;
};

function draw() {
  canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
      const x = event.offsetX;
      const y = event.offsetY;
      ctx.strokeStyle = myColor;
      ctx.lineWidth = penLineWidth;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });
}

function fillAllCanvas() {
  canvas.onmousedown = () => {
    ctx.fillStyle = myColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
}

function drawLine() {
  canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
      const beginX = event.offsetX;
      const beginY = event.offsetY;
      ctx.beginPath();
      canvas.onmousedown = (e) => {
        const endX = e.offsetX;
        const endY = e.offsetY;
        ctx.strokeStyle = myColor;
        ctx.lineWidth = penLineWidth;
        ctx.moveTo(beginX, beginY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      };
    }
  });
}

function eraser() {
  canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
      const x = event.offsetX;
      const y = event.offsetY;
      ctx.lineWidth = penLineWidth;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.clearRect(x, y, 2, 2);
    }
  });
}

function fill() {
  // eslint-disable-next-line no-console
  console.log('fill');
}

document.querySelector('.tools__pen').addEventListener('click', draw);
document.querySelector('.tools__fill').addEventListener('click', fill);
document.querySelector('.tools__eraser').addEventListener('click', eraser);
document.querySelector('.tools__line').addEventListener('click', drawLine);
document.querySelector('.tools__fill-all').addEventListener('click', fillAllCanvas);

document.querySelectorAll('.tool__item').forEach(
  (item) => {
    item.addEventListener('click', () => {
      document.querySelector('.tool__item.active').classList.toggle('active');
      item.classList.toggle('active');
    });
  },
);

document.querySelectorAll('.size__item').forEach(
  (item) => {
    item.addEventListener('click', () => {
      document.querySelector('.size__item.active').classList.toggle('active');
      item.classList.toggle('active');
    });
  },
);

canvas.addEventListener('mousedown', () => {
  isMouseDown = true;
});

canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
  ctx.beginPath();
});

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyQ':
      draw();
      break;
    case 'KeyW':
      fill();
      break;
    case 'KeyE':
      eraser();
      break;
    case 'KeyR':
      drawLine();
      break;
    case 'KeyT':
      fillAllCanvas();
      break;
    default:
      draw();
  }
});
