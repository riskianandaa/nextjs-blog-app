import Image from "next/image";

export default function Error() {
  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-orange-600 py-10">
        Something Went Wrong
      </h1>
      <Image src={"/images/not_found.png"} width={400} height={400}></Image>
    </div>
  );
}
