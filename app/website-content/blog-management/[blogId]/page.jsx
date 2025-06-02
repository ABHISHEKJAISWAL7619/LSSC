import BlogManagement from "@/ui/pages/BlogManagement";
import MainLayout from "@/ui/templates/MainLayout";

const page = async ({params}) => {
    const {blogId} = await params;
  return (
    <MainLayout>
      <BlogManagement blogId={blogId} />
    </MainLayout>
  );
};

export default page;
