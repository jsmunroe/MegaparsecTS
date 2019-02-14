namespace Lightspeed {
    export class SceneContext {
        private _scene: Scene;

        get scene() :Scene {
            return this._scene;
        }

        constructor (scene: Scene) {
            this._scene = scene;
        }

        clear() {
            this._scene.clear();
        }

        pushElement(element: Element) {
            this._scene.pushElement(element);
        }

        removeElement(element: Element) {
            this._scene.removeElement(element);
        }

        findElements(predicate?: (element: Element) => boolean) :Element[] {
            return this._scene.findElements(predicate);
        }

        findFirstElement(predicate?: (element: Element) => boolean) :Element {
            return this._scene.findFirstElement(predicate);
        }

        findClosestElement(position: Vector, predicate?: (element: Element) => boolean) :Element {
            return this._scene.findClosestElement(position, predicate);
        }

        pause() {
            this._scene.pause();
        }

        unpause() {
            this._scene.unpause();
        }

        togglePause() {
            this._scene.togglePause();
        }

        requestTimeout(delay: number, element: Element, action: (context: FrameUpdateContext) => void) {
            this._scene.requestTimeout(delay, element, action);
        }
    }
}