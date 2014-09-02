(function () {

  'use strict';

  function createSpiralPath(sx, sy, maxRadius, segments) {
    var degreesPerSegment = 360 / segments;

    var spiralFunction1 = new LogarithmicSpiral(1, 1.15, degreesPerSegment);
    var spiralFunction2 = new LogarithmicSpiral(1.59, 1.15, degreesPerSegment);

    var points1 = [];
    var points2 = [];

    while (spiralFunction1.getRadius() <= maxRadius && spiralFunction2.getRadius() <= maxRadius) {
      points1.push(new RPoint(spiralFunction1.getX() + sx, spiralFunction1.getY() + sy, spiralFunction1.getRadius()));
      points2.push(new RPoint(spiralFunction2.getX() + sx, spiralFunction2.getY() + sy, spiralFunction2.getRadius()));

      spiralFunction1.advance();
      spiralFunction2.advance();
    }

    var prevPoint = null;
    var curPoint = points1[0];
    var d = "M" + curPoint.x + "," + curPoint.y;
    var radius;
    var i;

    for (i = 1; i < points1.length; i++) {
      prevPoint = curPoint;
      curPoint = points1[i];
      radius = (prevPoint.r + curPoint.r) / 2;
      d += "A" + radius + "," + radius + " 0 0,1 " + curPoint.x + "," + curPoint.y;
    }

    prevPoint = null;
    curPoint = points2[points2.length - 1];

    d += "L" + curPoint.x + "," + curPoint.y;

    for (i = points2.length - 1; --i >= 0;) {
      prevPoint = curPoint;
      curPoint = points2[i];
      radius = (prevPoint.r + curPoint.r) / 2;
      d += "A" + radius + "," + radius + " 0 0,0 " + curPoint.x + "," + curPoint.y;
    }

    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d + "z");
    return path;
  }


  function LogarithmicSpiral(a, b, increment) {
    this.init(a, b, increment);
  }

  LogarithmicSpiral.prototype = {

    init: function (a, b, increment) {
      this.a = a;
      this.b = b;
      this.increment = increment;

      this.r = 0;
      this.angle = 0;
      this.nextAngle = 0;
    },

    getAngle: function () {
      return this.angle;
    },

    setAngle: function (angle) {
      this.angle = angle;
      this.nextAngle = angle;
    },

    getAngleRadians: function () {
      return toRadians(this.angle);
    },

    getRadius: function () {
      return this.r;
    },

    getX: function () {
      return this.r * Math.cos(toRadians(this.angle));
    },

    getY: function () {
      return this.r * Math.sin(toRadians(this.angle));
    },

    advance: function () {
      this.angle = this.nextAngle;
      this.r = this.a * Math.pow(this.b, toRadians(this.angle));
      this.nextAngle = this.angle + this.increment;
    }
  };


  function RPoint(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }


  function toRadians(degrees) {
    return degrees * Math.PI / 180.0;
  }

  function toDegrees(radians) {
    return radians * 180.0 / Math.PI;
  }


  var path = createSpiralPath(90, 90, 400, 36);
  var group = document.getElementById('h-spiral-shape');
  group.appendChild(path);

}());
