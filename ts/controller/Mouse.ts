module controller {
    export class Mouse {
        
        private start:number;
        
        constructor(private _model:model.Model, private _canvas:HTMLCanvasElement) {
            this.init();
        }
        
        private init() {
            this.removeEvents();
            this.setupEvents();
        }
        
        private setupEvents = () => {
            this._canvas.addEventListener('mousedown', this.onMouseDown, false);
        };
    
        private removeEvents = () => {
            this._canvas.removeEventListener('mousedown', this.onMouseDown);
            this._canvas.removeEventListener('mousemove', this.onMouseMove);
            this._canvas.removeEventListener('mouseup', this.onMouseUp);
        };
        
        private onMouseDown = (e:MouseEvent) => {
            
            this.start = e.clientY;
            
            this._canvas.addEventListener('mousemove', this.onMouseMove, false);
            this._canvas.addEventListener('mouseup', this.onMouseUp, false);
        };
    
        private onMouseMove = (e:MouseEvent) => {
            this._model.mouseMove -= this.start - e.clientY;
    
            let cw = this._model.screen.width;
            let ch = this._model.screen.height;
            let wh = 1 / Math.sqrt(cw * cw + ch * ch);
            let x = e.clientX - cw * 0.5;
            let y = e.clientY - ch * 0.5;
            let sq = Math.sqrt(x * x + y * y);
            let r = sq * 2.0 * Math.PI * wh;
            if(sq != 1){
                sq = 1 / sq;
                x *= sq;
                y *= sq;
            }
    
            this._model.rotation = {x, y, r};
        };
    
        private onMouseUp = (e:MouseEvent) => {
            this._canvas.removeEventListener('mousemove', this.onMouseMove);
            this._canvas.removeEventListener('mouseup', this.onMouseUp);
        }
    }
}