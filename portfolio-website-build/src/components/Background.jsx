export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-10"></div>

      <div className="blob-cyan absolute -left-[10%] -top-[10%] h-[50vh] w-[50vw] rounded-full bg-[rgba(56,189,248,0.12)] blur-[100px] sm:blur-[120px]"></div>
      <div className="blob-purple absolute -bottom-[10%] -right-[10%] h-[50vh] w-[50vw] rounded-full bg-[rgba(139,92,246,0.12)] blur-[100px] sm:blur-[120px]"></div>
      <div className="blob-center absolute left-[35%] top-[40%] h-[40vh] w-[40vw] rounded-full bg-[rgba(2,132,199,0.06)] blur-[100px]"></div>
    </div>
  )
}
