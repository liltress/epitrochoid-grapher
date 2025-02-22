//consts

const make_logs = false;

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
  constructor(theta, conf) {
    //x(theta) = (R+r)cos(theta) - dcos(theta*(R+r/r))
    //y(theta) = (R+r)sin(theta) - dsin(theta*(R+r/r))
    let r1 = conf.r1;
    let r2 = conf.r2;
    let d = conf.d;
    if (make_logs) {
      console.log("from inside Point constructor");
      console.log("config values:", r1, r2, d);
      console.log("theta:", theta);
    }
    this.x =
      x0 + (r1 + r2) * Math.cos(theta) - d * Math.cos(theta * ((r1 + r2) / r2));
    this.y =
      y0 + (r1 + r2) * Math.sin(theta) - d * Math.sin(theta * ((r1 + r2) / r2));
    if (make_logs) {
      console.log("resulting values:", this.x, this.y);
    }
  }
}

class PointList {
  constructor() {
    this.point_list = [];
  }
  push(point) {
    this.points.push(point);
  }
  draw(context) {
    //draws points with a moving window
    context.beginPath();
    // Start a new Path
    for (let i = 0; i < this.point_list.length - 1; i++) {
      let p1 = this.point_list[i];
      let p2 = this.point_list[i + 1];
      console.log(p1, p2);

      context.moveTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.stroke();
    }
  }
  log() {
    console.log("points:");
    for (let i = 0; i < this.point_list.length; i++) {
      console.log(this.point_list[i]);
    }
  }
  genPoints(num, step, config) {
    //appends points to the pointlist
    let theta = 0.0;
    for (let i = 0; i < num; i++) {
      //console.log(this.point_list);
      this.point_list.push(new Point(theta, config));
      theta += step;
    }
  }
}

//logic

//alert("For best viewing conditions fullscreen the browser with f11");

var Viewport = document.getElementById("MyViewport");

if (Viewport === null) {
  alert("could not fetch canvas ID !");
}

var ctx = Viewport.getContext("2d");

conf = new Config(100, 61, 70);
let points = new PointList();
points.genPoints(5000, 0.1, conf);
points.draw(ctx);
