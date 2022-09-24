var canvas2 = document.querySelector('.content2 canvas');
// 设置宽高
var w1 = 1000
var h1 = 500
canvas2.width = w1
canvas2.height = h1
var ctx2 = canvas2.getContext('2d')
var isMouseDown2 = false
var lineWidth2 = 1
var strokeColor2 = 'black'
var lastloc2 = {
    x: 0,
    y: 0
}
var imgData = ''
var imgData1 = ''
var EndingLocHh
drawHh()
// 铅笔功能
function drawHh() {
    canvas2.onmousedown = function (e) {
        e.preventDefault()
        beginStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
    }
    canvas2.onmouseup = function (e) {
        e.preventDefault()
        EndingStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
    }
    canvas2.onmouseout = function (e) {
        e.preventDefault()
        endStrokeHh()
    }
    canvas2.onmousemove = function (e) {
        e.preventDefault()
        if (isMouseDown2) {
            moveStrokeHh({
                x: e.clientX,
                y: e.clientY
            })
        }
    }
}
// 直线功能
function beginStrokeHh(pointHh) {
    isMouseDown2 = true
    lastloc2 = windowToCanvas2(pointHh.x, pointHh.y)
}

function endStrokeHh(pointHh) {
    isMouseDown2 = false
}

function EndingStrokeHh(pointHh) {
    isMouseDown2 = false
    EndingLocHh = windowToCanvas2(pointHh.x, pointHh.y)
}

