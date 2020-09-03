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
            case "CubicDisarray":
                this.cubicDisarray(container, settings);
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
    ControlGenerator.prototype.cubicDisarray = function (container, settings) {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
        var _loop_2 = function (key) {
            if (key == "randomness") {
                var a = document.createElement("a");
                a.text = key;
                container.appendChild(a);
                var select = document.createElement("select");
                var min_randomness = 0.4;
                var max_randomness = 2;
                for (var index = min_randomness; index <= max_randomness; index += 0.2) {
                    index = Math.round(index * 10) / 10;
                    var opt = document.createElement("option");
                    opt.appendChild(document.createTextNode(index));
                    select.appendChild(opt);
                }
                var default_value = settings[key];
                for (var index = 0; index < select.options.length; index++) {
                    var opt = select.options[index];
                    if (default_value == select.options[index].text) {
                        opt.selected = true;
                    }
                }
                container.appendChild(select);
                var self_2 = this_2;
                select.addEventListener("change", function (e) {
                    var value = e.target.value;
                    self_2.presenter.setSelectedPatternSetting(key, value);
                }, false);
            }
            if (key == "compactness") {
                var a = document.createElement("a");
                a.text = key;
                container.appendChild(a);
                var select = document.createElement("select");
                var min_compactness = 6;
                var max_compactness = 20;
                for (var index = min_compactness; index <= max_compactness; index++) {
                    var opt = document.createElement("option");
                    opt.appendChild(document.createTextNode(index));
                    select.appendChild(opt);
                }
                var default_value = settings[key];
                for (var index = 0; index < select.options.length; index++) {
                    var opt = select.options[index];
                    if (default_value == select.options[index].text) {
                        opt.selected = true;
                    }
                }
                container.appendChild(select);
                var self_3 = this_2;
                select.addEventListener("change", function (e) {
                    var value = e.target.value;
                    self_3.presenter.setSelectedPatternSetting(key, value);
                }, false);
            }
        };
        var this_2 = this;
        for (var key in settings) {
            _loop_2(key);
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

},{"./presenter":6}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cross_1 = require("./patterns/cross");
var cubicDisarray_1 = require("./patterns/cubicDisarray");
var patternName = [
    "CubicDisarray",
    "Cross",
];
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
            CubicDisarray: new cubicDisarray_1.CubicDisarray(),
        };
    };
    PatternManager.prototype.draw = function (canvas) {
        this.patterns[this.selected].draw(canvas);
    };
    return PatternManager;
}());
exports.PatternManager = PatternManager;

},{"./patterns/cross":4,"./patterns/cubicDisarray":5}],4:[function(require,module,exports){
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
var CubicDisarray = (function () {
    function CubicDisarray() {
        this.name = "CubicDisarray";
        this.settings = {
            randomness: 0,
            compactness: 0,
        };
        this.settings["randomness"] = 1;
        this.settings["compactness"] = 12;
    }
    CubicDisarray.prototype.draw = function (canvas) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 480, 480);
        var size = 480;
        ctx.lineWidth = 2;
        var randomDisplacement = 15;
        var rotateMultiplier = 20;
        var offset = 10;
        var squareNumOneRow = this.settings["compactness"];
        squareNumOneRow = parseInt(squareNumOneRow) + 1;
        var squareSize = (size - 2 * offset) / squareNumOneRow;
        function drawRect(width, height) {
            ctx.beginPath();
            ctx.rect(-width / 2, -height / 2, width, height);
            ctx.stroke();
        }
        var xLimit = size - squareSize - offset;
        var yLimit = size - squareSize - offset;
        for (var x = squareSize; x <= xLimit; x += squareSize) {
            for (var y = squareSize; y <= yLimit; y += squareSize) {
                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                var rotateAmt = (((y / size) * Math.PI) / 180) *
                    plusOrMinus *
                    Math.random() *
                    this.settings["randomness"] *
                    rotateMultiplier;
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                var translateAmt = (y / size) *
                    plusOrMinus *
                    Math.random() *
                    this.settings["randomness"] *
                    randomDisplacement;
                ctx.save();
                ctx.translate(x + translateAmt + offset, y + offset);
                ctx.rotate(rotateAmt);
                drawRect(squareSize, squareSize);
                ctx.restore();
            }
        }
    };
    return CubicDisarray;
}());
exports.CubicDisarray = CubicDisarray;

},{}],6:[function(require,module,exports){
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

},{"./patternManager":3,"./view":7}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29udHJvbEdlbmVyYXRvci50cyIsInNyYy9tYWluLnRzIiwic3JjL3BhdHRlcm5NYW5hZ2VyLnRzIiwic3JjL3BhdHRlcm5zL2Nyb3NzLnRzIiwic3JjL3BhdHRlcm5zL2N1YmljRGlzYXJyYXkudHMiLCJzcmMvcHJlc2VudGVyLnRzIiwic3JjL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBO0lBR0UsMEJBQVksU0FBb0I7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVELCtDQUFvQixHQUFwQixVQUFxQixTQUFlO1FBQ2xDLElBQUksV0FBVyxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNsRSxJQUFJLFFBQVEsR0FHUixJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFFL0MsUUFBUSxXQUFXLEVBQUU7WUFDbkIsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNO1lBQ1IsS0FBSyxlQUFlO2dCQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDeEMsTUFBTTtZQUVSO2dCQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLHdDQUF3QyxDQUFDLENBQUM7Z0JBQ3BFLE1BQU07U0FDVDtJQUNILENBQUM7SUFDRCxnQ0FBSyxHQUFMLFVBQU0sU0FBZSxFQUFFLFFBQTZCO1FBRWxELE9BQU8sU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUMzQixTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1QztnQ0FFVSxHQUFHO1lBQ1osSUFBSSxHQUFHLElBQUksWUFBWSxFQUFFO2dCQUN2QixJ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QzNDLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xELEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7UUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFNO1lBQzlCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQztJQUVELGlDQUFrQixHQUFsQjtRQUNFLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixTQUFTLElBQUk7WUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQztJQUNILENBQUM7SUFFRCw2QkFBYyxHQUFkO1FBQ0UsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTdELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0gsV0FBQztBQUFELENBdkRBLEFBdURDLElBQUE7QUF2RFksb0JBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tIFwiLi9wcmVzZW50ZXJcIjtcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xHZW5lcmF0b3Ige1xuICBwcmVzZW50ZXI6IFByZXNlbnRlcjtcblxuICBjb25zdHJ1Y3RvcihwcmVzZW50ZXI6IFByZXNlbnRlcikge1xuICAgIHRoaXMucHJlc2VudGVyID0gcHJlc2VudGVyO1xuICB9XG5cbiAgdXBkYXRlU2V0dGluZ0NvbnRyb2woY29udGFpbmVyOiBOb2RlKSB7XG4gICAgbGV0IHBhdHRlcm5OYW1lOiBzdHJpbmcgPSB0aGlzLnByZXNlbnRlci5nZXRTZWxlY3RlZFBhdHRlcm5OYW1lKCk7XG4gICAgbGV0IHNldHRpbmdzOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICBhbnlcbiAgICA+ID0gdGhpcy5wcmVzZW50ZXIuZ2V0U2VsZWN0ZWRQYXR0ZXJuU2V0dGluZygpO1xuXG4gICAgc3dpdGNoIChwYXR0ZXJuTmFtZSkge1xuICAgICAgY2FzZSBcIkNyb3NzXCI6XG4gICAgICAgIHRoaXMuY3Jvc3MoY29udGFpbmVyLCBzZXR0aW5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkN1YmljRGlzYXJyYXlcIjpcbiAgICAgICAgdGhpcy5jdWJpY0Rpc2FycmF5KGNvbnRhaW5lciwgc2V0dGluZ3MpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2cocGF0dGVybk5hbWUgKyBcIidzIENvbnRyb2wgR2VuZXJhdGlvbiBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgY3Jvc3MoY29udGFpbmVyOiBOb2RlLCBzZXR0aW5nczogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgIC8vIENsZWFyIHRoZSBjb250YWluZXJcbiAgICB3aGlsZSAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChjb250YWluZXIubGFzdENoaWxkKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzZXR0aW5ncykge1xuICAgICAgaWYgKGtleSA9PSBcInJhbmRvbW5lc3NcIikge1xuICAgICAgICBsZXQgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICBhLnRleHQgPSBrZXk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhKTtcblxuICAgICAgICBsZXQgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICAgICAgbGV0IG1heF9yYW5kb21uZXNzID0gNDtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8PSBtYXhfcmFuZG9tbmVzczsgaW5kZXgrKykge1xuICAgICAgICAgIGxldCBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgIG9wdC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKChpbmRleCBhcyB1bmtub3duKSBhcyBzdHJpbmcpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVmYXVsdF92YWx1ZSA9IHNldHRpbmdzW2tleV07XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBjb25zdCBvcHQ6IEhUTUxPcHRpb25FbGVtZW50ID0gc2VsZWN0Lm9wdGlvbnNbaW5kZXhdO1xuICAgICAgICAgIGlmIChkZWZhdWx0X3ZhbHVlID09IGluZGV4KSB7XG4gICAgICAgICAgICBvcHQuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcblxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIFwiY2hhbmdlXCIsXG4gICAgICAgICAgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICBzZWxmLnByZXNlbnRlci5zZXRTZWxlY3RlZFBhdHRlcm5TZXR0aW5nKGtleSwgdmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY3ViaWNEaXNhcnJheShjb250YWluZXI6IE5vZGUsIHNldHRpbmdzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgLy8gQ2xlYXIgdGhlIGNvbnRhaW5lclxuICAgIHdoaWxlIChjb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5sYXN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHNldHRpbmdzKSB7XG4gICAgICBpZiAoa2V5ID09IFwicmFuZG9tbmVzc1wiKSB7XG4gICAgICAgIGxldCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGEudGV4dCA9IGtleTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGEpO1xuXG4gICAgICAgIGxldCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgICAgICBsZXQgbWluX3JhbmRvbW5lc3MgPSAwLjQ7XG4gICAgICAgIGxldCBtYXhfcmFuZG9tbmVzcyA9IDI7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGluZGV4ID0gbWluX3JhbmRvbW5lc3M7XG4gICAgICAgICAgaW5kZXggPD0gbWF4X3JhbmRvbW5lc3M7XG4gICAgICAgICAgaW5kZXggKz0gMC4yXG4gICAgICAgICkge1xuICAgICAgICAgIGluZGV4ID0gTWF0aC5yb3VuZChpbmRleCAqIDEwKSAvIDEwO1xuICAgICAgICAgIGxldCBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgIG9wdC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKChpbmRleCBhcyB1bmtub3duKSBhcyBzdHJpbmcpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVmYXVsdF92YWx1ZSA9IHNldHRpbmdzW2tleV07XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBjb25zdCBvcHQ6IEhUTUxPcHRpb25FbGVtZW50ID0gc2VsZWN0Lm9wdGlvbnNbaW5kZXhdO1xuICAgICAgICAgIGlmIChkZWZhdWx0X3ZhbHVlID09IHNlbGVjdC5vcHRpb25zW2luZGV4XS50ZXh0KSB7XG4gICAgICAgICAgICBvcHQuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcblxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIFwiY2hhbmdlXCIsXG4gICAgICAgICAgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICBzZWxmLnByZXNlbnRlci5zZXRTZWxlY3RlZFBhdHRlcm5TZXR0aW5nKGtleSwgdmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PSBcImNvbXBhY3RuZXNzXCIpIHtcbiAgICAgICAgbGV0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgYS50ZXh0ID0ga2V5O1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYSk7XG5cbiAgICAgICAgbGV0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgICAgIGxldCBtaW5fY29tcGFjdG5lc3MgPSA2O1xuICAgICAgICBsZXQgbWF4X2NvbXBhY3RuZXNzID0gMjA7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gbWluX2NvbXBhY3RuZXNzOyBpbmRleCA8PSBtYXhfY29tcGFjdG5lc3M7IGluZGV4KyspIHtcbiAgICAgICAgICBsZXQgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICBvcHQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgoaW5kZXggYXMgdW5rbm93bikgYXMgc3RyaW5nKVxuICAgICAgICAgICk7XG4gICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlZmF1bHRfdmFsdWUgPSBzZXR0aW5nc1trZXldO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgY29uc3Qgb3B0OiBIVE1MT3B0aW9uRWxlbWVudCA9IHNlbGVjdC5vcHRpb25zW2luZGV4XTtcbiAgICAgICAgICBpZiAoZGVmYXVsdF92YWx1ZSA9PSBzZWxlY3Qub3B0aW9uc1tpbmRleF0udGV4dCkge1xuICAgICAgICAgICAgb3B0LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdCk7XG5cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImNoYW5nZVwiLFxuICAgICAgICAgIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgc2VsZi5wcmVzZW50ZXIuc2V0U2VsZWN0ZWRQYXR0ZXJuU2V0dGluZyhrZXksIHZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tIFwiLi9wcmVzZW50ZXJcIjtcblxubGV0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIoKTsiLCJpbXBvcnQgeyBJUGF0dGVybiB9IGZyb20gXCIuL3BhdHRlcm5zL3BhdHRlcm4uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBDcm9zcyB9IGZyb20gXCIuL3BhdHRlcm5zL2Nyb3NzXCI7XG5pbXBvcnQgeyBDdWJpY0Rpc2FycmF5IH0gZnJvbSBcIi4vcGF0dGVybnMvY3ViaWNEaXNhcnJheVwiO1xuXG5jb25zdCBwYXR0ZXJuTmFtZSA9IFtcbiAgICBcIkN1YmljRGlzYXJyYXlcIixcbiAgICBcIkNyb3NzXCIsXG4gICAgLy8gcGxhY2Vob2xkZXJcbl0gYXMgY29uc3Q7XG5leHBvcnQgdHlwZSBQYXR0ZXJuTmFtZSA9IHR5cGVvZiBwYXR0ZXJuTmFtZVtudW1iZXJdO1xuXG5leHBvcnQgY2xhc3MgUGF0dGVybk1hbmFnZXIge1xuICAgIHBhdHRlcm5zOiBSZWNvcmQ8UGF0dGVybk5hbWUsIElQYXR0ZXJuPjtcbiAgICBwYXR0ZXJuTmFtZXM6IEFycmF5PHN0cmluZz47XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFBhdHRlcm5OYW1lO1xuICAgIHNldCBzZWxlY3RlZChzZWxlY3Rpb246IHN0cmluZykge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IDxQYXR0ZXJuTmFtZT5zZWxlY3Rpb247XG4gICAgfVxuICAgIGdldCBzZWxlY3RlZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuICAgIGdldCBzZWxlY3RlZFNldHRpbmcoKTogUmVjb3JkPHN0cmluZywgYW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdHRlcm5zW3RoaXMuc2VsZWN0ZWRdLnNldHRpbmdzO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRQYXR0ZXJucygpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gcGF0dGVybk5hbWVbMF07XG5cbiAgICAgICAgdGhpcy5wYXR0ZXJuTmFtZXMgPSAocGF0dGVybk5hbWUgYXMgYW55KSBhcyBBcnJheTxzdHJpbmc+O1xuICAgIH1cblxuICAgIGluaXRQYXR0ZXJucygpIHtcbiAgICAgICAgdGhpcy5wYXR0ZXJucyA9IHtcbiAgICAgICAgICAgIENyb3NzOiBuZXcgQ3Jvc3MoKSxcbiAgICAgICAgICAgIEN1YmljRGlzYXJyYXk6IG5ldyBDdWJpY0Rpc2FycmF5KCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZHJhdyhjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICAgIHRoaXMucGF0dGVybnNbdGhpcy5zZWxlY3RlZF0uZHJhdyhjYW52YXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IElQYXR0ZXJuIH0gZnJvbSBcIi4vcGF0dGVybi5pbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIENyb3NzIGltcGxlbWVudHMgSVBhdHRlcm4ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzZXR0aW5nczogUmVjb3JkPHN0cmluZywgYW55PjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBcIkNyb3NzXCI7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICByYW5kb21uZXNzOiAwLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2V0dGluZ3NbXCJyYW5kb21uZXNzXCJdID0gMztcbiAgICB9XG5cbiAgICBkcmF3KGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIDQ4MCwgNDgwKTtcblxuICAgICAgICBsZXQgd2lkdGggPSA1MDtcbiAgICAgICAgbGV0IGhlaWdodCA9IHdpZHRoO1xuXG4gICAgICAgIGxldCB4ID0gMTAwO1xuICAgICAgICBsZXQgeSA9IDEwMDtcbiAgICAgICAgLy8gdXBwZXIgbGVmdCB0byBsb3dlciByaWdodFxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMjQ7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCByYW5kT2ZmZXN0WCA9IHRoaXMuY2FsY09mZmVzdCh4KTtcbiAgICAgICAgICAgIGxldCByYW5kT2ZmZXN0WSA9IHRoaXMuY2FsY09mZmVzdCh5KTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHggKyByYW5kT2ZmZXN0WCwgeSArIHJhbmRPZmZlc3RZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHggKz0gMTA7XG4gICAgICAgICAgICB5ICs9IDEwO1xuICAgICAgICB9XG5cbiAgICAgICAgeCA9IDEwMDtcbiAgICAgICAgeSA9IDQ4MCAtIDE1MDtcbiAgICAgICAgLy8gbG93ZXIgbGVmdCB0byB1cHBlciByaWdodFxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMjQ7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCByYW5kT2ZmZXN0WCA9IHRoaXMuY2FsY09mZmVzdCh4KTtcbiAgICAgICAgICAgIGxldCByYW5kT2ZmZXN0WSA9IHRoaXMuY2FsY09mZmVzdCh5KTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHggKyByYW5kT2ZmZXN0WCwgeSArIHJhbmRPZmZlc3RZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHggKz0gMTA7XG4gICAgICAgICAgICB5IC09IDEwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsY09mZmVzdChjb29yZGluYXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGxldCBjZW50ZXJDYWxpYnJhdGlvbiA9IHRoaXMuY2VudGVyUHJlY2lzaW9uQ29lZmYoY29vcmRpbmF0aW9uKTtcbiAgICAgICAgbGV0IHJhbmRPZmZlc3QgPSA0MCAqIE1hdGgucmFuZG9tKCkgKiBjZW50ZXJDYWxpYnJhdGlvbjtcblxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xuICAgICAgICAgICAgcmFuZE9mZmVzdCAqPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByYW5kT2ZmZXN0O1xuICAgIH1cblxuICAgIGNlbnRlclByZWNpc2lvbkNvZWZmKGNvb3JkaW5hdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHdpZHRoID0gNTA7XG5cbiAgICAgICAgbGV0IGNlbnRlciA9IDQ4MCAvIDI7XG4gICAgICAgIGxldCBib3hDZW50ZXIgPSBjb29yZGluYXRpb24gKyB3aWR0aCAvIDI7XG4gICAgICAgIGxldCBtYXhPZmZzZXQgPSBjZW50ZXI7XG4gICAgICAgIGxldCBvZmZzZXQgPSBNYXRoLmFicyhib3hDZW50ZXIgLSBjZW50ZXIpO1xuXG4gICAgICAgIGxldCBjb2VmZiA9IChvZmZzZXQgLyBtYXhPZmZzZXQpICogdGhpcy5zZXR0aW5nc1tcInJhbmRvbW5lc3NcIl07XG4gICAgICAgIHJldHVybiBjb2VmZjtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJUGF0dGVybiB9IGZyb20gXCIuL3BhdHRlcm4uaW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBDdWJpY0Rpc2FycmF5IGltcGxlbWVudHMgSVBhdHRlcm4ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHNldHRpbmdzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubmFtZSA9IFwiQ3ViaWNEaXNhcnJheVwiO1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICByYW5kb21uZXNzOiAwLFxuICAgICAgY29tcGFjdG5lc3M6IDAsXG4gICAgfTtcblxuICAgIHRoaXMuc2V0dGluZ3NbXCJyYW5kb21uZXNzXCJdID0gMTtcbiAgICB0aGlzLnNldHRpbmdzW1wiY29tcGFjdG5lc3NcIl0gPSAxMjtcbiAgfVxuXG4gIGRyYXcoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgNDgwLCA0ODApO1xuXG4gICAgdmFyIHNpemUgPSA0ODA7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XG5cbiAgICB2YXIgcmFuZG9tRGlzcGxhY2VtZW50ID0gMTU7XG4gICAgdmFyIHJvdGF0ZU11bHRpcGxpZXIgPSAyMDtcbiAgICB2YXIgb2Zmc2V0ID0gMTA7XG4gICAgdmFyIHNxdWFyZU51bU9uZVJvdyA9IHRoaXMuc2V0dGluZ3NbXCJjb21wYWN0bmVzc1wiXTtcbiAgICBzcXVhcmVOdW1PbmVSb3cgPSBwYXJzZUludChzcXVhcmVOdW1PbmVSb3cpICsgMTtcbiAgICB2YXIgc3F1YXJlU2l6ZSA9IChzaXplIC0gMiAqIG9mZnNldCkgLyBzcXVhcmVOdW1PbmVSb3c7XG5cbiAgICBmdW5jdGlvbiBkcmF3UmVjdCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgucmVjdCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgbGV0IHhMaW1pdCA9IHNpemUgLSBzcXVhcmVTaXplIC0gb2Zmc2V0O1xuICAgIGxldCB5TGltaXQgPSBzaXplIC0gc3F1YXJlU2l6ZSAtIG9mZnNldDtcbiAgICBmb3IgKHZhciB4ID0gc3F1YXJlU2l6ZTsgeCA8PSB4TGltaXQ7IHggKz0gc3F1YXJlU2l6ZSkge1xuICAgICAgZm9yICh2YXIgeSA9IHNxdWFyZVNpemU7IHkgPD0geUxpbWl0OyB5ICs9IHNxdWFyZVNpemUpIHtcbiAgICAgICAgdmFyIHBsdXNPck1pbnVzID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IC0xIDogMTtcbiAgICAgICAgdmFyIHJvdGF0ZUFtdCA9XG4gICAgICAgICAgKCgoeSAvIHNpemUpICogTWF0aC5QSSkgLyAxODApICpcbiAgICAgICAgICBwbHVzT3JNaW51cyAqXG4gICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgdGhpcy5zZXR0aW5nc1tcInJhbmRvbW5lc3NcIl0gKlxuICAgICAgICAgIHJvdGF0ZU11bHRpcGxpZXI7XG5cbiAgICAgICAgcGx1c09yTWludXMgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gLTEgOiAxO1xuICAgICAgICB2YXIgdHJhbnNsYXRlQW10ID1cbiAgICAgICAgICAoeSAvIHNpemUpICpcbiAgICAgICAgICBwbHVzT3JNaW51cyAqXG4gICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgdGhpcy5zZXR0aW5nc1tcInJhbmRvbW5lc3NcIl0gKlxuICAgICAgICAgIHJhbmRvbURpc3BsYWNlbWVudDtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKHggKyB0cmFuc2xhdGVBbXQgKyBvZmZzZXQsIHkgKyBvZmZzZXQpO1xuICAgICAgICBjdHgucm90YXRlKHJvdGF0ZUFtdCk7XG4gICAgICAgIGRyYXdSZWN0KHNxdWFyZVNpemUsIHNxdWFyZVNpemUpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcbmltcG9ydCB7IFBhdHRlcm5NYW5hZ2VyIH0gZnJvbSBcIi4vcGF0dGVybk1hbmFnZXJcIjtcblxuZXhwb3J0IGNsYXNzIFByZXNlbnRlciB7XG4gIHZpZXc6IFZpZXc7XG4gIHBhdHRlcm5NYW5hZ2VyOiBQYXR0ZXJuTWFuYWdlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhdHRlcm5NYW5hZ2VyID0gbmV3IFBhdHRlcm5NYW5hZ2VyKCk7XG4gICAgdGhpcy52aWV3ID0gbmV3IFZpZXcodGhpcyk7XG4gIH1cblxuICBzZWxlY3RQYXR0ZXJuKHNlbGVjdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5wYXR0ZXJuTWFuYWdlci5zZWxlY3RlZCA9IHNlbGVjdGlvbjtcbiAgfVxuXG4gIGdldFBhdHRlcm5MaXN0KCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnBhdHRlcm5NYW5hZ2VyLnBhdHRlcm5OYW1lcztcbiAgfVxuXG4gIGdldFNlbGVjdGVkUGF0dGVybk5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYXR0ZXJuTWFuYWdlci5zZWxlY3RlZDtcbiAgfVxuXG4gIGdldFNlbGVjdGVkUGF0dGVyblNldHRpbmcoKTogUmVjb3JkPHN0cmluZywgYW55PiB7XG4gICAgcmV0dXJuIHRoaXMucGF0dGVybk1hbmFnZXIuc2VsZWN0ZWRTZXR0aW5nO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWRQYXR0ZXJuU2V0dGluZyhzZXR0aW5nTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5wYXR0ZXJuTWFuYWdlci5zZWxlY3RlZFNldHRpbmdbc2V0dGluZ05hbWVdID0gdmFsdWU7XG4gICAgLy8gVE9ETzogZXJyb3IgaGFuZGxpbmdcbiAgfVxuXG4gIGRyYXcoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIHRoaXMucGF0dGVybk1hbmFnZXIuZHJhdyhjYW52YXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQcmVzZW50ZXIgfSBmcm9tIFwiLi9wcmVzZW50ZXJcIjtcbmltcG9ydCB7IENvbnRyb2xHZW5lcmF0b3IgfSBmcm9tIFwiLi9jb250cm9sR2VuZXJhdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBWaWV3IHtcbiAgcHJlc2VudGVyOiBQcmVzZW50ZXI7XG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGNvbnRyb2xHZW5lcmF0b3I6IENvbnRyb2xHZW5lcmF0b3I7XG5cbiAgY29uc3RydWN0b3IocHJlc2VudGVyOiBQcmVzZW50ZXIpIHtcbiAgICB0aGlzLnByZXNlbnRlciA9IHByZXNlbnRlcjtcbiAgICB0aGlzLmNvbnRyb2xHZW5lcmF0b3IgPSBuZXcgQ29udHJvbEdlbmVyYXRvcih0aGlzLnByZXNlbnRlcik7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImNhbnZhc1wiKVswXTtcblxuICAgIGxldCBzaXplOiBudW1iZXIgPSA0ODA7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSBzaXplO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHNpemU7XG5cbiAgICB0aGlzLmluaXRpYWxQYXR0ZXJuU2VsZWN0aW9uKCk7XG4gICAgdGhpcy5ob29rRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnNldHRpbmdIYW5kbGVyKCk7XG4gIH1cblxuICBpbml0aWFsUGF0dGVyblNlbGVjdGlvbigpIHtcbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD4oXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRkbF9zZWxlY3RfcGF0dGVyblwiKVxuICAgICk7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBwYXR0ZXJuX3NlbGVjdGVkLCBmYWxzZSk7XG5cbiAgICBsZXQgcGF0dGVybl9saXN0ID0gdGhpcy5wcmVzZW50ZXIuZ2V0UGF0dGVybkxpc3QoKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGF0dGVybl9saXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgcGF0dGVybiA9IHBhdHRlcm5fbGlzdFtpbmRleF07XG4gICAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIG9wdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYXR0ZXJuKSk7XG4gICAgICBpbnB1dC5hcHBlbmRDaGlsZChvcHQpO1xuICAgIH1cblxuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICBmdW5jdGlvbiBwYXR0ZXJuX3NlbGVjdGVkKGU6IGFueSkge1xuICAgICAgbGV0IHBhdHRlcm4gPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgIHNlbGYucHJlc2VudGVyLnNlbGVjdFBhdHRlcm4ocGF0dGVybik7XG4gICAgICBzZWxmLnNldHRpbmdIYW5kbGVyKCk7XG4gICAgfVxuICB9XG5cbiAgaG9va0V2ZW50TGlzdGVuZXJzKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuX2dlbmVyYXRlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkcmF3KTtcblxuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICBmdW5jdGlvbiBkcmF3KCkge1xuICAgICAgc2VsZi5wcmVzZW50ZXIuZHJhdyhzZWxmLmNhbnZhcyk7XG4gICAgfVxuICB9XG5cbiAgc2V0dGluZ0hhbmRsZXIoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2V0dGluZ19jb250YWluZXJcIik7XG5cbiAgICB0aGlzLmNvbnRyb2xHZW5lcmF0b3IudXBkYXRlU2V0dGluZ0NvbnRyb2woY29udGFpbmVyKTtcbiAgfVxufVxuIl19
