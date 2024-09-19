// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// パドル設定
const paddleWidth = 120;
const paddleHeight = 20;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight - 10;
const paddleSpeed = 8;

// ボール設定
const ballRadius = 12;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 5;
let ballDY = -5;

// キー入力管理
const keys = {};

// イベントリスナー
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// パドルの描画
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = '#FF6347';
    ctx.fill();
    ctx.closePath();
}

// ボールの描画
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.closePath();
}

// パドルの移動
function movePaddle() {
    if (keys['ArrowLeft'] && paddleX > 0) {
        paddleX -= paddleSpeed;
    }
    if (keys['ArrowRight'] && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    }
}

// ボールの移動と衝突判定
function moveBall() {
    ballX += ballDX;
    ballY += ballDY;

    // 壁との衝突
    if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
    }
    if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > canvas.height - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballDY = -ballDY;
        } else {
            // ゲームオーバー
            alert('ゲームオーバー！');
            document.location.reload();
        }
    }
}

// ゲームの描画
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    movePaddle();
    moveBall();
    requestAnimationFrame(draw);
}

draw();
