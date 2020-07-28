(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presenter_1 = require("./presenter");
var presenter = new presenter_1.Presenter();

},{"./presenter":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./view");
var Presenter = (function () {
    function Presenter() {
        this.view = new view_1.View(this);
    }
    Presenter.prototype.getPatternList = function () {
        var list = ["Cross", "Cross'"];
        return list;
    };
    Presenter.prototype.getPatternSetting = function (pattern) {
        console.log(pattern + " pattern's setting not implemented");
    };
    Presenter.prototype.draw = function (canvas) {
        var ctx = canvas.getContext("2d");
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
    };
    return Presenter;
}());
exports.Presenter = Presenter;

},{"./view":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View = (function () {
    function View(presenter) {
        this.presenter = presenter;
        this.canvas = document.getElementsByTagName("canvas")[0];
        var size = 480;
        this.canvas.width = size;
        this.canvas.height = size;
        this.initialPatternSelection();
        this.hookEventListeners();
    }
    View.prototype.initialPatternSelection = function () {
        var input = (document.getElementById("ddl_select_pattern"));
        input.addEventListener("change", pattern_selected, false);
        var pattern_list = this.presenter.getPatternList();
        for (var index = 0; index < pattern_list.length; index++) {
            var pattern = pattern_list[index];
            var opt = document.createElement("option");
            opt.appendChild(document.createTextNode(pattern));
            input.appendChild(opt);
        }
        var self = this;
        function pattern_selected(e) {
            var pattern = e.target.value;
            var setting = self.presenter.getPatternSetting(pattern);
            self.settingHandler(setting);
        }
    };
    View.prototype.hookEventListeners = function () {
        document.getElementById("btn_generate").addEventListener("click", draw);
        var self = this;
        function draw() {
            self.presenter.draw(self.canvas);
        }
    };
    View.prototype.settingHandler = function (setting) {
        console.log("settingHandler()  not implemented");
    };
    return View;
}());
exports.View = View;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyIsInNyYy9wcmVzZW50ZXIudHMiLCJzcmMvdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEseUNBQXdDO0FBRXhDLElBQUksU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDOzs7OztBQ0ZoQywrQkFBOEI7QUFFOUI7SUFHSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGtDQUFjLEdBQWQ7UUFDSSxJQUFJLElBQUksR0FBa0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELHFDQUFpQixHQUFqQixVQUFrQixPQUFlO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLG9DQUFvQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUNELHdCQUFJLEdBQUosVUFBSyxNQUF5QjtRQUMxQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFN0IsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVYLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDckMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNYO1FBRUQsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNQLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWQsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNyQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDUixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ1g7SUFDTCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQXpDQSxBQXlDQyxJQUFBO0FBekNZLDhCQUFTOzs7OztBQ0F0QjtJQUdJLGNBQVksU0FBb0I7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekQsSUFBSSxJQUFJLEdBQVcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFMUIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELHNDQUF1QixHQUF2QjtRQUNJLElBQUksS0FBSyxHQUF1QyxDQUM1QyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQ2hELENBQUM7UUFDRixLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTFELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkQsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdEQsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixTQUFTLGdCQUFnQixDQUFDLENBQU07WUFDNUIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDN0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUNBQWtCLEdBQWxCO1FBQ0ksUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFeEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFNBQVMsSUFBSTtZQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDZCQUFjLEdBQWQsVUFBZSxPQUFPO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUdyRCxDQUFDO0lBQ0wsV0FBQztBQUFELENBbkRBLEFBbURDLElBQUE7QUFuRFksb0JBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tIFwiLi9wcmVzZW50ZXJcIjtcblxubGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIoKTsiLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgUHJlc2VudGVyIHtcbiAgICB2aWV3OiBWaWV3O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KHRoaXMpO1xuICAgIH1cblxuICAgIGdldFBhdHRlcm5MaXN0KCk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICBsZXQgbGlzdDogQXJyYXk8c3RyaW5nPiA9IFtcIkNyb3NzXCIsIFwiQ3Jvc3MnXCJdO1xuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gICAgZ2V0UGF0dGVyblNldHRpbmcocGF0dGVybjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhdHRlcm4gKyBcIiBwYXR0ZXJuJ3Mgc2V0dGluZyBub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuICAgIGRyYXcoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgNDgwLCA0ODApO1xuXG4gICAgICAgIGxldCB3aWR0aCA9IDUwO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gd2lkdGg7XG5cbiAgICAgICAgbGV0IHggPSA1MDtcbiAgICAgICAgbGV0IHkgPSA1MDtcbiAgICAgICAgLy8gdXBwZXIgbGVmdCB0byBsb3dlciByaWdodFxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMzQ7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgeCArPSAxMDtcbiAgICAgICAgICAgIHkgKz0gMTA7XG4gICAgICAgIH1cblxuICAgICAgICB4ID0gNTA7XG4gICAgICAgIHkgPSA0ODAgLSAxMDA7XG4gICAgICAgIC8vIHVwcGVyIGxlZnQgdG8gbG93ZXIgcmlnaHRcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDM0OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHggKz0gMTA7XG4gICAgICAgICAgICB5IC09IDEwO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSBcIi4vcHJlc2VudGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBWaWV3IHtcbiAgICBwcmVzZW50ZXI6IFByZXNlbnRlcjtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNvbnN0cnVjdG9yKHByZXNlbnRlcjogUHJlc2VudGVyKSB7XG4gICAgICAgIHRoaXMucHJlc2VudGVyID0gcHJlc2VudGVyO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY2FudmFzXCIpWzBdO1xuXG4gICAgICAgIGxldCBzaXplOiBudW1iZXIgPSA0ODA7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gc2l6ZTtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gc2l6ZTtcblxuICAgICAgICB0aGlzLmluaXRpYWxQYXR0ZXJuU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuaG9va0V2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbFBhdHRlcm5TZWxlY3Rpb24oKSB7XG4gICAgICAgIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGRsX3NlbGVjdF9wYXR0ZXJuXCIpXG4gICAgICAgICk7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgcGF0dGVybl9zZWxlY3RlZCwgZmFsc2UpO1xuXG4gICAgICAgIGxldCBwYXR0ZXJuX2xpc3QgPSB0aGlzLnByZXNlbnRlci5nZXRQYXR0ZXJuTGlzdCgpO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGF0dGVybl9saXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgcGF0dGVybiA9IHBhdHRlcm5fbGlzdFtpbmRleF07XG4gICAgICAgICAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYXR0ZXJuKSk7XG4gICAgICAgICAgICBpbnB1dC5hcHBlbmRDaGlsZChvcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBwYXR0ZXJuX3NlbGVjdGVkKGU6IGFueSkge1xuICAgICAgICAgICAgbGV0IHBhdHRlcm4gPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIGxldCBzZXR0aW5nID0gc2VsZi5wcmVzZW50ZXIuZ2V0UGF0dGVyblNldHRpbmcocGF0dGVybik7XG4gICAgICAgICAgICBzZWxmLnNldHRpbmdIYW5kbGVyKHNldHRpbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaG9va0V2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bl9nZW5lcmF0ZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZHJhdyk7XG5cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBkcmF3KCkge1xuICAgICAgICAgICAgc2VsZi5wcmVzZW50ZXIuZHJhdyhzZWxmLmNhbnZhcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXR0aW5nSGFuZGxlcihzZXR0aW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZ0hhbmRsZXIoKSAgbm90IGltcGxlbWVudGVkXCIpO1xuXG4gICAgICAgIC8vIFRPRE86IHVzaW5nIHNldHRpbmcgdG8gZ2VuZXJhdGUgYWxsIGtpbmRzIG9mIGlucHV0IGVsZW1lbnRcbiAgICB9XG59XG4iXX0=
