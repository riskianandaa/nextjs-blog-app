import Image from "next/image";
import Author from "../components/_child/author";
import Format from "../layout/format";
import Related from "../components/_child/related";
import getPost from "../lib/helper";
import fetcher from "../lib/fetcher";
import Spinner from "../components/_child/spinner";
import Error from "../components/_child/error";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

export default function page({ fallback }){
  const router = useRouter()
  const {postId} = router.query
  const { data, isError, isLoading } = fetcher(`api/posts/${postId}`)

  if(isLoading) return <Spinner />
  if(isError) return <Error />

  return (
    <SWRConfig value={{fallback}} >
      <Article {...data} />
    </SWRConfig>
  )
}

function Article({ title, img, subtitle, description, author }) {
  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
        {author ? <Author {...author} /> : <></> }
        </div>
        <div className="py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            {title || "Unknown"}
          </h1>
          <p className="text-gray-500 text-xl text-center">
            {subtitle || "Unknown"}
          </p>

          <div className="py-10">
            <Image src={img || "/"} width={900} height={600}></Image>
          </div>

          <div className="content text-gray-600 text-lg flex flex-col gap-4">
           {description || "No Description"}
          </div>
        </div>
        <Related />
      </section>
    </Format>
  );
}

export async function getStaticProps({params}){
  const posts = await getPost(params.postId)

  return {
    props: {
      fallback: {
        'api/posts': posts
      }
    }
  }
}

export async function getStaticPaths(){
  const posts = await getPost()

  const paths = posts.map(value => {
    return {
      params: {
        postId : value.id.toString()
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}