function moveStrokeHh(pointHh) {
    var curLocHh = windowToCanvas2(pointHh.x, pointHh.y)
    ctx2.beginPath()
    ctx2.moveTo(lastloc2.x, lastloc2.y)
    ctx2.lineTo(curLocHh.x, curLocHh.y)
    ctx2.lineWidth = lineWidth2
    ctx2.lineJoin = 'round'
    ctx2.lineCap = 'round'
    ctx2.strokeStyle = strokeColor2
    ctx2.stroke()
    lastloc2 = curLocHh
}
// 转换坐标轴
function windowToCanvas2(x, y) {
    // 获取画布距离浏览器窗口的位置
    var bbox = canvas2.getBoundingClientRect()
    return {
        x: Math.round(x - bbox.left),
        y: Math.round(y - bbox.top)
    }
}
// 铅笔功能
$("#pen").on("click", function () {
    drawHh();
})
// 通用功能
function Down() {
    canvas2.onmousedown = function (e) {
        beginStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
        ctx2.beginPath()
        ctx2.moveTo(lastloc2.x, lastloc2.y)
        ctx2.strokeStyle = strokeColor2
        ctx2.fillStyle = strokeColor2
        ctx2.lineWidth = lineWidth2
        ctx2.lineCap = "round"
        ctx2.lineJoin = "round"
        this.imgData1 = ctx2.getImageData(0, 0, w1, h1)
    }
    canvas2.onmouseout = null
    canvas2.onmousemove = null
}
// 直线功能
$("#Line").on("click", function () {
    Down()
    canvas2.onmousemove = function (e) {
        e.preventDefault()
        if (isMouseDown2) {
            ctx2.clearRect(0, 0, w1, h1)
            this.imgData1 && ctx2.putImageData(this.imgData1, 0, 0)
            var curLocHh = windowToCanvas2(e.clientX, e.clientY)
            ctx2.beginPath()
            ctx2.moveTo(lastloc2.x, lastloc2.y)
            ctx2.lineTo(curLocHh.x, curLocHh.y)
            ctx2.lineWidth = lineWidth2
            ctx2.lineJoin = 'round'
            ctx2.lineCap = 'round'
            ctx2.strokeStyle = strokeColor2
            ctx2.stroke()
            this.imgData = ctx2.getImageData(0, 0, w2, h2)
            this.imgData && ctx2.putImageData(this.imgData, 0, 0)
        }
    }
    canvas2.onmouseup = function (e) {
        EndingStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
        ctx2.lineTo(EndingLocHh.x, EndingLocHh.y)
        ctx2.stroke()
    }
})
// 矩形功能
$("#rect").on("click", function () {
    Down()
    canvas2.onmousemove = function (e) {
        e.preventDefault()
        if (isMouseDown2) {
            ctx2.clearRect(0, 0, w1, h1)
            this.imgData1 && ctx2.putImageData(this.imgData1, 0, 0)
            var curLocHh = windowToCanvas2(e.clientX, e.clientY)
            ctx2.strokeRect(lastloc2.x, lastloc2.y, curLocHh.x - lastloc2.x, curLocHh.y - lastloc2.y)
            this.imgData = ctx2.getImageData(0, 0, w2, h2)
            this.imgData && ctx2.putImageData(this.imgData, 0, 0)
        }
    }
    canvas2.onmouseup = function (e) {
        EndingStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
        ctx2.strokeRect(lastloc2.x, lastloc2.y, EndingLocHh.x - lastloc2.x, EndingLocHh.y - lastloc2.y)
    }
})
// 矩形填充功能
$("#rect-fill").on("click", function () {
    Down()
    canvas2.onmousemove = function (e) {
        e.preventDefault()
        if (isMouseDown2) {
            ctx2.clearRect(0, 0, w1, h1)
            this.imgData1 && ctx2.putImageData(this.imgData1, 0, 0)
            var curLocHh = windowToCanvas2(e.clientX, e.clientY)
            ctx2.fillRect(lastloc2.x, lastloc2.y, curLocHh.x - lastloc2.x, curLocHh.y - lastloc2.y)
            this.imgData = ctx2.getImageData(0, 0, w2, h2)
            this.imgData && ctx2.putImageData(this.imgData, 0, 0)
        }
    }
    canvas2.onmouseup = function (e) {
        EndingStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
        ctx2.fillRect(lastloc2.x, lastloc2.y, EndingLocHh.x - lastloc2.x, EndingLocHh.y - lastloc2.y)
    }
})
// 圆形功能
$("#arc").on("click", function () {
    Down()
    canvas2.onmousemove = function (e) {
        e.preventDefault()
        if (isMouseDown2) {
            ctx2.clearRect(0, 0, w1, h1)
            this.imgData1 && ctx2.putImageData(this.imgData1, 0, 0)
            var curLocHh = windowToCanvas2(e.clientX, e.clientY)
            ctx2.beginPath()
            ctx2.arc(lastloc2.x, lastloc2.y, Math.abs(curLocHh.x - lastloc2.x), 0, Math.PI * 2)
            ctx2.strokeStyle = strokeColor2
            ctx2.stroke()
            this.imgData = ctx2.getImageData(0, 0, w2, h2)
            this.imgData && ctx2.putImageData(this.imgData, 0, 0)
        }
    }
    canvas2.onmouseup = function (e) {
        EndingStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
        ctx2.beginPath()
        ctx2.arc(lastloc2.x, lastloc2.y, Math.abs(EndingLocHh.x - lastloc2.x), 0, Math.PI * 2)
        ctx2.stroke();
    }
})
// 圆形填充功能
$("#arc-fill").on("click", function () {
    Down()
    canvas2.onmousemove = function (e) {
        e.preventDefault()
        if (isMouseDown2) {
            ctx2.clearRect(0, 0, w1, h1)
            this.imgData1 && ctx2.putImageData(this.imgData1, 0, 0)
            var curLocHh = windowToCanvas2(e.clientX, e.clientY)
            ctx2.beginPath()
            ctx2.arc(lastloc2.x, lastloc2.y, Math.abs(curLocHh.x - lastloc2.x), 0, Math.PI * 2)
            ctx2.strokeStyle = strokeColor2
            ctx2.fill()
            this.imgData = ctx2.getImageData(0, 0, w2, h2)
            this.imgData && ctx2.putImageData(this.imgData, 0, 0)
        }
    }
    canvas2.onmouseup = function (e) {
        EndingStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
        ctx2.beginPath()
        ctx2.arc(lastloc2.x, lastloc2.y, Math.abs(EndingLocHh.x - lastloc2.x), 0, Math.PI * 2)
        ctx2.fill();
    }
})
// 三角形功能
$("#triangle").on("click", function () {
    Down()
    canvas2.onmousemove = function (e) {
        e.preventDefault()
        if (isMouseDown2) {
            ctx2.clearRect(0, 0, w1, h1)
            this.imgData1 && ctx2.putImageData(this.imgData1, 0, 0)
            var curLocHh = windowToCanvas2(e.clientX, e.clientY)
            ctx2.beginPath()
            ctx2.moveTo(lastloc2.x, lastloc2.y)
            ctx2.lineTo(lastloc2.x - (curLocHh.x - lastloc2.x), curLocHh.y)
            ctx2.lineTo(curLocHh.x, curLocHh.y)
            ctx2.closePath()
            ctx2.stroke()
            this.imgData = ctx2.getImageData(0, 0, w2, h2)
            this.imgData && ctx2.putImageData(this.imgData, 0, 0)
        }
    }

    canvas2.onmouseup = function (e) {
        EndingStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
        ctx2.lineTo(lastloc2.x - (EndingLocHh.x - lastloc2.x), EndingLocHh.y)
        ctx2.lineTo(EndingLocHh.x, EndingLocHh.y)
        ctx2.closePath()
        ctx2.stroke();
    }
})
// 三角形填充功能
$("#triangle-fill").on("click", function () {
    Down()
    canvas2.onmousemove = function (e) {
        e.preventDefault()
        if (isMouseDown2) {
            ctx2.clearRect(0, 0, w1, h1)
            this.imgData1 && ctx2.putImageData(this.imgData1, 0, 0)
            var curLocHh = windowToCanvas2(e.clientX, e.clientY)
            ctx2.beginPath()
            ctx2.moveTo(lastloc2.x, lastloc2.y)
            ctx2.lineTo(lastloc2.x - (curLocHh.x - lastloc2.x), curLocHh.y)
            ctx2.lineTo(curLocHh.x, curLocHh.y)
            ctx2.closePath()
            ctx2.fill()
            this.imgData = ctx2.getImageData(0, 0, w2, h2)
            this.imgData && ctx2.putImageData(this.imgData, 0, 0)
        }
    }
    canvas2.onmouseup = function (e) {
        EndingStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
        ctx2.lineTo(lastloc2.x - (EndingLocHh.x - lastloc2.x), EndingLocHh.y)
        ctx2.lineTo(EndingLocHh.x, EndingLocHh.y)
        ctx2.closePath()
        ctx2.fill();
    }
})
// 粗细1功能
$("#LineWidth-one").on("click", function () {
    lineWidth2 = '1'
})
// 粗细2功能
$("#LineWidth-two").on("click", function () {
    lineWidth2 = '5'

})
// 粗细3功能
$("#LineWidth-three").on("click", function () {
    lineWidth2 = '10'
})
// 橡皮擦功能
$("#eraser").on("click", function () {
    Down()
    canvas2.onmousemove = function (e) {
        e.preventDefault()
        if (isMouseDown2) {
            ctx2.clearRect(0, 0, w1, h1)
            this.imgData1 && ctx2.putImageData(this.imgData1, 0, 0)
            var curLocHh = windowToCanvas2(e.clientX, e.clientY)
            ctx2.fillRect(lastloc2.x, lastloc2.y, curLocHh.x - lastloc2.x, curLocHh.y - lastloc2.y)
            this.imgData = ctx2.getImageData(0, 0, w2, h2)
            this.imgData && ctx2.putImageData(this.imgData, 0, 0)
        }
    }
    canvas2.onmouseup = function (e) {
        EndingStrokeHh({
            x: e.clientX,
            y: e.clientY
        })
        ctx2.fillStyle = "#fff"
        ctx2.fillRect(lastloc2.x, lastloc2.y, EndingLocHh.x - lastloc2.x, EndingLocHh.y - lastloc2.y)
    }
})
// 改变颜色
$(".btn .btn-right-left ul li").on("click", function () {
    $(".btn .btn-right-left ul li").removeClass("active")
    $(this).addClass("active")
    strokeColor2 = $(this).css("background-color")
})
$(".content2 .btn .btn-left1 ul li").on("click", function () {
    $(".content2 .btn .btn-left1 ul li").removeClass("active")
    $(this).addClass("active")
})
// 清楚按钮
$('#img3').click(
    function () {
        ctx2.clearRect(0, 0, w1, h1)
    })
// 保存按钮
$("#keep_btn2").on("click", function () {
    var keep2 = canvas2.toDataURL("image/png")
    $("#keep2")[0].href = keep2
})