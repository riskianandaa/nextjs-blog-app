import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Author from "./_child/author";
import Link from "next/link";
import Spinner from "./_child/spinner";
import Error from "./_child/error";
import fetcher from "../lib/fetcher";

export default function Section3() {
  const { data, isError, isLoading } = fetcher("api/popular");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="text-4xl text-center font-bold py-12">Most Popular</h1>
      {/* swiper */}
      <div className="">
        <Swiper 
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30
            }
          }}
        >
          {
            data.map((value, index) => (
              <SwiperSlide key={index}>
                <Popular data={value} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </section>
  );
}

function Popular({ data }) {
  const { id, title, category, img, published, description ,author } = data;

  return (
    <div className="grid">
      <div className="images">
        <Link href={`/posts/${id}`}>
          <Image
            src={img || "/"}
            width={600}
            height={400}
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={`/posts/${id}`} className="text-orange-600 hover:text-orange-800">
            {category | "No Category"}
          </Link>
          <Link href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600">
            - {published || "Unknown"}
          </Link>
        </div>
        <div className="title">
          <Link
            href={`/posts/${id}`}
            className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600"
          >
            {title || 'No Title'}
          </Link>
        </div>
        <p className="text-gray-500 py-3">
         {description || 'Unknown'}
        </p>
        {author ? <Author {...author} /> : <></> }
      </div>
    </div>
  );
}
