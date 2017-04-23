

export class TagsService {


    // 无法直接使用window 下面的全局变量，使用该方法
    AV: any = ( < any > window).AV;

    private table_name: string = "tags";

    private blogsObject: any;

    public currentTags:string = "abc";

    constructor() {
        this.blogsObject = this.AV.Object.extend(this.table_name);
    }


    /**
     * [getAllList description]
     * @return {Promise<Blog[]>} [description]
     */
    getAllList(): Promise < any[] > {
        let sql = `select * from ${this.table_name}`;
        return new Promise((resolve, reject) => {

            this.AV.Query.doCloudQuery(sql).then((res: any) => {
                let resultArr: any = [];
                if (res.results instanceof Array) {
                    for (let item of res.results) {
                        let i_attr = item.attributes;
                        resultArr.push(i_attr);
                    }
                }
                resolve(resultArr);
            }, (err: any) => {
                reject(err);
            });
        });
    }


    

}
