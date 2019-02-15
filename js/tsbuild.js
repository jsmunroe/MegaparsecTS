var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Lightspeed;
(function (Lightspeed) {
    var Box = /** @class */ (function () {
        function Box(left, top, width, height) {
            this._left = 0;
            this._top = 0;
            this._left = left;
            this._top = top;
            this._width = width;
            this._height = height;
        }
        Object.defineProperty(Box.prototype, "left", {
            get: function () {
                return this._left;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "top", {
            get: function () {
                return this._top;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "right", {
            get: function () {
                return this._left + this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "bottom", {
            get: function () {
                return this._top + this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "center", {
            get: function () {
                return new Lightspeed.Vector(this.left + this._width / 2, this.top + this.height / 2);
            },
            enumerable: true,
            configurable: true
        });
        Box.prototype.inflate = function (cx, cy) {
            return new Box(this.left - cx / 2, this.top - cy / 2, this.width + cx, this.height + cy);
        };
        Box.prototype.alignLeft = function (left) {
            return new Box(left, this.top, this.width, this.height);
        };
        Box.prototype.alignTop = function (top) {
            return new Box(this.left, top, this.width, this.height);
        };
        Box.prototype.alignRight = function (right) {
            return new Box(right - this.width, this.top, this.width, this.height);
        };
        Box.prototype.alignBottom = function (bottom) {
            return new Box(this.left, bottom - this.height, this.width, this.height);
        };
        Box.prototype.offsetV = function (vector) {
            return this.offset(vector.x, vector.y);
        };
        Box.prototype.offset = function (cx, cy) {
            return new Box(this.left + cx, this.top + cy, this.width, this.height);
        };
        Box.prototype.collides = function (other) {
            return (this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top);
        };
        Box.prototype.contains = function (other) {
            return (this.left <= other.left && this.right >= other.right && this.top <= other.top && this.bottom >= other.bottom);
        };
        Box.fromCenter = function (center, width, height) {
            return new Box(center.x - width / 2, center.y - height / 2, width, height);
        };
        return Box;
    }());
    Lightspeed.Box = Box;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Canvas = /** @class */ (function () {
        function Canvas(canvas) {
            this._scaleFactor = 1;
            this._htmlCanvas = canvas;
        }
        Object.defineProperty(Canvas.prototype, "width", {
            get: function () {
                return this._scaleWidth || this._htmlCanvas.scrollWidth / this._scaleFactor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "height", {
            get: function () {
                return this._scaleHeight || this._htmlCanvas.scrollHeight / this._scaleFactor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "box", {
            get: function () {
                return new Lightspeed.Box(0, 0, this.width, this.height);
            },
            enumerable: true,
            configurable: true
        });
        Canvas.prototype.startRender = function () {
            var ctx = this._htmlCanvas.getContext('2d');
            ctx.save();
            ctx.scale(this._scaleFactor, this._scaleFactor);
            return ctx;
        };
        Canvas.prototype.endRender = function (ctx) {
            ctx.restore();
        };
        Canvas.prototype.scaleWidth = function (width) {
            this._scaleHeight = null;
            this._scaleWidth = width;
            this._scaleFactor = this._htmlCanvas.scrollWidth / width;
            this._htmlCanvas.width = this._htmlCanvas.scrollWidth;
            this._htmlCanvas.height = this._htmlCanvas.scrollHeight;
        };
        Canvas.prototype.scaleHeight = function (height) {
            this._scaleHeight = height;
            this._scaleWidth = null;
            this._scaleFactor = this._htmlCanvas.scrollHeight / height;
            this._htmlCanvas.width = this._htmlCanvas.scrollWidth;
            this._htmlCanvas.height = this._htmlCanvas.scrollHeight;
        };
        Canvas.find = function () {
            var htmlCanvas = document.querySelector('canvas');
            var canvas = new Canvas(htmlCanvas);
            var scaleHeight = +htmlCanvas.getAttribute('scale-height');
            if (scaleHeight) {
                canvas.scaleHeight(scaleHeight);
            }
            var scaleWidth = +htmlCanvas.getAttribute('scale-width');
            if (scaleWidth) {
                canvas.scaleWidth(scaleWidth);
            }
            return canvas;
        };
        return Canvas;
    }());
    Lightspeed.Canvas = Canvas;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Element = /** @class */ (function () {
        function Element() {
            this.zIndex = 0;
            this._isDead = false;
            this._id = Element._nextId++;
        }
        Object.defineProperty(Element.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "isDead", {
            get: function () {
                return this._isDead;
            },
            enumerable: true,
            configurable: true
        });
        Element.prototype.init = function (context) {
            // optionally overloaded by extending classes set the initial state of this element.
        };
        Element.prototype.update = function (context) {
            // optionally overloaded by extending classes to update element state per frame time.
        };
        Element.prototype.render = function (context) {
            // optionally overloaded by extending classes to render element.
        };
        Element.prototype.collidesWith = function (other) {
            return false;
        };
        Element.prototype.kill = function () {
            this._isDead = true;
            this.onKill();
        };
        Element.prototype.onCollide = function (context) {
            // optionally overloaded by extending classes to handle collission.
        };
        Element.prototype.onKill = function () {
            // optionally overloaded by extending classes to handle collission.
        };
        Element._nextId = 0;
        return Element;
    }());
    Lightspeed.Element = Element;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var SceneContext = /** @class */ (function () {
        function SceneContext(scene) {
            this._scene = scene;
        }
        Object.defineProperty(SceneContext.prototype, "scene", {
            get: function () {
                return this._scene;
            },
            enumerable: true,
            configurable: true
        });
        SceneContext.prototype.clear = function () {
            this._scene.clear();
        };
        SceneContext.prototype.pushElement = function (element) {
            this._scene.pushElement(element);
        };
        SceneContext.prototype.removeElement = function (element) {
            this._scene.removeElement(element);
        };
        SceneContext.prototype.findElements = function (predicate) {
            return this._scene.findElements(predicate);
        };
        SceneContext.prototype.findFirstElement = function (predicate) {
            return this._scene.findFirstElement(predicate);
        };
        SceneContext.prototype.findClosestElement = function (position, predicate) {
            return this._scene.findClosestElement(position, predicate);
        };
        SceneContext.prototype.pause = function () {
            this._scene.pause();
        };
        SceneContext.prototype.unpause = function () {
            this._scene.unpause();
        };
        SceneContext.prototype.togglePause = function () {
            this._scene.togglePause();
        };
        SceneContext.prototype.requestTimeout = function (delay, element, action) {
            this._scene.requestTimeout(delay, element, action);
        };
        return SceneContext;
    }());
    Lightspeed.SceneContext = SceneContext;
})(Lightspeed || (Lightspeed = {}));
/// <reference path="SceneContext.ts" />
var Lightspeed;
(function (Lightspeed) {
    var ElementCollisionContext = /** @class */ (function (_super) {
        __extends(ElementCollisionContext, _super);
        function ElementCollisionContext(engine, scene, otherElement) {
            var _this = _super.call(this, scene) || this;
            _this._engine = engine;
            _this._otherElement = otherElement;
            return _this;
        }
        Object.defineProperty(ElementCollisionContext.prototype, "otherElement", {
            get: function () {
                return this._otherElement;
            },
            enumerable: true,
            configurable: true
        });
        return ElementCollisionContext;
    }(Lightspeed.SceneContext));
    Lightspeed.ElementCollisionContext = ElementCollisionContext;
})(Lightspeed || (Lightspeed = {}));
/// <reference path="SceneContext.ts" />
var Lightspeed;
(function (Lightspeed) {
    var ElementInitContext = /** @class */ (function (_super) {
        __extends(ElementInitContext, _super);
        function ElementInitContext(engine, scene) {
            var _this = _super.call(this, scene) || this;
            _this._engine = engine;
            _this._canvasBox = engine.canvas.box;
            return _this;
        }
        Object.defineProperty(ElementInitContext.prototype, "engine", {
            get: function () {
                return this._engine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementInitContext.prototype, "canvasBox", {
            get: function () {
                return this._canvasBox;
            },
            enumerable: true,
            configurable: true
        });
        return ElementInitContext;
    }(Lightspeed.SceneContext));
    Lightspeed.ElementInitContext = ElementInitContext;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Engine = /** @class */ (function () {
        function Engine() {
            this._scenes = [];
            this._canvas = Lightspeed.Canvas.find();
            this.setScene('Default Scene');
        }
        Object.defineProperty(Engine.prototype, "currentScene", {
            get: function () {
                return this._currentScene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        Engine.prototype.setScene = function (name) {
            this._currentScene = this.getScene(name);
        };
        Engine.prototype.getScene = function (name) {
            var scene = this._scenes.filter(function (i) { return i.name === name; })[0];
            if (!scene) {
                scene = new Lightspeed.Scene(this, name);
                this._scenes.push(scene);
            }
            return scene;
        };
        Engine.prototype.clear = function () {
            this.currentScene.clear();
        };
        Engine.prototype.pushElement = function (element) {
            this.currentScene.pushElement(element);
        };
        Engine.prototype.removeElement = function (element) {
            this.currentScene.removeElement(element);
        };
        Engine.prototype.findElements = function (predicate) {
            return this.currentScene.findElements(predicate);
        };
        Engine.prototype.findFirstElement = function (predicate) {
            return this.currentScene.findFirstElement(predicate);
        };
        Engine.prototype.findClosestElement = function (position, predicate) {
            return this.currentScene.findClosestElement(position, predicate);
        };
        Object.defineProperty(Engine.prototype, "isPaused", {
            get: function () {
                return this.currentScene.isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Engine.prototype.pause = function () {
            this.currentScene.pause();
        };
        Engine.prototype.unpause = function () {
            this.currentScene.unpause();
        };
        Engine.prototype.togglePause = function () {
            this.currentScene.togglePause();
        };
        Engine.prototype.requestTimeout = function (delay, element, action) {
            this.currentScene.requestTimeout(delay, element, action);
        };
        Engine.prototype.onPause = function (scene) {
            // optionally overloaded by extending classes to handle pause.
        };
        Engine.prototype.onUnpause = function (scene) {
            // optionally overloaded by extending classes to handle unpause.
        };
        Engine.prototype.runFrame = function (timeStamp) {
            requestAnimationFrame(this.runFrame.bind(this));
            if (!this._lastTimeStamp) {
                this._lastTimeStamp = timeStamp;
            }
            var elapsed = timeStamp - this._lastTimeStamp;
            // Update phase
            for (var i = 0; i < this._scenes.length; i++) {
                var scene = this._scenes[i];
                if (!scene.isPaused) {
                    var updateContext = new Lightspeed.FrameUpdateContext(this, scene, elapsed, scene.wasPaused);
                    scene.update(updateContext);
                }
            }
            this._lastTimeStamp = timeStamp;
            // Render phase
            var ctx = this.canvas.startRender();
            var renderContext = new Lightspeed.FrameRenderContext(this, timeStamp, ctx);
            this.currentScene.render(renderContext);
            this.canvas.endRender(ctx);
        };
        Engine.prototype.run = function () {
            requestAnimationFrame(this.runFrame.bind(this));
        };
        return Engine;
    }());
    Lightspeed.Engine = Engine;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var FrameRenderContext = /** @class */ (function () {
        function FrameRenderContext(engine, timeStamp, ctx) {
            this._engine = engine;
            this._ctx = ctx;
            this._timeStamp = timeStamp;
        }
        Object.defineProperty(FrameRenderContext.prototype, "canvasWidth", {
            get: function () {
                return this._engine.canvas.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameRenderContext.prototype, "canvasHeight", {
            get: function () {
                return this._engine.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameRenderContext.prototype, "ctx", {
            get: function () {
                return this._ctx;
            },
            enumerable: true,
            configurable: true
        });
        FrameRenderContext.prototype.getFrame = function (frameLength, frameCount) {
            return Math.floor(this._timeStamp / frameLength) % frameCount;
        };
        return FrameRenderContext;
    }());
    Lightspeed.FrameRenderContext = FrameRenderContext;
})(Lightspeed || (Lightspeed = {}));
/// <reference path="SceneContext.ts" />
var Lightspeed;
(function (Lightspeed) {
    var FrameUpdateContext = /** @class */ (function (_super) {
        __extends(FrameUpdateContext, _super);
        function FrameUpdateContext(engine, scene, elapsed, fromPause) {
            var _this = _super.call(this, scene) || this;
            _this._canvasBox = engine.canvas.box;
            _this._elapsed = elapsed;
            _this._delta = _this._elapsed / 1000;
            if (fromPause) {
                _this._elapsed = 0;
                _this._delta = 0;
            }
            return _this;
        }
        Object.defineProperty(FrameUpdateContext.prototype, "elapsed", {
            get: function () {
                return this._elapsed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameUpdateContext.prototype, "delta", {
            get: function () {
                return this._delta;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameUpdateContext.prototype, "canvasBox", {
            get: function () {
                return this._canvasBox;
            },
            enumerable: true,
            configurable: true
        });
        return FrameUpdateContext;
    }(Lightspeed.SceneContext));
    Lightspeed.FrameUpdateContext = FrameUpdateContext;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var InertialElement = /** @class */ (function (_super) {
        __extends(InertialElement, _super);
        function InertialElement() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._position = new Lightspeed.Vector();
            _this._velocity = new Lightspeed.Vector();
            _this._acceleration = new Lightspeed.Vector();
            return _this;
        }
        Object.defineProperty(InertialElement.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InertialElement.prototype, "velocity", {
            get: function () {
                return this._velocity;
            },
            set: function (value) {
                this._velocity = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InertialElement.prototype, "acceleration", {
            get: function () {
                return this._acceleration;
            },
            set: function (value) {
                this._acceleration = value;
            },
            enumerable: true,
            configurable: true
        });
        InertialElement.prototype.update = function (context) {
            _super.prototype.update.call(this, context);
            this._velocity = this._velocity.add(this._acceleration);
            this._position = this._position.add(this._velocity.scale(context.delta));
        };
        return InertialElement;
    }(Lightspeed.Element));
    Lightspeed.InertialElement = InertialElement;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Scene = /** @class */ (function () {
        function Scene(engine, name) {
            this._isPaused = false;
            this._wasPaused = false;
            this._elements = [];
            this._elementTimeouts = [];
            this._engine = engine;
            this._name = name;
        }
        Object.defineProperty(Scene.prototype, "isPaused", {
            get: function () {
                return this._isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "wasPaused", {
            get: function () {
                return this._wasPaused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.clear = function () {
            this._elements = [];
        };
        Scene.prototype.pushElement = function (element) {
            this._elements.push(element);
            var initContext = new Lightspeed.ElementInitContext(this._engine, this);
            element.init(initContext);
            this._elements.sort(function (a, b) { return a.zIndex - b.zIndex; });
        };
        Scene.prototype.removeElement = function (element) {
            var index = this._elements.indexOf(element);
            if (index !== -1) {
                this._elements.splice(index, 1);
            }
        };
        Scene.prototype.findElements = function (predicate) {
            if (!predicate) {
                return this._elements;
            }
            return this._elements.filter(predicate);
        };
        Scene.prototype.findFirstElement = function (predicate) {
            return this.findElements(predicate)[0];
        };
        Scene.prototype.findClosestElement = function (position, predicate) {
            var elements = this.findElements(predicate).filter(function (i) { return i instanceof Lightspeed.InertialElement; }).map(function (i) { return i; });
            if (!elements.length) {
                return null;
            }
            var closestElement = elements[0];
            var closestDistance = closestElement.position.distanceTo(position);
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var distance = element.position.distanceTo(position);
                if (distance < closestDistance) {
                    closestElement = element;
                    closestDistance = distance;
                }
            }
            return closestElement;
        };
        Scene.prototype.pause = function () {
            this._isPaused = true;
            this._wasPaused = true;
            this._engine.onPause(this);
        };
        Scene.prototype.unpause = function () {
            this._isPaused = false;
            this._engine.onUnpause(this);
        };
        Scene.prototype.togglePause = function () {
            if (this._isPaused) {
                this.unpause();
            }
            else {
                this.pause();
            }
        };
        Scene.prototype.requestTimeout = function (delay, element, action) {
            this._elementTimeouts.push({
                delay: delay,
                elapsed: 0,
                element: element,
                action: action
            });
        };
        Scene.prototype.update = function (context) {
            // Get element timeouts for this frame.
            var currentElementTimeouts = this.getCurrentElementTimeouts(context);
            for (var i = 0; i < currentElementTimeouts.filter(function (p) { return p.element == null; }).length; i++) {
                var elementTimeout = currentElementTimeouts[i];
                elementTimeout.action.bind(this)(context);
            }
            // Remove dead elements.
            this._elements = this._elements.filter(function (p) { return !p.isDead; });
            this.checkCollisions();
            var _loop_1 = function (i) {
                var element = this_1._elements[i];
                context.currentElement = element;
                element.update(context);
                elementTimeouts = currentElementTimeouts.filter(function (i) { return i.element === element; });
                for (var j = 0; j < elementTimeouts.length; j++) {
                    var elementTimeout = elementTimeouts[j];
                    elementTimeout.action.bind(elementTimeout.element)(context);
                }
            };
            var this_1 = this, elementTimeouts;
            for (var i = 0; i < this._elements.length; i++) {
                _loop_1(i);
            }
            this._wasPaused = false;
        };
        Scene.prototype.render = function (context) {
            var ctx = context.ctx;
            for (var i = 0; i < this._elements.length; i++) {
                var element = this._elements[i];
                ctx.save();
                element.render(context);
                ctx.restore();
            }
        };
        // Get the element timeouts for the current frame.
        Scene.prototype.getCurrentElementTimeouts = function (updateContext) {
            var currentElementTimeouts = [];
            var nextElementTimeouts = [];
            for (var i = 0; i < this._elementTimeouts.length; i++) {
                var elementTimeout = this._elementTimeouts[i];
                elementTimeout.elapsed += updateContext.elapsed;
                if (elementTimeout.elapsed >= elementTimeout.delay) {
                    currentElementTimeouts.push(elementTimeout);
                }
                else {
                    nextElementTimeouts.push(elementTimeout);
                }
            }
            this._elementTimeouts = nextElementTimeouts;
            return currentElementTimeouts;
        };
        Scene.prototype.checkCollisions = function () {
            var collisions = [];
            for (var i = 0; i < this._elements.length; i++) {
                for (var j = i + 1; j < this._elements.length; j++) {
                    var first = this._elements[i];
                    var second = this._elements[j];
                    if (first.collidesWith(second)) {
                        first.onCollide(new Lightspeed.ElementCollisionContext(this._engine, this, second));
                        second.onCollide(new Lightspeed.ElementCollisionContext(this._engine, this, first));
                    }
                }
            }
            return collisions;
        };
        return Scene;
    }());
    Lightspeed.Scene = Scene;
    var ElementTimeout = /** @class */ (function () {
        function ElementTimeout() {
        }
        return ElementTimeout;
    }());
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Sprite = /** @class */ (function () {
        function Sprite(imagePath, width, height, frameCount) {
            var _this = this;
            this._isLoaded = false;
            this._onLoadCallbacks = [];
            this._frameCount = 1;
            this.opacity = 1;
            this._image = new Image();
            this._image.src = imagePath;
            var scale = width;
            this._frameCount = frameCount || 1;
            if (width && height) {
                this._width = width;
                this._height = height;
                this._isLoaded = true;
            }
            else if (scale) {
                this._image.onload = function () {
                    _this._width = _this._image.width * scale;
                    _this._height = _this._image.height * scale;
                    _this._isLoaded = true;
                    _this._onLoadCallbacks.forEach(function (i) { return i(_this); });
                    _this._onLoadCallbacks = [];
                };
            }
        }
        Object.defineProperty(Sprite.prototype, "frameCount", {
            get: function () {
                return this._frameCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.registerLoadCallback = function (callback) {
            if (this._isLoaded) {
                callback(this);
                return;
            }
            this._onLoadCallbacks.push(callback);
        };
        Sprite.prototype.draw = function (ctx, position, frame) {
            if (!this._isLoaded) {
                return;
            }
            frame = frame || 0;
            var sourceFrameWidth = this._image.width / this._frameCount;
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.drawImage(this._image, frame * sourceFrameWidth, 0, sourceFrameWidth, this._image.height, position.x - this.width / 2, position.y - this.height / 2, this.width, this.height);
            ctx.restore();
        };
        return Sprite;
    }());
    Lightspeed.Sprite = Sprite;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Vector = /** @class */ (function () {
        function Vector(x, y) {
            this._x = x || 0;
            this._y = y || 0;
        }
        Object.defineProperty(Vector.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "magnitude", {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "argument", {
            get: function () {
                return Math.atan2(this.y, this.x);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "normal", {
            get: function () {
                return this.scale(1 / this.magnitude);
            },
            enumerable: true,
            configurable: true
        });
        Vector.prototype.add = function (other) {
            return new Vector(this.x + other.x, this.y + other.y);
        };
        Vector.prototype.scale = function (scalar) {
            return new Vector(this.x * scalar, this.y * scalar);
        };
        Vector.prototype.dot = function (other) {
            return this.x * other.x + this.y * other.y;
        };
        Vector.prototype.with = function (changeX, changeY) {
            return new Vector(changeX(this.x), changeY(this.y));
        };
        Vector.prototype.withX = function (change) {
            return new Vector(change(this.x), this.y);
        };
        Vector.prototype.withY = function (change) {
            return new Vector(this.x, change(this.y));
        };
        Vector.prototype.angleTo = function (other) {
            return Math.atan2(other.y - this.y, other.x - this.x);
        };
        Vector.prototype.distanceTo = function (other) {
            return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
        };
        Vector.prototype.vectorTo = function (other) {
            return new Vector(other.x - this.x, other.y - this.y);
        };
        Vector.fromPolar = function (argument, magnitude) {
            return new Vector(Math.cos(argument) * magnitude, Math.sin(argument) * magnitude);
        };
        return Vector;
    }());
    Lightspeed.Vector = Vector;
})(Lightspeed || (Lightspeed = {}));
var Config = {
    keys: {
        moveUp: ['ArrowUp', 'KeyW'],
        moveDown: ['ArrowDown', 'KeyS'],
        moveLeft: ['ArrowLeft', 'KeyA'],
        moveRight: ['ArrowRight', 'KeyD'],
        pause: ['KeyP', 'Pause'],
        primaryFire: ['Space']
    },
    strings: {
        pauseMessage: 'Paused',
        pauseSubtext: 'Press "P" to resume.',
    },
    styles: {
        textColor: '#AAA',
        messageTextSize: 30,
        messageSubtextSize: 10
    },
    imageScale: 0.075,
    agents: {
        player: {
            image: './img/player.png'
        },
        enemy1: {
            waveMode: 'OffsetWaveMode',
            horizontalConstraintTopology: 'Wrap',
            virticalConstraintTopology: 'Block',
            controllers: [
                { name: 'Swoop' },
                { name: 'Bounce' },
                { name: 'Loop' }
            ],
            width: (500 * 0.075),
            height: (253 * 0.075),
            sheildType: 'Energy',
            images: [
                './img/enemy1.blue.png',
                './img/enemy1.cyan.png',
                './img/enemy1.green.png',
                './img/enemy1.magenta.png',
                './img/enemy1.orange.png'
            ]
        },
        enemy2: {
            waveMode: 'SerialWaveMode',
            horizontalConstraintTopology: 'Wrap',
            virticalConstraintTopology: 'Block',
            controllers: [
                { name: 'Target' }
            ],
            width: (459 * 0.075),
            height: (378 * 0.075),
            sheildType: 'Time',
            images: [
                './img/enemy2.blue.png',
                './img/enemy2.cyan.png',
                './img/enemy2.green.png',
                './img/enemy2.magenta.png',
                './img/enemy2.red.png'
            ]
        },
        enemy3: {
            waveMode: 'OffsetWaveMode',
            horizontalConstraintTopology: 'Wrap',
            virticalConstraintTopology: 'Block',
            controllers: [
                { name: 'Wobble' }
            ],
            width: (369 * 0.075),
            height: (244 * 0.075),
            sheildType: 'Energy',
            images: [
                './img/enemy3.blue.png',
                './img/enemy3.cyan.png',
                './img/enemy3.green.png',
                './img/enemy3.magenta.png',
                './img/enemy3.red.png'
            ]
        },
        enemy4: {
            waveMode: 'OffsetWaveMode',
            horizontalConstraintTopology: 'Wrap',
            verticalConstraintTopology: 'Block',
            controllers: [
                { name: 'Flank' }
            ],
            width: (336 * 0.075),
            height: (268 * 0.075),
            sheildType: 'Energy',
            frameCount: 4,
            images: [
                './img/enemy4.green.png',
                './img/enemy4.cyan.png',
                './img/enemy4.blue.png',
                './img/enemy4.red.png',
                './img/enemy4.magenta.png'
            ]
        },
        asteroid: {
            waveMode: 'OffsetWaveMode',
            waveCount: 100,
            interval: 250,
            levelBasedInterval: [250, 225, 200, 175, 150, 125, 100],
            sheildType: 'None',
            horizontalConstraintTopology: 'Wrap',
            virticalConstraintTopology: 'Block',
            controllers: [
                { name: 'Rain' }
            ],
            width: 25,
            height: 25,
            scaleRange: [0.5, 1],
            images: [
                './img/asteroid.png',
            ]
        }
    }
};
var Lightspeed;
(function (Lightspeed) {
    var Utils;
    (function (Utils) {
        var Messenger = /** @class */ (function () {
            function Messenger() {
                this._subscriptions = [];
            }
            Messenger.prototype.subscribe = function (source, messageName, callback) {
                this._subscriptions.push({
                    source: source,
                    messageName: messageName,
                    callback: callback
                });
            };
            Messenger.prototype.unsubsribe = function (source) {
                this._subscriptions = this._subscriptions.filter(function (i) { return i.source === source; });
            };
            Messenger.prototype.publish = function (messageName, payload) {
                this._subscriptions.filter(function (i) { return i.messageName === messageName; }).forEach(function (i) { return i.callback.bind(i.source).call(new Message(messageName, payload)); });
            };
            return Messenger;
        }());
        Utils.Messenger = Messenger;
        var Message = /** @class */ (function () {
            function Message(name, payload) {
                this._name = name;
            }
            Object.defineProperty(Message.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            return Message;
        }());
        Utils.Message = Message;
        var Subscription = /** @class */ (function () {
            function Subscription() {
            }
            return Subscription;
        }());
    })(Utils = Lightspeed.Utils || (Lightspeed.Utils = {}));
})(Lightspeed || (Lightspeed = {}));
/// <reference path="../LightSpeed/Utils/Messenger.ts" />
var Megaparsec;
(function (Megaparsec) {
    Megaparsec.menuSceneName = "Menu Scene";
    Megaparsec.gamePlaySceneName = "Game Play Scene";
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this) || this;
            _this._pauseMessage = new Megaparsec.Message(Config.strings.pauseMessage, Config.strings.pauseSubtext);
            Game.messenger.subscribe(_this, GameMessages.playerKilled, _this.onPlayerKilled);
            return _this;
        }
        Object.defineProperty(Game, "messenger", {
            get: function () {
                return this._messenger;
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.load = function (config) {
            this.clear();
            // Game Play Scene
            this.setScene(Megaparsec.gamePlaySceneName);
            this.pushElement(new Megaparsec.Background());
            this.pushElement(new Megaparsec.StarField(200));
            this.loadPlayer();
            this.loadTimeline();
            // Menu Scene
            this.setScene(Megaparsec.menuSceneName);
            var starField = new Megaparsec.StarField(200);
            starField.velocity = new Vector(-500, 0);
            this.pushElement(new Megaparsec.Background());
            this.pushElement(starField);
            this.pushElement(new Megaparsec.MainMenu());
        };
        Game.prototype.loadPlayer = function () {
            this._player = new Megaparsec.Player();
            this._player.position = new Lightspeed.Vector(100, 100);
            this.pushElement(this._player);
        };
        Game.prototype.loadTimeline = function () {
            this.pushElement(Megaparsec.TimelinePresets.classic());
        };
        Game.prototype.onPause = function (scene) {
            if (scene.name === Megaparsec.gamePlaySceneName) {
                this.setScene(Megaparsec.menuSceneName);
            }
        };
        Game.prototype.onUnpause = function (scene) {
            if (scene.name === Megaparsec.gamePlaySceneName) {
                this.setScene(Megaparsec.gamePlaySceneName);
            }
        };
        Game.prototype.onPlayerKilled = function (message) {
            var _this = this;
            this.requestTimeout(500, null, function (context) { return _this.loadPlayer(); });
        };
        Game.run = function () {
            var game = Game.s_current = new Game();
            game.load(Config);
            game.run();
            var gamePlayScene = game.getScene(Megaparsec.gamePlaySceneName);
            Keyboard.Current.keys(Config.keys.pause, function () { return gamePlayScene.togglePause(); });
            window.addEventListener('blur', function () {
                if (!gamePlayScene.isPaused) {
                    gamePlayScene.pause();
                }
            });
        };
        Game._messenger = new Lightspeed.Utils.Messenger();
        return Game;
    }(Lightspeed.Engine));
    Megaparsec.Game = Game;
    var GameMessages = /** @class */ (function () {
        function GameMessages() {
        }
        GameMessages.playerKilled = 'playerKilled';
        return GameMessages;
    }());
    Megaparsec.GameMessages = GameMessages;
})(Megaparsec || (Megaparsec = {}));
var Lightspeed;
(function (Lightspeed) {
    var Utils;
    (function (Utils) {
        var Keyboard = /** @class */ (function () {
            function Keyboard() {
                this._handlers = [];
                this._currentKeys = {};
                var self = this;
                window.document.addEventListener('keydown', function (event) { return self.onKeyDown(event); });
                window.document.addEventListener('keyup', function (event) { return self.onKeyUp(event); });
            }
            Keyboard.prototype.key = function (keyCode, callback) {
                if (callback) {
                    this._handlers.push({
                        keyCode: keyCode,
                        callback: callback
                    });
                }
                return !!this._currentKeys[keyCode];
            };
            Keyboard.prototype.keys = function (keyCodes, callback) {
                var anyPressed = false;
                for (var i = 0; i < keyCodes.length; i++) {
                    anyPressed = anyPressed || this.key(keyCodes[i], callback);
                }
                return anyPressed;
            };
            Keyboard.prototype.onKeyDown = function (event) {
                var handlers = this._handlers.filter(function (i) { return i.keyCode === event.code; });
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i].callback(event);
                }
                this._currentKeys[event.code] = true;
            };
            Keyboard.prototype.onKeyUp = function (event) {
                this._currentKeys[event.code] = false;
            };
            Keyboard.Current = new Keyboard();
            return Keyboard;
        }());
        Utils.Keyboard = Keyboard;
    })(Utils = Lightspeed.Utils || (Lightspeed.Utils = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Utils;
    (function (Utils) {
        var Random = /** @class */ (function () {
            function Random() {
            }
            Random.prototype.getBetween = function (min, max) {
                return (max - min) * this.next() + min;
            };
            Random.prototype.getIntBetween = function (min, max) {
                return Math.floor(this.getBetween(min, max));
            };
            Random.prototype.next = function (factor) {
                return Math.random() * (factor || 1);
            };
            Random.prototype.nextInt = function (upperBound) {
                return Math.floor(Math.random() * (upperBound || 10));
            };
            Random.prototype.pick = function (array) {
                var index = this.nextInt(array.length);
                return array[index];
            };
            Random.Current = new Random();
            return Random;
        }());
        Utils.Random = Random;
    })(Utils = Lightspeed.Utils || (Lightspeed.Utils = {}));
})(Lightspeed || (Lightspeed = {}));
/// <reference path="../LightSpeed/Utils/Keyboard.ts" />
/// <reference path="../LightSpeed/Utils/Random.ts" />
/// <reference path="../LightSpeed/Utils/Messenger.ts" />
var Vector = Lightspeed.Vector;
var Box = Lightspeed.Box;
var Keyboard = Lightspeed.Utils.Keyboard;
var Messenger = Lightspeed.Utils.Messenger;
var Random = Lightspeed.Utils.Random;
/// <reference path="../Lightspeed/Utils/Keyboard.ts" />
/// <reference path="../Lightspeed/Utils/Random.ts" />
var Megaparsec;
(function (Megaparsec) {
    var Color = /** @class */ (function () {
        function Color() {
        }
        Color.getRandomColor = function () {
            var letters = '89ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Random.Current.nextInt(letters.length)];
            }
            return color;
        };
        Color.getRandomShade = function (base, minShade, maxShade) {
            return Color.lum(base, Random.Current.getBetween(minShade, maxShade));
        };
        Color.lum = function (color, percent) {
            var f = parseInt(color.slice(1), 16);
            var t = percent < 0 ? 0 : 255;
            var p = percent < 0 ? percent * -1 : percent;
            var R = f >> 16;
            var G = f >> 8 & 0x00FF;
            var B = f & 0x0000FF;
            return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
        };
        return Color;
    }());
    Megaparsec.Color = Color;
})(Megaparsec || (Megaparsec = {}));
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var UiElement = /** @class */ (function () {
            function UiElement() {
                this.backgroundColor = 'transparent';
                this.borderThickness = 1;
                this.padding = new UI.Thickness(5);
                this.margin = new UI.Thickness(0);
            }
            UiElement.prototype.render = function (context) {
                var ctx = context.ctx;
                ctx.save();
                ctx.fillStyle = this.backgroundColor;
                if (this.borderColor && this.borderThickness) {
                    ctx.strokeStyle = this.borderColor;
                    ctx.lineWidth = this.borderThickness;
                }
                var renderSizeLessMargins = this.renderSize;
                renderSizeLessMargins = this.margin.reduce(renderSizeLessMargins);
                renderSizeLessMargins = renderSizeLessMargins.inflate(-this.borderThickness, -this.borderThickness);
                ctx.fillRect(renderSizeLessMargins.left, renderSizeLessMargins.top, renderSizeLessMargins.width, renderSizeLessMargins.height);
                ctx.strokeRect(renderSizeLessMargins.left, renderSizeLessMargins.top, renderSizeLessMargins.width, renderSizeLessMargins.height);
                ctx.restore();
            };
            UiElement.prototype.arrange = function (context, finalSize) {
                var size = finalSize;
                return finalSize;
            };
            return UiElement;
        }());
        UI.UiElement = UiElement;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
/// <reference path="UiElement.ts" />
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var Interface = /** @class */ (function (_super) {
            __extends(Interface, _super);
            function Interface(content) {
                var _this = _super.call(this) || this;
                _this.content = content;
                return _this;
            }
            Interface.prototype.render = function (context) {
                var interfaceRenderContext = new UI.InterfaceRenderContext(null, context);
                var contentBox = this.content.measure(interfaceRenderContext, context.canvasWidth, context.canvasHeight);
                var finalSize = new Lightspeed.Box(0, 0, Math.min(context.canvasWidth, contentBox.width), Math.min(context.canvasHeight, contentBox.height));
                this.content.renderSize = this.content.arrange(interfaceRenderContext, finalSize);
                this.content.renderSize = finalSize;
                this.content.render(interfaceRenderContext);
            };
            return Interface;
        }(Lightspeed.Element));
        UI.Interface = Interface;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var InterfaceRenderContext = /** @class */ (function () {
            function InterfaceRenderContext(parent, frameRenderContext, regionBox) {
                this._parent = parent;
                this._frameRenderContext = frameRenderContext;
                this._regionBox = regionBox || new Lightspeed.Box(0, 0, frameRenderContext.canvasWidth, frameRenderContext.canvasHeight);
            }
            Object.defineProperty(InterfaceRenderContext.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InterfaceRenderContext.prototype, "ctx", {
                get: function () {
                    return this._frameRenderContext.ctx;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InterfaceRenderContext.prototype, "regionBox", {
                get: function () {
                    return this._regionBox;
                },
                enumerable: true,
                configurable: true
            });
            return InterfaceRenderContext;
        }());
        UI.InterfaceRenderContext = InterfaceRenderContext;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
/// <reference path="UiElement.ts" />
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var StackPanel = /** @class */ (function (_super) {
            __extends(StackPanel, _super);
            function StackPanel(items) {
                var _this = _super.call(this) || this;
                _this.items = [];
                _this.items = items || [];
                return _this;
            }
            StackPanel.prototype.render = function (context) {
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    item.render(context);
                }
            };
            StackPanel.prototype.measure = function (context, width, height) {
                var desiredWidth = 0;
                var desiredHeight = 0;
                var remainingHeight = height;
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    var itemBox = item.measure(context, width, remainingHeight);
                    desiredWidth = Math.max(desiredWidth, itemBox.width);
                    desiredHeight += itemBox.height;
                    remainingHeight = Math.max(remainingHeight - itemBox.height, 0);
                }
                return new Lightspeed.Box(0, 0, desiredWidth, desiredHeight);
            };
            StackPanel.prototype.arrange = function (context, finalSize) {
                var nextTop = 0;
                var desiredWidth = 0;
                var desiredHeight = 0;
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    var itemBox = new Lightspeed.Box(item.desiredSize.left, nextTop, item.desiredSize.width, item.desiredSize.height);
                    itemBox = item.arrange(context, itemBox);
                    item.renderSize = itemBox;
                    desiredWidth = Math.max(desiredWidth, itemBox.width);
                    desiredHeight += itemBox.height;
                    nextTop += itemBox.height;
                }
                return new Lightspeed.Box(finalSize.left, finalSize.top, desiredWidth, desiredHeight);
            };
            return StackPanel;
        }(UI.UiElement));
        UI.StackPanel = StackPanel;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var TextElement = /** @class */ (function (_super) {
            __extends(TextElement, _super);
            function TextElement() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.text = '';
                _this.fontColor = 'white';
                _this.fontSize = 14;
                _this.fontFamily = 'Arial';
                return _this;
            }
            TextElement.prototype.render = function (context) {
                var ctx = context.ctx;
                ctx.save();
                _super.prototype.render.call(this, context);
                ctx.fillStyle = this.fontColor;
                ctx.font = this.fontSize + "px " + this.fontFamily;
                var textMetrics = ctx.measureText(this.text);
                var renderSizeLessPaddingAndBorder = this.renderSize;
                renderSizeLessPaddingAndBorder = this.margin.reduce(this.renderSize);
                renderSizeLessPaddingAndBorder = renderSizeLessPaddingAndBorder.inflate(-this.borderThickness, -this.borderThickness);
                ctx.fillText(this.text, renderSizeLessPaddingAndBorder.left, renderSizeLessPaddingAndBorder.top + this.fontSize);
                ctx.restore();
            };
            TextElement.prototype.measure = function (context, width, height) {
                var ctx = context.ctx;
                ctx.save();
                ctx.font = this.fontSize + "px " + this.fontFamily;
                var textMetrics = ctx.measureText(this.text);
                ctx.restore();
                this.desiredSize = new Lightspeed.Box(0, 0, textMetrics.width, this.fontSize);
                this.desiredSize = this.margin.increase(this.desiredSize);
                this.desiredSize = this.padding.increase(this.desiredSize);
                this.desiredSize = this.desiredSize.inflate(this.borderThickness, this.borderThickness);
                return this.desiredSize;
            };
            return TextElement;
        }(UI.UiElement));
        UI.TextElement = TextElement;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var Thickness = /** @class */ (function () {
            function Thickness(left, top, right, bottom) {
                if (right && bottom) {
                    this.left = left;
                    this.top = top;
                    this.right = right;
                    this.bottom = bottom;
                }
                else if (top) {
                    this.left = left;
                    this.top = top;
                    this.right = left;
                    this.bottom = top;
                }
                else {
                    this.left = left;
                    this.top = left;
                    this.right = left;
                    this.bottom = left;
                }
            }
            Thickness.prototype.reduce = function (box) {
                return new Lightspeed.Box(box.left + this.left, box.top + this.top, box.width - (this.left + this.right), box.height - (this.top + this.bottom));
            };
            Thickness.prototype.increase = function (box) {
                return new Lightspeed.Box(box.left - this.left, box.top - this.top, box.width + (this.left + this.right), box.height + (this.top + this.bottom));
            };
            return Thickness;
        }());
        UI.Thickness = Thickness;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
/// <reference path="../../LightSpeed/InertialElement.ts" />
var Megaparsec;
(function (Megaparsec) {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        function GameObject(width, height, constrainer) {
            var _this = _super.call(this) || this;
            _this.controllerProperties = {};
            _this._box = new Box(-width / 2, -height / 2, width, height);
            _this._constrainer = constrainer;
            return _this;
        }
        Object.defineProperty(GameObject.prototype, "width", {
            get: function () {
                return this.box.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "height", {
            get: function () {
                return this.box.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "box", {
            get: function () {
                return this._box.offsetV(this.position);
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.update = function (context) {
            this._constrainer.constrain(this, context);
            _super.prototype.update.call(this, context);
        };
        GameObject.prototype.collidesWith = function (other) {
            if (other instanceof GameObject == false) {
                return false;
            }
            return this.box.collides(other.box);
        };
        GameObject.prototype.updateBox = function (width, height) {
            this._box = new Box(-width / 2, -height / 2, width, height);
        };
        return GameObject;
    }(Lightspeed.InertialElement));
    Megaparsec.GameObject = GameObject;
})(Megaparsec || (Megaparsec = {}));
/// <reference path="GameObject.ts" />
var Megaparsec;
(function (Megaparsec) {
    var Agent = /** @class */ (function (_super) {
        __extends(Agent, _super);
        function Agent(controller, constrainer, sprite, sheild) {
            var _this = _super.call(this, sprite.width, sprite.height, constrainer) || this;
            _this.controllerProperties = {};
            _this._controller = controller;
            _this._sprite = sprite;
            _this._sheild = sheild;
            sprite.registerLoadCallback(function (i) { return _this.updateBox(i.width, i.height); });
            return _this;
        }
        Agent.prototype.init = function (context) {
            this._controller.init(this, context.canvasBox);
        };
        Agent.prototype.update = function (context) {
            if (this._sheild) {
                this._sheild.update(context);
            }
            this._controller.update(this, context);
            _super.prototype.update.call(this, context);
        };
        Agent.prototype.render = function (context) {
            this._sprite.draw(context.ctx, this.position, context.getFrame(100, this._sprite.frameCount));
            if (this._sheild) {
                this._sheild.draw(context.ctx, this.position, this.width, this.height);
            }
        };
        Agent.prototype.onCollide = function (context) {
            if (context.otherElement instanceof Megaparsec.Shot) {
                if (context.otherElement.origin === this) {
                    return;
                }
                if (this._sheild && !this._sheild.collide(context)) {
                    return;
                }
            }
            this.explode(context);
        };
        Agent.prototype.explode = function (context) {
            this.kill();
            context.pushElement(new Megaparsec.Explosion(this));
        };
        return Agent;
    }(Megaparsec.GameObject));
    Megaparsec.Agent = Agent;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy(controller, constrainer, sprite, sheild) {
            return _super.call(this, controller, constrainer, sprite, sheild) || this;
        }
        Enemy.prototype.onCollide = function (context) {
            if (context.otherElement instanceof Enemy) {
                return;
            }
            _super.prototype.onCollide.call(this, context);
        };
        return Enemy;
    }(Megaparsec.Agent));
    Megaparsec.Enemy = Enemy;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player() {
            return _super.call(this, new Megaparsec.Human, Megaparsec.Constrainer.boxIn, new Lightspeed.Sprite(Config.agents.player.image, Config.imageScale), null) || this;
        }
        Player.prototype.onKill = function () {
            Megaparsec.Game.messenger.publish(Megaparsec.GameMessages.playerKilled);
        };
        return Player;
    }(Megaparsec.Agent));
    Megaparsec.Player = Player;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Sheild = /** @class */ (function () {
        function Sheild(color) {
            this._color = 'green';
            this._color = color;
        }
        Sheild.prototype.collide = function (context) {
            return true; // true indicates sheild has failed.
        };
        Sheild.prototype.update = function (context) {
            // optionally overloaded by subclasses.
        };
        Sheild.prototype.draw = function (ctx, position, width, height) {
            if (this.isActive()) {
                ctx.save();
                ctx.globalAlpha = this.getSheildRatio();
                ctx.lineWidth = 2.0;
                ctx.strokeStyle = this._color;
                ctx.fillStyle = this._color;
                ctx.beginPath();
                ctx.ellipse(position.x, position.y, width * 0.8, height * 0.8, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 0.1;
                ctx.fill();
                ctx.restore();
            }
        };
        return Sheild;
    }());
    Megaparsec.Sheild = Sheild;
    var EnergySheild = /** @class */ (function (_super) {
        __extends(EnergySheild, _super);
        function EnergySheild(strength, color) {
            var _this = _super.call(this, color || 'blue') || this;
            _this._strength = strength;
            return _this;
        }
        EnergySheild.prototype.collide = function (context) {
            this._strength--;
            return this._strength < 0;
        };
        EnergySheild.prototype.isActive = function () {
            return this._strength > 0;
        };
        EnergySheild.prototype.getSheildRatio = function () {
            return Math.min(1, this._strength / 5);
        };
        return EnergySheild;
    }(Sheild));
    Megaparsec.EnergySheild = EnergySheild;
    var TimeSheild = /** @class */ (function (_super) {
        __extends(TimeSheild, _super);
        function TimeSheild(time, color) {
            var _this = _super.call(this, color || 'red') || this;
            _this._elapsed = 0;
            _this._time = time;
            return _this;
        }
        TimeSheild.prototype.update = function (context) {
            this._elapsed = this._elapsed + context.elapsed;
        };
        TimeSheild.prototype.collide = function (context) {
            return this._elapsed >= this._time;
        };
        TimeSheild.prototype.isActive = function () {
            return this._elapsed < this._time;
        };
        TimeSheild.prototype.getSheildRatio = function () {
            return Math.min(1, (this._time - this._elapsed) / this._time);
        };
        return TimeSheild;
    }(Sheild));
    Megaparsec.TimeSheild = TimeSheild;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Shot = /** @class */ (function (_super) {
        __extends(Shot, _super);
        function Shot(origin, velocity, acceleration) {
            var _this = _super.call(this, 20, 2.5, Megaparsec.Constrainer.killOutOfBounds) || this;
            _this._passesThroughOnHit = false;
            _this._origin = origin;
            _this._color = 'CornFlowerBlue';
            _this.position = origin.position;
            _this.velocity = velocity;
            acceleration && (_this.acceleration = acceleration);
            return _this;
        }
        Object.defineProperty(Shot.prototype, "origin", {
            get: function () {
                return this._origin;
            },
            enumerable: true,
            configurable: true
        });
        Shot.prototype.update = function (context) {
            if (!context.canvasBox.collides(this.box)) {
                this.kill();
            }
            _super.prototype.update.call(this, context);
        };
        Shot.prototype.render = function (context) {
            var ctx = context.ctx;
            var box = this.box;
            ctx.fillStyle = this._color;
            ctx.fillRect(box.left, box.top, box.width, box.height);
        };
        Shot.prototype.onCollide = function (context) {
            if (context.otherElement === this._origin) {
                return;
            }
            if (!this._passesThroughOnHit) {
                this.kill();
            }
        };
        return Shot;
    }(Megaparsec.GameObject));
    Megaparsec.Shot = Shot;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Wave = /** @class */ (function (_super) {
        __extends(Wave, _super);
        function Wave(config, level) {
            var _this = _super.call(this) || this;
            _this._agents = [];
            _this._activeAgents = [];
            _this._waveMode = WaveMode.OffsetWaveMode;
            _this._delay = 1000.0; // 1 second.
            _this._interval = 2000.0; // 2 seconds; 
            _this._isFirstUpdate = true;
            _this._config = config;
            _this._level = level || 1;
            _this._waveCount = config.waveCount;
            _this._waveMode = WaveMode[config.waveMode];
            _this._delay = config.delay || _this._delay;
            _this._interval = config.interval || _this._interval;
            if (config.levelBasedInterval && config.levelBasedInterval.length) {
                _this._interval = config.levelBasedInterval[Math.min(config.levelBasedInterval.length - 1, _this._level)];
            }
            return _this;
        }
        Wave.prototype.init = function (context) {
            var _this = this;
            var controllers = this._config.controllers.map(function (i) { return Megaparsec.ControllerFactory.current.create(i, _this._level); });
            var horizontalConstraintTopology = Megaparsec.ConstraintToplogy[this._config.horizontalConstraintTopology];
            var verticalConstraintTopology = Megaparsec.ConstraintToplogy[this._config.verticalConstraintTopology];
            var constrainer = new Megaparsec.Constrainer(horizontalConstraintTopology, verticalConstraintTopology);
            var waveCount = this._waveCount || this._config.images.length;
            for (var i = 0; i < waveCount; i++) {
                var image = this._config.images[i % this._config.images.length];
                var width = this._config.width;
                var height = this._config.height;
                var frameCount = this._config.frameCount;
                var scale = 1;
                if (width && height && this._config.scaleRange) {
                    scale = this._config.scaleRange[0] + Random.Current.next(this._config.scaleRange[1] - this._config.scaleRange[0]);
                    width *= scale;
                    height *= scale;
                }
                var sprite = new Lightspeed.Sprite(image, width, height, frameCount);
                var controller = Random.Current.pick(controllers);
                var sheild;
                if (this._level > 1) {
                    if (this._config.sheildType === 'Time') {
                        sheild = new Megaparsec.TimeSheild((this._level - 1) * 2000);
                    }
                    else if (this._config.sheildType === 'Energy') {
                        sheild = new Megaparsec.EnergySheild(this._level - 1);
                    }
                }
                var agent = new Megaparsec.Enemy(controller, constrainer, sprite, sheild);
                this._agents.push(agent);
            }
        };
        Wave.prototype.update = function (context) {
            // Purge dead agents.
            this._agents = this._agents.filter(function (i) { return !i.isDead; });
            this._activeAgents = this._activeAgents.filter(function (i) { return !i.isDead; });
            if (!this._agents.length) {
                this.kill();
                return;
            }
            if (this._waveMode == WaveMode.OffsetWaveMode) {
                this.updateOffset(context);
            }
            else if (this._waveMode == WaveMode.InstantWaveMode) {
                this.updateInstant(context);
            }
            else {
                this.updateSerial(context);
            }
            this._isFirstUpdate = false;
        };
        Wave.prototype.updateSerial = function (context) {
            if (!this._activeAgents.length) {
                var newAgent = this._agents[0];
                context.pushElement(newAgent);
                this._activeAgents.push(newAgent);
            }
        };
        Wave.prototype.updateOffset = function (context) {
            if (this._isFirstUpdate) {
                context.requestTimeout(this._delay, this, this.udpateOffsetTimeout);
            }
        };
        Wave.prototype.udpateOffsetTimeout = function (context) {
            var _this = this;
            // Get agents not in the active agents list.
            var agentsLeft = this._agents.filter(function (i) { return _this._activeAgents.indexOf(i) === -1; });
            if (agentsLeft.length) {
                var newAgent = agentsLeft[0];
                context.pushElement(newAgent);
                this._activeAgents.push(newAgent);
            }
            if (agentsLeft.length > 1) {
                context.requestTimeout(this._interval, this, this.udpateOffsetTimeout);
            }
        };
        Wave.prototype.updateInstant = function (context) {
            if (this._isFirstUpdate) {
                for (var i = 0; i < this._agents.length; i++) {
                    var agent = this._agents[i];
                    context.pushElement(agent);
                    this._activeAgents.push(agent);
                }
            }
        };
        return Wave;
    }(Lightspeed.Element));
    Megaparsec.Wave = Wave;
    var WaveMode;
    (function (WaveMode) {
        WaveMode[WaveMode["SerialWaveMode"] = 1] = "SerialWaveMode";
        WaveMode[WaveMode["OffsetWaveMode"] = 2] = "OffsetWaveMode";
        WaveMode[WaveMode["InstantWaveMode"] = 3] = "InstantWaveMode"; // All agents released at once
    })(WaveMode = Megaparsec.WaveMode || (Megaparsec.WaveMode = {}));
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Controller = /** @class */ (function () {
        function Controller(level) {
            this._level = 1;
            this._maximumVelocityX = 200;
            this._level = level;
            this._maximumVelocityX = Math.min(500, 200 + 10 * (level - 1));
        }
        Object.defineProperty(Controller.prototype, "level", {
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        Controller.prototype.init = function (agent, constraintBox) {
            agent.controllerProperties.constrain = true;
            // optionally overloaded by extending classes to set given agents initial position.
        };
        Controller.prototype.update = function (agent, context) {
            this.updateAgent(agent, context);
        };
        Controller.prototype.updateAgent = function (agent, context) {
        };
        Controller.prototype.cruise = function (agent, context) {
            var properties = agent.controllerProperties;
            properties.constraint = true;
            if (!properties.cruiseVelocity) {
                properties.cruiseVelocity = agent.velocity;
            }
            var drift = 0.2;
            agent.acceleration = new Vector(-drift + Random.Current.next(drift * 2), -drift + Random.Current.next(drift * 2));
        };
        return Controller;
    }());
    Megaparsec.Controller = Controller;
})(Megaparsec || (Megaparsec = {}));
/// <reference path="Controller.ts" />
var Megaparsec;
(function (Megaparsec) {
    var Bounce = /** @class */ (function (_super) {
        __extends(Bounce, _super);
        function Bounce(config, level) {
            var _this = _super.call(this, level) || this;
            _this._bounceDistance = 100;
            _this._bounceJolt = 400;
            return _this;
        }
        Bounce.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 'swooping';
            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;
            agent.position = new Vector(zoneLeft + Random.Current.next(zoneWidth), -agent.height * 2.0);
            var zoneHeight = (constraintBox.height - this._bounceDistance) * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Random.Current.next(zoneHeight);
            properties.initialVelocity = new Vector(-150, 400);
            properties.targetVelocity = new Vector(-300, 0);
            agent.velocity = properties.initialVelocity;
        };
        Bounce.prototype.updateAgent = function (agent, context) {
            var _this = this;
            var properties = agent.controllerProperties;
            if (properties.phase === 'swooping') {
                if (agent.position.y > (properties.targetY + this._bounceDistance)) {
                    agent.velocity = properties.targetVelocity.with(function (x) { return x - _this._bounceJolt; }, function (y) { return -_this._bounceJolt; });
                    properties.positionAfterPhase0 = agent.position;
                    properties.velocityAfterPhase0 = agent.velocity;
                    properties.phase = 'bouncing';
                }
                return;
            }
            if (properties.phase === 'bouncing') {
                var percentToTarget = (agent.position.y - properties.targetY) / (properties.positionAfterPhase0.y - properties.targetY);
                agent.velocity = new Vector(properties.targetVelocity.x + (-this._bounceJolt * percentToTarget), percentToTarget * properties.velocityAfterPhase0.y);
                if (Math.abs(agent.position.y - properties.targetY) < 1) {
                    if (agent.velocity.x > -this._maximumVelocityX) {
                        agent.acceleration = new Vector(-0.1, 0);
                        properties.phase = 'accelerating';
                    }
                    else {
                        agent.acceleration = new Vector(1, 0);
                        properties.phase = 'decelerating';
                    }
                    properties.constrain = true;
                }
                return;
            }
            if (properties.phase === 'accelerating') {
                if (agent.velocity.x <= -this._maximumVelocityX) {
                    agent.velocity = agent.velocity.withX(function (x) { return -_this._maximumVelocityX; });
                    agent.acceleration = new Vector();
                    properties.phase = 'cruising';
                }
                return;
            }
            if (properties.phase === 'decelerating') {
                if (agent.velocity.x > -this._maximumVelocityX) {
                    agent.velocity = agent.velocity.withX(function (x) { return -_this._maximumVelocityX; });
                    agent.acceleration = new Vector();
                    properties.phase = 'cruising';
                }
                return;
            }
            _super.prototype.cruise.call(this, agent, context);
        };
        return Bounce;
    }(Megaparsec.Controller));
    Megaparsec.Bounce = Bounce;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Constrainer = /** @class */ (function () {
        function Constrainer(horizontalConstraintTopology, verticalConstraintTopology) {
            this._horizontalConstraintTopology = horizontalConstraintTopology;
            this._verticalConstraintTopology = verticalConstraintTopology;
        }
        Constrainer.prototype.constrain = function (gameObject, context) {
            var constraintBox = context.canvasBox;
            if (constraintBox.contains(gameObject.box) || !gameObject.controllerProperties.constrain) {
                return true;
            }
            if (this._horizontalConstraintTopology == ConstraintToplogy.Block) {
                if (gameObject.box.left < constraintBox.left) {
                    gameObject.position = gameObject.box.alignLeft(constraintBox.left).center;
                }
                if (gameObject.box.right > constraintBox.right) {
                    gameObject.position = gameObject.box.alignRight(constraintBox.right).center;
                }
                gameObject.acceleration = new Lightspeed.Vector(0, gameObject.acceleration.y);
                gameObject.velocity = new Lightspeed.Vector(0, gameObject.velocity.y);
            }
            if (this._horizontalConstraintTopology == ConstraintToplogy.Wrap) {
                if (gameObject.box.right < constraintBox.left && gameObject.velocity.x <= 0) {
                    gameObject.position = gameObject.box.alignLeft(constraintBox.right).offset(gameObject.box.width * 2, 0).center;
                }
                if (gameObject.box.left > constraintBox.right && gameObject.velocity.x >= 0) {
                    gameObject.position = gameObject.box.alignRight(constraintBox.left).offset(-gameObject.box.width * 2, 0).center;
                }
            }
            if (this._horizontalConstraintTopology == ConstraintToplogy.Kill) {
                if (gameObject.box.right < constraintBox.left && gameObject.velocity.x <= 0) {
                    gameObject.kill();
                }
                if (gameObject.box.left > constraintBox.right && gameObject.velocity.x >= 0) {
                    gameObject.kill();
                }
            }
            if (this._verticalConstraintTopology == ConstraintToplogy.Block) {
                if (gameObject.box.top < constraintBox.top) {
                    gameObject.position = gameObject.box.alignTop(constraintBox.top).center;
                }
                if (gameObject.box.bottom > constraintBox.bottom) {
                    gameObject.position = gameObject.box.alignBottom(constraintBox.bottom).center;
                }
                gameObject.acceleration = new Lightspeed.Vector(gameObject.acceleration.x, 0);
                gameObject.velocity = new Lightspeed.Vector(gameObject.velocity.x, 0);
            }
            if (this._verticalConstraintTopology == ConstraintToplogy.Wrap) {
                if (gameObject.box.bottom < constraintBox.top && gameObject.velocity.y >= 0) {
                    gameObject.position = gameObject.box.alignTop(constraintBox.bottom).offset(0, gameObject.box.height * 2).center;
                }
                else if (gameObject.box.top > constraintBox.bottom && gameObject.velocity.y <= 0) {
                    gameObject.position = gameObject.box.alignBottom(constraintBox.top).offset(0, -gameObject.box.height * 2).center;
                }
            }
            if (this._verticalConstraintTopology == ConstraintToplogy.Kill) {
                if (gameObject.box.bottom < constraintBox.top && gameObject.velocity.y >= 0) {
                    gameObject.kill();
                }
                else if (gameObject.box.top > constraintBox.bottom && gameObject.velocity.y <= 0) {
                    gameObject.kill();
                }
            }
            return false;
        };
        Object.defineProperty(Constrainer, "killOutOfBounds", {
            get: function () {
                return new Constrainer(ConstraintToplogy.Kill, ConstraintToplogy.Kill);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constrainer, "boxIn", {
            get: function () {
                return new Constrainer(ConstraintToplogy.Block, ConstraintToplogy.Block);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constrainer, "wrapHorizontally", {
            get: function () {
                return new Constrainer(ConstraintToplogy.Wrap, ConstraintToplogy.Block);
            },
            enumerable: true,
            configurable: true
        });
        return Constrainer;
    }());
    Megaparsec.Constrainer = Constrainer;
    var ConstraintToplogy;
    (function (ConstraintToplogy) {
        ConstraintToplogy[ConstraintToplogy["None"] = 0] = "None";
        ConstraintToplogy[ConstraintToplogy["Block"] = 1] = "Block";
        ConstraintToplogy[ConstraintToplogy["Wrap"] = 2] = "Wrap";
        ConstraintToplogy[ConstraintToplogy["Kill"] = 3] = "Kill";
    })(ConstraintToplogy = Megaparsec.ConstraintToplogy || (Megaparsec.ConstraintToplogy = {}));
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Swoop = /** @class */ (function (_super) {
        __extends(Swoop, _super);
        function Swoop(config, level) {
            return _super.call(this, level) || this;
        }
        Swoop.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 'swooping';
            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;
            agent.position = new Lightspeed.Vector(zoneLeft + Random.Current.next(zoneWidth), -agent.height * 2.0);
            var zoneHeight = constraintBox.height * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Random.Current.next(zoneHeight);
            properties.initialVelocity = new Lightspeed.Vector(0, 400);
            properties.targetVelocity = new Lightspeed.Vector(-300, 0);
            agent.velocity = new Lightspeed.Vector(0, properties.initialVelocity.y);
        };
        Swoop.prototype.updateAgent = function (agent, context) {
            var _this = this;
            var properties = agent.controllerProperties;
            if (properties.phase === 'swooping') {
                var percentToTarget = (agent.position.y - properties.initialY) / (properties.targetY - properties.initialY);
                agent.velocity = new Lightspeed.Vector(percentToTarget * properties.targetVelocity.x, (1 - percentToTarget) * properties.initialVelocity.y);
                if (Math.abs(agent.position.y - properties.targetY) < 1) {
                    agent.acceleration = new Vector(-0.1, 0);
                    properties.constrain = true;
                    properties.phase = 'accelerating';
                }
                return;
            }
            if (properties.phase === 'accelerating') {
                if (agent.velocity.x <= -this._maximumVelocityX) {
                    agent.velocity = agent.velocity.withX(function (x) { return -_this._maximumVelocityX; });
                    agent.acceleration = new Vector();
                    properties.phase = 'cruising';
                }
                return;
            }
            _super.prototype.cruise.call(this, agent, context);
        };
        return Swoop;
    }(Megaparsec.Controller));
    Megaparsec.Swoop = Swoop;
})(Megaparsec || (Megaparsec = {}));
/// <reference path="Controller.ts" />
var Megaparsec;
(function (Megaparsec) {
    var Loop = /** @class */ (function (_super) {
        __extends(Loop, _super);
        function Loop(config, level) {
            var _this = _super.call(this, level) || this;
            _this._loopRadius = 50;
            return _this;
        }
        Loop.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 'swooping';
            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;
            agent.position = new Vector(zoneLeft + Random.Current.next(zoneWidth), -agent.height * 2.0);
            var zoneHeight = (constraintBox.height - this._loopRadius) * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Random.Current.next(zoneHeight);
            properties.initialVelocity = new Vector(-150, 400);
            properties.targetVelocity = new Vector(-300, 0);
            agent.velocity = properties.initialVelocity;
        };
        Loop.prototype.updateAgent = function (agent, context) {
            var _this = this;
            var properties = agent.controllerProperties;
            if (properties.phase === 'swooping') {
                if (agent.position.y > properties.targetY) {
                    properties.loopCenter = agent.position.withX(function (x) { return x + _this._loopRadius; });
                    properties.phase = 'looping';
                }
                return;
            }
            if (properties.phase === 'looping') {
                var velocity = agent.velocity.magnitude * 0.99;
                var angleToLoopCenter = agent.position.angleTo(properties.loopCenter);
                var tangentAngle = angleToLoopCenter + Math.PI * 0.5;
                agent.velocity = Vector.fromPolar(tangentAngle, velocity);
                if (agent.velocity.x < 0 && Math.abs(agent.velocity.y) < 20) {
                    agent.velocity = new Vector(-agent.velocity.magnitude, 0);
                    if (agent.velocity.x > -this._maximumVelocityX) {
                        agent.acceleration = new Vector(-0.1, 0);
                        properties.phase = 'accelerating';
                    }
                    else {
                        agent.acceleration = new Vector(1, 0);
                        properties.phase = 'decelerating';
                    }
                    properties.constrain = true;
                }
                return;
            }
            if (properties.phase === 'accelerating') {
                if (agent.velocity.x <= -this._maximumVelocityX) {
                    agent.velocity = agent.velocity.withX(function (x) { return -_this._maximumVelocityX; });
                    agent.acceleration = new Vector();
                    properties.phase = 'cruising';
                }
                return;
            }
            if (properties.phase === 'decelerating') {
                if (agent.velocity.x > -this._maximumVelocityX) {
                    agent.velocity = agent.velocity.withX(function (x) { return -_this._maximumVelocityX; });
                    agent.acceleration = new Vector();
                    properties.phase = 'cruising';
                }
                return;
            }
            _super.prototype.cruise.call(this, agent, context);
        };
        return Loop;
    }(Megaparsec.Controller));
    Megaparsec.Loop = Loop;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Wobble = /** @class */ (function (_super) {
        __extends(Wobble, _super);
        function Wobble(config, level) {
            var _this = _super.call(this, level) || this;
            _this._amplitude = 50;
            return _this;
        }
        Wobble.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 'swooping';
            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;
            agent.position = new Vector(zoneLeft + Random.Current.next(zoneWidth), -agent.height * 2.0);
            var zoneHeight = constraintBox.height * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Random.Current.next(zoneHeight);
            properties.initialVelocity = new Vector(0, 400);
            properties.targetVelocity = new Vector(-300, 0);
            agent.velocity = new Vector(0, properties.initialVelocity.y);
        };
        Wobble.prototype.updateAgent = function (agent, context) {
            var _this = this;
            var properties = agent.controllerProperties;
            if (properties.phase === 'swooping') {
                var percentToTarget = (agent.position.y - properties.initialY) / ((properties.targetY + this._amplitude) - properties.initialY);
                agent.velocity = agent.velocity.withX(function (x) { return percentToTarget * properties.targetVelocity.x; });
                if (agent.position.y > properties.targetY + this._amplitude) {
                    agent.acceleration = new Vector(0, -this._amplitude);
                    properties.isWobblingDown = true;
                    properties.amplitudeFactor = 1;
                    properties.phase = 'wobble';
                }
                return;
            }
            if (properties.phase === 'wobble') {
                if (agent.position.y < properties.targetY && !properties.isWobblingDown) {
                    agent.velocity = agent.velocity.withY(function (y) { return y * 0.75; });
                    agent.acceleration = new Vector(0, this._amplitude);
                    properties.isWobblingDown = true;
                }
                if (agent.position.y >= properties.targetY && properties.isWobblingDown) {
                    agent.velocity = agent.velocity.withY(function (y) { return y * 0.75; });
                    agent.acceleration = new Vector(0, -this._amplitude);
                    properties.isWobblingDown = false;
                }
                if (Math.abs(agent.velocity.y) < 50 && Math.abs(agent.position.y - properties.targetY) < 5) {
                    if (agent.velocity.y > 0) {
                        agent.acceleration = new Vector(1, -0.5);
                    }
                    else {
                        agent.acceleration = new Vector(1, 0.5);
                    }
                    properties.phase = 'accelerating';
                    properties.constrain = true;
                }
                return;
            }
            if (properties.phase === 'accelerating') {
                if ((agent.acceleration.y > 0 && agent.velocity.y > 0) ||
                    (agent.acceleration.y <= 0 && agent.velocity.y <= 0)) {
                    agent.velocity = agent.velocity.withY(function (y) { return 0; });
                    agent.acceleration = agent.acceleration.withY(function (y) { return 0; });
                }
                if (agent.velocity.x > -this._maximumVelocityX) {
                    agent.acceleration = agent.acceleration.withX(function (x) { return 0; });
                    agent.velocity = agent.velocity.withX(function (x) { return -_this._maximumVelocityX; });
                }
                if (!agent.acceleration.x && !agent.acceleration.y) {
                    properties.phase = 'cruising'; // cruising
                }
                return;
            }
            _super.prototype.cruise.call(this, agent, context);
        };
        return Wobble;
    }(Megaparsec.Controller));
    Megaparsec.Wobble = Wobble;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Target = /** @class */ (function (_super) {
        __extends(Target, _super);
        function Target(config, level) {
            var _this = _super.call(this, level) || this;
            _this._lateralVelocity = 50;
            _this._forwardVelocity = 200;
            _this._forwardStep = 50;
            _this._shotSpeed = 1200;
            _this._shotIteration = 500;
            _this._lateralVelocity = Math.min(50 * level, 500);
            return _this;
        }
        Target.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 'moving forward';
            properties.lastFireElapsed = 0;
            properties.targetX = constraintBox.width - 50;
            var zoneTop = constraintBox.height * 0.15;
            var zoneHeight = constraintBox.height - zoneTop * 2;
            agent.position = new Vector(constraintBox.width + 100, zoneTop + Random.Current.next(zoneHeight));
            agent.velocity = new Vector(-200, 0);
        };
        Target.prototype.updateAgent = function (agent, context) {
            var properties = agent.controllerProperties;
            if (properties.phase === 'moving forward') {
                if (agent.position.x < properties.targetX) {
                    agent.velocity = agent.velocity.withX(function (x) { return 0; });
                    properties.phase = 'targetting';
                    return;
                }
            }
            if (properties.phase === 'targetting') {
                var target = context.scene.findFirstElement(function (i) { return i instanceof Megaparsec.Player; });
                if (!target || target.isDead) {
                    agent.velocity = new Vector();
                    return;
                }
                properties.lastFireElapsed += context.elapsed;
                if (Math.abs(agent.position.y - target.position.y) < 5 ||
                    agent.position.y <= target.position.y && agent.velocity.y < 0 ||
                    agent.position.y >= target.position.y && agent.velocity.y > 0) {
                    if (properties.lastFireElapsed > this._shotIteration) {
                        context.pushElement(new Megaparsec.Shot(agent, new Lightspeed.Vector(-this._shotSpeed)));
                        properties.lastFireElapsed = 0;
                        agent.velocity = new Vector(-this._forwardVelocity, 0);
                        properties.targetX = agent.position.x - this._forwardStep;
                        properties.phase = 'moving forward';
                        return;
                    }
                    agent.velocity = new Vector();
                    return;
                }
                if (agent.position.y < target.position.y) {
                    agent.velocity = new Vector(0, this._lateralVelocity);
                    return;
                }
                if (agent.position.y > target.position.y) {
                    agent.velocity = new Vector(0, -this._lateralVelocity);
                    return;
                }
            }
        };
        return Target;
    }(Megaparsec.Controller));
    Megaparsec.Target = Target;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Rain = /** @class */ (function (_super) {
        __extends(Rain, _super);
        function Rain(config, level) {
            var _this = _super.call(this, level) || this;
            _this._horizontalVelocityRange = [-50, 25];
            _this._verticalVelocityRange = [150, 350];
            _this._horizontalVelocityRange = _this._horizontalVelocityRange.map(function (v) { return v * (1 + Math.min(3, (level - 1) * 0.75)); });
            _this._verticalVelocityRange = _this._verticalVelocityRange.map(function (v) { return v * (1 + Math.min(3, (level - 1) * 0.25)); });
            return _this;
        }
        Rain.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 'raining';
            var zoneLeft = constraintBox.width * 0.1;
            var zoneWidth = constraintBox.width - zoneLeft;
            agent.position = new Lightspeed.Vector(zoneLeft + Random.Current.next(zoneWidth), -100);
            agent.velocity = new Lightspeed.Vector(Random.Current.getBetween(this._horizontalVelocityRange[0], this._horizontalVelocityRange[1]), Random.Current.getBetween(this._verticalVelocityRange[0], this._verticalVelocityRange[1]));
        };
        Rain.prototype.updateAgent = function (agent, context) {
            var properties = agent.controllerProperties;
            if (properties.phase === 'raining') {
                if (agent.position.y > context.canvasBox.height) {
                    agent.kill();
                    context.pushElement(new Megaparsec.Explosion(agent, new Vector(-200, 0)));
                }
            }
        };
        return Rain;
    }(Megaparsec.Controller));
    Megaparsec.Rain = Rain;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Flank = /** @class */ (function (_super) {
        __extends(Flank, _super);
        function Flank(config, level) {
            var _this = _super.call(this, level) || this;
            _this._lateralVelocity = 50;
            _this._forwardVelocity = 200;
            _this._forwardStep = 50;
            _this._shotSpeed = 1200;
            _this._shotIteration = 500;
            return _this;
        }
        Flank.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 'rushing in';
            var zoneTop = 0;
            var zoneHeight = constraintBox.height - 100;
            var zoneLeft = constraintBox.width * 0.5;
            var zoneWidth = constraintBox.width - zoneLeft;
            var targetY = zoneTop + Random.Current.next(zoneHeight);
            var targetX = zoneLeft + Random.Current.next(zoneWidth);
            properties.initial = new Vector(-100, targetY + 100);
            agent.position = properties.initial;
            properties.target = new Vector(targetX, targetY);
            properties.initialVelocity = new Vector(800, 0);
            agent.velocity = properties.initialVelocity;
        };
        Flank.prototype.updateAgent = function (agent, context) {
            var properties = agent.controllerProperties;
            if (properties.phase === 'rushing in') {
                var percentToTarget = (properties.target.x - agent.position.x) / (properties.target.x - properties.initial.x);
                agent.velocity = new Vector(properties.initialVelocity.x * percentToTarget, -50 * (1 - percentToTarget));
                if (agent.position.y <= properties.target.y) {
                    agent.velocity = agent.velocity.withY(function (y) { return 0; });
                    agent.acceleration = new Vector(-10, 0);
                    properties.phase = 'reversing';
                    properties.constrain = true;
                }
                return;
            }
            if (properties.phase === 'reversing') {
                if (agent.velocity.x <= -200) {
                    agent.acceleration = new Vector(-0.1, 0);
                    properties.phase = 'accelerating';
                    properties.constrain = true;
                }
                return;
            }
            if (properties.phase === 'accelerating') {
                if (agent.velocity.x <= -this._maximumVelocityX) {
                    agent.velocity = new Vector(-this._maximumVelocityX, 0);
                    agent.acceleration = new Vector();
                    properties.phase = 'cruising';
                }
                return;
            }
            _super.prototype.cruise.call(this, agent, context);
        };
        return Flank;
    }(Megaparsec.Controller));
    Megaparsec.Flank = Flank;
})(Megaparsec || (Megaparsec = {}));
/// <reference path="Swoop.ts" />
/// <reference path="Bounce.ts" />
/// <reference path="Loop.ts" />
/// <reference path="Wobble.ts" />
/// <reference path="Target.ts" />
/// <reference path="Rain.ts" />
/// <reference path="Flank.ts" />
var Megaparsec;
(function (Megaparsec) {
    var ControllerFactory = /** @class */ (function () {
        function ControllerFactory() {
            this._controllerTypesByName = {};
            this.registerControllers();
        }
        ControllerFactory.prototype.registerControllers = function () {
            this._controllerTypesByName['Player'] = Megaparsec.Player;
            this._controllerTypesByName['Swoop'] = Megaparsec.Swoop;
            this._controllerTypesByName['Bounce'] = Megaparsec.Bounce;
            this._controllerTypesByName['Loop'] = Megaparsec.Loop;
            this._controllerTypesByName['Wobble'] = Megaparsec.Wobble;
            this._controllerTypesByName['Target'] = Megaparsec.Target;
            this._controllerTypesByName['Rain'] = Megaparsec.Rain;
            this._controllerTypesByName['Flank'] = Megaparsec.Flank;
        };
        Object.defineProperty(ControllerFactory, "current", {
            get: function () {
                return ControllerFactory._current;
            },
            enumerable: true,
            configurable: true
        });
        ControllerFactory.prototype.create = function (config, level) {
            if (!config.name || !this._controllerTypesByName[config.name]) {
                return new Megaparsec.Controller(level);
            }
            var type = this._controllerTypesByName[config.name];
            return new type(config, level);
        };
        ControllerFactory._current = new ControllerFactory();
        return ControllerFactory;
    }());
    Megaparsec.ControllerFactory = ControllerFactory;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Human = /** @class */ (function (_super) {
        __extends(Human, _super);
        function Human() {
            var _this = _super.call(this, 1) || this;
            _this._maximumVelocity = 500;
            _this._movementAcceleration = 50;
            return _this;
        }
        Human.prototype.updateAgent = function (agent, context) {
            var properties = agent.controllerProperties;
            var keys = Config.keys;
            var accelerationX = 0;
            var accelerationY = 0;
            if (Keyboard.Current.keys(keys.moveUp)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationY = -this._movementAcceleration;
                }
            }
            if (Keyboard.Current.keys(keys.moveDown)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationY += this._movementAcceleration;
                }
            }
            if (Keyboard.Current.keys(keys.moveLeft)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationX = -this._movementAcceleration;
                }
            }
            if (Keyboard.Current.keys(keys.moveRight)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationX += this._movementAcceleration;
                }
            }
            properties.lastFireElapsed += context.elapsed;
            if (Keyboard.Current.keys(keys.primaryFire)) {
                if (!properties.lastFireElapsed || properties.lastFireElapsed > 400) {
                    context.pushElement(new Megaparsec.Shot(agent, new Lightspeed.Vector(800)));
                    properties.lastFireElapsed = 0;
                }
            }
            if (!accelerationX && !accelerationY) {
                if (agent.velocity.magnitude < 30) {
                    agent.velocity = new Lightspeed.Vector();
                    agent.acceleration = new Lightspeed.Vector();
                }
                else {
                    agent.acceleration = agent.velocity.normal.scale(-this._movementAcceleration);
                }
            }
            else {
                agent.acceleration = new Lightspeed.Vector(accelerationX, accelerationY);
            }
        };
        return Human;
    }(Megaparsec.Controller));
    Megaparsec.Human = Human;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Atmosphere = /** @class */ (function (_super) {
        __extends(Atmosphere, _super);
        function Atmosphere() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Atmosphere;
    }(Lightspeed.Element));
    Megaparsec.Atmosphere = Atmosphere;
})(Megaparsec || (Megaparsec = {}));
/// <reference path="Atmosphere.ts" />
var Megaparsec;
(function (Megaparsec) {
    var Comets = /** @class */ (function (_super) {
        __extends(Comets, _super);
        function Comets() {
            var _this = _super.call(this) || this;
            _this._comets = [];
            _this.zIndex = -900;
            return _this;
        }
        Comets.prototype.update = function (context) {
            if (Random.Current.nextInt(100) === 0) {
                this.addRandomComet(context.canvasBox);
            }
            for (var i = 0; i < this._comets.length; i++) {
                var comet = this._comets[i];
                comet.elapsedTime += context.elapsed;
                if (comet.elapsedTime > comet.timeToLive) {
                    comet.isAlive = false;
                }
                comet.position = comet.position.add(comet.velocity.scale(context.delta));
                if (comet.isAlive) {
                    comet.tailStart = comet.position;
                }
                if (comet.position.distanceTo(comet.tailEnd) > comet.tailLength) {
                    var tailEndVector = Vector.fromPolar(comet.velocity.scale(-1).argument, comet.tailLength);
                    comet.tailEnd = comet.position.add(tailEndVector);
                }
                var tailVector = comet.tailEnd.vectorTo(comet.tailStart);
                if (!comet.isAlive || comet.tailEnd.distanceTo(comet.tailStart) < 5) {
                    var index = this._comets.indexOf(comet);
                    if (index !== -1) {
                        this._comets.splice(index, 1);
                    }
                }
            }
        };
        Comets.prototype.render = function (context) {
            var ctx = context.ctx;
            ctx.save();
            for (var i = 0; i < this._comets.length; i++) {
                var comet = this._comets[i];
                var gradient = ctx.createLinearGradient(comet.tailEnd.x, comet.tailEnd.y, comet.position.x, comet.position.y);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
                ctx.strokeStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(comet.tailEnd.x, comet.tailEnd.y);
                ctx.lineTo(comet.tailStart.x, comet.tailStart.y);
                ctx.stroke();
            }
            ctx.restore();
        };
        Comets.prototype.addRandomComet = function (canvasBox) {
            var startX = Random.Current.next(canvasBox.width);
            var startY = Random.Current.next(canvasBox.height);
            var angle = Random.Current.getBetween(0, Math.PI);
            var position = new Vector(startX, startY);
            var velocity = Vector.fromPolar(angle, 500);
            this._comets.push({
                isAlive: true,
                timeToLive: 750,
                elapsedTime: 0,
                position: position,
                velocity: velocity,
                tailStart: position,
                tailEnd: position,
                tailLength: 100,
            });
        };
        return Comets;
    }(Megaparsec.Atmosphere));
    Megaparsec.Comets = Comets;
    var Comet = /** @class */ (function () {
        function Comet() {
            this.isAlive = true;
            this.timeToLive = 750;
            this.elapsedTime = 0;
            this.position = new Vector();
            this.velocity = new Vector();
            this.tailStart = new Vector();
            this.tailEnd = new Vector();
            this.tailLength = 25;
        }
        return Comet;
    }());
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Explosion = /** @class */ (function (_super) {
        __extends(Explosion, _super);
        function Explosion(origin, velocity) {
            var _this = _super.call(this) || this;
            _this._particleCount = 100;
            _this._durration = 750; // milliseconds
            _this._particleMaxMagnitude = 100;
            _this._particles = [];
            _this._totalElapsed = 0;
            _this._alpha = 1;
            _this.position = origin.position;
            _this.velocity = velocity || origin.velocity;
            return _this;
        }
        Explosion.prototype.init = function (context) {
            for (var i = 0; i < this._particleCount; i++) {
                var argument = Random.Current.next(Math.PI * 2);
                var magnitude = Random.Current.next(this._particleMaxMagnitude);
                this._particles.push({
                    position: new Lightspeed.Vector(0, 0),
                    velocity: Lightspeed.Vector.fromPolar(argument, magnitude),
                    color: Megaparsec.Color.getRandomColor(),
                    radius: Random.Current.next(2)
                });
            }
        };
        Explosion.prototype.update = function (context) {
            this._totalElapsed += context.elapsed;
            if (this._totalElapsed >= this._durration) {
                this.kill();
                return;
            }
            this._alpha = 1 - this._totalElapsed / this._durration;
            this._particles.forEach(function (i) {
                i.position = i.position.add(i.velocity.scale(context.delta));
            });
            _super.prototype.update.call(this, context);
        };
        Explosion.prototype.render = function (context) {
            var _this = this;
            var ctx = context.ctx;
            ctx.globalAlpha = this._alpha;
            this._particles.forEach(function (i) {
                var position = i.position.add(_this.position);
                ctx.fillStyle = i.color;
                ctx.beginPath();
                ctx.arc(position.x, position.y, i.radius, 0, 2 * Math.PI);
                ctx.fill();
            });
        };
        return Explosion;
    }(Lightspeed.InertialElement));
    Megaparsec.Explosion = Explosion;
})(Megaparsec || (Megaparsec = {}));
/// <reference path="Atmosphere.ts" />
var Megaparsec;
(function (Megaparsec) {
    var Lightning = /** @class */ (function (_super) {
        __extends(Lightning, _super);
        function Lightning(color) {
            var _this = _super.call(this) || this;
            _this._strikeSegments = [];
            _this._color = color || 'white';
            _this.zIndex = -900;
            return _this;
        }
        Lightning.prototype.update = function (context) {
            if (Random.Current.nextInt(250) === 0) {
                this.addRandomStrike(context.canvasBox);
            }
            for (var i = 0; i < this._strikeSegments.length; i++) {
                var strikeSegment = this._strikeSegments[i];
                strikeSegment.elapsedTime += context.elapsed;
            }
        };
        Lightning.prototype.render = function (context) {
            var ctx = context.ctx;
            ctx.save();
            ctx.lineWidth = 2;
            ctx.strokeStyle = this._color;
            for (var i = 0; i < this._strikeSegments.length; i++) {
                var strikeSegment = this._strikeSegments[i];
                ctx.globalAlpha = 1 - Math.min(1, strikeSegment.elapsedTime / strikeSegment.timeToLive);
                ctx.beginPath();
                ctx.moveTo(strikeSegment.start.x, strikeSegment.start.y);
                ctx.lineTo(strikeSegment.end.x, strikeSegment.end.y);
                if (ctx.globalAlpha > 0.9) {
                    ctx.fillStyle = this._color;
                    ctx.fillRect(0, 0, context.canvasWidth, context.canvasHeight);
                }
                ctx.stroke();
            }
            ctx.restore();
        };
        Lightning.prototype.addRandomStrike = function (canvasBox) {
            this._strikeSegments = [];
            var startX = Random.Current.next(canvasBox.width);
            var startY = -10;
            var position = new Vector(startX, startY);
            while (position.y < canvasBox.height) {
                var strikeSegment = this.addRandomStrikeSegment(position);
                position = strikeSegment.end;
                this._strikeSegments.push(strikeSegment);
            }
            var branchCount = Random.Current.nextInt(10);
            for (var i = 0; i < branchCount; i++) {
                position = Random.Current.pick(this._strikeSegments).end;
                var segmentCount = Random.Current.nextInt(5);
                for (var j = 0; j < segmentCount; j++) {
                    var strikeSegment = this.addRandomStrikeSegment(position);
                    position = strikeSegment.end;
                    this._strikeSegments.push(strikeSegment);
                }
            }
        };
        Lightning.prototype.addRandomStrikeSegment = function (position) {
            var magnitude = Random.Current.getBetween(10, 50);
            var angle = Random.Current.getBetween(Math.PI * 0.1, Math.PI * 0.9);
            var strikeVector = Vector.fromPolar(angle, magnitude);
            var newPosition = position.add(strikeVector);
            return {
                start: position,
                end: newPosition,
                timeToLive: 750,
                elapsedTime: 0
            };
        };
        return Lightning;
    }(Megaparsec.Atmosphere));
    Megaparsec.Lightning = Lightning;
    var StrikeSegment = /** @class */ (function () {
        function StrikeSegment() {
            this.start = new Vector();
            this.end = new Vector();
            this.timeToLive = 750;
            this.elapsedTime = 0;
        }
        return StrikeSegment;
    }());
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        function Background() {
            var _this = _super.call(this) || this;
            _this.zIndex = -1100;
            return _this;
        }
        Background.prototype.render = function (context) {
            context.ctx.fillRect(0, 0, context.canvasWidth, context.canvasHeight);
        };
        return Background;
    }(Lightspeed.Element));
    Megaparsec.Background = Background;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Hills = /** @class */ (function (_super) {
        __extends(Hills, _super);
        function Hills(baseColor) {
            var _this = _super.call(this) || this;
            _this._maxHillHeight = 150;
            _this._minHillHeight = 50;
            _this._maxHillWidth = 150;
            _this._minHillWidth = 100;
            _this._hills = [];
            _this._baseColor = '#0d1c01';
            if (baseColor) {
                _this._baseColor = baseColor;
            }
            _this.zIndex = -100;
            _this.velocity = new Vector(-200, 0);
            return _this;
        }
        Hills.prototype.generateHills = function (hillX, canvasWidth) {
            while (hillX <= canvasWidth + this._maxHillWidth) {
                var height = Random.Current.getBetween(this._minHillHeight, this._maxHillHeight);
                var width = Random.Current.getBetween(this._minHillWidth, this._maxHillWidth);
                var depth = Random.Current.next(40);
                var velocity = depth;
                var hill = {
                    start: hillX,
                    width: width,
                    height: height,
                    color: Megaparsec.Color.getRandomShade(this._baseColor, 0.0, 0.1),
                    velocity: velocity,
                    depth: depth,
                };
                this._hills.push(hill);
                hillX += width;
            }
        };
        Hills.prototype.init = function (context) {
            this.generateHills(-this._maxHillWidth, context.canvasBox.width);
        };
        Hills.prototype.update = function (context) {
            _super.prototype.update.call(this, context);
            var hillsToKeep = [];
            for (var i = 0; i < this._hills.length; i++) {
                var hill = this._hills[i];
                if (hill.start + hill.width > 0) {
                    hill.start += (this.velocity.x - hill.velocity) * context.delta;
                    hillsToKeep.push(hill);
                }
            }
            this._hills = hillsToKeep;
            var hillX = -this._maxHillWidth;
            if (this._hills.length) {
                var hill = this._hills[this._hills.length - 1];
                hillX = hill.start + hill.width;
            }
            this.generateHills(hillX, context.canvasBox.width);
        };
        Hills.prototype.render = function (context) {
            var canvasHeight = context.canvasHeight;
            var canvasWidth = context.canvasWidth;
            var ctx = context.ctx;
            var hills = this._hills.slice(0).sort(function (i, j) { return i.depth - j.depth; });
            for (var i = 0; i < hills.length; i++) {
                var hill = hills[i];
                var fillStyle = ctx.createLinearGradient(hill.start + hill.width * 0.5, canvasHeight - hill.height + this.position.y, hill.start + hill.width * 0.5, canvasHeight + 10 + this.position.y);
                fillStyle.addColorStop(0, hill.color);
                fillStyle.addColorStop(1, 'black');
                ctx.beginPath();
                ctx.fillStyle = fillStyle;
                ctx.moveTo(hill.start - hill.width * 0.3, canvasHeight + 10 + this.position.y);
                ctx.lineTo(hill.start + hill.width * 0.3, canvasHeight - hill.height * 0.7 + this.position.y);
                ctx.arcTo(hill.start + hill.width * 0.5, canvasHeight - hill.height + this.position.y, hill.start + hill.width * 0.7, canvasHeight - hill.height * 0.7 + this.position.y, hill.width / 6);
                ctx.lineTo(hill.start + hill.width * 1.3, canvasHeight + 10 + this.position.y);
                ctx.fill();
            }
        };
        return Hills;
    }(Lightspeed.InertialElement));
    Megaparsec.Hills = Hills;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Message = /** @class */ (function (_super) {
        __extends(Message, _super);
        function Message(text, subtext) {
            var _this = _super.call(this) || this;
            _this._text = '';
            _this._subtext = null;
            _this.color = Config.styles.textColor;
            _this.textFontSize = Config.styles.messageTextSize;
            _this.subtextFontSize = Config.styles.messageSubtextSize;
            _this._text = text;
            _this._subtext = subtext;
            return _this;
        }
        Message.prototype.render = function (context) {
            var canvasHeight = context.canvasHeight;
            var canvasWidth = context.canvasWidth;
            var ctx = context.ctx;
            ctx.fillStyle = this.color;
            ctx.font = this.textFontSize + "px Arial";
            var subtextHeight = this._subtext ? this.subtextFontSize : 0;
            var textBounds = ctx.measureText(this._text);
            ctx.fillText(this._text, canvasWidth / 2 - textBounds.width / 2, canvasHeight / 2 - this.textFontSize / 2 - subtextHeight / 2);
            if (this._subtext) {
                ctx.font = this.subtextFontSize + "px Arial";
                var subtextBounds = ctx.measureText(this._subtext);
                ctx.fillText(this._subtext, canvasWidth / 2 - subtextBounds.width / 2, canvasHeight / 2 - subtextHeight / 2 + subtextHeight / 2);
            }
        };
        return Message;
    }(Lightspeed.Element));
    Megaparsec.Message = Message;
})(Megaparsec || (Megaparsec = {}));
/// <reference path="../Lightspeed.ts" />
var Megaparsec;
(function (Megaparsec) {
    var StarField = /** @class */ (function (_super) {
        __extends(StarField, _super);
        function StarField(starCount) {
            var _this = _super.call(this) || this;
            _this._stars = [];
            _this.zIndex = -1000;
            _this._starCount = starCount || 25;
            return _this;
        }
        StarField.prototype.init = function (context) {
            for (var i = 0; i < this._starCount; i++) {
                this._stars.push({
                    x: Random.Current.next(context.canvasBox.width),
                    y: Random.Current.next(context.canvasBox.height),
                    relativeVelocity: Random.Current.next(),
                    color: Megaparsec.Color.getRandomColor(),
                    radius: Random.Current.next() * 0.5,
                    twinkle: Random.Current.nextInt(5000) === 1 ? 0 : 1
                });
            }
        };
        StarField.prototype.update = function (context) {
            _super.prototype.update.call(this, context);
            for (var i = 0; i < this._stars.length; i++) {
                var star = this._stars[i];
                var localVelocityX = this.velocity.x * star.relativeVelocity;
                var localVelocityY = this.velocity.y * star.relativeVelocity;
                star.x += localVelocityX * context.delta;
                star.y += localVelocityY * context.delta;
                if (star.twinkle && Random.Current.nextInt(5000) === 1) {
                    star.twinkle = 0;
                }
                else if (!star.twinkle && Random.Current.nextInt(50) === 1) {
                    star.twinkle = 1;
                }
                if (localVelocityX < 0 && star.x < -star.radius) {
                    star.x = context.canvasBox.width + star.radius;
                }
                else if (localVelocityX > 0 && star.x > context.canvasBox.width + star.radius) {
                    star.x = -star.radius;
                }
                if (localVelocityY < 0 && star.y < -star.radius) {
                    star.y = context.canvasBox.height + star.radius;
                }
                else if (localVelocityY > 0 && star.y > context.canvasBox.height + star.radius) {
                    star.y = -star.radius;
                }
            }
            ;
        };
        StarField.prototype.render = function (context) {
            var ctx = context.ctx;
            this._stars.forEach(function (i) {
                if (i.twinkle) {
                    ctx.fillStyle = i.color;
                    ctx.beginPath();
                    ctx.arc(i.x, i.y, i.radius, 0, 2 * Math.PI);
                    ctx.fill();
                }
            });
        };
        return StarField;
    }(Lightspeed.InertialElement));
    Megaparsec.StarField = StarField;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var AddElement = /** @class */ (function (_super) {
        __extends(AddElement, _super);
        function AddElement(element) {
            var _this = _super.call(this) || this;
            _this._element = element;
            return _this;
        }
        AddElement.prototype.init = function (context) {
            context.pushElement(this._element);
            this.kill();
        };
        return AddElement;
    }(Lightspeed.Element));
    Megaparsec.AddElement = AddElement;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var ChangeLevel = /** @class */ (function (_super) {
        __extends(ChangeLevel, _super);
        function ChangeLevel(nextLevelNumber, nextLevelColor) {
            var _this = _super.call(this) || this;
            _this._phaseNumber = 0;
            _this._phases = [];
            _this._elapsed = 0;
            _this._nextLevelNumber = nextLevelNumber;
            _this._nextLevelMessage = new Megaparsec.Message("Level " + _this._nextLevelNumber);
            _this._nextLevelColor = nextLevelColor;
            return _this;
        }
        ChangeLevel.prototype.init = function (context) {
            var _this = this;
            this._hills = context.findFirstElement(function (i) { return i instanceof Megaparsec.Hills; });
            this._starField = context.findFirstElement(function (i) { return i instanceof Megaparsec.StarField; });
            if (this._hills) {
                this._hills.acceleration = new Vector(-5, 1);
            }
            this._phases = [
                Phase.when(function (context) { return _this._elapsed > 500; })
                    .do(function (context) {
                    _this._starField.acceleration = new Vector(-5, 0);
                }),
                Phase.when(function (context) { return _this._elapsed > 2000; })
                    .do(function (context) {
                    if (_this._hills) {
                        _this._hills.kill();
                    }
                }),
                Phase.when(function (context) { return _this._elapsed > 6000; })
                    .do(function (context) {
                    context.pushElement(_this._nextLevelMessage);
                    _this._starField.acceleration = new Vector(5, 0);
                }),
                Phase.when(function (context) { return _this._elapsed > 8000 || _this._starField.velocity.x > 0; })
                    .do(function (context) {
                    var hills = new Megaparsec.Hills(_this._nextLevelColor);
                    hills.position = new Vector(0, 100);
                    hills.velocity = new Vector(-500, -50);
                    hills.acceleration = new Vector(1, -5);
                    context.pushElement(hills);
                    _this._hills = hills;
                }),
                Phase.when(function (context) { return _this._hills.position.y <= 0; })
                    .do(function (context) {
                    _this._hills.velocity = _this._hills.velocity.withY(function (y) { return 0; });
                    _this._hills.acceleration = _this._hills.acceleration.withY(function (y) { return 0; });
                }),
                Phase.when(function (context) { return _this._starField.velocity.x > 0; })
                    .do(function (context) {
                    _this._starField.acceleration = new Vector();
                    _this._starField.velocity = new Vector();
                }),
                Phase.when(function (context) { return _this._hills.velocity.x >= -200; })
                    .do(function (context) {
                    _this._hills.acceleration = new Vector();
                    _this._nextLevelMessage.kill();
                }),
            ];
        };
        ChangeLevel.prototype.update = function (context) {
            var phase = this._phases[this._phaseNumber];
            if (!phase) {
                this.kill();
                return;
            }
            this._elapsed += context.elapsed;
            if (phase.act(this, context)) {
                this._phaseNumber++;
            }
        };
        return ChangeLevel;
    }(Lightspeed.Element));
    Megaparsec.ChangeLevel = ChangeLevel;
    var Phase = /** @class */ (function () {
        function Phase() {
        }
        Phase.when = function (condition) {
            var phase = new Phase();
            phase._condition = condition;
            return phase;
        };
        Phase.prototype.do = function (action) {
            this._action = action;
            return this;
        };
        Phase.prototype.act = function (element, context) {
            if (!this._condition.bind(element)(context)) {
                return false;
            }
            this._action.bind(element)(context);
            return true;
        };
        return Phase;
    }());
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Level = /** @class */ (function (_super) {
        __extends(Level, _super);
        function Level() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._waves = [];
            _this._elements = [];
            return _this;
        }
        Level.start = function () {
            return new Level();
        };
        Level.prototype.addWave = function (enemyName, level) {
            if (!Config.agents[enemyName]) {
                return this;
            }
            var enemyConfig = Config.agents[enemyName];
            var wave = new Megaparsec.Wave(enemyConfig, level);
            this._waves.push(wave);
            return this;
        };
        Level.prototype.addElement = function (element) {
            this._elements.push(element);
            return this;
        };
        Level.prototype.init = function (context) {
            this._elements.forEach(function (element) {
                context.pushElement(element);
            });
        };
        Level.prototype.update = function (context) {
            if (!this._currentWave || this._currentWave.isDead) {
                if (!this._waves.length) {
                    this.kill();
                    this._elements.forEach(function (i) { return i.kill(); });
                    return;
                }
                var nextWave = this._waves.shift();
                context.pushElement(nextWave);
                this._currentWave = nextWave;
            }
        };
        return Level;
    }(Lightspeed.Element));
    Megaparsec.Level = Level;
})(Megaparsec || (Megaparsec = {}));
/// <reference path="../../lightspeed/UI/Interface.ts" />
var Megaparsec;
(function (Megaparsec) {
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            var _this = _super.call(this) || this;
            _this.content = _this.createContent();
            return _this;
        }
        MainMenu.prototype.createContent = function () {
            var menuStack = new Lightspeed.UI.StackPanel();
            var banner = new Lightspeed.UI.TextElement();
            banner.text = 'Megaparsec';
            banner.borderColor = 'red';
            banner.borderThickness = 5;
            banner.backgroundColor = 'blue';
            menuStack.items.push(banner);
            return menuStack;
        };
        return MainMenu;
    }(Lightspeed.UI.Interface));
    Megaparsec.MainMenu = MainMenu;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var StartGame = /** @class */ (function (_super) {
        __extends(StartGame, _super);
        function StartGame(nextLevelNumber, nextLevelColor) {
            var _this = _super.call(this) || this;
            _this._phaseNumber = 0;
            _this._phases = [];
            _this._elapsed = 0;
            _this._startGameMessage = new Megaparsec.Message('Megaparsec', 'Alien Craft Advancing!');
            _this._nextLevelNumber = nextLevelNumber;
            _this._nextLevelMessage = new Megaparsec.Message("Level " + _this._nextLevelNumber);
            _this._nextLevelColor = nextLevelColor;
            return _this;
        }
        StartGame.prototype.init = function (context) {
            var _this = this;
            this._hills = context.findFirstElement(function (i) { return i instanceof Megaparsec.Hills; });
            this._starField = context.findFirstElement(function (i) { return i instanceof Megaparsec.StarField; });
            if (this._hills) {
                this._hills.kill();
            }
            this._starField.velocity = new Vector(-1000, 0);
            context.pushElement(this._startGameMessage);
            this._phases = [
                Phase.when(function (context) { return _this._elapsed > 4000; })
                    .do(function (context) {
                    _this._startGameMessage.kill();
                    context.pushElement(_this._nextLevelMessage);
                    _this._starField.acceleration = new Vector(5, 0);
                }),
                Phase.when(function (context) { return _this._elapsed > 6000 || _this._starField.velocity.x > 0; })
                    .do(function (context) {
                    var hills = new Megaparsec.Hills(_this._nextLevelColor);
                    hills.position = new Vector(0, 100);
                    hills.velocity = new Vector(-500, -50);
                    hills.acceleration = new Vector(1, -5);
                    context.pushElement(hills);
                    _this._hills = hills;
                }),
                Phase.when(function (context) { return _this._hills.position.y <= 0; })
                    .do(function (context) {
                    _this._hills.velocity = _this._hills.velocity.withY(function (y) { return 0; });
                    _this._hills.acceleration = _this._hills.acceleration.withY(function (y) { return 0; });
                }),
                Phase.when(function (context) { return _this._starField.velocity.x > 0; })
                    .do(function (context) {
                    _this._starField.acceleration = new Vector();
                    _this._starField.velocity = new Vector();
                }),
                Phase.when(function (context) { return _this._hills.velocity.x >= -200; })
                    .do(function (context) {
                    _this._hills.acceleration = new Vector();
                    _this._nextLevelMessage.kill();
                }),
            ];
        };
        StartGame.prototype.update = function (context) {
            var phase = this._phases[this._phaseNumber];
            if (!phase) {
                this.kill();
                return;
            }
            this._elapsed += context.elapsed;
            if (phase.act(this, context)) {
                this._phaseNumber++;
            }
        };
        return StartGame;
    }(Lightspeed.Element));
    Megaparsec.StartGame = StartGame;
    var Phase = /** @class */ (function () {
        function Phase() {
        }
        Phase.when = function (condition) {
            var phase = new Phase();
            phase._condition = condition;
            return phase;
        };
        Phase.prototype.do = function (action) {
            this._action = action;
            return this;
        };
        Phase.prototype.act = function (element, context) {
            if (!this._condition.bind(element)(context)) {
                return false;
            }
            this._action.bind(element)(context);
            return true;
        };
        return Phase;
    }());
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Timeline = /** @class */ (function (_super) {
        __extends(Timeline, _super);
        function Timeline() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._currentIndex = -1;
            _this._currentEvent = null;
            _this._events = [];
            return _this;
        }
        Timeline.start = function () {
            return new Timeline();
        };
        Timeline.prototype.addLevel = function (buildLevel) {
            this._events.push(buildLevel(Megaparsec.Level.start()));
            return this;
        };
        Timeline.prototype.addElement = function (element) {
            this._events.push(new Megaparsec.AddElement(element));
            return this;
        };
        Timeline.prototype.addEvent = function (event) {
            this._events.push(event);
            return this;
        };
        Timeline.prototype.update = function (context) {
            if (!this._currentEvent || this._currentEvent.isDead) {
                this._currentIndex++;
                this._currentEvent = this._events[this._currentIndex];
                if (!this._currentEvent) {
                    this.kill();
                    return;
                }
                context.pushElement(this._currentEvent);
            }
        };
        return Timeline;
    }(Lightspeed.Element));
    Megaparsec.Timeline = Timeline;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var TimelinePresets = /** @class */ (function () {
        function TimelinePresets() {
        }
        TimelinePresets.classic = function () {
            var timeline = Megaparsec.Timeline.start()
                //.addElement(new Hills('#0d1c01'))
                .addEvent(new Megaparsec.StartGame(1, '#0d1c01'))
                .addLevel(function (level) { return level
                .addElement(new Megaparsec.Lightning('skyblue'))
                .addWave('enemy1', 1)
                .addWave('enemy2', 1)
                .addWave('enemy3', 1)
                .addWave('enemy2', 2)
                .addWave('enemy4', 1)
                .addWave('asteroid', 3); })
                .addEvent(new Megaparsec.ChangeLevel(2, '#DD0000'))
                .addLevel(function (level) { return level
                .addElement(new Megaparsec.Comets())
                .addWave('enemy1', 2)
                .addWave('enemy2', 2)
                .addWave('enemy3', 2)
                .addWave('enemy2', 3)
                .addWave('enemy4', 2)
                .addWave('asteroid', 2); })
                .addEvent(new Megaparsec.ChangeLevel(3, '#0000AA'))
                .addLevel(function (level) { return level
                .addWave('enemy1', 3)
                .addWave('enemy2', 3)
                .addWave('enemy3', 3)
                .addWave('enemy2', 4)
                .addWave('enemy4', 3)
                .addWave('asteroid', 3); });
            return timeline;
        };
        return TimelinePresets;
    }());
    Megaparsec.TimelinePresets = TimelinePresets;
})(Megaparsec || (Megaparsec = {}));
//# sourceMappingURL=tsbuild.js.map