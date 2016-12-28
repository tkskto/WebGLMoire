///<reference path="events/EventDispatcher.ts" />

module model {
    export class Model extends events.EventDispatcher {
        
        public static RESIZE_EVENT:string = 'onResize';
        
        private static _instance:Model;
        
        constructor() {
            super();
    
            window.addEventListener('resize', this.onResize);
            this.onResize();
        }
        
        public static getInstance = ():Model => {
            if(!Model._instance) {
                Model._instance = new Model();
            }
            
            return Model._instance;
        };
        
        private _lib:gl.Lib;
    
        get lib(): gl.Lib {
            return this._lib;
        }
    
        set lib(value: gl.Lib) {
            this._lib = value;
            this.onResize();
        }
        
        private _screen:{width:number, height:number} = {width:0,height:0};
    
        get screen(): {width: number; height: number} {
            return this._screen;
        }
    
        set screen(value: {width: number; height: number}) {
            this._screen = value;
            this.dispatchEvent(Model.RESIZE_EVENT);
        }
    
        private onResize = () => {
            if (this.screen.width === window.innerWidth) {
                return;
            }
        
            this.screen = {
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    }
}