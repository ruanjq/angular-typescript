import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../js/leancloudService/blog.service';
import { TagsService } from '../../js/leancloudService/tags.service';
import { CommonService } from '../../js/modules/commonService';
@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    providers: [BlogsService,TagsService]
})

export class HomeComponent implements OnInit {

    blogList:any = {
    	data:[],
        pageIndex:1,
        pageCount:0,
        total:0
    };
    pageIndex:number = 1;
    showMore:boolean = false;
    constructor(private blogsService: BlogsService,private route: ActivatedRoute,private router: Router,public commonService:CommonService) {

    }

    ngOnInit() {
    	this.route.params.subscribe(params => {
    		// console.log('params');
    		if(params['page_index']){
    			this.pageIndex = parseInt(params['page_index']); // (+) converts string 'id' to a number
                this.getData(this.pageIndex);
    		} else if(params['category_id']){
                // console.log("分类查询");
                this.getCategoryData(parseInt(params['category_id']));
                this.commonService.publishCurrentClassData(params['category_id']);
            }else if(params['tags']){
                this.getTagData(params['tags']);
                this.commonService.publishCurrentClassData(params['tags']);
            } else if(params['keywords']){
                this.getSearchData(params['keywords']);
            }else{
                this.getData(this.pageIndex);
            }
    		
        });
     
    	
    }

    private getCategoryData(category_id:number){
        this.blogsService.getBlogByCategoryId(category_id).then((res: any) => {
            // console.log(res);
            this.blogList.data = res;
        }, err => {

        })
    }

    private getTagData(tag:string){
        this.blogsService.getBlogByTag(tag).then((res: any) => {
            // console.log(res);
            this.blogList.data = res;
        }, err => {

        })
    }

    private getSearchData(keywords:string){
        this.blogsService.getBlogBySearch(keywords).then((res: any) => {
            // console.log(res);
            this.blogList.data = res;
        }, err => {

        })
    }

    // 分页查询，加载数据
    private getData(pageIndex:number){
    	this.blogsService.getPageList(pageIndex).then((res: any) => {
            this.blogList.pageCount = res.pageCount;
            this.blogList.pageIndex = res.pageIndex;
            this.blogList.total = res.total;
            this.blogList.data = this.blogList.data.concat(res.data);
            // console.log(this.blogList);
            this.showMore = false;
        }, err => {

        })
    }

    private pageMore(){
        this.showMore = true;
        setTimeout(() =>{
            this.getData(this.pageIndex + 1);
        },2000)
    }

    private pageChange(ctr:any){
    	if(ctr === 1){
    		this.router.navigate(['/blogs-list', 1]);
    	} else if(ctr === "prev"){
    		if(this.pageIndex == 1) return;
    		this.router.navigate(['/blogs-list', this.pageIndex - 1]);
    	} else if(ctr === "next"){
    		if(this.pageIndex == this.blogList.pageCount) return;
    		this.router.navigate(['/blogs-list', this.pageIndex + 1]);
    	} else{
    		this.router.navigate(['/blogs-list',ctr]);
    	}
    }
}
