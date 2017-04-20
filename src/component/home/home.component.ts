
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
		this.blogsService.getPageList(1).then( (res:any) => {
			console.log(res);
			this.blogList = res.data;
		},err => {

		})
		
	}
}