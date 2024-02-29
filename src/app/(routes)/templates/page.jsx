import TemplateCards from "@/components/templateLayout/TemplateCards";

export const metadata = {
  title: 'Web Templates'
}

// export async function generateMetadata({ params }) {
//   return {
//     title: 'Web Templates'
//   }
// }

export default function Templates() {
  return (
    <div className="w-full h-auto bg-white">
      <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold xl:leading-[62px] md:leading-[52px] leading-[42px] text-gray-900 sm:text-4xl lg:text-5xl">
            Provide Templates for Websites by{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 animate-stroke">
                DevNexus
              </span>
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Explore a collection of website templates provided by DevNexus And Users to kickstart your web projects.
          </p>

          {/* Button for creating a template */}
          {/* <Link href="/create-template">
            <button className="px-6 py-3 mt-8 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
              Create Your Own Templates
            </button>
          </Link> */}
          {/* svg icon */}
          <div className="flex items-center justify-center">
            <svg
              className="w-6 h-6 my-4 animate-bounce"
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
            </svg>
          </div>
        </div>
      </div>

      <TemplateCards />
    </div>
  );
}
