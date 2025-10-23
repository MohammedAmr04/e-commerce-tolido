// lib/uploadToCloudinary.ts

export interface CloudinaryResponse {
  secure_url: string; // ✅ Changed from url to secure_url
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
}

/**
 * Upload image to Cloudinary
 * @param file - File to upload
 * @returns CloudinaryResponse with secure_url
 */
export async function uploadToCloudinary(
  file: File
): Promise<CloudinaryResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

  // Optional: Add folder organization
  formData.append("folder", "products");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD!;

  if (!cloudName) {
    throw new Error("Cloudinary cloud name is not configured");
  }

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData?.error?.message || `Upload failed with status ${res.status}`
      );
    }

    const data: CloudinaryResponse = await res.json();

    // ✅ Ensure secure_url exists
    if (!data.secure_url) {
      throw new Error("Cloudinary response missing secure_url");
    }

    return data;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Public ID of the image to delete
 * @returns Success status
 */
export async function deleteFromCloudinary(
  publicId: string
): Promise<{ result: string }> {
  // Note: This requires server-side implementation with API secret
  // For client-side, you'll need to call your backend API

  try {
    const res = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });

    if (!res.ok) {
      throw new Error("Failed to delete image");
    }

    return await res.json();
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
}
