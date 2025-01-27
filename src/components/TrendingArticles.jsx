import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
const TrendingArticles = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tendingRrticles = [], refetch } = useQuery({
    queryKey: ["rrticles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tendingRrticles");
      return res.data;
    },
  });
  const handleViewCount = (id) => {
    console.log(id);
    axiosSecure.patch(`/viewCount/${id}`).then((res) => {
      refetch();
    });
  };
  console.log(tendingRrticles);
  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-400 mb-8">
        Tending Rrticles
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
            slidesPerView: 3,
          },
          // Default (mobile): show 1 slide
          0: {
            slidesPerView: 1,
          },
        }}
        className="mySwiper"
      >
        {tendingRrticles.map((article) => (
          <SwiperSlide key={article._id}>
            <div className="relative rounded overflow-hidden border bg-white m-4 lg:h-[430px]  h-[450px]">
              <p className="bg-rose-600 text-white py-1 px-3 absolute top-2 right-2 rounded-md text-center w-24">
                {article.viewCount} Views
              </p>
              <img
                className="w-full h-48 object-cover"
                src={article.image}
                alt={article.title}
              />
              <div className="px-6 py-4">
                {/* Category Tag */}
                <div className="text-green-500 font-bold text-xs mb-2 uppercase">
                  {article.category}
                </div>
                {/* Title */}
                <h2 className="font-bold text-lg mb-2 text-gray-900 hover:text-rose-500 ">
                  {article.title}
                </h2>
                <h4 className="font-semibold text-md mb-2 text-gray-900  cursor-pointer">
                  Publisher: {article.publisher}
                </h4>

                <p className="text-gray-700 text-base">
                  {article.description?.slice(0, 80)}...
                </p>

                <Link to={`/articleDetails/${article._id}`}>
                  <button
                    onClick={() => handleViewCount(article._id)}
                    className="mt-4 py-1 px-6 bg-rose-600 text-rose-100 rounded-sm"
                  >
                    Details
                  </button>
                </Link>
              </div>
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

export default TrendingArticles;
