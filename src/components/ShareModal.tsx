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
  DialogTrigger,
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

export function ShareModal() {
  const { user } = useUser();

  const [file, setFile] = useState<FileType | null>();

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
  }, [fileId, setFileId, setIsShareModalOpen]);

  const onCopyClick = () => {
    navigator.clipboard.writeText(file?.shortUrl!);
    toast.success("Copied");
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
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input id='link' value={file?.shortUrl} readOnly />
            {/* <h1>{file?.shortUrl}</h1> */}
          </div>
          <Button
            type='submit'
            size='sm'
            className='px-3'
            onClick={() => onCopyClick()}
          >
            <span className='sr-only'>Copy</span>
            <CopyIcon className='h-4 w-4' />
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
