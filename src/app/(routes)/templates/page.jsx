
import TemplateCards from "@/components/templateLayout/TemplateCards";

export const metadata = {
  title: 'Template'
}

export default function Component() {
  return (
    <div className="w-full h-auto bg-white">
      <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Provide Templates for Websites
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Here, you can explore a collection of website templates to kickstart your web projects.
          </p>
        </div>
      </div>

      <TemplateCards />
    </div>
  );
}
