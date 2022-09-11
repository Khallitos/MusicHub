import AWS from 'aws-sdk';
import { nanoid } from 'nanoid'

// Enter copied or downloaded access ID and secret key here
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = 'kanmusic';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    version: 'latest',
    region: 'eu-west-2',
    signatureVersion: 'v4',
});

const uploadFile = async (name, imageData) => {



    // The name of the bucket that you have created
    const fileKey = `${ name }.${ MIMEType.replace('image/', '')}`;

console.log(fileKey);

const bufferedImage = new Buffer.from(imageData.replace(/^data:image/\w +; base64, /, ""), 'base64')

// Uploading files to the bucket
try {
    const uploadResult = await s3.putObject({
        Bucket: BUCKET_NAME,
        Key: fileKey,
        Body: bufferedImage,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: MIMEType
    }).promise()

    console.log(uploadResult);
    return ({ URL: `https://${BUCKET_NAME}.s3.eu-west-2.amazonaws.com/${fileKey}`, res: await uploadResult });

}
catch (e) {
    console.log(e);
    return;

}
}