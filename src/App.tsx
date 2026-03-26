/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Download, Loader2, Sparkles, Image as ImageIcon, Palette, Type, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const STYLES = [
  { id: 'minimalist', label: 'Minimalist', icon: 'â¨' },
  { id: 'flat', label: 'Flat Design', icon: 'ð¨' },
  { id: '3d', label: '3D Render', icon: 'ð²' },
  { id: 'line-art', label: 'Line Art', icon: 'âï¸' },
  { id: 'pixel-art', label: 'Pixel Art', icon: 'ð®' },
  { id: 'neon', label: 'Neon', icon: 'ð¡' },
  { id: 'claymorphism', label: 'Claymorphism', icon: 'ð§¼' },
  { id: 'origami', label: 'Origami', icon: 'ð¦¢' },
];

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('minimalist');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const selectedStyle = STYLES.find(s => s.id === style)?.label || 'Minimalist';
      const fullPrompt = `A single icon of ${prompt}, ${selectedStyle} style, solid white background, high quality, clean, centered, no text.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: fullPrompt }],
        },
      });
      
      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }
      
      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating the icon.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `icon-${prompt.replace(/\\s+/g, '-').toLowerCase() || 'generated'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm shadow-indigo-600/20">
            <Sparkles size={20} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">IconGen</h1>
        </div>
        <div className="text-sm text-zinc-500 font-medium">Powered by Gemini</div>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 lg:mt-8">
        {/* Controls Panel */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-2">Create an Icon</h2>
            <p className="text-zinc-500 text-lg">Describe what you want, pick a style, and let AI do the rest.</p>
          </div>

          <div className="space-y-6 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            {/* Prompt Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                <Type size={16} className="text-zinc-400" />
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A cute robot reading a book..."
                className="w-full min-h-[120px] p-4 rounded-2xl border border-zinc-200 bg-zinc-50 shadow-inner focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none text-base"
              />
            </div>

            {/* Style Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                <Palette size={16} className="text-zinc-400" />
                Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      style === s.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-2 ring-indigo-600 ring-offset-2'
                        : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    <span>{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-4 px-6 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-zinc-900/20 active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  Generate Icon
                </>
              )}
            </button>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100 font-medium">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-zinc-200 rounded-[2rem] p-4 sm:p-8 aspect-square flex flex-col items-center justify-center relative overflow-hidden shadow-sm h-full min-h-[400px]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            <AnimatePresence mode="wait">
              {generatedImage ? (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="relative w-full h-full flex items-center justify-center group"
                >
                  <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/10 ring-1 ring-black/5">
                    <img
                      src={generatedImage}
                      alt="Generated Icon"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        className="bg-white text-zinc-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-xl"
                      >
                        <Download size={20} />
                        Download PNG
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6 z-10"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center animate-pulse">
                      <Sparkles size={32} className="text-indigo-400" />
                    </div>
                    <div className="absolute -inset-4 border-2 border-indigo-500/20 rounded-[2.5rem] animate-[spin_3s_linear_infinite]" style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}></div>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-lg font-medium text-zinc-900">Crafting your icon...</p>
                    <p className="text-sm text-zinc-500">This usually takes a few seconds</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center flex flex-col items-center gap-4 z-10 max-w-xs"
                >
                  <div className="w-24 h-24 rounded-3xl bg-zinc-50 border-2 border-zinc-100 border-dashed flex items-center justify-center mb-2 text-zinc-300">
                    <ImageIcon size={40} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-medium text-zinc-900">No icon generated yet</p>
                    <p className="text-sm text-zinc-500">Enter a prompt and click generate to see the magic happen.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
