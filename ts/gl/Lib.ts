module gl {
    export class Lib {
        
        private _canvas:HTMLCanvasElement;
        private _gl:WebGLRenderingContext;
        private _prg:WebGLProgram;
        
        constructor(){}
    
        get prg(): WebGLProgram {
            return this._prg;
        }
    
        set prg(value: WebGLProgram) {
            this._prg = value;
        }
        get gl(): WebGLRenderingContext {
            return this._gl;
        }
    
        set gl(value: WebGLRenderingContext) {
            this._gl = value;
        }
        get canvas(): HTMLCanvasElement {
            return this._canvas;
        }
    
        set canvas(value: HTMLCanvasElement) {
            this._canvas = value;
        }
    
    }
}