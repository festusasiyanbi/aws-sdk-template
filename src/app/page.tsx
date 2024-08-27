"use client"
import FileUpload from '@/components/FileUpload'
import FilePreview from '@/components/FilePreview'
import { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile)
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  return (
    <div className="min-h-screen bg-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">AWS S3 Playground</h1>
          <FileUpload onFileUpload={handleFileUpload} />
          <FilePreview file={file} onRemove={handleRemoveFile} />
        </div>
      </div>
    </div>
  )
}