import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">📄</div>

        <h1 className="text-4xl font-bold text-emerald-700">
          Terms & Conditions
        </h1>

        <p className="mt-3 text-gray-500">
          Mehwar Digital Library
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border p-6 md:p-10 space-y-8">

        {/* 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            1. Acceptance of Terms
          </h2>

          <p className="text-gray-600 leading-7">
            By accessing and using Mehwar Digital Library, you agree to
            follow these Terms & Conditions. If you do not agree with
            these terms, please do not use the website.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            2. Use of the Website
          </h2>

          <p className="text-gray-600 leading-7">
            Mehwar Digital Library is provided for educational,
            informational, research, and lawful purposes. Users should
            use the website responsibly and should not attempt to
            damage, disrupt, or misuse the website or its services.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            3. Books and Digital Content
          </h2>

          <p className="text-gray-600 leading-7">
            The website provides access to digital books and educational
            resources. Users are responsible for using downloaded or
            viewed content in accordance with applicable copyright laws
            and the rights of the respective authors and publishers.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            4. Copyright
          </h2>

          <p className="text-gray-600 leading-7">
            Mehwar Digital Library does not claim ownership of content
            belonging to third-party authors, publishers, or copyright
            holders unless explicitly stated. If you believe that any
            material on the website infringes your copyright, please
            contact us with the relevant details for review.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            5. Downloads
          </h2>

          <p className="text-gray-600 leading-7">
            Downloaded materials should be used only for lawful and
            appropriate purposes. Users should not redistribute,
            commercially exploit, or modify copyrighted material in
            violation of applicable laws or the rights of copyright
            holders.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            6. User Conduct
          </h2>

          <p className="text-gray-600 leading-7">
            Users must not attempt unauthorized access, interfere with
            the operation of the website, introduce malicious software,
            or use the website for unlawful activities.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            7. Administrator Access
          </h2>

          <p className="text-gray-600 leading-7">
            Administrative features are restricted to authorized
            administrators. Unauthorized attempts to access or modify
            administrative functions are prohibited.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            8. Availability of the Website
          </h2>

          <p className="text-gray-600 leading-7">
            We aim to keep the website available and functional, but
            continuous or uninterrupted availability cannot be
            guaranteed. Maintenance, technical issues, or third-party
            service interruptions may temporarily affect the website.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            9. Changes to These Terms
          </h2>

          <p className="text-gray-600 leading-7">
            These Terms & Conditions may be updated from time to time.
            Any changes will be published on this page. Continued use
            of the website after changes means that you accept the
            updated terms.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            10. Contact
          </h2>

          <p className="text-gray-600 leading-7">
            If you have questions regarding these Terms & Conditions,
            please contact us through the Contact page.
          </p>
        </section>

        {/* Back Button */}
        <div className="pt-4 border-t">
          <Link
            to="/"
            className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            🏠 Back to Home
          </Link>
        </div>

      </div>

    </div>
  );
}