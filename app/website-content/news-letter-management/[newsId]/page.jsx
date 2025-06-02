import LetterManagement from "@/ui/pages/LetterManagement";
import MainLayout from "@/ui/templates/MainLayout";

const page =async ({params}) => {
     const {newsId} = await params;
  return (
    <MainLayout>
      <LetterManagement newsId={newsId}  />
    </MainLayout>
  );
};

export default page;
