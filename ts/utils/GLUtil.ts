module utils {
    export class GLUtil {
        constructor(){}
    
        /**
         * 渡したidを持つ<script>のテキストをコンパイルしてシェーダーを返します。
         * @param _gl webGLコンテキスト
         * @param _id <script>のID
         * @returns {WebGLShader}
         */
        public static compileShader = (_gl:WebGLRenderingContext, _id:string):WebGLShader => {
            let script:HTMLScriptElement = document.getElementById(_id) as HTMLScriptElement;
    
            if (!script) {
                return;
            }
            
            let shader:WebGLShader,
                type:string = script.type,
                shaderSrc:string = script.text;
            
            if(type === 'x-shader/x-vertex') {
                
                shader = _gl.createShader(_gl.VERTEX_SHADER);
                
            } else if (type === 'x-shader/x-fragment') {
                
                shader = _gl.createShader(_gl.FRAGMENT_SHADER);
                
            }
            
            _gl.shaderSource(shader, shaderSrc);
            _gl.compileShader(shader);
            
            if(_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
                return shader;
            } else {
                console.log(_id + ': ' + _gl.getShaderInfoLog(shader));
            }
        };
    
        /**
         * 頂点情報からVBOを作成し、返す
         * @param _gl webGLコンテキスト
         * @param _data 頂点情報
         * @returns {WebGLBuffer}
         */
        public static createVBO = (_gl:WebGLRenderingContext, _data:number[]):WebGLBuffer => {
            let vbo:WebGLBuffer = _gl.createBuffer();
            
            _gl.bindBuffer(_gl.ARRAY_BUFFER, vbo);
            _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array(_data), _gl.STATIC_DRAW);
            _gl.bindBuffer(_gl.ARRAY_BUFFER, null);
            
            return vbo;
        };
    
        /**
         * 頂点番号情報からIBOを作成し、返す
         * @param _gl webGLコンテキスト
         * @param _data 頂点の番号情報
         * @returns {WebGLBuffer}
         */
        public static createIBO = (_gl:WebGLRenderingContext, _data:number[]):WebGLBuffer => {
            let ibo = _gl.createBuffer();
            
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, ibo);
            _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, new Int16Array(_data), _gl.STATIC_DRAW);
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, null);
            
            return ibo;
        };
    
        /**
         * 頂点シェーダにあるattribute変数とVBOを紐づける
         * @param _gl webGLコンテキスト
         * @param _vbo VBO
         * @param _attL attributeLocation(シェーダの何番目にあたるか)の配列
         * @param _attS 各attributeが何個の要素でできているかの配列
         */
        public static setVBO = (_gl:WebGLRenderingContext,_vbo:WebGLBuffer[], _attL, _attS) => {
            for(let i in _vbo) {
                _gl.bindBuffer(_gl.ARRAY_BUFFER, _vbo[i]);
                _gl.enableVertexAttribArray(_attL[i]);
                _gl.vertexAttribPointer(_attL[i], _attS[i], _gl.FLOAT, false, 0, 0);
            }
        };
        
        public static setIBO = (_gl:WebGLRenderingContext, _ibo:WebGLBuffer) => {
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, _ibo);
        };
    
        /**
         * attributeLocation, uniformLocationが妥当かどうかを判定する
         * @param _attL attribuLocationの配列
         * @param _uniL webGLUniformLocationの配列
         */
        public static checkLocation = (_attL:number[], _uniL:WebGLUniformLocation[]):boolean => {
            let i;
            for(i = 0; i < _attL.length; i++){
                if(_attL[i] == null || _attL[i] < 0){
                    console.warn('◆ invalid attribute location: %c"' + _attL[i] + '"', 'color: crimson');
                    return false;
                }
            }
            for(i = 0; i < _uniL.length; i++){
                if(_uniL[i] == null || _uniL[i] < 0){
                    console.warn('◆ invalid uniform location: %c"' + _uniL[i] + '"', 'color: crimson');
                    return false;
                }
            }
            
            return true;
        }
    }
}