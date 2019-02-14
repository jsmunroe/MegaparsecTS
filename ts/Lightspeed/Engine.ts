namespace Lightspeed {
    export class Engine {
        private _canvas :Canvas;

        private _scenes :Scene[] = [];
        private _currentScene :Scene;

        private _lastTimeStamp: number;

        get currentScene() {
            return this._currentScene;
        }

        get canvas() {
            return this._canvas;
        }

        constructor() {
            this._canvas = Canvas.find();

            this.setScene('Default Scene');
        }

        setScene(name: string) {
            this._currentScene = this.getScene(name);
        }

        getScene(name: string) :Scene {
            var scene = this._scenes.filter(i => i.name === name)[0];

            if (!scene) {
                scene = new Scene(this, name);
                this._scenes.push(scene);
            }

            return scene;
        }

        clear() {
            this.currentScene.clear();
        }

        pushElement(element: Element) {
            this.currentScene.pushElement(element);
        }

        removeElement(element: Element) {
            this.currentScene.removeElement(element);
        }

        findElements(predicate?: (element: Element) => boolean) :Element[] {
            return this.currentScene.findElements(predicate);
        }

        findFirstElement(predicate?: (element: Element) => boolean) :Element {
            return this.currentScene.findFirstElement(predicate);
        }

        findClosestElement(position: Vector, predicate?: (element: Element) => boolean) :Element {
            return this.currentScene.findClosestElement(position, predicate);
        }

        get isPaused() :boolean {
            return this.currentScene.isPaused;
        }

        pause() {
            this.currentScene.pause();
        }

        unpause() {
            this.currentScene.unpause();
        }

        togglePause() {
            this.currentScene.togglePause();
        }

        requestTimeout(delay: number, element: Element, action: (context: FrameUpdateContext) => void) {
            this.currentScene.requestTimeout(delay, element, action);
        }

        onPause(scene: Scene) {
            // optionally overloaded by extending classes to handle pause.
        }

        onUnpause(scene: Scene) {
            // optionally overloaded by extending classes to handle unpause.
        }

        private runFrame(timeStamp : DOMHighResTimeStamp) {
            requestAnimationFrame(this.runFrame.bind(this));

            if (!this._lastTimeStamp) {
                this._lastTimeStamp = timeStamp;
            }

            var elapsed = timeStamp - this._lastTimeStamp;

            // Update phase
            for (let i = 0; i < this._scenes.length; i++) {
                const scene = this._scenes[i];
                
                if (!scene.isPaused) {                    
                    var updateContext = new FrameUpdateContext(this, scene, elapsed, scene.wasPaused);

                    scene.update(updateContext);
                }
            }

            this._lastTimeStamp = timeStamp;


            // Render phase
            var ctx = this.canvas.startRender();
            var renderContext = new FrameRenderContext(this, timeStamp, ctx);

            this.currentScene.render(renderContext);

            this.canvas.endRender(ctx);
        }

        run() {
            requestAnimationFrame(this.runFrame.bind(this));
        }
    }

}
