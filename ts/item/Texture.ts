module item {
    export class Texture {
        private _img:HTMLImageElement;
        private _texture: WebGLTexture;
        
        constructor(private _gl:WebGLRenderingContext, private _src:string, private _callback:Function = null) {
            this.init();
        }
        
        private init = () => {
            this._img = new Image();
            
            this._img.onload = this.loaded;
            this._img.src = this._src;
        };
        
        private loaded = (e:Event) => {
            
            this._texture = this._gl.createTexture();
            
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
            this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._img);
            this._gl.generateMipmap(this._gl.TEXTURE_2D);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.REPEAT);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.REPEAT);
            this._gl.bindTexture(this._gl.TEXTURE_2D, null);
            
            if(this._callback) {
                this._callback();
            }
        };
    
        get texture(): WebGLTexture {
            return this._texture;
        }
    }
}