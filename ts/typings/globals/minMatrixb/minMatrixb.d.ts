declare module matrixb {
    export class MatIV {
        constructor();
    
        create();
    
        identity(dest: number[]): number[];
    
        multiply(mat1: number[], mat2: number[], dest: number[]): number[];
    
        scale(mat: number[], vec: number[], dest: number[]): number[];
    
        translate(mat: number[], vec: number[], dest: number[]): number[];
    
        rotate(mat: number[], angle: number, axis: number[], dest: number[]): number[];
    
        lookAt(eye: number[], center: number[], up: number[], dest: number[]): number[];
    
        perspective(fovy: number, aspect: number, near: number, far: number, dest: number[]): number[];
    
        ortho(left: number, right: number, top: number, bottom: number, near: number, far: number, dest: number[]): number[];
    
        transpose(mat: number[], dest: number[]): number[];
    
        inverse(mat: number[], dest: number[]): number[];
    }
    
    export class QtnIV {
        constructor();
    
        create();
    
        identity(dest: number[]): number[];
    
        inverse(qtn: number[], dest: number[]): number[];
    
        normalize(dest: number[]): number[];
    
        multiply(qtn1: number[], qtn2: number[], dest: number[]): number[];
    
        rotate(angle: number, axis: number[], dest: number[]): number[];
    
        toVecIII(vec: number[], qtn: number[], dest: number[]): number[];
    
        toMatIV(qtn: number[], dest: number[]): number[];
    
        slerp(qtn1: number[], qtn2: number[], time: number, dest: number[]): number[];
    }
    
    export class Libs {
        constructor();
    
        torus(row: number, column: number, irad: number, orad: number, color: number[]): Object;
    
        sphere(row: number, column: number, rad: number, color: number[]): Object;
    
        cube(side: number, color: number[]): Object;
    
        hsva(h: number, s: number, v: number, a: number): number[];
    }
}

import MatIV = matrixb.MatIV;
import QtnIV = matrixb.QtnIV;
import Libs = matrixb.Libs;