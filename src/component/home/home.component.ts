
import { Component,OnInit } from '@angular/core';

import { BlogsService } from '../../js/leancloudService/blog.service';

@Component({
	selector:'home-page',
	templateUrl:'./home.component.html',
	providers:[BlogsService]
})

export class HomeComponent implements OnInit {

	blogList:Array<any> = [];

	constructor(private blogsService:BlogsService){

	}

	ngOnInit(){
		this.blogsService.getAllList().then( (data:any) => {
			console.log(data);
			this.blogList = data;
		},err => {

		})
		
	}
}