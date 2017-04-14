

import { Injectable } from '@angular/core';
import { Headers, Http  } from '@angular/http';
import { variable } from '../../js/modules/const';

import { Category } from './category';
/**
 *  导入Angular的Injecttale 函数，并做为 @Injectable() 装饰器使用该函数
 */


@Injectable()
export class CategoryService {

	// 设置头部数据响应类型
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http:Http){

	}

	getCategory(){
	    return this.http.get(variable.serviceUrl() + 'category.json').toPromise().then( res => {
	    	let a = res.text().toString();
	    	return eval("(" + a +")");
	    });
	}

	

}