import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Blog } from '../../js/leancloudService/blog.entity';
import { BlogsService } from '../../js/leancloudService/blog.service';

import   "../../js/lib/iShare/iShare.js";
import "../../js/lib/iShare/style/css/ishare.css";
import "../../js/lib/iShare/style/fonts/iconfont.css";
@Component({
    selector: 'details-page',
    templateUrl: './details.component.html',
    providers: [BlogsService]
})

export class DetailsComponent implements OnInit, OnDestroy {
     // 无法直接使用window 下面的全局变量，使用该方法
    iShare: any = ( < any > window).iShare;
    blogs_id: string;
    public blogInfo = {
        blog_title:'',
        blog_summary:''
    };
    private sub: any;
    constructor(private router: ActivatedRoute, private blogsService: BlogsService) {
        // console.log(this.router.params);
    }

    ngOnInit() {
        this.sub = this.router.params.subscribe(params => {
            this.blogs_id = params['blog_id']; // (+) converts string 'id' to a number
        });

        this.blogsService.getBlogById(parseInt(this.blogs_id)).then(data => {
        	this.blogInfo = data;

            this.registerShare();
        });

        
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    registerShare(){
        new this.iShare({container:'.iShare1',config:{
        title: this.blogInfo.blog_title,
        description: this.blogInfo.blog_summary,
        url: window.location.href,
        isAbroad: false,
        isTitle: true,
        initialized: true,
        WXoptions:{
            evenType: 'mouseover',
            isTitleVisibility: true,
            title: '二维码标题',
            isTipVisibility: true,
            tip: '二维码描述文本',
            qrcodeW: 140,
            qrcodeH: 140,
            qrcodeBgc: '#fff',
            qrcodeFgc: '#000',
            bgcolor: '#ddd'
        }
    }});
  
    }
}
