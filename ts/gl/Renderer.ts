module gl {
    export class Renderer {
        
        private _model:model.Model = model.Model.getInstance();
        private _timer:number;
        
        private _gl:WebGLRenderingContext;
        
        private _width:number;
        private _height:number;
        
        private mLib:MatIV = new MatIV();
        private qLib:QtnIV = new QtnIV();
        private quaternion:number[] = this.qLib.identity(this.qLib.create());
        private mMatrix = this.mLib.identity(this.mLib.create());
        private vMatrix = this.mLib.identity(this.mLib.create());
        private pMatrix = this.mLib.identity(this.mLib.create());
        private qMatrix = this.mLib.identity(this.mLib.create());
        private vpMatrix = this.mLib.identity(this.mLib.create());
        private mvpMatrix = this.mLib.identity(this.mLib.create());
        
        private count = 0;
        
        constructor(private _lib:gl.Lib, private _prg:gl.Program, private _index:number[]){
            this._gl = _lib.gl;
            this._model.addEventListener(model.Model.RESIZE_EVENT, this.onResize);
            this.onResize();
            this.init();
        }
        
        private init = () => {
            this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
            this.animate();
        };
        
        private animate = () => {
            this._timer = requestAnimationFrame(this.animate);
            this.render();
        };
        
        private render = () => {
    
            this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
            this._gl.clearDepth(1.0);
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            
            //1枚目のレンダリング
            this.mLib.identity(this.mMatrix);
            this.mLib.multiply(this.vpMatrix, this.mMatrix, this.mvpMatrix);
            this._gl.disable(this._gl.BLEND);
            this._prg.pushShader([this.mvpMatrix, [0.12, 0.12, 0.12]]);
            this._gl.drawElements(this._gl.TRIANGLES, this._index.length, this._gl.UNSIGNED_SHORT, 0);
    
            // let _rotation:{x:number, y:number, r:number} = this._model.rotation;
            // this.qLib.rotate(_rotation.r, [_rotation.y, _rotation.x, 0.0], this.quaternion);
            // this.qLib.toMatIV(this.quaternion, this.qMatrix);
    
            //2枚目のレンダリング
            this.mLib.identity(this.mMatrix);
            //this.mLib.multiply(this.mMatrix, this.qMatrix, this.mMatrix);
            this.mLib.rotate(this.mMatrix, this._model.mouseMove, [0.0, 0.0, 1.0], this.mMatrix);
            //this.mLib.scale(this.mMatrix, [0.9, 0.9, 1.0], this.mMatrix);
            this.mLib.multiply(this.vpMatrix, this.mMatrix, this.mvpMatrix);
            this._gl.enable(this._gl.BLEND);
            this._prg.pushShader([this.mvpMatrix, [0.1, 0.1, 0.1]]);
            this._gl.drawElements(this._gl.TRIANGLES, this._index.length, this._gl.UNSIGNED_SHORT, 0);
            
            this._gl.flush();
        };
        
        private onResize = () => {
            
            this._width = this._model.screen.width;
            this._height = this._model.screen.height;
    
            // ビュー座標変換行列
            this.mLib.lookAt([0.0, 0.0, 1.0], [0, 0, 0], [0, 1, 0], this.vMatrix);
    
            // プロジェクション座標変換行列
            this.mLib.perspective(90 , this._width / this._height, 0.1, 100, this.pMatrix);
    
            // 各行列を掛け合わせ座標変換行列を完成させる
            this.mLib.multiply(this.pMatrix, this.vMatrix, this.mvpMatrix);
        }
    }
}