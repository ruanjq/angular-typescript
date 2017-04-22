import { Blog } from './blog.entity';


export class BlogsService {


    // 无法直接使用window 下面的全局变量，使用该方法
    AV: any = ( < any > window).AV;

    private table_name: string = "blogs";

    private blogsObject: any;

    public pageSize: number = 5;

    public page: number = 1;

    constructor() {
        this.blogsObject = this.AV.Object.extend(this.table_name);
    }


    /**
     * [getAllList description]
     * @return {Promise<Blog[]>} [description]
     */
    private queryList(sql: string): Promise < Blog[] > {

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


    public getPageList(pageIndex: number): Promise < any > {
        return new Promise((resolve, reject) => {
            this.getDataTotal().then(total => {
                let pageTotal = this.calcPageCount(total, this.pageSize);
                let sql = `select * from ${this.table_name} limit ${this.pageSize * (pageIndex - 1)},${this.pageSize * pageIndex}`;
                console.log("分页查询语句" + sql);
                this.queryList(sql).then(data => {
                    resolve({
                        pageIndex: pageIndex,
                        pageCount: pageTotal,
                        total: total,
                        data: data
                    });
                });
            }).catch((err: any) => {
                reject(err);
            });
        });
    }


    /**
     * [ 查询博客的总数 ]
     * @return {Promise<number>} [description]
     */
    getDataTotal(): Promise < number > {
        let sql = `select count(*) from ${this.table_name}`;
        return new Promise((resolve, reject) => {
            this.AV.Query.doCloudQuery(sql).then((res: any) => {
                resolve(res.count);
            }).catch((err: any) => {
                reject(err);
            })
        });
    }

    /**
     * [ 获取所有博客分类总数 ]
     */
    public groupDataByBlogCategory() {
        let sql = `select blog_category from ${this.table_name}`;
        let result = {};
        return new Promise((resolve, reject) => {
            this.AV.Query.doCloudQuery(sql).then((res: any) => {
                for (let item of res.results) {
                    item = item.attributes;
                    if (!result[item.blog_category]) {
                        result[item.blog_category] = [];
                        result[item.blog_category].push(item);
                    } else {
                        result[item.blog_category].push(item);
                    }
                }
                resolve(result);
            }).catch((err: any) => {
                reject(err);
            })
        });

    }



    /**
     * [ 计算总页数 ]
     * @param  {number} total    [description]
     * @param  {number} pageSize [description]
     * @return {number}          [description]
     */
    private calcPageCount(total: number, pageSize: number): number {
        let pageCount: number = 0;
        pageCount = total % pageSize == 0 ? total / pageSize : Math.floor(total / pageSize) + 1;
        return pageCount;
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

    /**
     * [ 按分类查询博客列表 ]
     * @param {number} category_id [description]
     */
    getBlogByCategoryId(category_id:number){
        let sql = `select * from ${this.table_name} where blog_category='${category_id}'`;
        return this.queryList(sql);
    }

    /**
     * [ 按标签查询博客列表 ]
     * @param {tag} category_id [description]
     */
    getBlogByTag(tag:string){
        let sql = `select * from ${this.table_name} where blog_tags like '%${tag}%'`;
        return this.queryList(sql);
    }


    /**
     * [ 按标签查询博客列表 ]
     * @param {tag} category_id [description]
     */
    getBlogBySearch(keywords:string){
        let sql = `select * from ${this.table_name} where blog_title like '%${keywords}%'`;
        return this.queryList(sql);
    }

   
}
