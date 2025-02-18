import { MdArrowBack, MdArrowForward } from "react-icons/md";
// import testimonial from "../assets/testimonial1.jpg";
import { useRef } from "react";

const Testimonial = () => {
  const slider = useRef();
  const txRef = useRef(0);

  const sildeForward = () => {
    if (txRef.current > -50) {
      txRef.current -= 25;
    }
    slider.current.style.transform = `translateX(${txRef.current}%)`;
  };

  const sildBackward = () => {
    if (txRef.current < 0) {
      txRef.current += 25;
    }
    slider.current.style.transform = `translateX(${txRef.current}%)`;
  };

  return (
    <div className="w-11/12 mx-auto my-16  pb-10">
      <div className="relative w-fit ">
        <h2 className="md:text-4xl lg:text-5xl text-2xl font-extrabold text-gray-900 uppercase mb-2 border-b-4 border-black ">
          What <span className="text-rose-600 ">People Say</span>
        </h2>
        <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-red-600"></div>
      </div>
      <div className="my-8 mx-auto py-0 md:px-20 px-10 relative">
        <button onClick={sildeForward}>
          <MdArrowForward className="text-white text-3xl p-1 lg:text-5xl bg-rose-600 rounded-full md:p-2 absolute top-1/2 right-0 -translate-y-1/2" />
        </button>
        <button onClick={sildBackward}>
          <MdArrowBack className="text-white text-3xl p-1  lg:text-5xl bg-rose-600 rounded-full md:p-2 absolute top-1/2 left-0 -translate-y-1/2" />
        </button>
        <div className="overflow-hidden">
          <ul
            ref={slider}
            className="flex   gap-5 md:w-[200%] w-[400%] transition-transform duration-300 ease-in-out"
          >
            <li className="w-1/4 border ">
              <div className="shadow-custom  lg:p-14 p-6 rounded-sm space-y-5">
                <div className="flex md:flex-row flex-col items-center gap-2">
                  <img
                    className="w-14 h-14 rounded-full border-4 border-rose-600"
                    // src={testimonial}
                    src="https://i.ibb.co.com/Jtr2XY3/image.png"
                    alt="John Doe"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-rose-600">
                      John Doe
                    </h3>
                    <p>TechGuru, UK</p>
                  </div>
                </div>
                <p>
                  I’ve been using this newspaper website for a while now, and
                  I’m impressed by how quickly they update their articles. The
                  coverage is comprehensive, and I never miss any important
                  news.
                </p>
              </div>
            </li>
            <li className="w-1/4 border">
              <div className="shadow-custom  lg:p-14 p-6 rounded-sm space-y-5">
                <div className="flex md:flex-row flex-col items-center gap-2">
                  <img
                    className="w-14 h-14 rounded-full border-4 border-rose-600"
                    // src={testimonial}
                    src="https://i.ibb.co.com/df657qp/image.png"
                    alt="Maria Lopez"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-rose-600">
                      Maria Lopez
                    </h3>
                    <p>DevTech, Canada</p>
                  </div>
                </div>
                <p>
                  The layout is clean and easy to navigate. Whether I’m
                  searching for the latest sports news or tech updates, I can
                  find everything in just a few clicks. Highly recommend!
                </p>
              </div>
            </li>
            <li className="w-1/4 border">
              <div className="shadow-custom lg:p-14 p-6 rounded-sm space-y-5">
                <div className="flex md:flex-row flex-col items-center gap-2">
                  <img
                    className="w-14 h-14 rounded-full border-4 border-rose-600"
                    // src={testimonial}
                    src="https://i.ibb.co.com/W6HFrj7/image.png"
                    alt="Rahul Sen"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-rose-600">
                      Rahul Sen
                    </h3>
                    <p>Innovate IT, India</p>
                  </div>
                </div>
                <p>
                  This website doesn’t just report the news—it explains it! The
                  in-depth articles and editorials provide valuable insights
                  that I don’t find elsewhere.
                </p>
              </div>
            </li>
            <li className="w-1/4 border">
              <div className="shadow-custom lg:p-14 p-6 rounded-sm space-y-5">
                <div className="flex md:flex-row flex-col items-center gap-2">
                  <img
                    className="w-14 h-14 rounded-full border-4 border-rose-600"
                    // src={testimonial}
                    src="https://i.ibb.co.com/6HPwQVk/image.png"
                    alt="Rahul Sen"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-rose-600">
                      Ayesha Rahman
                    </h3>
                    <p>Innovate IT, India</p>
                  </div>
                </div>
                <p>
                  I love how mobile-friendly the website is! I can catch up on
                  the news during my commute without any hassle. The app
                  integration is a bonus too.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
