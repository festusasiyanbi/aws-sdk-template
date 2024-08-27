import { useEffect, useState } from 'react';
import Image from 'next/image';

interface FilePreviewProps {
  file: File | null;
  onRemove: () => void;
}

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Free memory when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  if (!file) return null;

  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');

  return (
    <div className="mt-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-700">{file.name}</span>
          <button onClick={onRemove} className="text-red-500 hover:text-red-700">
            Remove
          </button>
        </div>
        <div className="mt-2">
          {isImage && preview && (
            <Image
              src={preview}
              alt={file.name}
              className="max-w-full h-auto rounded"
              layout="responsive"
              width={800} 
              height={400}
            />
          )}
          {isVideo && preview && (
            <video controls autoPlay muted className="max-w-full h-auto rounded" >
              <source src={preview} type={file.type} />
              Your browser does not support the video tag.
            </video>
          )}
          {!isImage && !isVideo && (
            <div className="flex items-center justify-center h-48 bg-gray-200 rounded">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}