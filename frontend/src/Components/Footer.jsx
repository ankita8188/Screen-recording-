import { IconBrandGithubFilled, IconBrandInstagramFilled, IconBrandLinkedinFilled } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <>
      {/* ========== FOOTER ========== */}
      <footer className="mt-auto w-full max-w-[88rem] py-10 px-2 sm:px-6 lg:px-8 mx-auto bg-white text-black">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
          <div className="col-span-full hidden lg:block">
            <a
              className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
              href="#"
              aria-label="screen recording"
            >
              Screen Recording
            </a>
            <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
              © 2024 screen capture
            </p>
          </div>
          {/* End Col */}

          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100 ml-[5rem]">
              Quick Links
            </h4>
            <div className="mt-3 grid space-y-3 text-sm ml-[5rem]">
              <Link href="/home" className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                Home
              </Link>
              <Link href="/features" className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                Features
              </Link>
              <Link href="/video" className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                Video
              </Link>
              <Link href="/audio" className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                Audio
              </Link>
              <Link href="/Record-manage" className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                Download
              </Link>
            </div>
          </div>
          {/* End Col */}

          <div className="ml-[10rem]">
            <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
              Resources
            </h4>
            <div className="mt-3 grid space-y-3 text-sm">
              <Link href="#" className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                Tutorials
              </Link>
              <Link href="#" className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                API
              </Link>
              <Link href="#" className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                Documentation
              </Link>
              <Link href="#" className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                Status
              </Link>
            </div>
          </div>
          {/* End Col */}

          <div className="ml-[12rem]">
            <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
              Developers
            </h4>
            <div className="mt-3 grid space-y-3 text-sm">
              <Link
                href="https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder"
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                API
              </Link>
              <Link href="#" className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                Status
              </Link>
              <Link
                href="https://github.com/ankita8188"
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                GitHub
              </Link>
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}

        {/* Social Links */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          {/* Social Icons */}
          <div className="space-x-4">
            <a
              className="inline-block text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200"
              href="https://www.linkedin.com/in/ankita-tiwari-00693b295/"
              aria-label="LinkedIn Profile"
            >
              <IconBrandLinkedinFilled className="inline-block" />
            </a>
            <a
              className="inline-block text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200"
              href="https://github.com/ankita8188"
              aria-label="GitHub Profile"
            >
              <IconBrandGithubFilled className="inline-block" />
            </a>
            <a
              className="inline-block text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200"
              href="#"
              aria-label="Instagram Profile"
            >
              <IconBrandInstagramFilled className="inline-block" />
            </a>
          </div>
          {/* End Social Icons */}
        </div>
      </footer>
      {/* ========== END FOOTER ========== */}
    </>
  );
};

export default Footer;
