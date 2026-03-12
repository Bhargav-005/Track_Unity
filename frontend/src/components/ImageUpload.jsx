import React, { useRef } from 'react';
import { Image, Upload } from 'lucide-react';

const ImageUpload = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="mt-4">
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        accept="image/*"
        onChange={handleFileChange}
      />
      <button 
        onClick={() => fileInputRef.current.click()}
        className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-[20px] border-2 border-dashed border-slate-200 transition-all active:scale-[0.98]"
      >
        <Image size={18} />
        Upload Poster Image
      </button>
    </div>
  );
};

export default ImageUpload;
