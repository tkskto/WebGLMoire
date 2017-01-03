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
        };
        
        private _mouseMove:number = 0;
    
        get mouseMove(): number {
            return this._mouseMove * 0.005;
        }
    
        set mouseMove(value: number) {
            this._mouseMove = value;
        }
        
        private _rotation: {x:number, y:number, r:number} = {x:0, y:0, r:0};
    
        get rotation(): {x: number; y: number; r: number} {
            return this._rotation;
        }
    
        set rotation(value: {x: number; y: number; r: number}) {
            this._rotation = value;
        }
    }
}