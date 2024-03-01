import CardComponent from "@/components/comLayout/CardComponent";

export default function Component(context) {
  const page = parseInt(context.searchParams.page) || 1;
  const limit = 12;

  return (
    <div className="w-full bg-white">
      <CardComponent
        page={page}
        limit={limit}
      />
    </div>
  );
}

export const metadata = {
  title: 'Code Components'
}