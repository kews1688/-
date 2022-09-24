class Fish {
    constructor(arg) {
        //坐标值
        this.x
        this.y
        this.body = new Image()
        this.eyes = new Image()
        this.tails = []
        this.angle

        // 鱼尾动画
        this.tailIndex = 0
        this.tailTimer = 0
        // 鱼眼睛动画
        this.eyeIndex = 0
        this.eyeTimer = 0
        this.eyeInterval = 1000
        // 身体颜色
        this.bodyOra = []
        this.bodyBlue = []
        // 鱼吃到果实的颜色
        this.eatOra = []
        this.eatBlue = []

        this.bodyIndex = 0
        this.eatTimer = 120
    }
    init() {
        this.x = canWidth * 0.5
        this.y = canHeight * 0.5
        this.body.src = './src/bigSwim0.png'
        this.eyes.src = './src/bigEye0.png'
        this.tails.src = './src/bigTail0.png'
        this.angle = 0
        for (var i = 0; i < 8; i++) {
            this.tails[i] = new Image()
            this.tails[i].src = `./src/bigTail${i}.png`
        }
        for (var i = 0; i < 2; i++) {
            this.eyes[i] = new Image()
            this.eyes[i].src = `./src/bigEye${i}.png`
        }
        // 鱼变黄颜色
        for (var i = 0; i < 8; i++) {
            this.bodyOra[i] = new Image()
            this.bodyOra[i].src = `./src/bigSwim${i}.png`
            this.eatOra[i] = new Image()
            this.eatOra[i].src = `./src/bigEat${i}.png`
        }
        // 鱼变蓝颜色
        for (var i = 0; i < 8; i++) {
            this.bodyBlue[i] = new Image()
            this.bodyBlue[i].src = `./src/bigSwimBlue${i}.png`
            this.eatBlue[i] = new Image()
            this.eatBlue[i].src = `./src/bigEatBlue${i}.png`
        }
    }
    draw() {
        // 绘制鱼尾动画针
        this.tailTimer += deltaTime
        if (this.tailTimer > 50) {
            this.tailIndex = (this.tailIndex + 1) % 8
            this.tailTimer %= 50
        }
        let tail = this.tails[this.tailIndex]
        // 绘制鱼眼睛动画针
        this.eyeTimer += deltaTime
        if (this.eyeTimer > this.eyeInterval) {
            this.eyeIndex = (this.eyeIndex + 1) % 2
            this.eyeTimer %= this.eyeInterval
            if (this.eyeIndex === 0) {
                this.eyeInterval = Math.random() * 2000 + 1000
            } else {
                this.eyeInterval = 200
            }
        }
        let eye = this.eyes[this.eyeIndex]
        this.x = lerpDistance(mx, this.x, 0.9)
        this.y = lerpDistance(my, this.y, 0.9)
        // 处理鱼旋转角度
        let deltaX = mx - this.x
        let deltaY = my - this.y
        let deta = Math.atan2(deltaY, deltaX)
        this.angle = lerpAngle(deta, this.angle, 0.6)
        // 绘制鱼的身体
        ctx3.save()
        ctx3.translate(this.x, this.y)
        ctx3.rotate(this.angle - Math.PI)
        // 处理鱼变颜色
        let body
        this.eatTimer += deltaTime
        if (this.eatTimer < 120) {
            if (data.double === 2) {
                body = this.eatBlue[this.bodyIndex]
            } else {
                body = this.eatOra[this.bodyIndex]
            }
        } else {
            if (data.double === 2) {
                body = this.bodyBlue[this.bodyIndex]
            } else {
                body = this.bodyOra[this.bodyIndex]
            }
        }

        ctx3.drawImage(body, -body.width * 0.5, -body.height * 0.5, body.width, body.height)
        ctx3.drawImage(eye, -eye.width * 0.5, -eye.height * 0.5, eye.width, eye.height)
        ctx3.drawImage(tail, -tail.width * 0.5 + 30, -tail.height * 0.5, tail.width, tail.height)
        ctx3.restore()
    }
}