import Project from "./Project";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <Project id={id} />;
};

export default Page;
