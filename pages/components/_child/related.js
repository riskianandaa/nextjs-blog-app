import Image from "next/image";
import Link from "next/link";
import Author from "./author";
import fetcher from "@/pages/lib/fetcher";
import Spinner from "./spinner";
import Error from "./error";

export default function Related() {
  const { data, isError, isLoading } = fetcher("api/posts");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="pt-20">
      <h1 className="text-3xl font-bold py-10">Related</h1>
      <div className="flex flex-col gap-10">
        {
          data.map((value, index) => (
            <Post data={value} key={index} />
          ))
        }
      </div>
    </section>
  );
}

function Post({ data }) {
  const { id, title, category, img, published, author } = data;
  return (
    <div className="flex gap-5">
      <div className="image flex -flex-col justify-start">
        <Link href={`/posts/${id}`}>
          <Image
            src={img || "/"}
            width={300}
            height={200}
            className="rounded"
          />
        </Link>
      </div>
      <div className="info flex flex-col justify-center">
        <div className="cat">
          <Link
            href={`/posts/${id}`}
            className="text-orange-600 hover:text-orange-800"
          >
            {category || "No Category"}
          </Link>
          <Link
            href={`/posts/${id}`}
            className="text-gray-800 hover:text-gray-600"
          >
            - {published || "Unknown"}
          </Link>
        </div>
        <div className="title">
          <Link
            href={`/posts/${id}`}
            className="text-xl font-bold text-gray-800 hover:text-gray-600"
          >
            {title || "Unknown"}
          </Link>
        </div>
        {author ? <Author {...author} /> : <></>}
      </div>
    </div>
  );
}
