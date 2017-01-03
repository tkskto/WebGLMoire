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
            this._canvas.addEventListener('touchstart', this.onTouchStart, false);
        };
    
        private removeEvents = () => {
            this._canvas.removeEventListener('mousedown', this.onMouseDown);
            this._canvas.removeEventListener('mousemove', this.onMouseMove);
            this._canvas.removeEventListener('mouseup', this.onMoveEnd);
            this._canvas.removeEventListener('touchstart', this.onTouchStart);
            this._canvas.removeEventListener('touchmove', this.onTouchMove);
            this._canvas.removeEventListener('touchend', this.onMoveEnd);
        };
        
        private onMouseDown = (e:MouseEvent) => {
            e.preventDefault();
            this.start = e.clientY;
            
            this._canvas.addEventListener('mousemove', this.onMouseMove, false);
            this._canvas.addEventListener('mouseup', this.onMoveEnd, false);
        };
        
        private onTouchStart = (e:TouchEvent) => {
            e.preventDefault();
    
            let touch:Touch = e.changedTouches[0];
            this.start = touch.pageY;
            
            this._canvas.addEventListener('touchmove', this.onTouchMove, false);
            this._canvas.addEventListener('touchend', this.onMoveEnd, false);
        };
    
        private onMouseMove = (e:MouseEvent) => {
            e.preventDefault();
            this._model.mouseMove -= this.start - e.clientY;
        };
        
        private onTouchMove = (e:TouchEvent) => {
            e.preventDefault();
            let touch:Touch = e.changedTouches[0];
            this._model.mouseMove -= this.start - touch.pageY;
        };
    
        private onMoveEnd = (e) => {
            e.preventDefault();
            this._canvas.removeEventListener('mousemove', this.onMouseMove);
            this._canvas.removeEventListener('mouseup', this.onMoveEnd);
            this._canvas.removeEventListener('touchmove', this.onTouchMove);
            this._canvas.removeEventListener('touchend', this.onMoveEnd);
        }
    }
}