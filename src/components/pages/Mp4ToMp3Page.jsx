import { useState, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { motion } from 'framer-motion';
import { FileVideo, Download, Loader } from 'lucide-react';

const ffmpeg = createFFmpeg({ log: true });

// Utility to always get a valid .mp3 name
const getMp3Name = (name) => {
  if (!name) return 'output.mp3';
  return name.replace(/\.[^.]+$/i, '') + '.mp3';
};

const Mp4ToMp3Page = () => {
  const [mp4File, setMp4File] = useState(null);
  const [mp3Url, setMp3Url] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    setMp4File(e.target.files[0]);
    setMp3Url(null);
    setProgress(0);
  };

  const handleConvert = async () => {
    if (!mp4File) return;
    setLoading(true);
    setMp3Url(null);
    setProgress(0);
    if (!ffmpeg.isLoaded()) await ffmpeg.load();
    ffmpeg.setProgress(({ ratio }) => setProgress(Math.round(ratio * 100)));
    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(mp4File));
    await ffmpeg.run('-i', 'input.mp4', 'output.mp3');
    const data = ffmpeg.FS('readFile', 'output.mp3');
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));
    setMp3Url(url);
    setLoading(false);
  };

  return (
    <motion.div className="glass-card max-w-xl mx-auto mt-12 p-8 rounded-2xl shadow-xl flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <FileVideo className="w-6 h-6 text-blue-400" /> MP4 to MP3 Converter
      </h2>
      <input
        type="file"
        accept="video/mp4"
        ref={inputRef}
        onChange={handleFileChange}
        className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {mp4File && (
        <div className="mb-4 text-gray-300 text-sm">Selected: {mp4File.name}</div>
      )}
      <button
        onClick={handleConvert}
        disabled={!mp4File || loading}
        className="btn-glass px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 mb-4"
      >
        {loading ? (
          <span className="flex items-center gap-2"><Loader className="animate-spin" /> Converting...</span>
        ) : (
          'Convert to MP3'
        )}
      </button>
      {loading && (
        <div className="w-full bg-white/10 rounded-full h-3 mb-4">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {mp3Url && (
        <button
          onClick={() => {
            if (window.showSaveFilePicker) {
              (async () => {
                try {
                  const opts = {
                    suggestedName: getMp3Name(mp4File?.name),
                    types: [
                      {
                        description: 'MP3 Audio',
                        accept: { 'audio/mp3': ['.mp3'] },
                      },
                    ],
                  };
                  const handle = await window.showSaveFilePicker(opts);
                  const writable = await handle.createWritable();
                  const response = await fetch(mp3Url);
                  const blob = await response.blob();
                  await writable.write(blob);
                  await writable.close();
                  alert('File saved successfully!');
                } catch (err) {
                  alert('Save cancelled or failed.');
                }
              })();
            } else {
              // Fallback: open Save As dialog
              const a = document.createElement('a');
              a.href = mp3Url;
              a.download = getMp3Name(mp4File?.name);
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          }}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg"
        >
          <Download className="w-4 h-4" /> Download MP3
        </button>
      )}
      <p className="text-xs text-gray-400 mt-6 text-center">
        ⚡ Hỗ trợ file lớn (nhiều GB, tùy RAM máy). Quá trình chuyển đổi diễn ra hoàn toàn trên máy bạn, không upload lên server.<br/>
        Nếu trình duyệt bị treo, hãy thử với file nhỏ hơn hoặc tăng RAM.
      </p>
    </motion.div>
  );
};

export default Mp4ToMp3Page;
