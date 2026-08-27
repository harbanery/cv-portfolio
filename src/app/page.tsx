import CvDocument, { CvToolbar } from "@/components/cv";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <CvToolbar />
      <main className="flex-1 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        <CvDocument />
      </main>
    </div>
  );
}
