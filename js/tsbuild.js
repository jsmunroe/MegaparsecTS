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
        }
        Element.prototype.init = function (context) {
            // optionally overloaded by extending classes set the initial state of this element.
        };
        Element.prototype.update = function (context) {
            // optionally overloaded by extending classes to update element state per frame time.
        };
        Element.prototype.render = function (context) {
            // optionally overloaded by extending classes to render element.
        };
        return Element;
    }());
    Lightspeed.Element = Element;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var ElementInitContext = /** @class */ (function () {
        function ElementInitContext(canvas) {
            this._canvasHeight = canvas.height;
            this._canvasWidth = canvas.width;
        }
        Object.defineProperty(ElementInitContext.prototype, "canvasWidth", {
            get: function () {
                return this._canvasWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementInitContext.prototype, "canvasHeight", {
            get: function () {
                return this._canvasHeight;
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
        Object.defineProperty(Engine.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        Engine.prototype.runFrame = function (timeStamp) {
            requestAnimationFrame(this.runFrame.bind(this));
            // Update phase
            var updateContext = new Lightspeed.FrameUpdateContext(this, timeStamp);
            for (var i = 0; i < this._elements.length; i++) {
                var element = this._elements[i];
                element.update(updateContext);
            }
            // Render phase
            var ctx = this.canvas.startRender();
            var renderContext = new Lightspeed.FrameRenderContext(this, ctx);
            for (var i = 0; i < this._elements.length; i++) {
                var element = this._elements[i];
                element.render(renderContext);
            }
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
        function FrameUpdateContext(engine, timeStamp) {
            this._engine = engine;
            this._canvasBox = engine.canvas.box;
            this._timeStamp = timeStamp;
            if (!FrameUpdateContext._lastTimeStamp) {
                FrameUpdateContext._lastTimeStamp = timeStamp;
            }
            this._elapsed = timeStamp - FrameUpdateContext._lastTimeStamp;
            this._delta = this._elapsed / 1000;
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
    },
    imageScale: 0.075,
    images: {
        player: './img/player.png',
        playerShot: './img/player.shot.png',
        enemy1: [
            './img/enemy1.blue.png',
            './img/enemy1.cyan.png',
            './img/enemy1.green.png',
            './img/enemy1.magenta.png',
            './img/enemy1.orange.png'
        ],
        enemy2: [
            './img/enemy2.blue.png',
            './img/enemy2.cyan.png',
            './img/enemy2.green.png',
            './img/enemy2.magenta.png',
            './img/enemy2.red.png'
        ],
        enemy3: [
            './img/enemy3.blue.png',
            './img/enemy3.cyan.png',
            './img/enemy3.green.png',
            './img/enemy3.magenta.png',
            './img/enemy3.red.png'
        ]
    }
};
var Megaparsec;
(function (Megaparsec) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Game.prototype.load = function (config) {
            this.clear();
            this.pushElement(new Megaparsec.Background());
            this.pushElement(new Megaparsec.StarField(200));
            this.pushElement(new Megaparsec.Hills());
            this._player = new Megaparsec.Player();
            this._player.position = new Lightspeed.Vector(100, 100);
            this.pushElement(this._player);
        };
        Game.run = function () {
            Game.s_current = new Game();
            Game.s_current.load(Config);
            Game.s_current.run();
        };
        return Game;
    }(Lightspeed.Engine));
    Megaparsec.Game = Game;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Random = /** @class */ (function () {
        function Random() {
        }
        Random.getBetween = function (min, max) {
            return (max - min) * Random.next() + min;
        };
        Random.getIntBetween = function (min, max) {
            return Math.floor(this.getBetween(min, max));
        };
        Random.next = function (factor) {
            return Math.random() * (factor || 1);
        };
        Random.nextInt = function (upperBound) {
            return Math.floor(Math.random() * (upperBound || 10));
        };
        return Random;
    }());
    Megaparsec.Random = Random;
    var Color = /** @class */ (function () {
        function Color() {
        }
        Color.getRandomColor = function () {
            var letters = '89ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Random.nextInt(letters.length)];
            }
            return color;
        };
        Color.getRandomShade = function (base, minShade, maxShade) {
            return Color.lum(base, Random.getBetween(minShade, maxShade));
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
    Megaparsec.Keyboard = Keyboard;
})(Megaparsec || (Megaparsec = {}));
/// <reference path="../../LightSpeed/InertialElement.ts" />
var Megaparsec;
(function (Megaparsec) {
    var Agent = /** @class */ (function (_super) {
        __extends(Agent, _super);
        function Agent(controller, sprite) {
            var _this = _super.call(this) || this;
            _this._controller = controller;
            _this._sprite = sprite;
            return _this;
        }
        Object.defineProperty(Agent.prototype, "width", {
            get: function () {
                return this._sprite.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Agent.prototype, "height", {
            get: function () {
                return this._sprite.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Agent.prototype, "box", {
            get: function () {
                return Lightspeed.Box.fromCenter(this.position, this.width, this.height);
            },
            set: function (value) {
                this.position = value.center;
            },
            enumerable: true,
            configurable: true
        });
        Agent.prototype.update = function (context) {
            this._controller.update(this, context.canvasBox);
            _super.prototype.update.call(this, context);
        };
        Agent.prototype.render = function (context) {
            this._sprite.draw(context.ctx, this.position);
        };
        return Agent;
    }(Lightspeed.InertialElement));
    Megaparsec.Agent = Agent;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player() {
            return _super.call(this, new Megaparsec.Human, new Lightspeed.Sprite(Config.images.player, Config.imageScale)) || this;
        }
        return Player;
    }(Megaparsec.Agent));
    Megaparsec.Player = Player;
})(Megaparsec || (Megaparsec = {}));
var Megaparsec;
(function (Megaparsec) {
    var Controller = /** @class */ (function () {
        function Controller() {
        }
        Controller.prototype.update = function (agent, constraintBox) {
            // optionally overloaded by extending classes to update the given agent.
        };
        return Controller;
    }());
    Megaparsec.Controller = Controller;
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
        Human.prototype.update = function (agent, constraintBox) {
            var keys = Config.keys;
            var accelerationX = 0;
            var accelerationY = 0;
            if (Megaparsec.Keyboard.Current.keys(keys.moveUp)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationY = -this._movementAcceleration;
                }
            }
            if (Megaparsec.Keyboard.Current.keys(keys.moveDown)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationY += this._movementAcceleration;
                }
            }
            if (Megaparsec.Keyboard.Current.keys(keys.moveLeft)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationX = -this._movementAcceleration;
                }
            }
            if (Megaparsec.Keyboard.Current.keys(keys.moveRight)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationX += this._movementAcceleration;
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
            this.constrain(agent, constraintBox);
        };
        // ToDo: Create a Constraint class higherarchy.
        Human.prototype.constrain = function (agent, constraintBox) {
            if (constraintBox.contains(agent.box)) {
                return true;
            }
            if (agent.box.left < constraintBox.left) {
                agent.box = agent.box.alignLeft(constraintBox.left);
            }
            if (agent.box.right > constraintBox.right) {
                agent.box = agent.box.alignRight(constraintBox.right);
            }
            if (agent.box.top < constraintBox.top) {
                agent.box = agent.box.alignTop(constraintBox.top);
            }
            if (agent.box.bottom > constraintBox.bottom) {
                agent.box = agent.box.alignBottom(constraintBox.bottom);
            }
            agent.acceleration = new Lightspeed.Vector();
            agent.velocity = new Lightspeed.Vector();
            return false;
        };
        return Human;
    }(Megaparsec.Controller));
    Megaparsec.Human = Human;
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
            _this._maxHillHeight = 200;
            _this._minHillHeight = 50;
            _this._maxHillWidth = 250;
            _this._minHillWidth = 150;
            _this._hills = [];
            _this.velocityX = 0;
            _this.velocityY = 0;
            return _this;
        }
        Hills.prototype.generateHills = function (hillX, canvasWidth) {
            while (hillX <= canvasWidth + this._maxHillWidth) {
                var height = Megaparsec.Random.getBetween(this._minHillHeight, this._maxHillHeight);
                var width = Megaparsec.Random.getBetween(this._minHillWidth, this._maxHillWidth);
                var depth = Megaparsec.Random.next(10);
                var velocity = -200 + depth;
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
            this.generateHills(-this._maxHillWidth, context.canvasWidth);
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
            ctx.save();
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
            ctx.restore();
        };
        return Hills;
    }(Lightspeed.Element));
    Megaparsec.Hills = Hills;
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
                    x: Megaparsec.Random.next(context.canvasWidth),
                    y: Megaparsec.Random.next(context.canvasHeight),
                    relativeVelocity: Megaparsec.Random.next(),
                    color: Megaparsec.Color.getRandomColor(),
                    radius: Megaparsec.Random.next() * 0.5,
                    twinkle: Megaparsec.Random.nextInt(5000) === 1 ? 0 : 1
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
                if (star.twinkle && Megaparsec.Random.nextInt(5000) === 1) {
                    star.twinkle = 0;
                }
                else if (!star.twinkle && Megaparsec.Random.nextInt(50) === 1) {
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
            ctx.save();
            this._stars.forEach(function (i) {
                if (i.twinkle) {
                    ctx.fillStyle = i.color;
                    ctx.beginPath();
                    ctx.arc(i.x, i.y, i.radius, 0, 2 * Math.PI);
                    ctx.fill();
                }
            });
            ctx.restore();
        };
        return StarField;
    }(Lightspeed.Element));
    Megaparsec.StarField = StarField;
})(Megaparsec || (Megaparsec = {}));
//# sourceMappingURL=tsbuild.js.map