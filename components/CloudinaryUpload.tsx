import React, { useState } from 'react';

interface CloudinaryUploadProps {
  onUpload: (url: string, type: 'image' | 'video') => void;
  resourceType?: 'image' | 'video' | 'auto';
  uploadPreset: string;
  cloudName: string;
  multiple?: boolean;
}

export default function CloudinaryUpload({ onUpload, resourceType = 'auto', uploadPreset, cloudName, multiple = false }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [widgetReady, setWidgetReady] = useState(false);

  const handleUpload = async () => {
    if (!(window as any).cloudinary) return;
    setUploading(true);
    (window as any).cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ['local', 'url', 'camera'],
        resourceType,
        multiple,
        cropping: false,
        folder: 'teachings',
        maxFileSize: 100000000, // 100MB
        clientAllowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'webm', 'mov'],
        styles: {
          palette: {
            window: '#1e293b',
            sourceBg: '#f1f5f9',
            windowBorder: '#facc15',
            tabIcon: '#facc15',
            menuIcons: '#facc15',
            textDark: '#1e293b',
            textLight: '#facc15',
            link: '#facc15',
            action: '#facc15',
            inactiveTabIcon: '#64748b',
            error: '#ef4444',
            inProgress: '#facc15',
            complete: '#22c55e',
            progress: '#facc15'
          }
        }
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          const type = result.info.resource_type === 'video' ? 'video' : 'image';
          onUpload(result.info.secure_url, type);
        }
        setUploading(false);
      }
    );
  };

  React.useEffect(() => {
    if (!(window as any).cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.async = true;
      script.onload = () => setWidgetReady(true);
      document.body.appendChild(script);
    } else {
      setWidgetReady(true);
    }
  }, []);

  return (
    <div>
      <button
        onClick={handleUpload}
        disabled={uploading || !widgetReady}
        className={`px-4 py-2 rounded bg-blue-700 text-white font-semibold transition ${(uploading || !widgetReady) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'}`}
      >
        {uploading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Uploading...
          </span>
        ) : !widgetReady ? (
          'Loading uploader...'
        ) : (
          'Upload Media'
        )}
      </button>
      {uploading && (
        <div className="mt-2 text-sm text-gray-500">Preparing upload...</div>
      )}
      {previews.length > 0 && (
        <div className="flex gap-2 mt-2">
          {previews.map((src, i) => (
            <img key={i} src={src} alt="preview" className="w-16 h-16 object-cover rounded" />
          ))}
        </div>
      )}
      {!widgetReady && (
        <div className="mt-2 text-xs text-red-500">Uploader is loading, please wait...</div>
      )}
    </div>
  );
} 