"use client";
import { Download } from "lucide-react";
import Image from "next/image";
import { File } from "@/typing";
import { ReactElement } from "react";

interface fileItemProps {
  file: File;
}

const FileItems: React.FC<fileItemProps> = ({ file }): ReactElement => {
  return (
    file && (
      <div>
        <div className='p-5 rounded-md bg-white flex flex-col items-center'>
          <div className='text-center flex-col gap-3 items-center flex'>
            <h2 className='text-[20px] text-gray-600'>
              <strong className='text-blue-600'>{file?.fullName}</strong> Shared
              the file with You
            </h2>
            <h2 className='text-[10px] text-gray-400'>
              Find File details below
            </h2>
            <Image
              src='/download-file.gif'
              alt='download Gif'
              width={150}
              height={150}
              className='w-[150px] h-[150px] p-5'
            />
            <h2 className='text-gray-500 text-[15px]'>
              {file?.filename} ⚡ {file?.type} ⚡ {file?.size} Byets
            </h2>
          </div>

          <button className='flex gap-2 p-2 bg-blue-600 text-white rounded-full w-full items-center hover:bg-blue-600 text-[14px] mt-5 text-center justify-center'>
            <Download className='h-4 w-4' />
            Download
          </button>
          <h2 className='text-gray-400 text-[12px]'>
            *Term and Conditions apply
          </h2>
        </div>
      </div>
    )
  );
};
export default FileItems;
