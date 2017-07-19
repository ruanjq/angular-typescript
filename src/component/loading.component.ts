import {Component,Input} from '@angular/core';



@Component({
	selector:'loading-more',
	template:`
		<div class="loading-more">
	        <span class="l-1"></span>
	        <span class="l-2"></span>
	        <span class="l-3"></span>
	        <span class="l-4"></span>
	        <span class="l-5"></span>
	        <span class="l-6"></span>
	    </div>
	`,
	styles:[
		`
		loading-more{display:block;}
		.loading-more{position: relative;width: 100%;overflow: hidden; height: 12px;}
	    span[class*="l-"] {
	        height: 6px; width: 6px; background: #333; display: inline-block; margin: 5px 2px;  border-radius: 100%;position: absolute;left: 0;will-change: transform;
	        animation: loader 2s infinite  cubic-bezier(0.030, 0.615, 0.995, 0.415) both;
	    }
	    span.l-1 { animation-delay: 0.5s; }
	    span.l-2 { animation-delay: 0.4s;  }
	    span.l-3 {  animation-delay: 0.3s; }
	    span.l-4 { animation-delay: 0.2s; }
	    span.l-5 { animation-delay: 0.1s; }
	    span.l-6 { animation-delay: 0; }
	    @keyframes loader {
	        0% { left: -4px; opacity: 0; }
	        25% { opacity: 1; }
	        50% { left: 100%; opacity: 0;  }
	        100% { opacity: 0; }
	    }

	`
	]
})
export class LoadingComponent{

	constructor(){

	}
}