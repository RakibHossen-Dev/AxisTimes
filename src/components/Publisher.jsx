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
      <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-400 mb-8">
        All publishers
      </h2>
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
