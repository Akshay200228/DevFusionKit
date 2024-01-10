import { getCodeComp } from "@/app/action";
import CardComponent from "@/components/comLayout/CardComponent";

export default async function Card(context) {
  // call api here
  const page = parseInt(context.searchParams.page) || 1;
  const data = await getCodeComp(page);
  console.log("context: ", context)

  return (
    <CardComponent page={page} data={data} />
  )
}

