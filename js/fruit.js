class Fruit {
    constructor(args) {
        // 果实数量
        this.num = 50
        this.active = []
        this.orange = new Image()
        this.blue = new Image()
        // 果实出生位置
        this.x = []
        this.y = []
        // 设置果实的大小
        this.l = []
        // 设置果实速度
        this.spd = []
        // 设置果实类型
        this.fruitType = []
        // 设置海藻的id
        this.No = []
    }
    init() {
        for (let i = 0; i < this.num; i++) {
            this.active[i] = false
            this.x[i] = 0
            this.y[i] = 0
            this.spd[i] = Math.random() * 0.01 + 0.005
            this.fruitType[i] = 0
            this.No[i] = 0
        }
        this.orange.src = './src/fruit.png'
        this.blue.src = './src/blue.png'
    }
    draw() {
        ctx4.clearRect(0, 0, canWidth, canHeight)
        ane.draw()
        ctx4.globalAlpha = '1'
        for (let i = 0; i < this.num; i++) {
            if (this.active[i]) {
                if (this.l[i] < 16) {
                    let id = this.No[i]
                    this.x[i] = ane.headx[id]
                    this.y[i] = ane.heady[id]
                    this.l[i] += this.spd[i] * deltaTime
                } else {
                    this.y[i] -= this.spd[i] * 4 * deltaTime
                    if (this.y[i] <= 0) {
                        this.active[i] = false
                    }
                }
                if (this.fruitType[i] === 'orange') {
                    ctx4.drawImage(this.orange, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i])
                } else {
                    ctx4.drawImage(this.blue, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i])
                }
            }
        }
    }
    born(i) {
        // 设置果实在那个海葵出生的
        this.No[i] = Math.floor(Math.random() * ane.num)
        this.x[i] = 0
        this.y[i] = 0
        this.l[i] = 0
        this.active[i] = true
        // 设置果实颜色
        if (Math.random() < 0.3) {
            this.fruitType[i] = 'blue'
        } else {
            this.fruitType[i] = 'orange'
        }
    }
    fruitMonitor() {
        let num = 0
        for (let i = 0; i < this.num; i++) {
            if (this.active[i]) {
                num++
            }
        }
        // 只允许屏幕上有25个果实
        if (num < 25) {
            for (let i = 0; i < this.num; i++) {
                if (!this.active[i]) {
                    this.born(i)
                    break;
                }
            }
        }
    }
    dead(i) {
        this.active[i] = false
    }
}