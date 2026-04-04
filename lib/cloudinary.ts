import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: Buffer,
  options: { folder?: string; resourceType?: "image" | "video" } = {}
): Promise<{ url: string; publicId: string }> {
  const { folder = "vidyadeep", resourceType = "image" } = options;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        transformation:
          resourceType === "image"
            ? [{ quality: "auto", fetch_format: "auto" }]
            : undefined,
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
        } else {
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      }
    );
    stream.end(file);
  });
}

export async function deleteFromCloudinary(publicId: string, resourceType: "image" | "video" = "image") {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export { cloudinary };
