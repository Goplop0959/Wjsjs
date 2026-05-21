import Converter from './components/Converter'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative px-4">
      {/* Decorative background elements */}
      <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-secondary/20 blur-[100px] rounded-full -z-10" />

      <nav className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">
          <span className="text-primary">PULSE</span>
          <span className="text-secondary">CONVERTER</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">TOS</a>
          <a href="#" className="hover:text-white transition-colors">API</a>
          <a href="#" className="hover:text-white transition-colors">STATUS</a>
        </div>
      </nav>

      <Converter />

      <footer className="absolute bottom-8 text-gray-500 text-xs tracking-widest uppercase">
        Built for digital preservation &copy; {new Date().getFullYear()}
      </footer>
    </main>
  )
}