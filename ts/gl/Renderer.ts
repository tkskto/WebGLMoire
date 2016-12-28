module gl {
    export class Renderer {
        
        private _model:model.Model = model.Model.getInstance();
        private _timer:number;
        
        private _gl:WebGLRenderingContext;
        
        private _width:number;
        private _height:number;
        
        private mLib:MatIV = new MatIV();
        private mMatrix = this.mLib.identity(this.mLib.create());
        private vMatrix = this.mLib.identity(this.mLib.create());
        private pMatrix = this.mLib.identity(this.mLib.create());
        private vpMatrix = this.mLib.identity(this.mLib.create());
        private mvpMatrix = this.mLib.identity(this.mLib.create());
        
        private shortSide: number;
        
        constructor(private _lib:gl.Lib, private _prg:gl.Program, private _index:number[]){
            this._gl = _lib.gl;
            this._model.addEventListener(model.Model.RESIZE_EVENT, this.onResize);
            this.onResize();
            this.init();
        }
        
        private init = () => {
            this.animate();
        };
        
        private animate = () => {
            this._timer = requestAnimationFrame(this.animate);
            this.render();
        };
        
        private render = () => {
    
            this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
            this._gl.clearDepth(1.0);
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            
            this.mLib.multiply(this.vpMatrix, this.mMatrix, this.mvpMatrix);
            
            this._prg.pushShader([this.mvpMatrix, [this._width,this._height]]);
            this._gl.drawElements(this._gl.TRIANGLES, this._index.length, this._gl.UNSIGNED_SHORT, 0);
            
            this._gl.flush();
        };
        
        private onResize = () => {
            
            this._width = this._model.screen.width;
            this._height = this._model.screen.height;
            
            this.shortSide = Math.min(this._width, this._height) * .5 + 5;
    
            // ビュー座標変換行列
            this.mLib.lookAt([0.0, 0.0, this.shortSide], [0, 0, 0], [0, 1, 0], this.vMatrix);
    
            // プロジェクション座標変換行列
            this.mLib.perspective(90, this._width / this._height, 0.1, 1000, this.pMatrix);
    
            // 各行列を掛け合わせ座標変換行列を完成させる
            this.mLib.multiply(this.pMatrix, this.vMatrix, this.mvpMatrix);
        }
    }
}