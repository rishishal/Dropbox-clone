import Dropzone from "@/components/Dropzone";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { FileType } from "../../../typing";
import TableWrapper from "@/components/table/TableWrapper";

const Dashboard = async () => {
  const { userId } = auth();

  const docsResult = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docsResult.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  // console.log(skeletonFiles);
  return (
    <div className='border-t'>
      <Dropzone />
      <section className='container space-y-5'>
        {/* Table Wrarpper */}
        <h2 className='font-bold'>All Files</h2>
        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
};
export default Dashboard;
