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
        Element.prototype.collide = function (context) {
            // optionally overloaded by extending classes to handle collission.
        };
        Element.prototype.kill = function () {
            this._isDead = true;
        };
        Element._nextId = 0;
        return Element;
    }());
    Lightspeed.Element = Element;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var ElementCollisionContext = /** @class */ (function () {
        function ElementCollisionContext(engine, otherElement) {
            this._engine = engine;
            this._otherElement = otherElement;
        }
        Object.defineProperty(ElementCollisionContext.prototype, "otherElement", {
            get: function () {
                return this._otherElement;
            },
            enumerable: true,
            configurable: true
        });
        ElementCollisionContext.prototype.pushElement = function (element) {
            this._engine.pushElement(element);
        };
        return ElementCollisionContext;
    }());
    Lightspeed.ElementCollisionContext = ElementCollisionContext;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var ElementInitContext = /** @class */ (function () {
        function ElementInitContext(canvas) {
            this._canvasBox = canvas.box;
        }
        Object.defineProperty(ElementInitContext.prototype, "canvasBox", {
            get: function () {
                return this._canvasBox;
            },
            enumerable: true,
            configurable: true
        });
        return ElementInitContext;
    }());
    Lightspeed.ElementInitContext = ElementInitContext;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Engine = /** @class */ (function () {
        function Engine() {
            this._elements = [];
            this._isPaused = false;
            this._wasPaused = false;
            this._elementTimeouts = [];
            this._canvas = Lightspeed.Canvas.find();
        }
        Engine.prototype.clear = function () {
            this._elements = [];
        };
        Engine.prototype.pushElement = function (element) {
            this._elements.push(element);
            var initContext = new Lightspeed.ElementInitContext(this.canvas);
            element.init(initContext);
        };
        Engine.prototype.removeElement = function (element) {
            var index = this._elements.indexOf(element);
            if (index !== -1) {
                this._elements.splice(index, 1);
            }
        };
        Engine.prototype.findElements = function (predicate) {
            if (!predicate) {
                return this._elements;
            }
            return this._elements.filter(predicate);
        };
        Engine.prototype.findFirstElement = function (predicate) {
            return this.findElements(predicate)[0];
        };
        Engine.prototype.findClosestElement = function (position, predicate) {
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
        Object.defineProperty(Engine.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "isPaused", {
            get: function () {
                return this._isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Engine.prototype.pause = function () {
            this._isPaused = true;
            this._wasPaused = true;
        };
        Engine.prototype.unpause = function () {
            this._isPaused = false;
        };
        Engine.prototype.togglePause = function () {
            if (this._isPaused) {
                this.unpause();
            }
            else {
                this.pause();
            }
        };
        Engine.prototype.requestTimeout = function (delay, element, action) {
            this._elementTimeouts.push({
                delay: delay,
                elapsed: 0,
                element: element,
                action: action
            });
        };
        Engine.prototype.runFrame = function (timeStamp) {
            requestAnimationFrame(this.runFrame.bind(this));
            if (!this._isPaused) {
                // Update phase
                var updateContext = new Lightspeed.FrameUpdateContext(this, timeStamp, this._wasPaused);
                this._wasPaused = false;
                // Get element timeouts for this frame.
                var currentElementTimeouts = this.getCurrentElementTimeouts(updateContext);
                // Remove dead elements.
                this._elements = this._elements.filter(function (p) { return !p.isDead; });
                this.checkCollisions();
                var _loop_1 = function (i) {
                    var element = this_1._elements[i];
                    updateContext.currentElement = element;
                    element.update(updateContext);
                    elementTimeouts = currentElementTimeouts.filter(function (i) { return i.element === element; });
                    for (var j = 0; j < elementTimeouts.length; j++) {
                        var elementTimeout = elementTimeouts[j];
                        elementTimeout.elapsed += updateContext.elapsed;
                        elementTimeout.action.bind(elementTimeouts[j].element)(updateContext);
                    }
                };
                var this_1 = this, elementTimeouts;
                for (var i = 0; i < this._elements.length; i++) {
                    _loop_1(i);
                }
            }
            // Render phase
            var ctx = this.canvas.startRender();
            var renderContext = new Lightspeed.FrameRenderContext(this, ctx);
            for (var i = 0; i < this._elements.length; i++) {
                var element = this._elements[i];
                ctx.save();
                element.render(renderContext);
                ctx.restore();
            }
            this.canvas.endRender(ctx);
        };
        // Get the element timeouts for the current frame.
        Engine.prototype.getCurrentElementTimeouts = function (updateContext) {
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
        Engine.prototype.checkCollisions = function () {
            var collisions = [];
            for (var i = 0; i < this._elements.length; i++) {
                for (var j = i + 1; j < this._elements.length; j++) {
                    var first = this._elements[i];
                    var second = this._elements[j];
                    if (first.collidesWith(second)) {
                        first.collide(new Lightspeed.ElementCollisionContext(this, second));
                        second.collide(new Lightspeed.ElementCollisionContext(this, first));
                    }
                }
            }
            return collisions;
        };
        Engine.prototype.run = function () {
            requestAnimationFrame(this.runFrame.bind(this));
        };
        return Engine;
    }());
    Lightspeed.Engine = Engine;
    var ElementTimeout = /** @class */ (function () {
        function ElementTimeout() {
        }
        return ElementTimeout;
    }());
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var FrameRenderContext = /** @class */ (function () {
        function FrameRenderContext(engine, ctx) {
            this._engine = engine;
            this._ctx = ctx;
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
        return FrameRenderContext;
    }());
    Lightspeed.FrameRenderContext = FrameRenderContext;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var FrameUpdateContext = /** @class */ (function () {
        function FrameUpdateContext(engine, timeStamp, fromPause) {
            this._engine = engine;
            this._canvasBox = engine.canvas.box;
            if (!FrameUpdateContext._lastTimeStamp) {
                FrameUpdateContext._lastTimeStamp = timeStamp;
            }
            this._timeStamp = timeStamp;
            this._elapsed = timeStamp - FrameUpdateContext._lastTimeStamp;
            this._delta = this._elapsed / 1000;
            if (fromPause) {
                this._elapsed = 0;
                this._delta = 0;
            }
            FrameUpdateContext._lastTimeStamp = timeStamp;
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
        FrameUpdateContext.prototype.activate = function (element) {
            this._engine.pushElement(element);
        };
        FrameUpdateContext.prototype.findFirst = function (predicate) {
            return this._engine.findFirstElement(predicate);
        };
        FrameUpdateContext.prototype.findClosest = function (position, predicate) {
            return this._engine.findClosestElement(position, predicate);
        };
        FrameUpdateContext.prototype.delay = function (time, action) {
            this._engine.requestTimeout(time, this.currentElement, action);
        };
        return FrameUpdateContext;
    }());
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
    var Sprite = /** @class */ (function () {
        function Sprite(imagePath, width, height) {
            var _this = this;
            this._isLoaded = false;
            this._onLoadCallbacks = [];
            this.opacity = 1;
            this._image = new Image();
            this._image.src = imagePath;
            var scale = width;
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
        Sprite.prototype.draw = function (ctx, position) {
            if (!this._isLoaded) {
                return;
            }
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.drawImage(this._image, position.x - this.width / 2, position.y - this.height / 2, this.width, this.height);
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
            images: [
                './img/enemy3.blue.png',
                './img/enemy3.cyan.png',
                './img/enemy3.green.png',
                './img/enemy3.magenta.png',
                './img/enemy3.red.png'
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
            Messenger.prototype.publish = function (message) {
                this._subscriptions.filter(function (i) { return i.messageName === message.name; }).forEach(function (i) { return i.callback.bind(i.source).call(message); });
            };
            return Messenger;
        }());
        Utils.Messenger = Messenger;
        var Message = /** @class */ (function () {
            function Message(name) {
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
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._pauseMessage = new Megaparsec.Message(Config.strings.pauseMessage, Config.strings.pauseSubtext);
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
            this.pushElement(new Megaparsec.Background());
            this.pushElement(new Megaparsec.StarField(200));
            this.pushElement(new Megaparsec.Hills());
            this._player = new Megaparsec.Player();
            this._player.position = new Lightspeed.Vector(100, 100);
            this.pushElement(this._player);
            this.loadLevel(config);
        };
        Game.prototype.loadLevel = function (config) {
            var level = Megaparsec.LevelBuilder.start()
                //.pushWave('enemy1', 1)
                .pushWave('enemy2', 1)
                .pushWave('enemy3', 1)
                .pushWave('enemy2', 2)
                .build();
            this.pushElement(level);
        };
        Game.prototype.pause = function () {
            this.pushElement(this._pauseMessage);
            _super.prototype.pause.call(this);
        };
        Game.prototype.unpause = function () {
            this.removeElement(this._pauseMessage);
            _super.prototype.unpause.call(this);
        };
        Game.run = function () {
            var game = Game.s_current = new Game();
            game.load(Config);
            game.run();
            Megaparsec.Utils.keyboard.keys(Config.keys.pause, function () { return game.togglePause(); });
            window.addEventListener('blur', function () {
                if (!game.isPaused) {
                    game.pause();
                }
            });
        };
        Game._messenger = new Lightspeed.Utils.Messenger();
        return Game;
    }(Lightspeed.Engine));
    Megaparsec.Game = Game;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Level = /** @class */ (function (_super) {
        __extends(Level, _super);
        function Level(waves) {
            var _this = _super.call(this) || this;
            _this._waves = [];
            _this._waves = waves;
            return _this;
        }
        Level.prototype.update = function (context) {
            if (!this._currentWave || this._currentWave.isDead) {
                if (!this._waves.length) {
                    this.kill();
                    return;
                }
                var nextWave = this._waves.shift();
                context.activate(nextWave);
                this._currentWave = nextWave;
            }
        };
        return Level;
    }(Lightspeed.Element));
    Megaparsec.Level = Level;
    var LevelBuilder = /** @class */ (function () {
        function LevelBuilder() {
            this._waves = [];
        }
        LevelBuilder.start = function () {
            return new LevelBuilder();
        };
        LevelBuilder.prototype.pushWave = function (enemyName, difficulty) {
            if (!Config.agents[enemyName]) {
                return this;
            }
            var enemyConfig = Config.agents[enemyName];
            var wave = new Megaparsec.Wave(enemyConfig);
            this._waves.push(wave);
            return this;
        };
        LevelBuilder.prototype.build = function () {
            return new Level(this._waves);
        };
        return LevelBuilder;
    }());
    Megaparsec.LevelBuilder = LevelBuilder;
})(Megaparsec || (Megaparsec = {}));
var Vector = Lightspeed.Vector;
var Box = Lightspeed.Box;
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
/// <reference path="../Lightspeed/Utils/Keyboard.ts" />
/// <reference path="../Lightspeed/Utils/Random.ts" />
var Megaparsec;
(function (Megaparsec) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.keyboard = Lightspeed.Utils.Keyboard.Current;
        Utils.random = Lightspeed.Utils.Random.Current;
        return Utils;
    }());
    Megaparsec.Utils = Utils;
    var Color = /** @class */ (function () {
        function Color() {
        }
        Color.getRandomColor = function () {
            var letters = '89ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Utils.random.nextInt(letters.length)];
            }
            return color;
        };
        Color.getRandomShade = function (base, minShade, maxShade) {
            return Color.lum(base, Utils.random.getBetween(minShade, maxShade));
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
        function Agent(controller, constrainer, sprite) {
            var _this = _super.call(this, sprite.width, sprite.height, constrainer) || this;
            _this.controllerProperties = {};
            _this._controller = controller;
            _this._sprite = sprite;
            sprite.registerLoadCallback(function (i) { return _this.updateBox(i.width, i.height); });
            return _this;
        }
        Agent.prototype.init = function (context) {
            this._controller.init(this, context.canvasBox);
        };
        Agent.prototype.update = function (context) {
            this._controller.update(this, context);
            _super.prototype.update.call(this, context);
        };
        Agent.prototype.render = function (context) {
            this._sprite.draw(context.ctx, this.position);
        };
        Agent.prototype.collide = function (context) {
            if (context.otherElement instanceof Megaparsec.Shot) {
                return; // Let Shot handle the Agent destruction.
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
        function Enemy(controller, constrainer, imagePath) {
            return _super.call(this, controller, constrainer, new Lightspeed.Sprite(imagePath, Config.imageScale)) || this;
        }
        return Enemy;
    }(Megaparsec.Agent));
    Megaparsec.Enemy = Enemy;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player() {
            return _super.call(this, new Megaparsec.Human, Megaparsec.Constrainer.boxIn, new Lightspeed.Sprite(Config.agents.player.image, Config.imageScale)) || this;
        }
        Player.prototype.collide = function (context) {
            // optionally overloaded by extending classes to handle collission.
        };
        return Player;
    }(Megaparsec.Agent));
    Megaparsec.Player = Player;
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
        Shot.prototype.collide = function (context) {
            if (context.otherElement instanceof Megaparsec.Agent && context.otherElement != this._origin) {
                var agent = context.otherElement;
                agent.explode(context);
                if (!this._passesThroughOnHit) {
                    this.kill();
                }
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
        function Wave(config) {
            var _this = _super.call(this) || this;
            _this._agents = [];
            _this._activeAgents = [];
            _this._waveMode = WaveMode.OffsetWaveMode;
            _this._delay = 1000.0; // 1 second.
            _this._interval = 2000.0; // 2 seconds; 
            _this._isFirstUpdate = true;
            _this._config = config;
            _this._waveMode = WaveMode[config.waveMode];
            _this._delay = config.delay || _this._delay;
            _this._interval = config.interval || _this._interval;
            return _this;
        }
        Wave.prototype.init = function (context) {
            var _this = this;
            var controllers = this._config.controllers.map(function (i) { return Megaparsec.ControllerFactory.current.create(i); });
            var horizontalConstraintTopology = Megaparsec.ConstraintToplogy[this._config.horizontalConstraintTopology];
            var verticalConstraintTopology = Megaparsec.ConstraintToplogy[this._config.verticalConstraintTopology];
            var constrainer = new Megaparsec.Constrainer(horizontalConstraintTopology, verticalConstraintTopology);
            this._config.images.forEach(function (i) {
                var controller = Megaparsec.Utils.random.pick(controllers);
                var agent = new Megaparsec.Enemy(controller, constrainer, i);
                _this._agents.push(agent);
            });
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
                context.activate(newAgent);
                this._activeAgents.push(newAgent);
            }
        };
        Wave.prototype.updateOffset = function (context) {
            if (this._isFirstUpdate) {
                context.delay(this._delay, this.udpateOffsetTimeout);
            }
        };
        Wave.prototype.udpateOffsetTimeout = function (context) {
            var _this = this;
            // Get agents not in the active agents list.
            var agentsLeft = this._agents.filter(function (i) { return _this._activeAgents.indexOf(i) === -1; });
            if (agentsLeft.length) {
                var newAgent = agentsLeft[0];
                context.activate(newAgent);
                this._activeAgents.push(newAgent);
            }
            if (agentsLeft.length > 1) {
                context.delay(this._interval, this.udpateOffsetTimeout);
            }
        };
        Wave.prototype.updateInstant = function (context) {
            if (this._isFirstUpdate) {
                for (var i = 0; i < this._agents.length; i++) {
                    var agent = this._agents[i];
                    context.activate(agent);
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
        function Controller() {
        }
        Controller.prototype.init = function (agent, constraintBox) {
            agent.controllerProperties.constrain = true;
            // optionally overloaded by extending classes to set given agents initial position.
        };
        Controller.prototype.update = function (agent, context) {
            this.updateAgent(agent, context);
        };
        Controller.prototype.updateAgent = function (agent, context) {
            // optionally overloaded by extending classes to update the given agent.
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
        function Bounce() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._bounceDistance = 100;
            _this._bounceJolt = 400;
            return _this;
        }
        Bounce.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 0; // swooping
            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;
            agent.position = new Vector(zoneLeft + Megaparsec.Utils.random.next(zoneWidth), -agent.height * 2.0);
            var zoneHeight = (constraintBox.height - this._bounceDistance) * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Megaparsec.Utils.random.next(zoneHeight);
            properties.initialVelocity = new Vector(-150, 400);
            properties.targetVelocity = new Vector(-300, 0);
            agent.velocity = properties.initialVelocity;
        };
        Bounce.prototype.updateAgent = function (agent, context) {
            var _this = this;
            var properties = agent.controllerProperties;
            if (properties.phase === 0) // swooping
             {
                if (agent.position.y > (properties.targetY + this._bounceDistance)) {
                    agent.velocity = properties.targetVelocity.with(function (x) { return x - _this._bounceJolt; }, function (y) { return -_this._bounceJolt; });
                    properties.positionAfterPhase0 = agent.position;
                    properties.velocityAfterPhase0 = agent.velocity;
                    properties.phase = 1;
                }
            }
            if (properties.phase === 1) // bouncing
             {
                var percentToTarget = (agent.position.y - properties.targetY) / (properties.positionAfterPhase0.y - properties.targetY);
                agent.velocity = new Vector(properties.targetVelocity.x + (-this._bounceJolt * percentToTarget), percentToTarget * properties.velocityAfterPhase0.y);
                if (Math.abs(agent.position.y - properties.targetY) < 1) {
                    properties.constrain = true;
                    properties.phase = 2; // cruising
                }
            }
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
        function Swoop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Swoop.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 0; // swooping
            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;
            agent.position = new Lightspeed.Vector(zoneLeft + Megaparsec.Utils.random.next(zoneWidth), -agent.height * 2.0);
            var zoneHeight = constraintBox.height * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Megaparsec.Utils.random.next(zoneHeight);
            properties.initialVelocity = new Lightspeed.Vector(0, 400);
            properties.targetVelocity = new Lightspeed.Vector(-300, 0);
            agent.velocity = new Lightspeed.Vector(0, properties.initialVelocity.y);
        };
        Swoop.prototype.updateAgent = function (agent, context) {
            var properties = agent.controllerProperties;
            if (properties.phase === 0) // swooping
             {
                var percentToTarget = (agent.position.y - properties.initialY) / (properties.targetY - properties.initialY);
                agent.velocity = new Lightspeed.Vector(percentToTarget * properties.targetVelocity.x, (1 - percentToTarget) * properties.initialVelocity.y);
                if (Math.abs(agent.position.y - properties.targetY) < 1) {
                    properties.constrain = true;
                    properties.phase = 1; // cruising
                }
            }
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
        function Loop() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._loopRadius = 75;
            return _this;
        }
        Loop.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 0; // swooping
            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;
            agent.position = new Vector(zoneLeft + Megaparsec.Utils.random.next(zoneWidth), -agent.height * 2.0);
            var zoneHeight = (constraintBox.height - this._loopRadius) * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Megaparsec.Utils.random.next(zoneHeight);
            properties.initialVelocity = new Vector(-150, 400);
            properties.targetVelocity = new Vector(-300, 0);
            agent.velocity = properties.initialVelocity;
        };
        Loop.prototype.updateAgent = function (agent, context) {
            var _this = this;
            var properties = agent.controllerProperties;
            if (properties.phase === 0) // swooping
             {
                if (agent.position.y > properties.targetY) {
                    properties.loopCenter = agent.position.withX(function (x) { return x + _this._loopRadius; });
                    properties.phase = 1;
                }
            }
            if (properties.phase === 1) // looping
             {
                var velocity = agent.velocity.magnitude;
                var angleToLoopCenter = agent.position.angleTo(properties.loopCenter);
                var tangentAngle = angleToLoopCenter + Math.PI * 0.5;
                agent.velocity = Vector.fromPolar(tangentAngle, velocity);
                if (agent.velocity.x < 0 && Math.abs(agent.velocity.y) < 20) {
                    agent.velocity = agent.velocity.withY(function (y) { return 0; });
                    properties.phase = 2; // Cruising
                    properties.constrain = true;
                }
            }
        };
        return Loop;
    }(Megaparsec.Controller));
    Megaparsec.Loop = Loop;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Wobble = /** @class */ (function (_super) {
        __extends(Wobble, _super);
        function Wobble() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._amplitude = 50;
            return _this;
        }
        Wobble.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 0; // swooping
            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;
            agent.position = new Vector(zoneLeft + Megaparsec.Utils.random.next(zoneWidth), -agent.height * 2.0);
            var zoneHeight = constraintBox.height * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Megaparsec.Utils.random.next(zoneHeight);
            properties.initialVelocity = new Vector(0, 400);
            properties.targetVelocity = new Vector(-300, 0);
            agent.velocity = new Vector(0, properties.initialVelocity.y);
        };
        Wobble.prototype.updateAgent = function (agent, context) {
            var properties = agent.controllerProperties;
            if (properties.phase === 0) { // swooping
                var percentToTarget = (agent.position.y - properties.initialY) / ((properties.targetY + this._amplitude) - properties.initialY);
                agent.velocity = agent.velocity.withX(function (x) { return percentToTarget * properties.targetVelocity.x; });
                if (agent.position.y > properties.targetY + this._amplitude) {
                    agent.acceleration = new Vector(0, -this._amplitude);
                    properties.amplitudeFactor = 1;
                    properties.phase = 1;
                }
            }
            else if (properties.phase === 1) { // wobble up
                if (agent.position.y < properties.targetY) {
                    agent.velocity = agent.velocity.withY(function (y) { return y * 0.75; });
                    agent.acceleration = new Vector(0, this._amplitude);
                    properties.phase = 2;
                    if (Math.abs(agent.velocity.y) < 150) {
                        agent.velocity = agent.velocity.withY(function (y) { return 0; });
                        agent.acceleration = new Vector();
                        properties.phase = 3; // cruising
                        properties.constrain = true;
                    }
                }
            }
            else if (properties.phase === 2) { // wobble down
                if (agent.position.y > properties.targetY) {
                    agent.velocity = agent.velocity.withY(function (y) { return y * 0.75; });
                    agent.acceleration = new Vector(0, -this._amplitude);
                    properties.phase = 1;
                    if (Math.abs(agent.velocity.y) < 150) {
                        agent.velocity = agent.velocity.withY(function (y) { return 0; });
                        agent.acceleration = new Vector();
                        properties.phase = 3; // cruising
                        properties.constrain = true;
                    }
                }
            }
        };
        return Wobble;
    }(Megaparsec.Controller));
    Megaparsec.Wobble = Wobble;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Target = /** @class */ (function (_super) {
        __extends(Target, _super);
        function Target() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._lateralVelocity = 50;
            _this._forwardVelocity = 200;
            _this._forwardStep = 50;
            _this._shotSpeed = 1200;
            _this._shotIteration = 500;
            return _this;
        }
        Target.prototype.init = function (agent, constraintBox) {
            var properties = agent.controllerProperties;
            properties.constrain = false;
            properties.phase = 0; // moving forward
            properties.lastFireElapsed = 0;
            properties.targetX = constraintBox.width - 50;
            var zoneTop = constraintBox.height * 0.15;
            var zoneHeight = constraintBox.height - zoneTop * 2;
            agent.position = new Vector(constraintBox.width + 100, zoneTop + Megaparsec.Utils.random.next(zoneHeight));
            agent.velocity = new Vector(-200, 0);
        };
        Target.prototype.updateAgent = function (agent, context) {
            var properties = agent.controllerProperties;
            if (properties.phase === 0) { // moving forward
                if (agent.position.x < properties.targetX) {
                    agent.velocity = agent.velocity.withX(function (x) { return 0; });
                    properties.phase = 1; // targetting
                    return;
                }
            }
            if (properties.phase === 1) { // targetting 
                var target = context.findFirst(function (i) { return i instanceof Megaparsec.Player; });
                if (!target || target.isDead) {
                    agent.velocity = new Vector();
                    return;
                }
                properties.lastFireElapsed += context.elapsed;
                if (Math.abs(agent.position.y - target.position.y) < 5 ||
                    agent.position.y <= target.position.y && agent.velocity.y < 0 ||
                    agent.position.y >= target.position.y && agent.velocity.y > 0) {
                    if (properties.lastFireElapsed > this._shotIteration) {
                        context.activate(new Megaparsec.Shot(agent, new Lightspeed.Vector(-this._shotSpeed)));
                        properties.lastFireElapsed = 0;
                        agent.velocity = new Vector(-this._forwardVelocity, 0);
                        properties.targetX = agent.position.x - this._forwardStep;
                        properties.phase = 0; // moving forward
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
/// <reference path="Swoop.ts" />
/// <reference path="Bounce.ts" />
/// <reference path="Loop.ts" />
/// <reference path="Wobble.ts" />
/// <reference path="Target.ts" />
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
        };
        Object.defineProperty(ControllerFactory, "current", {
            get: function () {
                return ControllerFactory._current;
            },
            enumerable: true,
            configurable: true
        });
        ControllerFactory.prototype.create = function (config) {
            if (!config.name || !this._controllerTypesByName[config.name]) {
                return new Megaparsec.Controller();
            }
            var type = this._controllerTypesByName[config.name];
            return new type(config);
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
            var _this = _super.call(this) || this;
            _this._maximumVelocity = 500;
            _this._movementAcceleration = 50;
            return _this;
        }
        Human.prototype.updateAgent = function (agent, context) {
            var properties = agent.controllerProperties;
            var keys = Config.keys;
            var accelerationX = 0;
            var accelerationY = 0;
            if (Megaparsec.Utils.keyboard.keys(keys.moveUp)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationY = -this._movementAcceleration;
                }
            }
            if (Megaparsec.Utils.keyboard.keys(keys.moveDown)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationY += this._movementAcceleration;
                }
            }
            if (Megaparsec.Utils.keyboard.keys(keys.moveLeft)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationX = -this._movementAcceleration;
                }
            }
            if (Megaparsec.Utils.keyboard.keys(keys.moveRight)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationX += this._movementAcceleration;
                }
            }
            properties.lastFireElapsed += context.elapsed;
            if (Megaparsec.Utils.keyboard.keys(keys.primaryFire)) {
                if (!properties.lastFireElapsed || properties.lastFireElapsed > 400) {
                    context.activate(new Megaparsec.Shot(agent, new Lightspeed.Vector(800)));
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
    var Explosion = /** @class */ (function (_super) {
        __extends(Explosion, _super);
        function Explosion(origin) {
            var _this = _super.call(this) || this;
            _this._particleCount = 100;
            _this._durration = 750; // milliseconds
            _this._particleMaxMagnitude = 100;
            _this._particles = [];
            _this._totalElapsed = 0;
            _this._alpha = 1;
            _this.position = origin.position;
            _this.velocity = origin.velocity;
            return _this;
        }
        Explosion.prototype.init = function (context) {
            for (var i = 0; i < this._particleCount; i++) {
                var argument = Megaparsec.Utils.random.next(Math.PI * 2);
                var magnitude = Megaparsec.Utils.random.next(this._particleMaxMagnitude);
                this._particles.push({
                    position: new Lightspeed.Vector(0, 0),
                    velocity: Lightspeed.Vector.fromPolar(argument, magnitude),
                    color: Megaparsec.Color.getRandomColor(),
                    radius: Megaparsec.Utils.random.next(2)
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
var Megaparsec;
(function (Megaparsec) {
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        function Background() {
            return _super !== null && _super.apply(this, arguments) || this;
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
        function Hills() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._maxHillHeight = 150;
            _this._minHillHeight = 50;
            _this._maxHillWidth = 150;
            _this._minHillWidth = 100;
            _this._hills = [];
            _this.velocityX = 0;
            _this.velocityY = 0;
            return _this;
        }
        Hills.prototype.generateHills = function (hillX, canvasWidth) {
            while (hillX <= canvasWidth + this._maxHillWidth) {
                var height = Megaparsec.Utils.random.getBetween(this._minHillHeight, this._maxHillHeight);
                var width = Megaparsec.Utils.random.getBetween(this._minHillWidth, this._maxHillWidth);
                var depth = Megaparsec.Utils.random.next(40);
                var velocity = -200 - depth;
                var hill = {
                    start: hillX,
                    width: width,
                    height: height,
                    color: Megaparsec.Color.getRandomShade('#0d1c01', 0.0, 0.1),
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
            var hillsToKeep = [];
            for (var i = 0; i < this._hills.length; i++) {
                var hill = this._hills[i];
                if (hill.start + hill.width > 0) {
                    hill.start += hill.velocity * context.delta;
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
                var fillStyle = ctx.createLinearGradient(hill.start + hill.width * 0.5, canvasHeight - hill.height, hill.start + hill.width * 0.5, canvasHeight + 10);
                fillStyle.addColorStop(0, hill.color);
                fillStyle.addColorStop(1, 'black');
                ctx.beginPath();
                ctx.fillStyle = fillStyle;
                ctx.moveTo(hill.start - hill.width * 0.3, canvasHeight + 10);
                ctx.lineTo(hill.start + hill.width * 0.3, canvasHeight - hill.height * 0.7);
                ctx.arcTo(hill.start + hill.width * 0.5, canvasHeight - hill.height, hill.start + hill.width * 0.7, canvasHeight - hill.height * 0.7, hill.width / 6);
                ctx.lineTo(hill.start + hill.width * 1.3, canvasHeight + 10);
                ctx.fill();
            }
        };
        return Hills;
    }(Lightspeed.Element));
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
var Megaparsec;
(function (Megaparsec) {
    var StarField = /** @class */ (function (_super) {
        __extends(StarField, _super);
        function StarField(starCount) {
            var _this = _super.call(this) || this;
            _this._stars = [];
            _this.velocityX = 0;
            _this.velocityY = 0;
            _this._starCount = starCount || 25;
            return _this;
        }
        StarField.prototype.init = function (context) {
            for (var i = 0; i < this._starCount; i++) {
                this._stars.push({
                    x: Megaparsec.Utils.random.next(context.canvasBox.width),
                    y: Megaparsec.Utils.random.next(context.canvasBox.height),
                    relativeVelocity: Megaparsec.Utils.random.next(),
                    color: Megaparsec.Color.getRandomColor(),
                    radius: Megaparsec.Utils.random.next() * 0.5,
                    twinkle: Megaparsec.Utils.random.nextInt(5000) === 1 ? 0 : 1
                });
            }
        };
        StarField.prototype.update = function (context) {
            for (var i = 0; i < this._stars.length; i++) {
                var star = this._stars[i];
                var localVelocityX = this.velocityX * star.relativeVelocity;
                var localVelocityY = this.velocityY * star.relativeVelocity;
                star.x += localVelocityX * context.delta;
                star.y += localVelocityY * context.delta;
                if (star.twinkle && Megaparsec.Utils.random.nextInt(5000) === 1) {
                    star.twinkle = 0;
                }
                else if (!star.twinkle && Megaparsec.Utils.random.nextInt(50) === 1) {
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
    }(Lightspeed.Element));
    Megaparsec.StarField = StarField;
})(Megaparsec || (Megaparsec = {}));
//# sourceMappingURL=tsbuild.js.map