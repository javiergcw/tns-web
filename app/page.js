
import BannerCarousel from "./components/home/BannerCarrousel";

export default function Home() {
  const imagePaths = [
    "images/banner/banner1.png",
    "images/banner/banner2.png",
    "images/banner/banner3.png",
    "images/banner/banner4.png",
    "images/banner/banner5.png",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <BannerCarousel imagePaths={imagePaths} />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>
    </main>
  )
}
