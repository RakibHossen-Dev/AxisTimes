import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold text-center mb-6">About AxisTimes</h1>
      <p className="text-lg text-center mb-8">
        Your trusted source for the latest news, insightful analysis, and
        compelling stories from around the world.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
        <p className="text-md">
          AxisTimes is a modern digital newspaper committed to delivering
          unbiased, factual, and high-quality journalism. Our team of dedicated
          reporters and analysts cover topics ranging from politics, business,
          technology, health, entertainment, and global affairs to keep you
          informed.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-md">
          Our mission is to provide credible, well-researched, and real-time
          news updates to our readers. We believe in transparency, integrity,
          and the power of well-informed citizens in shaping a better world.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Why Choose AxisTimes?</h2>
        <ul className="list-disc list-inside text-md space-y-2">
          <li>Accurate and up-to-date news coverage</li>
          <li>In-depth analysis and expert opinions</li>
          <li>Diverse topics covering all aspects of life</li>
          <li>Commitment to ethical journalism</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p className="text-md">
          We value our readers and their feedback. If you have any questions,
          suggestions, or concerns, feel free to reach out to us at:
        </p>
        <p className="mt-2 font-semibold">
          Email:{" "}
          <a
            href="mailto:contact@axistimes.com"
            className="text-blue-500 dark:text-blue-400"
          >
            contact@axistimes.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default About;
