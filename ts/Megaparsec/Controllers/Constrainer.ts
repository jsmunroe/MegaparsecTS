namespace Megaparsec {
    export class Constrainer {
        private _horizontalConstraintTopology: ConstraintToplogy;
        private _verticalConstraintTopology: ConstraintToplogy;

        constructor(horizontalConstraintTopology: ConstraintToplogy, verticalConstraintTopology) {
            this._horizontalConstraintTopology = horizontalConstraintTopology;
            this._verticalConstraintTopology = verticalConstraintTopology;
        }

        constrain(gameObject: GameObject, context: Lightspeed.FrameUpdateContext) :boolean {
            var constraintBox = context.canvasBox;

            if (constraintBox.containsBox(gameObject.box) || !gameObject.controllerProperties.constrain) {
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
        }

        public static get killOutOfBounds(): Constrainer {
            return new Constrainer(ConstraintToplogy.Kill, ConstraintToplogy.Kill);
        }

        public static get boxIn(): Constrainer {
            return new Constrainer(ConstraintToplogy.Block, ConstraintToplogy.Block);
        }

        public static get wrapHorizontally(): Constrainer {
            return new Constrainer(ConstraintToplogy.Wrap, ConstraintToplogy.Block);
        }
    }

    export enum ConstraintToplogy {
        None = 0,
        Block = 1,
        Wrap = 2,
        Kill = 3
    }
}