"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FileType } from "../../typing";
import prettyBytes from "pretty-bytes";
import Link from "next/link";
import { FileIcon, defaultStyles } from "react-file-icon";
import { COLOR_EXTENSION_MAP } from "../../constants";
import { Download, Share, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useAppStore } from "@/store/store";

const useAppState = () => useAppStore((state) => state);

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];
      return (
        <div className='w-10'>
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension]}
            //@ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => (
      <a
        href={renderValue() as string}
        target='_blank'
        className='underline text-blue-500 hover:text-blue-600'
      >
        <Download />
      </a>
    ),
  },

  {
    accessorKey: "id",
    header: "Delete",
    cell: ({ renderValue, row }) => {
      const fileId = renderValue() as string;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setIsDeleteModalOpen, setFileId } = useAppState();

      return (
        <div className='w-10'>
          <Button
            variant={"outline"}
            onClick={() => {
              setFileId(fileId);
              setIsDeleteModalOpen(true);
            }}
          >
            <TrashIcon size={20} />
          </Button>
        </div>
      );
    },
  },
];
