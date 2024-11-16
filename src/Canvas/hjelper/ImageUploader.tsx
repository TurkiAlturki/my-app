import React, { useState, ChangeEvent, DragEvent } from "react";
import { imageSlice } from "../../Redux/ImageSlice";
import { SetReduxState } from "../../Redux/Store";
import { appSettingsSlice } from "../../Redux/AppSettingsSlice";

const ImageUploader: React.FC = () => {
  const setReduxState = SetReduxState();

  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const validFormats = ["image/png", "image/jpeg", "image/gif"];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleImageUpload = async (file: File) => {
    setError(null);
    setIsLoading(true);

    // Validate file format
    if (!validFormats.includes(file.type)) {
      setError("Unsupported file format. Please upload PNG, JPG, or GIF.");
      setIsLoading(false);
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      setError("File size exceeds the 5MB limit. Please upload a smaller file.");
      setIsLoading(false);
      return;
    }

    try {
      
      const imageUrl = await processImage(file);
      setReduxState(imageSlice.setImageUrl(imageUrl));
      setReduxState(appSettingsSlice.remove());
      setPreview(imageUrl);
    } catch (err) {
      console.error("Error processing image:", err);
      setError("An error occurred while uploading the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 500;

          // Scale image to fit within the max width
          const scale = img.width > maxWidth ? maxWidth / img.width : 1;
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const imageURL = URL.createObjectURL(blob);
                  resolve(imageURL);
                } else {
                  reject(new Error("Blob creation failed"));
                }
              },
              "image/png",
              0.8 // Quality for compression
            );
          }
        };

        img.onerror = () => reject(new Error("Image loading failed"));
      };

      reader.onerror = () => reject(new Error("File reading failed"));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="flex w-full flex-col h-full justify-center items-center">
      <label
        htmlFor="dropzone-file"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex h-64 w-2/4 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        } hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          {isLoading ? (
            <svg
              className="animate-spin h-8 w-8 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
          )}
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {isLoading ? "Uploading..." : "Click to upload or drag and drop"}
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept={validFormats.join(",")}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-500" aria-live="polite">
          {error}
        </p>
      )}
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Uploaded Preview"
            className="max-h-40 rounded-lg border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
