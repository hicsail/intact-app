import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: import.meta.env.VITE_S3_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_S3_SECRET,
  },
});

export const playAudioFromS3 = async (prefix: string) => {
  try {
    const params = {
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Prefix: prefix,
    };

    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);

    const mp3Files = data.Contents?.filter((item) => item.Key?.endsWith(".mp3"));

    if (mp3Files?.length === 0) {
      console.error("No audio files found");
      return;
    }

    const mp3Url = `https://${params.Bucket}.s3.amazonaws.com/${mp3Files![0].Key}`;
    const audio = new Audio(mp3Url);
    audio.play().catch((error) => {
      console.error("Error playing audio", error);
    });
  } catch (error) {
    console.error("Error fetching audio files from S3", error);
  }
};
