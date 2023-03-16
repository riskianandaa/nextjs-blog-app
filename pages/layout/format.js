import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Format({ children }) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
