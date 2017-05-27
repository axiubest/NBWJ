/**
 * Created by 蒋鑫强 on 2017/4/13.
 */
(function () {
    window.CircleProgress = function (el, startColor, endColor) {
        var canvas = document.createElement('canvas');
        canvas.width = el.clientWidth * 2;
        canvas.height = el.clientHeight  * 2;
        var width = canvas.width, height = canvas.height;
        el.appendChild(canvas);
        var ctx = canvas.getContext("2d");
        canvas.style.width = el.clientWidth + 'px';
        canvas.style.height = el.clientHeight  + 'px';
        var circleWidth = 34;
        var current = 0;
        var deg = 0, disDeg =0, totalDeg = 0;
        var currentValues = [];
        var startDeg = 0;
        var endDeg = 0;
        var disDegArc = 0;
        var circleDeg = 0;
        var currentShowValue = 0;

        var grd = ctx.createLinearGradient(0,0,0,width);
        grd.addColorStop(0,startColor);
        grd.addColorStop(1,endColor);

        var circle = {
            x : width / 2,    //圆心的x轴坐标值
            y : height / 2,    //圆心的y轴坐标值
            r : width / 2 -  circleWidth / 2 - 25     //圆的半径
        };

        reset();
        //画底圈
        function drawCircle() {
            ctx.beginPath();
            ctx.lineWidth = circleWidth;

            ctx.strokeStyle = grd;
            ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, true);

            ctx.stroke();
        }
        
        function reset() {
            deg = Math.PI / 4;
            disDeg = Math.PI * 2 / 100;
            totalDeg = deg - disDeg * current;
            currentValues = [deg];
            startDeg = Math.PI * 3 / 4;
            endDeg = Math.PI * 3 / 4;
            disDegArc = disDeg;
            circleDeg = deg;
            currentShowValue = 0;
        }


        draw();
        //画刻度
        function drawLine(isLast) {
            for(var i = 0; i < currentValues.length; i++){
                var deg = currentValues[i];
                var last = isLast && (currentValues.length - 1 == i);
                if(i % 2 !== 0 || last){
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = '#fff';
                    var fromX = circle.x - Math.cos(deg) * circle.r - (Math.cos(deg)  * circleWidth / (last?3:5));
                    var fromY = circle.y + Math.sin(deg) * circle.r  + (Math.sin(deg) * circleWidth / (last?3:5));
                    ctx.moveTo(fromX,fromY);
                    var toX = circle.x - Math.cos(deg) * circle.r + (Math.cos(deg) * circleWidth / (last?3:5));
                    var toY = circle.y + Math.sin(deg) * circle.r  - (Math.sin(deg) * circleWidth / (last?3:5));
                    ctx.lineTo(toX,toY);
                    ctx.stroke();
                }
            }
        }
        function draw() {
            requestAnimationFrame(function () {
                ctx.shadowBlur='';
                ctx.shadowColor='';
                ctx.clearRect(0,0,width,height);
                drawCircle();
                if(deg <= totalDeg){
                    deg = totalDeg;
                    drawLine(true);
                }else{
                    deg -= disDeg;
                    currentValues.push(deg);
                    drawLine(false);
                }
                if(endDeg >= startDeg + disDeg * current){
                    endDeg = startDeg + disDeg * current;
                    drawOutArc(endDeg, true);
                }else{
                    endDeg += disDegArc;
                    drawOutArc(endDeg);
                }

                draw();
            });
        }

        function drawOutArc(endDeg, isLast) {
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = grd;
            var circle = {
                x : width / 2,    //圆心的x轴坐标值
                y : height / 2,    //圆心的y轴坐标值
                r : width / 2  - 20     //圆的半径
            };
            ctx.arc(circle.x, circle.y, circle.r, startDeg, endDeg, false);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle='#fff';
            var fontSize = '35px';//字体大小el.style.fontSize || 
            ctx.font= fontSize + " Microsoft yahei";
            var result ='高危占比'+ Math.round(currentShowValue) + '%';
            var resultTextObject = ctx.measureText(result);
            ctx.fillText(result,  circle.x - resultTextObject.width / 2, circle.y + fontSize.replace('px', '') / 1 + 66);
            ctx.stroke();

            var fromX = circle.x - Math.cos(circleDeg) * circle.r;
            var fromY = circle.y + Math.sin(circleDeg) * circle.r;
            ctx.beginPath();
            ctx.shadowBlur=30;
            ctx.shadowColor=endColor;
            ctx.arc(fromX, fromY, 10, 0, Math.PI * 2, false);
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(fromX, fromY, 5, 0, Math.PI * 2, false);
            ctx.fillStyle = endColor;
            ctx.fill();


            if(!isLast){
                circleDeg -= disDegArc;
                currentShowValue++;
                if(currentShowValue >= current){
                    currentShowValue = current;
                }
            }
        }

        this.setValue = function (value) {
            current = value;
            reset();
        };

        return this;
    }
})();

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());