var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events;
(function (events) {
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.listeners = {};
        }
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var e;
            var type;
            if (event instanceof Event) {
                type = event.type;
                e = event;
            }
            else {
                type = event;
                e = new Event(type);
            }
            if (this.listeners[type] != null) {
                e.currentTarget = this;
                for (var i = 0; i < this.listeners[type].length; i++) {
                    var listener = this.listeners[type][i];
                    try {
                        listener.handler(e);
                    }
                    catch (error) {
                        if (window.console) {
                            console.error(error.stack);
                        }
                    }
                }
            }
        };
        EventDispatcher.prototype.addEventListener = function (type, callback, priolity) {
            if (priolity === void 0) { priolity = 0; }
            if (this.listeners[type] == null) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(new EventListener(type, callback, priolity));
            this.listeners[type].sort(function (listener1, listener2) {
                return listener2.priolity - listener1.priolity;
            });
        };
        EventDispatcher.prototype.removeEventListener = function (type, callback) {
            if (this.hasEventListener(type, callback)) {
                for (var i = 0; i < this.listeners[type].length; i++) {
                    var listener = this.listeners[type][i];
                    if (listener.equalCurrentListener(type, callback)) {
                        listener.handler = null;
                        this.listeners[type].splice(i, 1);
                        return;
                    }
                }
            }
        };
        EventDispatcher.prototype.clearEventListener = function () {
            this.listeners = {};
        };
        EventDispatcher.prototype.containEventListener = function (type) {
            if (this.listeners[type] == null)
                return false;
            return this.listeners[type].length > 0;
        };
        EventDispatcher.prototype.hasEventListener = function (type, callback) {
            if (this.listeners[type] == null)
                return false;
            for (var i = 0; i < this.listeners[type].length; i++) {
                var listener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    return true;
                }
            }
            return false;
        };
        return EventDispatcher;
    }());
    events.EventDispatcher = EventDispatcher;
    var EventListener = (function () {
        function EventListener(type, handler, priolity) {
            if (type === void 0) { type = null; }
            if (handler === void 0) { handler = null; }
            if (priolity === void 0) { priolity = 0; }
            this.type = type;
            this.handler = handler;
            this.priolity = priolity;
        }
        EventListener.prototype.equalCurrentListener = function (type, handler) {
            if (this.type == type && this.handler == handler) {
                return true;
            }
            return false;
        };
        return EventListener;
    }());
    var Event = (function () {
        function Event(type, value) {
            if (type === void 0) { type = null; }
            if (value === void 0) { value = null; }
            this.type = type;
            this.value = value;
        }
        Event.COMPLETE = "complete";
        Event.CHANGE_PROPERTY = "changeProperty";
        return Event;
    }());
    events.Event = Event;
})(events || (events = {}));
var model;
(function (model) {
    var Model = (function (_super) {
        __extends(Model, _super);
        function Model() {
            var _this = this;
            _super.call(this);
            this._screen = { width: 0, height: 0 };
            this.onResize = function () {
                if (_this.screen.width === window.innerWidth) {
                    return;
                }
                _this.screen = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            };
            this._mouseMove = 0;
            window.addEventListener('resize', this.onResize);
            this.onResize();
        }
        Object.defineProperty(Model.prototype, "lib", {
            get: function () {
                return this._lib;
            },
            set: function (value) {
                this._lib = value;
                this.onResize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "screen", {
            get: function () {
                return this._screen;
            },
            set: function (value) {
                this._screen = value;
                this.dispatchEvent(Model.RESIZE_EVENT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "mouseMove", {
            get: function () {
                return this._mouseMove * 0.005;
            },
            set: function (value) {
                this._mouseMove = value;
            },
            enumerable: true,
            configurable: true
        });
        Model.RESIZE_EVENT = 'onResize';
        Model.getInstance = function () {
            if (!Model._instance) {
                Model._instance = new Model();
            }
            return Model._instance;
        };
        return Model;
    }(events.EventDispatcher));
    model.Model = Model;
})(model || (model = {}));
var gl;
(function (gl) {
    var Lib = (function () {
        function Lib() {
        }
        Object.defineProperty(Lib.prototype, "prg", {
            get: function () {
                return this._prg;
            },
            set: function (value) {
                this._prg = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Lib.prototype, "gl", {
            get: function () {
                return this._gl;
            },
            set: function (value) {
                this._gl = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Lib.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            set: function (value) {
                this._canvas = value;
            },
            enumerable: true,
            configurable: true
        });
        return Lib;
    }());
    gl.Lib = Lib;
})(gl || (gl = {}));
var utils;
(function (utils) {
    var GLUtil = (function () {
        function GLUtil() {
        }
        GLUtil.compileShader = function (_gl, _id) {
            var script = document.getElementById(_id);
            if (!script) {
                return;
            }
            var shader, type = script.type, shaderSrc = script.text;
            if (type === 'x-shader/x-vertex') {
                shader = _gl.createShader(_gl.VERTEX_SHADER);
            }
            else if (type === 'x-shader/x-fragment') {
                shader = _gl.createShader(_gl.FRAGMENT_SHADER);
            }
            _gl.shaderSource(shader, shaderSrc);
            _gl.compileShader(shader);
            if (_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
                return shader;
            }
            else {
                console.log(_id + ': ' + _gl.getShaderInfoLog(shader));
            }
        };
        GLUtil.createVBO = function (_gl, _data) {
            var vbo = _gl.createBuffer();
            _gl.bindBuffer(_gl.ARRAY_BUFFER, vbo);
            _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(_data), _gl.STATIC_DRAW);
            _gl.bindBuffer(_gl.ARRAY_BUFFER, null);
            return vbo;
        };
        GLUtil.createIBO = function (_gl, _data) {
            var ibo = _gl.createBuffer();
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, ibo);
            _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, new Int16Array(_data), _gl.STATIC_DRAW);
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, null);
            return ibo;
        };
        GLUtil.setVBO = function (_gl, _vbo, _attL, _attS) {
            for (var i in _vbo) {
                _gl.bindBuffer(_gl.ARRAY_BUFFER, _vbo[i]);
                _gl.enableVertexAttribArray(_attL[i]);
                _gl.vertexAttribPointer(_attL[i], _attS[i], _gl.FLOAT, false, 0, 0);
            }
        };
        GLUtil.setIBO = function (_gl, _ibo) {
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, _ibo);
        };
        GLUtil.checkLocation = function (_attL, _uniL) {
            var i;
            for (i = 0; i < _attL.length; i++) {
                if (_attL[i] == null || _attL[i] < 0) {
                    console.warn('◆ invalid attribute location: %c"' + _attL[i] + '"', 'color: crimson');
                    return false;
                }
            }
            for (i = 0; i < _uniL.length; i++) {
                if (_uniL[i] == null || _uniL[i] < 0) {
                    console.warn('◆ invalid uniform location: %c"' + _uniL[i] + '"', 'color: crimson');
                    return false;
                }
            }
            return true;
        };
        return GLUtil;
    }());
    utils.GLUtil = GLUtil;
})(utils || (utils = {}));
var gl;
(function (gl) {
    var Program = (function () {
        function Program(_lib, _vs, _fs, _attL, _attS, _uniforms, _uniTypes) {
            var _this = this;
            this._lib = _lib;
            this._vs = _vs;
            this._fs = _fs;
            this._attL = [];
            this._attS = [];
            this._uniforms = [];
            this._uniTypes = [];
            this.setAttrVBO = function (_vbo) {
                utils.GLUtil.setVBO(_this._gl, _vbo, _this._attL, _this._attS);
            };
            this.setAttrIBO = function (_ibo) {
                utils.GLUtil.setIBO(_this._gl, _ibo);
            };
            this.pushShader = function (value) {
                for (var i = 0, l = _this._uniforms.length; i < l; i++) {
                    switch (_this._uniTypes[i]) {
                        case 'matrix4fv':
                            _this._gl.uniformMatrix4fv(_this._uniforms[i], false, value[i]);
                            break;
                        case '4fv':
                            _this._gl.uniform4fv(_this._uniforms[i], value[i]);
                            break;
                        case '3fv':
                            _this._gl.uniform3fv(_this._uniforms[i], value[i]);
                            break;
                        case '2fv':
                            _this._gl.uniform2fv(_this._uniforms[i], value[i]);
                            break;
                        case '1fv':
                            _this._gl.uniform1fv(_this._uniforms[i], value[i]);
                            break;
                        case '1f':
                            _this._gl.uniform1f(_this._uniforms[i], value[i]);
                            break;
                        case '1iv':
                            _this._gl.uniform1iv(_this._uniforms[i], value[i]);
                            break;
                        case '1i':
                            _this._gl.uniform1i(_this._uniforms[i], value[i]);
                            break;
                        case 'matrix3fv':
                            _this._gl.uniformMatrix3fv(_this._uniforms[i], false, value[i]);
                            break;
                        case 'matrix2fv':
                            _this._gl.uniformMatrix2fv(_this._uniforms[i], false, value[i]);
                            break;
                        default:
                            break;
                    }
                }
            };
            this._gl = _lib.gl;
            this._prg = this._gl.createProgram();
            var vertexShader = utils.GLUtil.compileShader(this._gl, this._vs);
            var fragmentShader = utils.GLUtil.compileShader(this._gl, this._fs);
            this._gl.attachShader(this._prg, vertexShader);
            this._gl.attachShader(this._prg, fragmentShader);
            this._gl.linkProgram(this._prg);
            if (this._gl.getProgramParameter(this._prg, this._gl.LINK_STATUS)) {
                this._gl.useProgram(this._prg);
            }
            else {
                console.log(this._gl.getProgramInfoLog(this._prg));
            }
            var i;
            for (i = 0; i < _attL.length; i++) {
                this._attL[i] = this._gl.getAttribLocation(this._prg, _attL[i]);
                this._attS[i] = _attS[i];
            }
            for (i = 0; i < _uniforms.length; i++) {
                this._uniforms[i] = this._gl.getUniformLocation(this._prg, _uniforms[i]);
                this._uniTypes[i] = _uniTypes[i];
            }
            utils.GLUtil.checkLocation(this._attL, this._uniforms);
            _lib.prg = this._prg;
        }
        return Program;
    }());
    gl.Program = Program;
})(gl || (gl = {}));
var gl;
(function (gl) {
    var Renderer = (function () {
        function Renderer(_lib, _prg, _index) {
            var _this = this;
            this._lib = _lib;
            this._prg = _prg;
            this._index = _index;
            this._model = model.Model.getInstance();
            this.mLib = new MatIV();
            this.mMatrix = this.mLib.identity(this.mLib.create());
            this.vMatrix = this.mLib.identity(this.mLib.create());
            this.pMatrix = this.mLib.identity(this.mLib.create());
            this.vpMatrix = this.mLib.identity(this.mLib.create());
            this.mvpMatrix = this.mLib.identity(this.mLib.create());
            this.init = function () {
                _this._gl.blendFunc(_this._gl.SRC_ALPHA, _this._gl.ONE_MINUS_SRC_ALPHA);
                _this.animate();
            };
            this.animate = function () {
                _this._timer = requestAnimationFrame(_this.animate);
                _this.render();
            };
            this.render = function () {
                _this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
                _this._gl.clearDepth(1.0);
                _this._gl.clear(_this._gl.COLOR_BUFFER_BIT | _this._gl.DEPTH_BUFFER_BIT);
                _this.mLib.identity(_this.mMatrix);
                _this.mLib.multiply(_this.vpMatrix, _this.mMatrix, _this.mvpMatrix);
                _this._gl.disable(_this._gl.BLEND);
                _this._prg.pushShader([_this.mvpMatrix, [0.12, 0.12, 0.12]]);
                _this._gl.drawElements(_this._gl.TRIANGLES, _this._index.length, _this._gl.UNSIGNED_SHORT, 0);
                _this.mLib.identity(_this.mMatrix);
                _this.mLib.rotate(_this.mMatrix, _this._model.mouseMove, [0.0, 0.0, 1.0], _this.mMatrix);
                _this.mLib.multiply(_this.vpMatrix, _this.mMatrix, _this.mvpMatrix);
                _this._gl.enable(_this._gl.BLEND);
                _this._prg.pushShader([_this.mvpMatrix, [0.1, 0.1, 0.1]]);
                _this._gl.drawElements(_this._gl.TRIANGLES, _this._index.length, _this._gl.UNSIGNED_SHORT, 0);
                _this._gl.flush();
            };
            this.onResize = function () {
                _this._width = _this._model.screen.width;
                _this._height = _this._model.screen.height;
                _this.mLib.lookAt([0.0, 0.0, 1.0], [0, 0, 0], [0, 1, 0], _this.vMatrix);
                _this.mLib.perspective(90, _this._width / _this._height, 0.1, 100, _this.pMatrix);
                _this.mLib.multiply(_this.pMatrix, _this.vMatrix, _this.mvpMatrix);
            };
            this._gl = _lib.gl;
            this._model.addEventListener(model.Model.RESIZE_EVENT, this.onResize);
            this.onResize();
            this.init();
        }
        return Renderer;
    }());
    gl.Renderer = Renderer;
})(gl || (gl = {}));
var item;
(function (item) {
    var Texture = (function () {
        function Texture(_gl, _src, _callback) {
            var _this = this;
            if (_callback === void 0) { _callback = null; }
            this._gl = _gl;
            this._src = _src;
            this._callback = _callback;
            this.init = function () {
                _this._img = new Image();
                _this._img.onload = _this.loaded;
                _this._img.src = _this._src;
            };
            this.loaded = function (e) {
                _this._texture = _this._gl.createTexture();
                _this._gl.bindTexture(_this._gl.TEXTURE_2D, _this._texture);
                _this._gl.texImage2D(_this._gl.TEXTURE_2D, 0, _this._gl.RGBA, _this._gl.RGBA, _this._gl.UNSIGNED_BYTE, _this._img);
                _this._gl.generateMipmap(_this._gl.TEXTURE_2D);
                _this._gl.texParameteri(_this._gl.TEXTURE_2D, _this._gl.TEXTURE_MIN_FILTER, _this._gl.LINEAR);
                _this._gl.texParameteri(_this._gl.TEXTURE_2D, _this._gl.TEXTURE_MAG_FILTER, _this._gl.LINEAR);
                _this._gl.texParameteri(_this._gl.TEXTURE_2D, _this._gl.TEXTURE_WRAP_S, _this._gl.REPEAT);
                _this._gl.texParameteri(_this._gl.TEXTURE_2D, _this._gl.TEXTURE_WRAP_T, _this._gl.REPEAT);
                _this._gl.bindTexture(_this._gl.TEXTURE_2D, null);
                if (_this._callback) {
                    _this._callback();
                }
            };
            this.init();
        }
        Object.defineProperty(Texture.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            enumerable: true,
            configurable: true
        });
        return Texture;
    }());
    item.Texture = Texture;
})(item || (item = {}));
var controller;
(function (controller) {
    var Mouse = (function () {
        function Mouse(_model, _canvas) {
            var _this = this;
            this._model = _model;
            this._canvas = _canvas;
            this.setupEvents = function () {
                _this._canvas.addEventListener('mousedown', _this.onMouseDown, false);
                _this._canvas.addEventListener('touchstart', _this.onTouchStart, false);
            };
            this.removeEvents = function () {
                _this._canvas.removeEventListener('mousedown', _this.onMouseDown);
                _this._canvas.removeEventListener('mousemove', _this.onMouseMove);
                _this._canvas.removeEventListener('mouseup', _this.onMoveEnd);
                _this._canvas.removeEventListener('touchstart', _this.onTouchStart);
                _this._canvas.removeEventListener('touchmove', _this.onTouchMove);
                _this._canvas.removeEventListener('touchend', _this.onMoveEnd);
            };
            this.onMouseDown = function (e) {
                e.preventDefault();
                _this.start = e.clientY;
                _this._canvas.addEventListener('mousemove', _this.onMouseMove, false);
                _this._canvas.addEventListener('mouseup', _this.onMoveEnd, false);
            };
            this.onTouchStart = function (e) {
                e.preventDefault();
                var touch = e.changedTouches[0];
                _this.start = touch.pageY;
                _this._canvas.addEventListener('touchmove', _this.onTouchMove, false);
                _this._canvas.addEventListener('touchend', _this.onMoveEnd, false);
            };
            this.onMouseMove = function (e) {
                e.preventDefault();
                _this._model.mouseMove -= _this.start - e.clientY;
            };
            this.onTouchMove = function (e) {
                e.preventDefault();
                var touch = e.changedTouches[0];
                _this._model.mouseMove -= _this.start - touch.pageY;
            };
            this.onMoveEnd = function (e) {
                e.preventDefault();
                _this._canvas.removeEventListener('mousemove', _this.onMouseMove);
                _this._canvas.removeEventListener('mouseup', _this.onMoveEnd);
                _this._canvas.removeEventListener('touchmove', _this.onTouchMove);
                _this._canvas.removeEventListener('touchend', _this.onMoveEnd);
            };
            this.init();
        }
        Mouse.prototype.init = function () {
            this.removeEvents();
            this.setupEvents();
        };
        return Mouse;
    }());
    controller.Mouse = Mouse;
})(controller || (controller = {}));
(function (win, doc) {
    'use strict';
    window.onload = function () {
        var _lib = new gl.Lib();
        var _model = model.Model.getInstance();
        _model.lib = _lib;
        _lib.canvas = doc.getElementById('canvas');
        _lib.canvas.width = _model.screen.width;
        _lib.canvas.height = _model.screen.height;
        var _ctx = _lib.canvas.getContext('webgl', { stencil: false }) || _lib.canvas.getContext('experimental-webgl', { stencil: false });
        _lib.gl = _ctx;
        var position = [
            -1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0
        ];
        var VBO = [
            utils.GLUtil.createVBO(_ctx, position)
        ];
        var index = [
            0, 1, 2,
            2, 1, 3
        ];
        var IBO = utils.GLUtil.createIBO(_ctx, index);
        var _prg = new gl.Program(_lib, 'VS', 'FS', ['position'], [3], ['mvpMatrix', 'color'], ['matrix4fv', '3fv']);
        _prg.setAttrVBO(VBO);
        _prg.setAttrIBO(IBO);
        var _renderer = new gl.Renderer(_lib, _prg, index);
        new controller.Mouse(_model, _lib.canvas);
    };
})(window, window.document);
//# sourceMappingURL=run.js.map