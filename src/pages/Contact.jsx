import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">📞</div>

        <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700">
          Contact Us
        </h1>

        <p className="mt-3 text-gray-600">
          Mehwar Digital Library se rabta karne ke liye neeche di gayi
          details ka istemal karein.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-8">

          <h2 className="text-2xl font-bold text-emerald-700 mb-6">
            📚 Contact Information
          </h2>

          <div className="space-y-5">

            {/* Name */}
            <div className="flex gap-4 items-start">
              <div className="text-2xl">👤</div>

              <div>
                <p className="font-semibold text-gray-800">
                  Name / Organization
                </p>

                <p className="text-gray-600 mt-1">
                  MUFTI AMRUDDIN MEHWAR MANZARI
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 items-start">
              <div className="text-2xl">📱</div>

              <div>
                <p className="font-semibold text-gray-800">
                  Mobile / WhatsApp
                </p>

                <a
                  href="tel:+918449316962"
                  className="text-emerald-700 hover:text-emerald-900 font-medium mt-1 inline-block"
                >
                  +91 84493 16962
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex gap-4 items-start">
              <div className="text-2xl">💬</div>

              <div>
                <p className="font-semibold text-gray-800">
                  WhatsApp
                </p>

                <a
                  href="https://wa.me/918449316962"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:text-emerald-900 font-medium mt-1 inline-block"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 items-start">
              <div className="text-2xl">📧</div>

              <div className="min-w-0">
                <p className="font-semibold text-gray-800">
                  Email
                </p>

                <a
                  href="mailto:amruddinmahwar@gmail.com"
                  className="text-emerald-700 hover:text-emerald-900 font-medium mt-1 inline-block break-all"
                >
                  amruddinmahwar@gmail.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4 items-start">
              <div className="text-2xl">📍</div>

              <div>
                <p className="font-semibold text-gray-800">
                  Address
                </p>

                <p className="text-gray-600 mt-1 leading-6">
                  Gher Rahmat Khan Gujartola,
                  <br />
                  Rampur, Uttar Pradesh
                  <br />
                  PIN: 244901
                </p>
              </div>
            </div>

            {/* Timing */}
            <div className="flex gap-4 items-start">
              <div className="text-2xl">🕐</div>

              <div>
                <p className="font-semibold text-gray-800">
                  Contact Timing
                </p>

                <p className="text-gray-600 mt-1">
                  10:00 AM – 6:00 PM
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 sm:p-8">

          <h2 className="text-2xl font-bold text-emerald-700 mb-4">
            💬 Get in Touch
          </h2>

          <p className="text-gray-600 leading-7">
            Agar aapko Mehwar Digital Library ki books, website,
            content ya kisi technical masle ke baare mein maloomat
            chahiye to humse rabta kar sakte hain.
          </p>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/918449316962"
            target="_blank"
            rel="noreferrer"
            className="block text-center bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-5 rounded-xl mt-8 transition"
          >
            💬 Contact on WhatsApp
          </a>

          {/* Email Button */}
          <a
            href="mailto:amruddinmahwar@gmail.com"
            className="block text-center bg-white hover:bg-gray-100 text-emerald-700 border border-emerald-300 font-semibold py-3 px-5 rounded-xl mt-4 transition"
          >
            📧 Send Email
          </a>

          {/* Home */}
          <Link
            to="/"
            className="block text-center text-emerald-700 hover:text-emerald-900 font-semibold mt-6"
          >
            🏠 Back to Home
          </Link>

        </div>

      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-white border rounded-2xl p-5 text-sm text-gray-500 text-center">
        Mehwar Digital Library ka maqsad Islamic aur educational
        knowledge ko digital form mein asaan access provide karna hai.
      </div>

    </div>
  );
}