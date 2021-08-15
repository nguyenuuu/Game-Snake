setInterval(game, 100, ctx)

function game(ctx) {
    die();
    if (!run) return;
    draw(ctx);
    changeDirection();
    move();
    eatFood();
    score.textContent = `Score: ${dots.length - 3}`;

}

function draw(ctx) {

    ctx.clearRect(0, 0, sizeDot * g_width, sizeDot * g_height);
    // snake
    for (let i = 1; i < dots.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(dots[i][1] * sizeDot + 1, dots[i][0] * sizeDot + 1, sizeDot - 2, sizeDot - 2);
    }
    ctx.fillStyle = "yellow";
    ctx.fillRect(dots[0][1] * sizeDot + 1, dots[0][0] * sizeDot + 1, sizeDot - 2, sizeDot - 2);
    // food
    ctx.fillStyle = "red";
    var circle = new Path2D();
    circle.arc(fy * sizeDot + sizeDot / 2, fx * sizeDot + sizeDot / 2, sizeDot / 2 - 1, 0, 2 * Math.PI);
    ctx.fill(circle);
}

function move() {
    dots.unshift([dots[0][0] + vx, dots[0][1] + vy]);
    dots.pop();
    if (vy === 1) {
        if (dots[0][1] >= g_width)
            dots[0][1] = 0;
    } else if (vy === -1) {
        if (dots[0][1] < 0)
            dots[0][1] = g_width - 1;
    } else if (vx === 1) {
        if (dots[0][0] >= g_height)
            dots[0][0] = 0;
    } else if (vx === -1) {
        if (dots[0][0] < 0)
            dots[0][0] = g_height - 1;
    }

}

function changeDirection() {
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                if (vx === 0)
                    vx = -1; vy = 0;
                break;
            case "ArrowDown":
                if (vx === 0)
                    vx = 1; vy = 0;
                break;
            case "ArrowLeft":
                if (vy === 0)
                    vy = -1; vx = 0;
                break;
            case "ArrowRight":
                if (vy === 0)
                    vy = 1; vx = 0;
                break;
        }
    });
}

function food() {
    var tgx = Math.floor((g_height - 1) * Math.random());
    var tgy = Math.floor((g_width - 1) * Math.random());
    var mark = 0;
    for (let i = 0; i < dots.length; i++) {
        if (tgx === dots[i][0] && tgy === dots[i][1]) {
            mark = 1;
            break;
        }
    }
    if (mark === 0) {
        fx = tgx;
        fy = tgy;
    } else {
        food();
    }
}

function eatFood() {
    if (dots[0][0] === fx && dots[0][1] === fy) {
        dots.push(dots[dots.length - 1]);
        food();
    }
}

function die() {
    for (let i = 1; i < dots.length; i++) {
        if (dots[i][0] === dots[0][0] && dots[i][1] === dots[0][1]) {
            run = false;
            gameover.style.opacity = 1;
        }
    }
}