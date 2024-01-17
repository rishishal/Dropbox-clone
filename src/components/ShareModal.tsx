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
import { collection, orderBy, query } from "firebase/firestore";
import { FileType } from "@/typing";
import { useState } from "react";

export function ShareModal() {
  const { user } = useUser();
  const [file, setFile] = useState<FileType[]>([]);

  const [isShareModalOpen, setIsShareModalOpen, fileId] = useAppStore(
    (state) => [state.isShareModalOpen, state.setIsShareModalOpen, state.fileId]
  );

  const ShareFile = async () => {
    if (!user || !fileId) return;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Share</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input
              id='link'
              defaultValue='https://ui.shadcn.com/docs/installation'
              readOnly
            />
          </div>
          <Button type='submit' size='sm' className='px-3'>
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
