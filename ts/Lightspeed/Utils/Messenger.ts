namespace Lightspeed.Utils {
    export class Messenger {

        private _subscriptions: Subscription[] = [];

        subscribe(source: any, messageName: string, callback: (message: Message) => void) {
            this._subscriptions.push({
                source: source,
                messageName: messageName,
                callback: callback
            });
        }

        unsubsribe(source: any) {
            this._subscriptions = this._subscriptions.filter(i => i.source === source);
        }

        publish(messageName: string, payload?: any) {
            this._subscriptions.filter(i => i.messageName === messageName).forEach(i => i.callback.bind(i.source).call(new Message(messageName, payload)))
        }
    }

    export class Message {
        private _name;

        constructor(name: string, payload?: any) {
            this._name = name;
        }

        public get name() {
            return this._name;
        }
    }

    class Subscription {
        source: any;
        messageName: string;
        callback: (message: Message) => void;
    }
}