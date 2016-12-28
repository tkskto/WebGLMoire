///<reference path="../utils/GLUtil.ts" />

module gl {
    export class Program {
        
        private _prg:WebGLProgram;
        private _gl:WebGLRenderingContext;
        
        private _attL:number[] = [];
        private _attS:number[] = [];
        private _uniforms:WebGLUniformLocation[] = [];
        private _uniTypes:string[] = [];
        
        constructor(private _lib:gl.Lib, private _vs:string, private _fs:string, _attL:string[], _attS:number[], _uniforms:string[], _uniTypes:string[]){
            
            this._gl = _lib.gl;
            this._prg = this._gl.createProgram();
    
            let vertexShader:WebGLShader = utils.GLUtil.compileShader(this._gl, this._vs);
            let fragmentShader:WebGLShader = utils.GLUtil.compileShader(this._gl, this._fs);
    
            this._gl.attachShader(this._prg, vertexShader);
            this._gl.attachShader(this._prg, fragmentShader);
    
            this._gl.linkProgram(this._prg);
    
            if(this._gl.getProgramParameter(this._prg, this._gl.LINK_STATUS)) {
                this._gl.useProgram(this._prg);
            } else {
                console.log(this._gl.getProgramInfoLog(this._prg));
            }
            
            let i;
            
            for(i = 0; i < _attL.length; i++){
                this._attL[i] = this._gl.getAttribLocation(this._prg, _attL[i]);
                this._attS[i] = _attS[i];
            }
            
            for(i = 0; i < _uniforms.length; i++) {
                this._uniforms[i] = this._gl.getUniformLocation(this._prg, _uniforms[i]);
                this._uniTypes[i] = _uniTypes[i];
            }
            
            utils.GLUtil.checkLocation(this._attL, this._uniforms);
    
            _lib.prg = this._prg;
        }
        public setAttrVBO = (_vbo:WebGLBuffer[]) => {
            utils.GLUtil.setVBO(this._gl, _vbo, this._attL, this._attS);
        };
    
        public setAttrIBO = (_ibo:WebGLBuffer) => {
            utils.GLUtil.setIBO(this._gl, _ibo);
        };
    
        public pushShader = (value: any) => {
            for (let i = 0, l = this._uniforms.length; i < l; i++) {
                switch (this._uniTypes[i]) {
                    case 'matrix4fv':
                        this._gl.uniformMatrix4fv(this._uniforms[i], false, value[i]);
                        break;
                    case '4fv':
                        this._gl.uniform4fv(this._uniforms[i], value[i]);
                        break;
                    case '3fv':
                        this._gl.uniform3fv(this._uniforms[i], value[i]);
                        break;
                    case '2fv':
                        this._gl.uniform2fv(this._uniforms[i], value[i]);
                        break;
                    case '1fv':
                        this._gl.uniform1fv(this._uniforms[i], value[i]);
                        break;
                    case '1f':
                        this._gl.uniform1f(this._uniforms[i], value[i]);
                        break;
                    case '1iv':
                        this._gl.uniform1iv(this._uniforms[i], value[i]);
                        break;
                    case '1i':
                        this._gl.uniform1i(this._uniforms[i], value[i]);
                        break;
                    case 'matrix3fv':
                        this._gl.uniformMatrix3fv(this._uniforms[i], false, value[i]);
                        break;
                    case 'matrix2fv':
                        this._gl.uniformMatrix2fv(this._uniforms[i], false, value[i]);
                        break;
                    default :
                        break;
                }
            }
        };
    }
}