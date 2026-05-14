import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { UploadCloud, FileVideo, Loader2, Download, RefreshCw, X } from 'lucide-react';
import './VideoToGif.css';

const VideoToGif = () => {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [gifUrl, setGifUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    
    ffmpeg.on('progress', ({ progress, time }) => {
      setProgress(Math.round(progress * 100));
    });
    
    // toBlobURL is used to bypass CORS issue
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    
    setLoaded(true);
    setIsLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setGifUrl(null);
      setProgress(0);
    }
  };

  const convertToGif = async () => {
    if (!videoFile) return;
    
    setIsConverting(true);
    const ffmpeg = ffmpegRef.current;
    
    try {
      await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));
      
      // Run the ffmpeg command
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-vf', 'fps=10,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
        '-loop', '0',
        'output.gif'
      ]);
      
      const data = await ffmpeg.readFile('output.gif');
      const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
      setGifUrl(url);
    } catch (error) {
      console.error('Error during conversion:', error);
      alert('An error occurred during conversion.');
    } finally {
      setIsConverting(false);
    }
  };

  const resetState = () => {
    setVideoFile(null);
    setGifUrl(null);
    setProgress(0);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loader2 className="spinner" size={48} />
        <p>Loading FFmpeg core...</p>
      </div>
    );
  }

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h2>Video to GIF Converter</h2>
        <p>Convert your videos to high-quality GIFs right in your browser. No data is sent to any server.</p>
      </div>

      <div className="tool-content">
        {!videoFile && !gifUrl && (
          <div className="upload-area">
            <input 
              type="file" 
              id="video-upload" 
              accept="video/*" 
              onChange={handleFileChange}
              className="hidden-input"
            />
            <label htmlFor="video-upload" className="upload-label">
              <UploadCloud size={48} className="upload-icon" />
              <h3>Drop a video file here</h3>
              <p>or click to browse from your computer</p>
              <span className="supported-formats">Supports MP4, WebM, MOV, and more</span>
            </label>
          </div>
        )}

        {videoFile && !gifUrl && (
          <div className="preview-area">
            <div className="file-info">
              <FileVideo size={24} className="file-icon" />
              <div className="file-details">
                <span className="file-name">{videoFile.name}</span>
                <span className="file-size">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
              <button onClick={resetState} className="icon-btn" title="Remove file">
                <X size={20} />
              </button>
            </div>
            
            <div className="action-area">
              <button 
                className={`primary-btn ${isConverting ? 'converting' : ''}`}
                onClick={convertToGif}
                disabled={isConverting || !loaded}
              >
                {isConverting ? (
                  <>
                    <RefreshCw size={20} className="spinner" />
                    Converting... {progress}%
                  </>
                ) : (
                  'Convert to GIF'
                )}
              </button>
              
              {isConverting && (
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
              )}
            </div>
          </div>
        )}

        {gifUrl && (
          <div className="result-area">
            <div className="success-banner">
              Conversion complete!
            </div>
            <div className="gif-preview-container">
              <img src={gifUrl} alt="Converted GIF" className="gif-preview" />
            </div>
            <div className="result-actions">
              <button className="secondary-btn" onClick={resetState}>
                Convert Another
              </button>
              <a 
                href={gifUrl} 
                download={`converted-${Date.now()}.gif`} 
                className="primary-btn download-btn"
              >
                <Download size={20} />
                Download GIF
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoToGif;
