var canvas1 = document.querySelector('.canvas1 canvas');
// 设置宽高
var w = 500
var h = 500
canvas1.width = w
canvas1.height = h
var ctx1 = canvas1.getContext('2d')
var isMouseDown = false
var lastTimestamp = 0
var lastLineWidth = -1
var strokeColor = 'black'
darwGrid()
var lastloc = {
    x: 0,
    y: 0
}
canvas1.onmousedown = function (e) {
    e.preventDefault()
    isMouseDown = true
    // 传入浏览器窗口的位置
    lastloc = windowToCanvas(e.clientX, e.clientY)
    // 落下时间
    lastTimestamp = new Date().getTime()
}
canvas1.onmouseup = function (e) {
    e.preventDefault()
    isMouseDown = false
}
canvas1.onmouseout = function (e) {
    e.preventDefault()
    isMouseDown = false
}
canvas1.onmousemove = function (e) {
    e.preventDefault()
    if (isMouseDown) {
        var curLoc = windowToCanvas(e.clientX, e.clientY)
        var s = calcDistance(curLoc, lastloc)
        var curTinestamp = new Date().getTime()
        var t = curTinestamp - lastTimestamp
        var lineWidth = calcLineWidth(t, s)

        ctx1.beginPath()
        ctx1.moveTo(lastloc.x, lastloc.y)
        ctx1.lineTo(curLoc.x, curLoc.y)
        ctx1.lineWidth = lineWidth
        ctx2.lineJoin = 'round'
        ctx1.lineCap = 'round'
        ctx1.strokeStyle = strokeColor
        ctx1.stroke()
        lastloc = curLoc
    }
}
// 计算速度 改变线条粗细
var maxLineWidth = 20
var minLineWidth = 1
var maxStrokeV = 10
var minStrokeV = 0.1

function calcLineWidth(t, s) {
    var v = s / t
    var resultLineWidth
    if (v <= minStrokeV) {
        resultLineWidth = maxLineWidth
    } else if (v >= maxStrokeV) {
        resultLineWidth = minLineWidth
    } else {
        resultLineWidth = maxLineWidth - (v - minStrokeV) / (maxStrokeV - minStrokeV) * (maxLineWidth - minLineWidth)
    }
    // return resultLineWidth
    if (lastLineWidth == -1) {
        return resultLineWidth
    }
    return lastLineWidth * 3 / 5 + resultLineWidth / 3
}
// 两点之间的长度
function calcDistance(loc1, loc2) {
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y))
}
// 转换坐标轴
function windowToCanvas(x, y) {
    // 获取画布距离浏览器窗口的位置
    var bbox = canvas1.getBoundingClientRect()
    return {
        x: Math.round(x - bbox.left),
        y: Math.round(y - bbox.top)
    }
}
// 画布线条方法
function darwGrid() {
    ctx1.save()
    ctx1.strokeStyle = 'red'
    // 绘制米字方格
    ctx1.beginPath()
    ctx1.moveTo(2, 2)
    ctx1.lineTo(w - 2, 2)
    ctx1.lineTo(w - 2, w - 2)
    ctx1.lineTo(2, w - 2)
    ctx1.closePath()
    // 设置线宽
    ctx1.lineWidth = '4'
    ctx1.stroke()
    // 设置虚线
    ctx1.beginPath()
    ctx1.lineWidth = '1'
    // 虚线
    ctx1.setLineDash([20, 5])
    ctx1.moveTo(0, 0)
    ctx1.lineTo(w, w)
    ctx1.moveTo(0, w)
    ctx1.lineTo(w, 0)
    ctx1.moveTo(0, w / 2)
    ctx1.lineTo(w, w / 2)
    ctx1.moveTo(w / 2, 0)
    ctx1.lineTo(w / 2, w)
    ctx1.stroke()
    ctx1.restore()
}
// 改变颜色
$(".btn .btn-left ul li").on("click", function () {
    $(".btn .btn-left ul li").removeClass("active")
    $(this).addClass("active")
    strokeColor = $(this).css("background-color")
})
// 清除按钮
$('#img2').click(
    function () {
        ctx1.clearRect(0, 0, w, h)
        darwGrid()
    })
// 保存按钮
$("#keep_btn").click(
    function () {
        var keep = canvas1.toDataURL("image/png")
        $("#keep")[0].href = keep
    })