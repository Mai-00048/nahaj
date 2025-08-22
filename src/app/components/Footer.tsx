"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">رؤية 2030</h3>
            <p className="text-gray-400">
              نسعى لبناء وطن ينعم أبناؤه بالرفاهية والازدهار، في مجتمع حيوي واقتصادي مزدهر.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition duration-300">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/#goals" className="hover:text-white transition duration-300">
                  أهداف الرؤية
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-white transition duration-300">
                  مشاريع الرؤية
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition duration-300">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">اتصل بنا</h3>
            <address className="not-italic text-gray-400">
              <p>الرياض، المملكة العربية السعودية</p>
              <p className="mt-2">البريد الإلكتروني: info@vision2030.gov.sa</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} رؤية 2030. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <span className="sr-only">تويتر</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 
                  0-.178 0-.355-.012-.53A8.348 8.348 0 0022 
                  5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 
                  0 001.804-2.27 8.224 8.224 0 01-2.605.996 
                  4.107 4.107 0 00-6.993 3.743 11.65 11.65 
                  0 01-8.457-4.287 4.106 4.106 0 
                  001.27 5.477A4.072 4.072 0 012.8 
                  9.713v.052a4.105 4.105 0 003.292 
                  4.022 4.095 4.095 0 01-1.853.07 
                  4.108 4.108 0 003.834 2.85A8.233 
                  8.233 0 012 18.407a11.616 11.616 
                  0 006.29 1.84" 
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
