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
        var self = this;
        draw();
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
    }
    return View;
}());
exports.View = View;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyIsInNyYy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSwrQkFBOEI7QUFFOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQzs7Ozs7QUNGdEI7SUFFSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpELElBQUksSUFBSSxHQUFXLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixJQUFJLEVBQUUsQ0FBQztRQUVQLFNBQVMsSUFBSTtZQUNULElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXZDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFN0IsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBRW5CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNYLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVYLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3JDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3BDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNYO1lBRUQsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNQLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRWQsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDckMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDUixDQUFDLElBQUksRUFBRSxDQUFDO2FBQ1g7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQXpDQSxBQXlDQyxJQUFBO0FBekNZLG9CQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcblxubGV0IHZpZXcgPSBuZXcgVmlldygpOyIsImV4cG9ydCBjbGFzcyBWaWV3IHtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY2FudmFzXCIpWzBdO1xuXG4gICAgICAgIGxldCBzaXplOiBudW1iZXIgPSA0ODA7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gc2l6ZTtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gc2l6ZTtcblxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgZHJhdygpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgICAgICAgICBsZXQgY3R4ID0gc2VsZi5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIDQ4MCwgNDgwKTtcblxuICAgICAgICAgICAgbGV0IHdpZHRoID0gNTA7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gd2lkdGg7XG5cbiAgICAgICAgICAgIGxldCB4ID0gNTA7XG4gICAgICAgICAgICBsZXQgeSA9IDUwO1xuICAgICAgICAgICAgLy8gdXBwZXIgbGVmdCB0byBsb3dlciByaWdodFxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDM0OyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgeCArPSAxMDtcbiAgICAgICAgICAgICAgICB5ICs9IDEwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB4ID0gNTA7XG4gICAgICAgICAgICB5ID0gNDgwIC0gMTAwO1xuICAgICAgICAgICAgLy8gdXBwZXIgbGVmdCB0byBsb3dlciByaWdodFxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDM0OyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgeCArPSAxMDtcbiAgICAgICAgICAgICAgICB5IC09IDEwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19
