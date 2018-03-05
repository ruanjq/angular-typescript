
import { Component,AfterViewInit } from '@angular/core';


@Component({
	selector:'list-blog',
	templateUrl:'./list.component.html',
	styles:	[
		`
		h1{color:red;}
	`
	]
})

export class BlogsListComponent implements AfterViewInit {

	constructor(){
		
	}

	ngAfterViewInit(){

	}
}