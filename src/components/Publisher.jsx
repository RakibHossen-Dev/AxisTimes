import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// import "./styles.css";
const Publisher = () => {
  const axiosSecure = useAxiosSecure();

  const { data: publishers = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  console.log(publishers);
  return (
    <div className="w-11/12 mx-auto my-20">
      <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-400 mb-8">
        All publishers
      </h2>
      <Swiper watchSlidesProgress={true} slidesPerView={4} className="mySwiper">
        {publishers.map((publisher) => (
          <SwiperSlide key={publisher._id}>
            <div  className="p-3 flex flex-col justify-center items-center ">
              <img
                className="w-40 p-3 rounded-full  border"
                src={publisher.logo}
                alt=""
              />
              <h3 className="text-2xl font-semibold mt-3 text-rose-600">
                {publisher.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default Publisher;
