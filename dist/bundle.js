(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlGenerator = (function () {
    function ControlGenerator(presenter) {
        this.presenter = presenter;
    }
    ControlGenerator.prototype.updateSettingControl = function (container) {
        var patternName = this.presenter.getSelectedPatternName();
        var settings = this.presenter.getSelectedPatternSetting();
        switch (patternName) {
            case "Cross":
                this.cross(container, settings);
                break;
            default:
                console.log(patternName + "'s Control Generation not implemented.");
                break;
        }
    };
    ControlGenerator.prototype.cross = function (container, settings) {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
        var _loop_1 = function (key) {
            if (key == "randomness") {
                var a = document.createElement("a");
                a.text = key;
                container.appendChild(a);
                var select = document.createElement("select");
                var max_randomness = 4;
                for (var index = 0; index <= max_randomness; index++) {
                    var opt = document.createElement("option");
                    opt.appendChild(document.createTextNode(index));
                    select.appendChild(opt);
                }
                var default_value = settings[key];
                for (var index = 0; index < select.options.length; index++) {
                    var opt = select.options[index];
                    if (default_value == index) {
                        opt.selected = true;
                    }
                }
                container.appendChild(select);
                var self_1 = this_1;
                select.addEventListener("change", function (e) {
                    var value = e.target.value;
                    self_1.presenter.setSelectedPatternSetting(key, value);
                }, false);
            }
        };
        var this_1 = this;
        for (var key in settings) {
            _loop_1(key);
        }
    };
    return ControlGenerator;
}());
exports.ControlGenerator = ControlGenerator;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presenter_1 = require("./presenter");
var presenter = new presenter_1.Presenter();

},{"./presenter":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cross_1 = require("./patterns/cross");
var patternName = ["Cross"];
var PatternManager = (function () {
    function PatternManager() {
        this.initPatterns();
        this.selected = patternName[0];
        this.patternNames = patternName;
    }
    Object.defineProperty(PatternManager.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (selection) {
            this._selected = selection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatternManager.prototype, "selectedSetting", {
        get: function () {
            return this.patterns[this.selected].settings;
        },
        enumerable: true,
        configurable: true
    });
    PatternManager.prototype.initPatterns = function () {
        this.patterns = {
            Cross: new cross_1.Cross(),
        };
    };
    PatternManager.prototype.draw = function (canvas) {
        this.patterns[this.selected].draw(canvas);
    };
    return PatternManager;
}());
exports.PatternManager = PatternManager;

},{"./patterns/cross":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cross = (function () {
    function Cross() {
        this.name = "Cross";
        this.settings = {
            randomness: 0,
        };
        this.settings["randomness"] = 3;
    }
    Cross.prototype.draw = function (canvas) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 480, 480);
        var width = 50;
        var height = width;
        var x = 100;
        var y = 100;
        for (var index = 0; index < 24; index++) {
            var randOffestX = this.calcOffest(x);
            var randOffestY = this.calcOffest(y);
            ctx.strokeRect(x + randOffestX, y + randOffestY, width, height);
            x += 10;
            y += 10;
        }
        x = 100;
        y = 480 - 150;
        for (var index = 0; index < 24; index++) {
            var randOffestX = this.calcOffest(x);
            var randOffestY = this.calcOffest(y);
            ctx.strokeRect(x + randOffestX, y + randOffestY, width, height);
            x += 10;
            y -= 10;
        }
    };
    Cross.prototype.calcOffest = function (coordination) {
        var centerCalibration = this.centerPrecisionCoeff(coordination);
        var randOffest = 40 * Math.random() * centerCalibration;
        if (Math.random() < 0.5) {
            randOffest *= -1;
        }
        return randOffest;
    };
    Cross.prototype.centerPrecisionCoeff = function (coordination) {
        var width = 50;
        var center = 480 / 2;
        var boxCenter = coordination + width / 2;
        var maxOffset = center;
        var offset = Math.abs(boxCenter - center);
        var coeff = (offset / maxOffset) * this.settings["randomness"];
        return coeff;
    };
    return Cross;
}());
exports.Cross = Cross;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./view");
var patternManager_1 = require("./patternManager");
var Presenter = (function () {
    function Presenter() {
        this.patternManager = new patternManager_1.PatternManager();
        this.view = new view_1.View(this);
    }
    Presenter.prototype.selectPattern = function (selection) {
        this.patternManager.selected = selection;
    };
    Presenter.prototype.getPatternList = function () {
        return this.patternManager.patternNames;
    };
    Presenter.prototype.getSelectedPatternName = function () {
        return this.patternManager.selected;
    };
    Presenter.prototype.getSelectedPatternSetting = function () {
        return this.patternManager.selectedSetting;
    };
    Presenter.prototype.setSelectedPatternSetting = function (settingName, value) {
        this.patternManager.selectedSetting[settingName] = value;
    };
    Presenter.prototype.draw = function (canvas) {
        this.patternManager.draw(canvas);
    };
    return Presenter;
}());
exports.Presenter = Presenter;

},{"./patternManager":3,"./view":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controlGenerator_1 = require("./controlGenerator");
var View = (function () {
    function View(presenter) {
        this.presenter = presenter;
        this.controlGenerator = new controlGenerator_1.ControlGenerator(this.presenter);
        this.canvas = document.getElementsByTagName("canvas")[0];
        var size = 480;
        this.canvas.width = size;
        this.canvas.height = size;
        this.initialPatternSelection();
        this.hookEventListeners();
        this.settingHandler();
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
            self.presenter.selectPattern(pattern);
            self.settingHandler();
        }
    };
    View.prototype.hookEventListeners = function () {
        document.getElementById("btn_generate").addEventListener("click", draw);
        var self = this;
        function draw() {
            self.presenter.draw(self.canvas);
        }
    };
    View.prototype.settingHandler = function () {
        var container = document.getElementById("setting_container");
        this.controlGenerator.updateSettingControl(container);
    };
    return View;
}());
exports.View = View;

},{"./controlGenerator":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29udHJvbEdlbmVyYXRvci50cyIsInNyYy9tYWluLnRzIiwic3JjL3BhdHRlcm5NYW5hZ2VyLnRzIiwic3JjL3BhdHRlcm5zL2Nyb3NzLnRzIiwic3JjL3ByZXNlbnRlci50cyIsInNyYy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTtJQUdFLDBCQUFZLFNBQW9CO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRCwrQ0FBb0IsR0FBcEIsVUFBcUIsU0FBZTtRQUNsQyxJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbEUsSUFBSSxRQUFRLEdBR1IsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBRS9DLFFBQVEsV0FBVyxFQUFFO1lBQ25CLEtBQUssT0FBTztnQkFDVixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtZQUVSO2dCQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLHdDQUF3QyxDQUFDLENBQUM7Z0JBQ3BFLE1BQU07U0FDVDtJQUNILENBQUM7SUFDRCxnQ0FBSyxHQUFMLFVBQU0sU0FBZSxFQUFFLFFBQTZCO1FBRWxELE9BQU8sU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUMzQixTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1QztnQ0FFVSxHQUFHO1lBQ1osSUFBSSxHQUFHLElBQUksWUFBWSxFQUFFO2dCQUN2QixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDYixTQUFTLENBQUMsV0FBVyxDQUFD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N0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFDO0lBRUQsaUNBQWtCLEdBQWxCO1FBQ0UsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFeEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFNBQVMsSUFBSTtZQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUVELDZCQUFjLEdBQWQ7UUFDRSxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDSCxXQUFDO0FBQUQsQ0F2REEsQUF1REMsSUFBQTtBQXZEWSxvQkFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gXCIuL3ByZXNlbnRlclwiO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbEdlbmVyYXRvciB7XG4gIHByZXNlbnRlcjogUHJlc2VudGVyO1xuXG4gIGNvbnN0cnVjdG9yKHByZXNlbnRlcjogUHJlc2VudGVyKSB7XG4gICAgdGhpcy5wcmVzZW50ZXIgPSBwcmVzZW50ZXI7XG4gIH1cblxuICB1cGRhdGVTZXR0aW5nQ29udHJvbChjb250YWluZXI6IE5vZGUpIHtcbiAgICBsZXQgcGF0dGVybk5hbWU6IHN0cmluZyA9IHRoaXMucHJlc2VudGVyLmdldFNlbGVjdGVkUGF0dGVybk5hbWUoKTtcbiAgICBsZXQgc2V0dGluZ3M6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIGFueVxuICAgID4gPSB0aGlzLnByZXNlbnRlci5nZXRTZWxlY3RlZFBhdHRlcm5TZXR0aW5nKCk7XG5cbiAgICBzd2l0Y2ggKHBhdHRlcm5OYW1lKSB7XG4gICAgICBjYXNlIFwiQ3Jvc3NcIjpcbiAgICAgICAgdGhpcy5jcm9zcyhjb250YWluZXIsIHNldHRpbmdzKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKHBhdHRlcm5OYW1lICsgXCIncyBDb250cm9sIEdlbmVyYXRpb24gbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGNyb3NzKGNvbnRhaW5lcjogTm9kZSwgc2V0dGluZ3M6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcbiAgICAvLyBDbGVhciB0aGUgY29udGFpbmVyXG4gICAgd2hpbGUgKGNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoY29udGFpbmVyLmxhc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2V0dGluZ3MpIHtcbiAgICAgIGlmIChrZXkgPT0gXCJyYW5kb21uZXNzXCIpIHtcbiAgICAgICAgbGV0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgYS50ZXh0ID0ga2V5O1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYSk7XG5cbiAgICAgICAgbGV0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgICAgIGxldCBtYXhfcmFuZG9tbmVzcyA9IDQ7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPD0gbWF4X3JhbmRvbW5lc3M7IGluZGV4KyspIHtcbiAgICAgICAgICBsZXQgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICBvcHQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgoaW5kZXggYXMgdW5rbm93bikgYXMgc3RyaW5nKVxuICAgICAgICAgICk7XG4gICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlZmF1bHRfdmFsdWUgPSBzZXR0aW5nc1trZXldO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgY29uc3Qgb3B0OiBIVE1MT3B0aW9uRWxlbWVudCA9IHNlbGVjdC5vcHRpb25zW2luZGV4XTtcbiAgICAgICAgICBpZiAoZGVmYXVsdF92YWx1ZSA9PSBpbmRleCkge1xuICAgICAgICAgICAgb3B0LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdCk7XG5cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImNoYW5nZVwiLFxuICAgICAgICAgIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgc2VsZi5wcmVzZW50ZXIuc2V0U2VsZWN0ZWRQYXR0ZXJuU2V0dGluZyhrZXksIHZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tIFwiLi9wcmVzZW50ZXJcIjtcblxubGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIoKTsiLCJpbXBvcnQgeyBJUGF0dGVybiB9IGZyb20gXCIuL3BhdHRlcm5zL3BhdHRlcm4uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBDcm9zcyB9IGZyb20gXCIuL3BhdHRlcm5zL2Nyb3NzXCI7XG5cbmNvbnN0IHBhdHRlcm5OYW1lID0gW1wiQ3Jvc3NcIl0gYXMgY29uc3Q7XG5leHBvcnQgdHlwZSBQYXR0ZXJuTmFtZSA9IHR5cGVvZiBwYXR0ZXJuTmFtZVtudW1iZXJdO1xuXG5leHBvcnQgY2xhc3MgUGF0dGVybk1hbmFnZXIge1xuICAgIHBhdHRlcm5zOiBSZWNvcmQ8UGF0dGVybk5hbWUsIElQYXR0ZXJuPjtcbiAgICBwYXR0ZXJuTmFtZXM6IEFycmF5PHN0cmluZz47XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFBhdHRlcm5OYW1lO1xuICAgIHNldCBzZWxlY3RlZChzZWxlY3Rpb246IHN0cmluZykge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IDxQYXR0ZXJuTmFtZT5zZWxlY3Rpb247XG4gICAgfVxuICAgIGdldCBzZWxlY3RlZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuICAgIGdldCBzZWxlY3RlZFNldHRpbmcoKTogUmVjb3JkPHN0cmluZywgYW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHRlcm5zW3RoaXMuc2VsZWN0ZWRdLnNldHRpbmdzO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRQYXR0ZXJucygpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gcGF0dGVybk5hbWVbMF07XG5cbiAgICAgICAgdGhpcy5wYXR0ZXJuTmFtZXMgPSAocGF0dGVybk5hbWUgYXMgYW55KSBhcyBBcnJheTxzdHJpbmc+O1xuICAgIH1cblxuICAgIGluaXRQYXR0ZXJucygpIHtcbiAgICAgICAgdGhpcy5wYXR0ZXJucyA9IHtcbiAgICAgICAgICAgIENyb3NzOiBuZXcgQ3Jvc3MoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkcmF3KGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wYXR0ZXJuc1t0aGlzLnNlbGVjdGVkXS5kcmF3KGNhbnZhcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSVBhdHRlcm4gfSBmcm9tIFwiLi9wYXR0ZXJuLmludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgQ3Jvc3MgaW1wbGVtZW50cyBJUGF0dGVybiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHNldHRpbmdzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiQ3Jvc3NcIjtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgICAgICAgIHJhbmRvbW5lc3M6IDAsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXR0aW5nc1tcInJhbmRvbW5lc3NcIl0gPSAzO1xuICAgIH1cblxuICAgIGRyYXcoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgNDgwLCA0ODApO1xuXG4gICAgICAgIGxldCB3aWR0aCA9IDUwO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gd2lkdGg7XG5cbiAgICAgICAgbGV0IHggPSAxMDA7XG4gICAgICAgIGxldCB5ID0gMTAwO1xuICAgICAgICAvLyB1cHBlciBsZWZ0IHRvIGxvd2VyIHJpZ2h0XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAyNDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IHJhbmRPZmZlc3RYID0gdGhpcy5jYWxjT2ZmZXN0KHgpO1xuICAgICAgICAgICAgbGV0IHJhbmRPZmZlc3RZID0gdGhpcy5jYWxjT2ZmZXN0KHkpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeCArIHJhbmRPZmZlc3RYLCB5ICsgcmFuZE9mZmVzdFksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgeCArPSAxMDtcbiAgICAgICAgICAgIHkgKz0gMTA7XG4gICAgICAgIH1cblxuICAgICAgICB4ID0gMTAwO1xuICAgICAgICB5ID0gNDgwIC0gMTUwO1xuICAgICAgICAvLyBsb3dlciBsZWZ0IHRvIHVwcGVyIHJpZ2h0XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAyNDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IHJhbmRPZmZlc3RYID0gdGhpcy5jYWxjT2ZmZXN0KHgpO1xuICAgICAgICAgICAgbGV0IHJhbmRPZmZlc3RZID0gdGhpcy5jYWxjT2ZmZXN0KHkpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeCArIHJhbmRPZmZlc3RYLCB5ICsgcmFuZE9mZmVzdFksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgeCArPSAxMDtcbiAgICAgICAgICAgIHkgLT0gMTA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjT2ZmZXN0KGNvb3JkaW5hdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGNlbnRlckNhbGlicmF0aW9uID0gdGhpcy5jZW50ZXJQcmVjaXNpb25Db2VmZihjb29yZGluYXRpb24pO1xuICAgICAgICBsZXQgcmFuZE9mZmVzdCA9IDQwICogTWF0aC5yYW5kb20oKSAqIGNlbnRlckNhbGlicmF0aW9uO1xuXG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XG4gICAgICAgICAgICByYW5kT2ZmZXN0ICo9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhbmRPZmZlc3Q7XG4gICAgfVxuXG4gICAgY2VudGVyUHJlY2lzaW9uQ29lZmYoY29vcmRpbmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBsZXQgd2lkdGggPSA1MDtcblxuICAgICAgICBsZXQgY2VudGVyID0gNDgwIC8gMjtcbiAgICAgICAgbGV0IGJveENlbnRlciA9IGNvb3JkaW5hdGlvbiArIHdpZHRoIC8gMjtcbiAgICAgICAgbGV0IG1heE9mZnNldCA9IGNlbnRlcjtcbiAgICAgICAgbGV0IG9mZnNldCA9IE1hdGguYWJzKGJveENlbnRlciAtIGNlbnRlcik7XG5cbiAgICAgICAgbGV0IGNvZWZmID0gKG9mZnNldCAvIG1heE9mZnNldCkgKiB0aGlzLnNldHRpbmdzW1wicmFuZG9tbmVzc1wiXTtcbiAgICAgICAgcmV0dXJuIGNvZWZmO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XG5pbXBvcnQgeyBQYXR0ZXJuTWFuYWdlciB9IGZyb20gXCIuL3BhdHRlcm5NYW5hZ2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBQcmVzZW50ZXIge1xuICB2aWV3OiBWaWV3O1xuICBwYXR0ZXJuTWFuYWdlcjogUGF0dGVybk1hbmFnZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wYXR0ZXJuTWFuYWdlciA9IG5ldyBQYXR0ZXJuTWFuYWdlcigpO1xuICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KHRoaXMpO1xuICB9XG5cbiAgc2VsZWN0UGF0dGVybihzZWxlY3Rpb246IHN0cmluZykge1xuICAgIHRoaXMucGF0dGVybk1hbmFnZXIuc2VsZWN0ZWQgPSBzZWxlY3Rpb247XG4gIH1cblxuICBnZXRQYXR0ZXJuTGlzdCgpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5wYXR0ZXJuTWFuYWdlci5wYXR0ZXJuTmFtZXM7XG4gIH1cblxuICBnZXRTZWxlY3RlZFBhdHRlcm5OYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGF0dGVybk1hbmFnZXIuc2VsZWN0ZWQ7XG4gIH1cblxuICBnZXRTZWxlY3RlZFBhdHRlcm5TZXR0aW5nKCk6IFJlY29yZDxzdHJpbmcsIGFueT4ge1xuICAgIHJldHVybiB0aGlzLnBhdHRlcm5NYW5hZ2VyLnNlbGVjdGVkU2V0dGluZztcbiAgfVxuXG4gIHNldFNlbGVjdGVkUGF0dGVyblNldHRpbmcoc2V0dGluZ05hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMucGF0dGVybk1hbmFnZXIuc2VsZWN0ZWRTZXR0aW5nW3NldHRpbmdOYW1lXSA9IHZhbHVlO1xuICAgIC8vIFRPRE86IGVycm9yIGhhbmRsaW5nXG4gIH1cblxuICBkcmF3KGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLnBhdHRlcm5NYW5hZ2VyLmRyYXcoY2FudmFzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSBcIi4vcHJlc2VudGVyXCI7XG5pbXBvcnQgeyBDb250cm9sR2VuZXJhdG9yIH0gZnJvbSBcIi4vY29udHJvbEdlbmVyYXRvclwiO1xuXG5leHBvcnQgY2xhc3MgVmlldyB7XG4gIHByZXNlbnRlcjogUHJlc2VudGVyO1xuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBjb250cm9sR2VuZXJhdG9yOiBDb250cm9sR2VuZXJhdG9yO1xuXG4gIGNvbnN0cnVjdG9yKHByZXNlbnRlcjogUHJlc2VudGVyKSB7XG4gICAgdGhpcy5wcmVzZW50ZXIgPSBwcmVzZW50ZXI7XG4gICAgdGhpcy5jb250cm9sR2VuZXJhdG9yID0gbmV3IENvbnRyb2xHZW5lcmF0b3IodGhpcy5wcmVzZW50ZXIpO1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJjYW52YXNcIilbMF07XG5cbiAgICBsZXQgc2l6ZTogbnVtYmVyID0gNDgwO1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gc2l6ZTtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBzaXplO1xuXG4gICAgdGhpcy5pbml0aWFsUGF0dGVyblNlbGVjdGlvbigpO1xuICAgIHRoaXMuaG9va0V2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5zZXR0aW5nSGFuZGxlcigpO1xuICB9XG5cbiAgaW5pdGlhbFBhdHRlcm5TZWxlY3Rpb24oKSB7XG4gICAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZGxfc2VsZWN0X3BhdHRlcm5cIilcbiAgICApO1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgcGF0dGVybl9zZWxlY3RlZCwgZmFsc2UpO1xuXG4gICAgbGV0IHBhdHRlcm5fbGlzdCA9IHRoaXMucHJlc2VudGVyLmdldFBhdHRlcm5MaXN0KCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHBhdHRlcm5fbGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IHBhdHRlcm4gPSBwYXR0ZXJuX2xpc3RbaW5kZXhdO1xuICAgICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICBvcHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGF0dGVybikpO1xuICAgICAgaW5wdXQuYXBwZW5kQ2hpbGQob3B0KTtcbiAgICB9XG5cbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gcGF0dGVybl9zZWxlY3RlZChlOiBhbnkpIHtcbiAgICAgIGxldCBwYXR0ZXJuID0gZS50YXJnZXQudmFsdWU7XG4gICAgICBzZWxmLnByZXNlbnRlci5zZWxlY3RQYXR0ZXJuKHBhdHRlcm4pO1xuICAgICAgc2VsZi5zZXR0aW5nSGFuZGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIGhvb2tFdmVudExpc3RlbmVycygpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bl9nZW5lcmF0ZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZHJhdyk7XG5cbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gZHJhdygpIHtcbiAgICAgIHNlbGYucHJlc2VudGVyLmRyYXcoc2VsZi5jYW52YXMpO1xuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdIYW5kbGVyKCkge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNldHRpbmdfY29udGFpbmVyXCIpO1xuXG4gICAgdGhpcy5jb250cm9sR2VuZXJhdG9yLnVwZGF0ZVNldHRpbmdDb250cm9sKGNvbnRhaW5lcik7XG4gIH1cbn1cbiJdfQ==
