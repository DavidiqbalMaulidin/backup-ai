export default function AuthError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-red-500 text-xl font-bold">
        Authentication Error
      </h1>

      <p className="text-gray-400 mt-2">
        Silakan login ulang
      </p>

      <a href="/" className="text-blue-400 mt-4">
        Kembali
      </a>
    </div>
  )
}