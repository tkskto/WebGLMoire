///<reference path="typings/index.d.ts" />
///<reference path="Model.ts"/>
///<reference path="gl/Lib.ts"/>
///<reference path="gl/Program.ts"/>
///<reference path="gl/Renderer.ts"/>
///<reference path="item/Texture.ts"/>

(function(win, doc) {
    'use strict';
    
    window.onload = function() {
        
        let _lib: gl.Lib = new gl.Lib();
    
        let _model: model.Model = model.Model.getInstance();
        _model.lib = _lib;
    
        _lib.canvas = doc.getElementById('canvas') as HTMLCanvasElement;
        _lib.canvas.width = _model.screen.width;
        _lib.canvas.height = _model.screen.height;
    
        let _ctx: WebGLRenderingContext = _lib.canvas.getContext('webgl') || _lib.canvas.getContext('experimental-webgl');
    
        _lib.gl = _ctx;
    
        let halfW = _model.screen.width * .5;
        let halfH = _model.screen.height * .5;
    
        // モデル(頂点)データ
        let position = [
            -halfW, halfH, 0.0,
            halfW, halfH, 0.0,
            -halfW, -halfH, 0.0,
            halfW, -halfH, 0.0
        ];
    
        // 座標データから頂点バッファを生成
        let VBO: WebGLBuffer[] = [
            utils.GLUtil.createVBO(_ctx, position)
        ];
    
        // インデックスデータ
        let index = [
            0,1,2,
            2,1,3
        ];
    
        let IBO: WebGLBuffer = utils.GLUtil.createIBO(_ctx, index);
    
        let _prg: gl.Program = new gl.Program(
            _lib,
            'VS',
            'FS',
            ['position'],
            [3],
            ['mvpMatrix', 'resolution'],
            ['matrix4fv', '2fv']
        );
    
        _prg.setAttrVBO(VBO);
        _prg.setAttrIBO(IBO);
    
        let _renderer: gl.Renderer = new gl.Renderer(_lib, _prg, index);
    }
    
})(window, window.document);