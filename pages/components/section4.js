import Image from "next/image"
import Link from "next/link"
import Author from "./_child/author"
import Spinner from "./_child/spinner";
import Error from "./_child/error";
import fetcher from "../lib/fetcher";

export default function Section4() {
  const { data, isError, isLoading } = fetcher("api/popular");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
   <section className="container mx-auto md:px-20 py-16">
    <div className="grid lg:grid-cols-2">
      <div className="item">
        <h1 className="text-2xl font-bold py-12">Business</h1>
        <div className="flex flex-col gap-6">
          {/* post */}
          { data[1] ? <Post data={data[1]}></Post> : <></>}
          { data[2] ? <Post data={data[2]}></Post> : <></>}
          { data[3] ? <Post data={data[3]}></Post> : <></>}
        </div>
      </div>
      <div className="item">
        <h1 className="text-2xl font-bold py-12">Travel</h1>
        <div className="flex flex-col gap-6">
          {/* post */}
          { data[4] ? <Post data={data[4]}></Post> : <></>}
          { data[5] ? <Post data={data[5]}></Post> : <></>}
          { data[2] ? <Post data={data[2]}></Post> : <></>}
        </div>
      </div>
    </div>

   </section>
  )
}

function Post({data}){
  const { id, title, category, img, published, description ,author } = data;

  return(
    <div className="flex gap-5">
      <div className="image flex -flex-col justify-start">
        <Link href={`/posts/${id}`} >
          <Image src={img || "/"} width={300} height={250} className="rounded" />        
        </Link>
      </div>
      <div className="info flex flex-col justify-center">
        <div className="cat">
          <Link href={`/posts/${id}`} className="text-orange-600 hover:text-orange-800">
            {category || "No Category"}
          </Link>
          <Link href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600">
            - {published || "Unknown"}
          </Link>
        </div>
        <div className="title">
          <Link
            href={`/posts/${id}`}
            className="text-xl font-bold text-gray-800 hover:text-gray-600"
          >
            {title || "No Title"}
          </Link>
        </div>
        {author ? <Author {...author} /> : <></> }
      </div>
    </div>
  )
}
