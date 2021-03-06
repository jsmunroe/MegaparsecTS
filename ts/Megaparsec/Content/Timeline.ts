namespace Megaparsec {
    export class Timeline extends Lightspeed.Element {
        private _currentIndex = -1;
        private _currentEvent: Lightspeed.Element = null;
        private _events: Lightspeed.Element[] = [];

        public static start() :Timeline {
            return new Timeline();
        }

        addLevel(buildLevel: (levelBuilder: Level) => Level): Timeline {
            this._events.push(buildLevel(Level.start()));

            return this;
        }

        addElement(element: Lightspeed.Element): Timeline {
            this._events.push(new AddElement(element));

            return this;
        }

        addEvent(event: Lightspeed.Element): Timeline {
            this._events.push(event);

            return this;
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            if (!this._currentEvent || this._currentEvent.isDead) {
                this._currentIndex++;
                this._currentEvent = this._events[this._currentIndex];
                
                if (!this._currentEvent) {
                    this.kill();
                    return;
                }

                context.pushElement(this._currentEvent);
            }
        }

    }
}