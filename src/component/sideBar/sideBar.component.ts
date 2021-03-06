import { Component, OnInit,ViewChild,AfterViewInit,HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../js/leancloudService/category.service';
import { Category } from '../../js/modules/category';
import { BlogsService } from '../../js/leancloudService/blog.service';
import { TagsService } from '../../js/leancloudService/tags.service';
import { CommonService } from '../../js/modules/commonService';
@Component({
    selector: 'side-bar',
    templateUrl: './sideBar.component.html',
    providers: [CategoryService,BlogsService,TagsService]
})

export class SideBarComponent implements OnInit,AfterViewInit {

    isShowSide: boolean = false;

    // 类目
    categorys: any;

    tagsList: any[];

    currentClass:string = "";

    isFixed:string = "";


    public search = {
        keywords:''
    };

    @ViewChild('sliderBar') sliderBar_ViewChild:any;

    constructor(public categoryService: CategoryService, public tagsService: TagsService,private blogsService:BlogsService,
            private router: Router,private commonService:CommonService) {
        this.commonService.currentClass$.subscribe(data => {
            this.currentClass = data;
        });

    }

    ngOnInit() {
        this.getCategoryData();
        this.getTagsData();
    }

    ngAfterViewInit(){

    }

    // 监听滚动事件
    @HostListener('window:scroll') onWindowScroll() {
        this.sideBarFixed();
        
    }



    showSide() {
        this.isShowSide = !this.isShowSide;
    }   

    searchBlog(){
        this.isShowSide = false;
        this.router.navigate(['/blogs-search', this.search.keywords]);
        // console.log("submit 提交数据");
    }

    getCategoryData() {
        this.categoryService.getAllList().then(res => {
            this.blogsService.groupDataByBlogCategory().then(res2 => {
            	for(let i of res){
            		if(res2.hasOwnProperty(i.category_id)){
            			i.total = res2[i.category_id].length;
            		}else{
            			i.total = 0;
            		}
            	}
            });
            this.categorys = res;
        });
    }

    // 获取标签数据
    getTagsData() {
        this.tagsService.getAllList().then(res => {
            this.tagsList = res;
        });
    }

    blogCategory(id:number){
        this.isShowSide = false;
        this.router.navigate(['/blogs-category', id]);
    }

    blogTags(tags:string){
        this.isShowSide = false;
        this.router.navigate(['/blogs-tags', tags]);
    }


    private sideBarFixed():void{
        if(this.isShowSide == true) return;
        let bar = document.getElementById("sidebarright");
        let window_height =  document.documentElement.clientHeight;
        let barwarper_rect = document.getElementById("rsidebar-wrapper").getBoundingClientRect();
        if(window_height >= bar.clientHeight){
            if(barwarper_rect.top <= -330){
                this.isFixed = "1";
            }else{
                this.isFixed = "";
            }
        }else if(window_height >= 768){
            if(barwarper_rect.top <= -548){
                this.isFixed = "2";
            }else{
                this.isFixed = "";
            }
        }
    }
}
