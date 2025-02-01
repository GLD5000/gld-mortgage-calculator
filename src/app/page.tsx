import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_40px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       <h1 className="text-4xl text-center mx-auto">GLD Mortgage Calculator</h1>
      </main>
      <footer className="row-start-3 grid gap-2 flex-wrap items-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/GLD5000"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons/GLD.svg"
            alt="File icon"
            width={40}
            height={40}
          />
          Portfolio
        </a>
        <p className="text-xs text-center">Gareth L Devlin © {`${new Date().getFullYear()}`}</p>
      </footer>
    </div>
  );
}
