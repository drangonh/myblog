/**
 * @author dragonH
 * @date 2020/5/23 0023 上午 11:35
 */
import OSS from "ali-oss"
import {get} from "../axios";

/*方法说明
 *@method 方法名
 *@for 所属类名
 *@param{Blob、Buffer}data 支持File对象、Blob数据、以及OSS Buffer。
 * // or const data = new Blob('content');// or const data = new OSS.Buffer('content'));
 *@param{string} file 可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，
 * 实现将文件上传至当前Bucket或Bucket下的指定目录。实现将文件上传至当前Bucket或Bucket下的指定目录。
 *@return {返回值类型} 返回值说明
*/
export async function uploadImage(data, file, func, err, type) {
    let client

    let res = await get("oss/ossInfo", {})
    if (res && res.data) {
        const data = res.data;
        client = new OSS({
            region: data.endpoint,
            accessKeyId: data.accessKeyId,
            accessKeySecret: data.accessKeySecret,
            bucket: data.bucketName
        });
    }

    let PhotoPath = "photo/"

    if (type == 2) {
        PhotoPath = "language/"
    } else if (type == 3) {
        PhotoPath = "article/"
    }
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

