"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Music, ShieldAlert, Loader2, Link2, CheckCircle2 } from 'lucide-react'

export default function Converter() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handleConvert = async (e) => {
    e.preventDefault()
    if (!url) return
    
    setLoading(true)
    setError('')
    setResult(null)

    try {
      // Using Cobalt API instance
      const response = await fetch('https://api.cobalt.tools/api/json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          downloadMode: 'audio',
          audioFormat: 'mp3',
          audioBitrate: '320'
        })
      })

      const data = await response.json()

      if (data.status === 'error') {
        throw new Error(data.text || 'Conversion failed')
      }

      if (data.status === 'redirect' || data.url) {
        setResult(data.url)
      } else {
        throw new Error('No download link generated')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please check the URL.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-3xl rounded-full -ml-16 -mb-16" />

        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3">
            <Music className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-white via-blue-200 to-red-200 bg-clip-text text-transparent">
            PulseConverter
          </h1>
          <p className="text-gray-400 max-w-sm">
            High-fidelity audio extraction for your digital archive.
          </p>
        </div>

        <form onSubmit={handleConvert} className="space-y-6 relative">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Link2 className="text-gray-500 group-focus-within:text-secondary transition-colors duration-300" size={20} />
            </div>
            <input
              type="text"
              placeholder="Paste YouTube Link..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all text-lg placeholder:text-gray-600"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <button
            disabled={loading || !url}
            className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] ${
              loading 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:shadow-[0_0_40px_rgba(0,102,255,0.4)]'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Processing...
              </>
            ) : (
              <>
                <Download size={24} /> Convert to MP3
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30 flex items-center gap-3 text-red-200"
            >
              <ShieldAlert size={20} className="shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 rounded-2xl bg-secondary/10 border border-secondary/20 text-center"
            >
              <CheckCircle2 className="mx-auto text-secondary mb-3" size={32} />
              <h3 className="text-xl font-bold mb-4">Your file is ready!</h3>
              <a
                href={result}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Download Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
            <ShieldAlert className="text-primary shrink-0" size={18} />
            <p className="text-[11px] leading-relaxed text-gray-400 uppercase tracking-wider font-semibold">
              <span className="text-white">Legal Terms:</span> This service is strictly provided for the sole purpose of downloading music that you legally owned from a personal account you have lost access to. By using this tool, you certify that you hold the legal rights to the content being processed.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}