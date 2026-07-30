import CvDocument, { CvToolbar } from "@/components/cv";
import { CV_DATA } from "@/models/data";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <CvToolbar />
      <main className="flex-1 py-8 px-4">
        <CvDocument data={CV_DATA} />
      </main>
    </div>
  );
}
