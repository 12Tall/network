import { isObject } from "util";

export function CopyProps(src: Object, dst: Object) {
    
    if (isObject(src) && isObject(dst)) {
        for (const key of Object.keys(dst)) {
            if ((<any>src)[key] !== undefined) {
                (<any>dst)[key] = (<any>src)[key];
            }
        }
    }
    else {
        throw "this method should be used for assignment between 2 Objects";
    }
    return dst;
}