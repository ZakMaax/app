import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { useCallback, useEffect} from 'react'
import {FilesWithPreview} from '@/utils/schemas'

interface ImageUploaderProps {
  maximumFiles: number;
  files: FilesWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FilesWithPreview[]>>;
}


export default function ImageUploader({ maximumFiles, files = [], setFiles }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles: FilesWithPreview[]) => {
      const remainingSlots = maximumFiles - prevFiles.length;
      const limitedFiles = acceptedFiles.slice(0, remainingSlots);
      const filesWithPreview = limitedFiles.map(file =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      return [...prevFiles, ...filesWithPreview];
    });
  }, [maximumFiles, setFiles]);
  

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maximumFiles
  });

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    URL.revokeObjectURL(updatedFiles[index].preview);
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const cleanUp = useCallback(() => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    return () => cleanUp();
  }, [cleanUp]);

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-primary font-medium">Drop the files here...</p>
          ) : (
            <>
              <p className="font-medium">Drag & drop images here, or click to select</p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, JPEG, PNG, WEBP (max {maximumFiles} file{maximumFiles > 1 ? 's' : ''})
              </p>
            </>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">Selected Files ({files.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <div className="aspect-square overflow-hidden rounded-md border">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="cursor-pointer absolute -top-2 -right-2 bg-primary-foreground text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-xs text-gray-400 truncate mt-1">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


