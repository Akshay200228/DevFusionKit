import Container from "./Container";
import Title from "./Title";
import { accountData } from "@/constants";

const Account = () => {
  return (
    <section>
      <Container
        id="account"
        aria-label="Features for building a portfolio"
        className="py-20 sm:py-32"
      >
        <div className="max-w-2xl mx-auto sm:text-center">
          <Title
            title="Unleash the Power of Your Web Projects."
            className="text-2xl"
          />
          <p className="mt-2 text-lg text-gray-600">
            With DevFusionKit, you have everything you need to bring your web projects to life. It never too late to create stunning and functional web applications.
          </p>
        </div>
        <ul
          role="list"
          className="grid max-w-2xl grid-cols-1 gap-6 mx-auto mt-16 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {accountData.map((item) => (
            <li
              key={item.name}
              className="p-8 duration-300 border border-gray-200 cursor-pointer rounded-2xl hover:border-gray-300 group hover:bg-gray-100"
            >
              <item.icon className="w-8 h-8" />
              <h3 className="mt-6 font-semibold text-gray-900 duration-300 group-hover:text-black">
                {item.name}
              </h3>
              <p className="mt-2 text-gray-700 duration-300 group-hover:text-black">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Account;
