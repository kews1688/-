class Data {
    constructor() {
        this.fruitNum = 0;
        this.double = 1
        this.score = 0
    }
    draw() {
        ctx3.save()
        ctx3.fillStyle = "#fff";
        ctx3.font = "30px 微软雅黑"
        ctx3.textAlign = "center"
        ctx3.fillText('score:' + this.score, canWidth * 0.5, canHeight - 10)
        ctx3.restore()
    }
    addScore() {
        this.score += this.fruitNum + this.double
    }
}