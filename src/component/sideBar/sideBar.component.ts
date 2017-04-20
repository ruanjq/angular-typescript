
import { Component,OnInit   } from '@angular/core';

import { CategoryService } from '../../js/leancloudService/category.service';
import { Category } from '../../js/modules/category';
import { TagsService } from '../../js/leancloudService/tags.service';
@Component({
	selector:'side-bar',
	templateUrl:'./sideBar.component.html',
	providers:[CategoryService,TagsService]
})

export class SideBarComponent implements OnInit   {

	isShowSide:boolean = false;

	// 类目
	categorys:any[];

	tagsList:any[];

	constructor(public categoryService:CategoryService,private tagsService:TagsService){

	}


	

	ngOnInit() {

		this.getCategoryData();
		this.getTagsData();
	}

	showSide() {
		this.isShowSide = !this.isShowSide;
	}

	getCategoryData(){
		this.categoryService.getAllList().then( res => {
			this.categorys = res;
		});
	}

	// 获取标签数据
	getTagsData(){
		this.tagsService.getAllList().then( res => {
			this.tagsList = res;
		});
	}

}






