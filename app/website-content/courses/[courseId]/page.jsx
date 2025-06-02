import Courses from "@/ui/pages/Courses";
import MainLayout from "@/ui/templates/MainLayout";

const page = async({params}) => {
    const {courseId} = await params;
  return (
    <MainLayout>
      <Courses courseId={courseId} />
    </MainLayout>
  );
};

export default page;
