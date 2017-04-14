
import { Component,OnInit   } from '@angular/core';

import { CategoryService } from '../../js/modules/category.service';
import { Category } from '../../js/modules/category';

@Component({
	selector:'side-bar',
	templateUrl:'./sideBar.component.html',
	providers:[CategoryService]
})

export class SideBarComponent implements OnInit   {

	isShowSide:boolean = false;

	// 类目
	categorys:Category[];



	constructor(public categoryService:CategoryService){

	}


	

	ngOnInit() {

		this.getData();
		
	}

	showSide() {
		this.isShowSide = !this.isShowSide;
	}

	getData(){
		this.categoryService.getCategory().then( res => {
			this.categorys = res.data;
		});
	}

}






