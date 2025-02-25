'use client';
import { motion } from 'framer-motion';
import Newslatter from '@/Components/Newslatter';
import Testimonials from '@/Components/Testimonials';
import Work from '@/Components/Work';
import React from 'react';
import Mesonary from '@/Components/Mesonary';
import { useRouter } from 'next/navigation';
import Image from 'next/image';  // ✅ Import optimized image handling

const Home = () => {
  const router = useRouter();
  
  return (
    <div className="bg-blue-400">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Hero Section - Start */}
        <div className="bg-blue-400 text-red-900 pb-2 sm:pb-8 lg:pb-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            {/* Hero Content */}
            <motion.section
              className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
            >
              <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
                <h1 className="mb-8 text-xl font-bold text-indigo-1800 sm:text-5xl md:mb-12 md:text-4xl">
                  Record Your Screen with RecPro
                </h1>
                <p className="mb-4 font-semibold text-black md:mb-6 md:text-lg xl:text-xl">
                  Create high-quality screen recordings with our intuitive tool
                </p>

                <p className="mb-8 leading-relaxed text-gray-1500 md:mb-12 lg:w-4/5 xl:text-lg">
                  RecPro is a simple and powerful screen recording tool that helps you create high-quality videos. Whether you&apos;re creating tutorials, demos, or presentations, our tool has got you covered.
                </p>
                <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                  <button
                    onClick={() => router.push("/record")}
                    className="inline-block rounded-lg bg-blue-900 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                    aria-label="Start screen recording capture"
                  >
                    Start Capture
                  </button>
                </div>
              </div>

              {/* Image Optimization */}
              <motion.div
                className="overflow-hidden relative rounded-lg bg-gray-100 shadow-lg xl:w-5/12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                {/* ✅ Using Next.js Image Optimization */}
                <Image
                  src="/homescreen.webp"  // Ensure it's in the public folder or use a proper path
                  width={602}  // Adjust dimensions as needed
                  height={500}
                  alt="RecPro Hero Image"
                  className="bg-cover bg-center object-cover object-center"
                  priority  // ✅ Load faster
                  layout="intrinsic"  // Ensuring that image size remains responsive
                />
              </motion.div>
            </motion.section>
          </div>
        </div>
        {/* Hero Section - End */}

        {/* Scroll-triggered Sections */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Work />
        </motion.div>

        <motion.div
          className="section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Mesonary />
        </motion.div>

        <motion.div
          className="section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Testimonials />
        </motion.div>

        {/* Optional Newsletter Section */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Newslatter />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
