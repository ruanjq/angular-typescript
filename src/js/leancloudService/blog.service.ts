import { Blog } from './blog.entity';


export class BlogsService {


    // 无法直接使用window 下面的全局变量，使用该方法
    AV: any = ( < any > window).AV;

    private table_name: string = "blogs";

    private blogsObject: any;


    constructor() {
        this.blogsObject = this.AV.Object.extend(this.table_name);
    }


    /**
     * [getAllList description]
     * @return {Promise<Blog[]>} [description]
     */
    getAllList(): Promise < Blog[] > {
        let sql = `select * from ${this.table_name}`;
        return new Promise((resolve, reject) => {

            this.AV.Query.doCloudQuery(sql).then((res: any) => {
                let resultArr: any = [];
                if (res.results instanceof Array) {
                    for (let item of res.results) {
                        let i_attr = item.attributes;
                        let blog = new Blog(i_attr.blog_id, i_attr.blog_title, i_attr.blog_content,
                            i_attr.blog_tags, i_attr.blog_category,
                            i_attr.blog_big_thumbnail, i_attr.blog_thumbnail,
                            i_attr.blog_read_count, item.createdAt, i_attr.blog_summary);
                        resultArr.push(blog);
                    }
                }
                resolve(resultArr);
            }, (err: any) => {
                reject(err);
            });
        });
    }


    /**
     * [getBlogById description]
     * @param  {number}  blog_id [description]
     * @return {Promise<Blog>}         [description]
     */
    getBlogById(blog_id: number): Promise < Blog > {
        let sql = `select * from ${this.table_name} where blog_id=${blog_id}`;
        return new Promise((resolve, reject) => {
            this.AV.Query.doCloudQuery(sql).then((res: any) => {
                let resultObj: Blog;
                if (res.results instanceof Array) {
                    for (let item of res.results) {
                        let i_attr = item.attributes;
                        let blog = new Blog(i_attr.blog_id, i_attr.blog_title, i_attr.blog_content,
                            i_attr.blog_tags, i_attr.blog_category,
                            i_attr.blog_big_thumbnail, i_attr.blog_thumbnail,
                            i_attr.blog_read_count, item.createdAt, i_attr.blog_summary);
                        resultObj = blog;
                    }
                }
                resolve(resultObj);
            }, (err: any) => {
                reject(err);
            });
        });
    }

}
