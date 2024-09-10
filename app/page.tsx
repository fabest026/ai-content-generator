"use client"; // This tells Next.js to treat this component as a client-side component

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegFileAlt, FaCogs, FaUsers, FaLifeRing } from 'react-icons/fa'; // Importing icons from react-icons


const HomePage = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-between">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white shadow-md py-4"
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            <Image src="/logoo.svg" alt="logo" width={120} height={50} />
          </div>
          <div>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-[#592564] text-white px-4 py-2 rounded-lg hover:bg-[#a047b2] transition-all"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="container mx-auto text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-5xl font-bold text-gray-800"
        >
          AI Content <span className="text-[#a047b2]">Generator</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mt-6 text-xl text-gray-600"
        >
          Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
        </motion.p>

        {/* Get Started Button */}
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-8 bg-[#592564] text-white px-6 py-3 rounded-lg hover:bg-[#a047b2] transition-all"
          >
            Get Started
          </motion.button>
        </Link>
      </section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="bg-gray-100 py-20"
      >
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
          {/* Feature Item 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white rounded-lg shadow-md"
          >
            <FaRegFileAlt size={50} className="mx-auto text-[#a047b2]" />
            <h3 className="text-xl font-bold mt-4">25+ Templates</h3>
            <p className="text-gray-600 mt-2">
              Responsive, and mobile-first project on the web.
            </p>
            <Link href="/learn-more">
              <p className="text-[#a047b2] mt-4">Learn more →</p>
            </Link>
          </motion.div>

          {/* Feature Item 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white rounded-lg shadow-md"
          >
            <FaCogs size={50} className="mx-auto text-[#a047b2]" />
            <h3 className="text-xl font-bold mt-4">Customizable</h3>
            <p className="text-gray-600 mt-2">
              Components are easily customized and extendable.
            </p>
            <Link href="/learn-more">
              <p className="text-[#a047b2] mt-4">Learn more →</p>
            </Link>
          </motion.div>

          {/* Feature Item 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white rounded-lg shadow-md"
          >
            <FaUsers size={50} className="mx-auto text-[#a047b2]" />
            <h3 className="text-xl font-bold mt-4">Free to Use</h3>
            <p className="text-gray-600 mt-2">
              Every component and plugin is well documented.
            </p>
            <Link href="/learn-more">
              <p className="text-[#a047b2] mt-4">Learn more →</p>
            </Link>
          </motion.div>

          {/* Feature Item 4 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white rounded-lg shadow-md"
          >
            <FaLifeRing size={50} className="mx-auto text-[#a047b2]" />
            <h3 className="text-xl font-bold mt-4">24/7 Support</h3>
            <p className="text-gray-600 mt-2">
              Contact us 24 hours a day, 7 days a week.
            </p>
            <Link href="/learn-more">
              <p className="text-[#a047b2] mt-4">Learn more →</p>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
