/**
 * @author dragonH
 * @date 2020/5/23 0023 上午 11:35
 */
import OSS from "ali-oss"

// const client = new OSS({
//     region: 'https://oss-cn-shanghai.aliyuncs.com',
//     accessKeyId: 'LTAI4GGxeHkKA7j7iXdCPzwL',
//     accessKeySecret: 'XATCi8qAiF5bLRU5cl9doGlPoz7V6T',
//     bucket: 'blogdrag'
// });
//
// // 设置文件地址
// // 用户头像上传地址
// const PhotoPath = "photo/"
//
// //文章分类图片上传地址
// const LanguagePath = "language/"
//
// // 文章图片上传地址
// const ArticlePath = "article/"

/*方法说明
 *@method 方法名
 *@for 所属类名
 *@param{Blob、Buffer}data 支持File对象、Blob数据、以及OSS Buffer。
 * // or const data = new Blob('content');// or const data = new OSS.Buffer('content'));
 *@param{string} file 可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，
 * 实现将文件上传至当前Bucket或Bucket下的指定目录。实现将文件上传至当前Bucket或Bucket下的指定目录。
 *@return {返回值类型} 返回值说明
*/
export async function uploadImage(data, file, func, err) {
    // 用户登录名称 drag_user@1636788576661126.onaliyun.com
    // AccessKey ID LTAI4G6gFSbu7JV7nvSkD4j3
    // AccessKey Secret U8YEYlGYNxvcwA29Gae315kFaINDPT

    // 用户登录名称 drag_user@1636788576661126.onaliyun.com
    // AccessKey ID LTAI4G6gFSbu7JV7nvSkD4j3
    // AccessKey Secret U8YEYlGYNxvcwA29Gae315kFaINDPT

    const client = new OSS({
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAI4G6gFSbu7JV7nvSkD4j3',
        accessKeySecret: 'U8YEYlGYNxvcwA29Gae315kFaINDPT',
        bucket: 'blogdrag'
    });
    const PhotoPath = "photo/"
    // 支持File对象、Blob数据、以及OSS Buffer。
    // or const data = new Blob('content');
    // or const data = new OSS.Buffer('content'));


    try {
        let result = await client.put(PhotoPath + file, data);
        console.log("成功", result)
        func(result);
    } catch (e) {
        console.log("失败", e)
        err(e);
    }
}

