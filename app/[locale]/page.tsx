import Image from "next/image";


export default function Home() {

  return (
    <div  className="size-40 mx-auto mt-40 relative ">
      <Image
              src="/products/toolidooo  sliced mushroom blue.silver .png"
              alt={"localizedTitle"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            /></div>
  );
}
