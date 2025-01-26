import { Accordion } from "flowbite-react";

const Faq = () => {
  return (
    <div className="w-11/12 mx-auto md:w-9/12 lg:w-3/5 my-14">
      {/* Faq
       */}
      <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-400 mb-8">
        FAQ
      </h2>

      <Accordion>
        {/* FAQ Question 1 */}
        <Accordion.Panel>
          <Accordion.Title>
            What is this newspaper website about?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Our website is a trusted source of the latest news, features, and
              in-depth articles across categories such as current events,
              sports, technology, business, and more.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        {/* FAQ Question 2 */}
        <Accordion.Panel>
          <Accordion.Title>How often is the website updated?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              The website is updated throughout the day to ensure you receive
              the most accurate and up-to-date news coverage.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        {/* FAQ Question 3 */}
        <Accordion.Panel>
          <Accordion.Title>
            Can I access premium articles without a subscription?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              While many of our articles are free, some premium articles require
              a subscription. You can easily subscribe to unlock full access.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        {/* FAQ Question 4 */}
        <Accordion.Panel>
          <Accordion.Title>
            How can I submit a news tip or story?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              We welcome news tips and stories! Please visit our "Contact Us"
              page or email us at{" "}
              <a
                href="mailto:contact@newspaper.com"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                contact@newspaper.com
              </a>
              .
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        {/* FAQ Question 5 */}
        <Accordion.Panel>
          <Accordion.Title>
            Do you have a mobile app for this newspaper?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Yes! You can download our mobile app from the Apple App Store or
              Google Play Store for quick access to news on the go.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default Faq;
