import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Blog } from '../../js/leancloudService/blog.entity';
import { BlogsService } from '../../js/leancloudService/blog.service';



@Component({
    selector: 'details-page',
    templateUrl: './details.component.html',
    providers: [BlogsService]
})

export class DetailsComponent implements OnInit, OnDestroy {

    blogs_id: string;
    public blogInfo = {
        blog_title:''
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

        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
