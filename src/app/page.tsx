"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  let videosrc = "/dbx1-hero-1920x1080.mp4";

  return (
    <main>
      <div className='flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800'>
        <div className='p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5'>
          <h1 className='text-5xl font-bold'>
            Welcome to DropBox. <br />
            <br />
            Storing everything for you and your business needs. All in one place
          </h1>

          <p className='pb-20'>
            Enchance your Personal storage with Dropbox, offering a simple and
            efficient way to upload, organize, and access files from anywher.
            Securely store important documemts and media, and exprience the
            convenience of easy file managment and sharing in one centralized
            solution.
          </p>
          <Link
            href='/dashboard'
            className='flex cursor-pointer bg-blue-500 p-5 w-fit'
          >
            Try it For free!
            <ArrowRight className='ml-10' />
          </Link>
        </div>
        <div className='bg-[#1E1919] dark:bg-slate-800 h-full p-10'>
          <video autoPlay muted loop className='rounded-lg'>
            <source src={videosrc} type='video/mp4' />
          </video>
        </div>
      </div>
      <p className='text-center font-bold text-xl pt-5'>Disclaimer</p>
      <p className='text-center font-light p-2'>
        This file sharing project is intended for legitimate and ethical
        purposes only. Users are solely responsible for the content they upload
        and share. The project developers disclaim any liability for illegal or
        inappropriate use. By using this service, users agree to abide by
        relevant laws and ethical standards.
      </p>
    </main>
  );
}
