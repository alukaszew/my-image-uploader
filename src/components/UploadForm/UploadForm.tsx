import React, { useRef, useState } from "react";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/png"
      ) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          const image = new Image();
          image.src = e.target?.result as string;
          image.onload = () => {
            setDimensions({ width: image.width, height: image.height });
          };
        };
        reader.readAsDataURL(selectedFile);
      } else {
        alert("Unsupported file format. Please choose a .jpg or .png image.");
      }
    }
  };

  const downloadImage = () => {
    if (file) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = file.name;
      a.click();
    }
  };

  const handleImageClick = () => {
    downloadImage();
  };

  return (
    <div className="p-4 bg-gray-900 text-white">
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
        className="border border-gray-500 p-2 mb-4 text-white bg-gray-800"
      />

      {file && (
        <div className="max-w-screen-lg mx-0">
          <img
            ref={imageRef}
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            className="w-full h-auto mb-4 cursor-pointer"
            onClick={handleImageClick}
          />
          <div className="text-left">
            <p className="mb-2 text-white">Name: {file.name}</p>
            <p className="mb-2 text-white">Type: {file.type}</p>
            <p className="mb-2 text-white">Size: {file.size} bytes</p>
            <p className="mb-2 text-white">
              Dimensions: {dimensions.width} x {dimensions.height} pixels
            </p>
            <p className="mb-2 text-white">
              Megapixels: {(dimensions.width * dimensions.height) / 1000000}
            </p>
          </div>
          <button
            onClick={downloadImage}
            className="bg-teal-500 text-white px-4 py-2 rounded hover-bg-teal-600"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}
