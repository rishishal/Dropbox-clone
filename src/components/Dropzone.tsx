"use client";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";
import { db, storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const Dropzone = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number | null>();
  const { isLoaded, isSignedIn, user } = useUser();
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    //Uploading File in Firebase Stroge and Database in one funtion

    const imageRef = ref(
      storage,
      `users/${user.id}/files/${selectedFile.name}`
    );
    uploadBytes(imageRef, selectedFile)
      .then(async (snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          console.log("file available at", downloadURL);

          //addDoc => users/user1234/files

          const docRef = await addDoc(
            collection(db, "users", user.id, "files"),
            {
              userId: user.id,
              filename: selectedFile.name,
              fullName: user.fullName,
              profileImg: user.imageUrl,
              timeStamp: serverTimestamp(),
              type: selectedFile.type,
              size: selectedFile.size,
              downloadURL: downloadURL,
            }
          );
        });
      });
    setLoading(false);
  };

  //max file size 20MB
  const maxSize = 20971520;
  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className='m-4'>
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop to upload this file!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className='text-danger mt-2'>File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
};
export default Dropzone;
function saveInfo(file: File, downloadURL: string) {
  throw new Error("Function not implemented.");
}