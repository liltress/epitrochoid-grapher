//consts

const x0 = 400;
const y0 = 400;

//definitions
class Config {
    constructor(r1, r2, d) {
        this.r1 = r1;
        this.r2 = r2;
        this.d = d;
    }
}

class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class PointList {
    constructor(points, length) {
        this.points = [];
        this.len = 0;
    }
    push(point) {
        this.points.push(point);
        this.len++;
    }
    draw(context) { //draws points with a moving window
        for (let i = 0; i < this.len - 1; i++) {
            let p1 = this.points[i];
            let p2 = this.points[i+1];
            
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
        }
    }
    log() {
        console.log("points:");
        for (let i = 0; i < this.points.len; i++) {
            console.log(this.points[i]);
        }
        console.log("len: ", this.len);
    }
}

function ComputePoint(theta, conf) {
    //x(theta) = (R+r)cos(theta) - dcos(theta*(R+r/r))
    //y(theta) = (R+r)sin(theta) - dsin(theta*(R+r/r))
    let r1 = conf.r1;
    let r2 = conf.r2;
    let d = conf.d;
    return new Point(
        x0 + (r1+r2)*Math.cos(theta) - d*Math.cos(theta*((r1+r2)/r2)),
        y0 + (r1+r2)*Math.sin(theta) - d*Math.sin(theta*((r1+r2)/r2))
    )
}

function genPoints(num, step, config) {
    let points = [];
    let theta = 0.0
    for (let i = 0; i < num; i++) {
        console.log(points);
        currentPoint = ComputePoint(theta, config);
        points.push(...currentPoint);
        theta += step;
    }
    return new PointList(points,num)
}

//logic

//alert("For best viewing conditions fullscreen the browser with f11");

var Viewport = document.getElementById("MyViewport");

if (Viewport === null) {
    alert("could not fetch canvas ID !");
}

var ctx = Viewport.getContext("2d");

conf = new Config (50,0,0);
points = genPoints(5, 1.0, conf);
points.log();

points.draw(ctx);