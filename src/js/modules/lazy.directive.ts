/**
 * @desc 懒加载指令
 */


import { Directive, ElementRef, Input, HostListener, Inject,OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
    selector: '[lazy]'
})
export class LazyDirective implements OnInit {

    @Input('lazy') lazySrc: string;

    private lazyElem: Array < Document[] > ;

    private windowHeight:number = 0;;
    constructor(private el: ElementRef, @Inject(DOCUMENT) private document: Document) {
        this.windowHeight = document.documentElement.clientHeight;
        console.log("浏览器高度",this.windowHeight);
    }


    // 监听滚动事件
    @HostListener('window:scroll') onWindowScroll() {
        this.lazy();
        
    }

    ngOnInit(){
    	this.lazy();
    }

    private lazy(){
    	if(this.isLazy(this.el.nativeElement.src,this.lazySrc) && this.isWindowArea(this.el.nativeElement)){
       		console.log('开始加载');
       		this.el.nativeElement.src = this.lazySrc;
        }
    }


    private isLazy(src: string, lazySrc: string): boolean {
    	// console.log("链接地址",src,lazySrc);
        if (src != lazySrc) {
            return true;
        }
        return false;
    }

    private isWindowArea(elem: any): boolean {
        let result = false;
        // console.log("顶部距离",elem.getBoundingClientRect().top)
        if (elem.getBoundingClientRect().top > 0) {
            // 距离顶部距离
            if (elem.getBoundingClientRect().top <= this.windowHeight - 30) {
                // console.warn("距离顶部距离true");
                result = true;
            } else {
                result = false;
            }
        }
        return result;
    }
}
