"use client";
import { CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { useAppStore } from "@/store/store";
import { doc, getDoc } from "firebase/firestore";
import { FileType } from "@/typing";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import toast from "react-hot-toast";
import GlobalApi from "./GlobalApi";
import { SendEmailProps } from "@/typing";

export function ShareModal() {
  const { user } = useUser();

  const [file, setFile] = useState<FileType | null>();
  const [email, setEmail] = useState<string | null>();

  const [isShareModalOpen, setIsShareModalOpen, fileId, setFileId] =
    useAppStore((state) => [
      state.isShareModalOpen,
      state.setIsShareModalOpen,
      state.fileId,
      state.setFileId,
    ]);

  const ShareFile = async () => {
    if (!user || !fileId) return;
    try {
      const docRef = doc(db, "users", user.id!, "files", fileId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFile(docSnap.data() as FileType);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
      setIsShareModalOpen(false);
    }
  };
  useEffect(() => {
    fileId && ShareFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId, setFileId, setIsShareModalOpen]);

  const onCopyClick = () => {
    navigator.clipboard.writeText(file?.shortUrl!);
    toast.success("Copied");
  };

  const sendEmail = () => {
    const data: SendEmailProps = {
      emailToSend: email || "",
      emailFrom: file?.userEmail,
      userName: file?.fullName,
      fileName: file?.filename,
      fileSize: file?.size,
      fileType: file?.type,
      shortUrl: file?.shortUrl,
    };
    GlobalApi.SendEmail(data).then((resp) => {
      console.log(resp);
    });
    toast.success("Email Sent");
  };

  return (
    <Dialog
      open={isShareModalOpen}
      onOpenChange={(isOpen) => {
        setIsShareModalOpen(isOpen);
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{file?.filename}</DialogTitle>
          <DialogDescription>
            <p className='text-xs text-gray-600'>You can share your File </p>
          </DialogDescription>
        </DialogHeader>

        <div className='flex items-center space-x-2 my-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input id='link' value={file?.shortUrl} readOnly />
          </div>

          <Button
            type='submit'
            size='sm'
            className='px-3 '
            onClick={() => onCopyClick()}
          >
            <span className='sr-only'>Copy</span>
            <CopyIcon className='h-4 w-4' />
          </Button>
        </div>

        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='Email' className='sr-only'>
              Email
            </Label>
            <Input
              id='Email'
              placeholder='Enter Your Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            type='submit'
            className='ml-auto w-fit'
            onClick={() => sendEmail()}
          >
            Sent
          </Button>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='secondary'
              onClick={() => setIsShareModalOpen(false)}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
