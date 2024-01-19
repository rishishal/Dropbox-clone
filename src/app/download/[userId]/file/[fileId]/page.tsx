const page = ({
  params,
}: {
  params: {
    userId: string;
    fileId: string;
  };
}) => {
  const userId = params.userId;
  const fileId = params.fileId;

  return (
    <div>
      <h1>
        UserId {params.userId} and FileId{params.fileId}
      </h1>
    </div>
  );
};
export default page;
