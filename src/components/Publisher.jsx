import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Publisher = () => {
  const axiosPublic = useAxiosPublic();

  const { data: publishers = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });

  console.log(publishers);

  return (
    <div className="w-11/12 mx-auto my-20">
      <div className="relative w-fit ">
        <h2 className="md:text-4xl lg:text-5xl text-2xl font-extrabold text-gray-900 uppercase mb-2 border-b-4 border-black ">
          All <span className="text-rose-600 ">publishers</span>
        </h2>
        <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-red-600"></div>
      </div>
      <Swiper
        watchSlidesProgress={true}
        breakpoints={{
          // When the viewport is >= 640px (tablet), show 2 slides
          640: {
            slidesPerView: 2,
          },
          // When the viewport is >= 768px (desktop), show 4 slides
          768: {
            slidesPerView: 4,
          },
          // Default (mobile): show 1 slide
          0: {
            slidesPerView: 1,
          },
        }}
        className="mySwiper"
      >
        {publishers.map((publisher) => (
          <SwiperSlide key={publisher._id}>
            <div className="p-3 flex flex-col justify-center items-center ">
              <img
                className="w-40 p-3 rounded-full border"
                src={publisher.logo}
                alt={publisher.name}
              />
              <h3 className="text-2xl font-semibold mt-3 text-rose-600">
                {publisher.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Publisher;
