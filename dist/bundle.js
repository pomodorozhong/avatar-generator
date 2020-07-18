(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./view");
var view = new view_1.View();

},{"./view":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View = (function () {
    function View() {
        this.canvas = document.getElementsByTagName("canvas")[0];
        var size = 480;
        this.canvas.width = size;
        this.canvas.height = size;
        this.hookEventListeners();
    }
    View.prototype.hookEventListeners = function () {
        document.getElementById("btn_generate").addEventListener("click", draw);
        var self = this;
        function draw() {
            var ctx = self.canvas.getContext("2d");
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 480, 480);
            var width = 50;
            var height = width;
            var x = 50;
            var y = 50;
            for (var index = 0; index < 34; index++) {
                ctx.strokeRect(x, y, width, height);
                x += 10;
                y += 10;
            }
            x = 50;
            y = 480 - 100;
            for (var index = 0; index < 34; index++) {
                ctx.strokeRect(x, y, width, height);
                x += 10;
                y -= 10;
            }
        }
    };
    return View;
}());
exports.View = View;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyIsInNyYy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSwrQkFBOEI7QUFFOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQzs7Ozs7QUNGdEI7SUFFSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpELElBQUksSUFBSSxHQUFXLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxpQ0FBa0IsR0FBbEI7UUFDSSxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV4RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsU0FBUyxJQUFJO1lBQ1QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkMsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUU3QixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFbkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRVgsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDckMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDUixDQUFDLElBQUksRUFBRSxDQUFDO2FBQ1g7WUFFRCxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1AsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFFZCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNyQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNSLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDWDtRQUNMLENBQUM7SUFDTCxDQUFDO0lBQ0wsV0FBQztBQUFELENBNUNBLEFBNENDLElBQUE7QUE1Q1ksb0JBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuXG5sZXQgdmlldyA9IG5ldyBWaWV3KCk7IiwiZXhwb3J0IGNsYXNzIFZpZXcge1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJjYW52YXNcIilbMF07XG5cbiAgICAgICAgbGV0IHNpemU6IG51bWJlciA9IDQ4MDtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSBzaXplO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBzaXplO1xuXG4gICAgICAgIHRoaXMuaG9va0V2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgaG9va0V2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bl9nZW5lcmF0ZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZHJhdyk7XG5cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBkcmF3KCkge1xuICAgICAgICAgICAgbGV0IGN0eCA9IHNlbGYuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCA0ODAsIDQ4MCk7XG5cbiAgICAgICAgICAgIGxldCB3aWR0aCA9IDUwO1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IHdpZHRoO1xuXG4gICAgICAgICAgICBsZXQgeCA9IDUwO1xuICAgICAgICAgICAgbGV0IHkgPSA1MDtcbiAgICAgICAgICAgIC8vIHVwcGVyIGxlZnQgdG8gbG93ZXIgcmlnaHRcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAzNDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIHggKz0gMTA7XG4gICAgICAgICAgICAgICAgeSArPSAxMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeCA9IDUwO1xuICAgICAgICAgICAgeSA9IDQ4MCAtIDEwMDtcbiAgICAgICAgICAgIC8vIHVwcGVyIGxlZnQgdG8gbG93ZXIgcmlnaHRcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAzNDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIHggKz0gMTA7XG4gICAgICAgICAgICAgICAgeSAtPSAxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
