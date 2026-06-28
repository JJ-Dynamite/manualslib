'use client';
import Head from 'next/head';
export default function Home() {
  return (
    <>
      <Head><title>manualslib</title></Head>
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">manualslib</h1>
          <p className="text-gray-400">Find any product manual</p>
        </div>
      </main>
    </>
  );
}
