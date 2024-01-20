"use client";

import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import FileItems from "./_components/FileItems";
import Link from "next/link";
import { FileType } from "@/typing";

const UserFile = ({
  params,
}: {
  params: {
    userId: string;
    fileId: string;
  };
}) => {
  const userId = params?.userId;
  const fileId = params?.fileId;

  const [file, setFile] = useState<FileType | null>(null); // Initialize with null

  useEffect(() => {
    userId && fileId && getFileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, fileId]);

  const getFileInfo = async () => {
    const docRef = doc(db, "users", userId, "files", fileId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const fileData = docSnap.data();
      if (fileData) {
        setFile(fileData as FileType);
      } else {
        console.log("Document data is undefined!");
      }
    } else {
      console.log("No such document!");
    }
  };

  return (
    <div className='bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4'>
      <Link href='/'>
        <Image src='/dropbox.svg' alt='LOGO' width={60} height={60} />
      </Link>
      {file && <FileItems file={file} />}
    </div>
  );
};

export default UserFile;
