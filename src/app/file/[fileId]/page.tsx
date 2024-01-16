"use client";
interface FilePreProps {
  params: { fileId: string };
}

const page: React.FC<FilePreProps> = ({ params }) => {
  return (
    <div>
      <h2>{params.fileId}</h2>
    </div>
  );
};
export default page;
