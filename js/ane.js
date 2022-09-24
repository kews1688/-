class Ane {
    constructor() {
        // 海葵的总数量
        this.num = 150
        // 海葵的高度
        this.len = []
        // 开始点位 结束点位 控制点位
        this.rootx = []
        this.headx = []
        this.heady = []
        // 角度
        this.angle = 0
        // 振幅
        this.amp = []
    }
    init() {
        for (let i = 0; i < this.num; i++) {
            this.rootx[i] = i * 20 + Math.random() * 20
            this.headx[i] = this.rootx[i]
            this.heady[i] = canHeight - Math.random() * 100 - 100
            this.amp[i] = Math.random() * 50 + 50
        }
    }
    draw() {
        ctx4.save()
        ctx4.globalAlpha = 0.6
        ctx4.lineWidth = 20
        ctx4.lineCap = 'round'
        ctx4.strokeStyle = '#3b154e'
        for (let i = 0; i < this.num; i++) {
            this.angle = this.angle + deltaTime * 0.00001
            let l = Math.sin(this.angle) * this.amp[i]
            this.headx[i] = this.rootx[i] + l
            ctx4.beginPath()
            ctx4.moveTo(this.rootx[i], canHeight)
            ctx4.quadraticCurveTo(this.rootx[i], canHeight - 50, this.headx[i], this.heady[i])
            ctx4.stroke()
        }
        ctx4.restore()
    }
}