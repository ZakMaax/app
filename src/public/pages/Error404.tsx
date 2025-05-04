import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Error404() {
  return (
    <>
      <Header />
      <section className="bg-white">
        <div className="pb-8 pt-30 px-4 mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primaryColor dark:text-slate-400">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.
            </p>

            <Link
              to={"/"}
              className="inline-flex text-white bg-primaryColor hover:opacity-75 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>

      
        <Footer />

    </>
  );
}
