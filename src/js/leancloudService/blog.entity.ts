/** 
 *
 * 博客分类实体对象
 * 
 */

export class Blog{


	// ID编号
	blog_id:number;  

	// 小缩略图
	blog_big_thumbnail:string;

	// 博客分类
	blog_category:number;

	// 博客内容
	blog_content:string;

	blog_create_time:string;
	
	// 阅读次数
	blog_read_count:number;
	
	// 标签
	blog_tags:string;

	blog_summary:string;
	
	// 缩略大图
	blog_thumbnail:string;
	
	// 标题
	blog_title:string;


	constructor(blog_id:number,blog_title:string,blog_content:string,
			blog_tags:string,blog_category:number,
			blog_big_thumbnail:string,blog_thumbnail:string,
			blog_read_count:number,blog_create_time:string,blog_summary:string){
		this.blog_id = blog_id;
		this.blog_title = blog_title;
		this.blog_content = blog_content;
		this.blog_tags = blog_tags;
		this.blog_category = blog_category;
		this.blog_thumbnail = blog_thumbnail;
		this.blog_big_thumbnail = blog_big_thumbnail;
		this.blog_read_count = blog_read_count;
		this.blog_create_time = blog_create_time;
		this.blog_summary = blog_summary;
	}

}