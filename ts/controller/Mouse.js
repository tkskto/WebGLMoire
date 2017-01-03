var controller;
(function (controller) {
    var Mouse = (function () {
        function Mouse(_model, _canvas) {
            var _this = this;
            this._model = _model;
            this._canvas = _canvas;
            this.setEvent = function () {
                _this._canvas.addEventListener('mousedown', _this.onMouseDown);
            };
            this.init();
        }
        Mouse.prototype.init = function () {
        };
        return Mouse;
    }());
    controller.Mouse = Mouse;
})(controller || (controller = {}));
