type PinPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PinPage({ params }: PinPageProps) {
  const { id } = await params;

  return <div>Pin: {id}</div>;
}