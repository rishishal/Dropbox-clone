/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FileType } from "@/typing";
import FileItems from "./_components/FileItems";
import Link from "next/link";

interface PageParams {
  params: {
    userId: string;
    fileId: string;
  };
  file: FileType;
}

const page = ({ params }: PageParams) => {
  const userId = params.userId;
  const fileId = params.fileId;

  const [file, setFile] = useState<FileType | null>();

  useEffect(() => {
    userId && fileId && getFileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, fileId]);

  const getFileInfo = async () => {
    const docRef = doc(db, "users", userId, "files", fileId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setFile(docSnap.data() as FileType);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className='bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4'>
      <Link href='/'>
        <Image src='/dropbox.svg' alt='LOGO' width={60} height={60} />
      </Link>
      <FileItems file={file!} />
    </div>
  );
};
export default page;
