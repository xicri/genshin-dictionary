//
// Delete old reports with same Git hashes as current production and PR from R2
//
import { DeleteObjectsCommand, ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://8306a13fafb28ed9cc9c2effe76f7830.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const { Contents: files } = await s3.send(new ListObjectsCommand({
  Bucket: "genshin-dictionary-reg-suit",
}));

const filesToDelete = files
  ?.map(file => ({ Key: file.Key }))
  .filter(file => file.Key.startsWith(process.env.HASH_PROD) || file.Key.startsWith(process.env.HASH_PR));

if (filesToDelete && 0 < filesToDelete.length) {
  await s3.send(new DeleteObjectsCommand({
    Bucket: "genshin-dictionary-reg-suit",
    Delete: {
      Objects: filesToDelete,
      Quiet: false,
    },
  }));
}
