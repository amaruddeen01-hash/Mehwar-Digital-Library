import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🔒</div>

        <h1 className="text-4xl font-bold text-emerald-700">
          Privacy Policy
        </h1>

        <p className="mt-3 text-gray-500">
          Mehwar Digital Library
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border p-6 md:p-10 space-y-8">

        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            1. Introduction
          </h2>

          <p className="text-gray-600 leading-7">
            Welcome to Mehwar Digital Library. We respect the privacy of
            our visitors and are committed to protecting information
            provided while using our website.
          </p>
        </section>

        {/* Information */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            2. Information We Collect
          </h2>

          <p className="text-gray-600 leading-7">
            Mehwar Digital Library may collect limited information
            necessary to provide and improve its services. This may
            include information related to account authentication,
            website usage, and technical information required for
            the proper functioning of the website.
          </p>
        </section>

        {/* Account */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            3. Account Information
          </h2>

          <p className="text-gray-600 leading-7">
            Administrative accounts are used to manage the digital
            library. Login credentials should be kept confidential and
            should not be shared with others.
          </p>
        </section>

        {/* Books */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            4. Books and Content
          </h2>

          <p className="text-gray-600 leading-7">
            The library provides access to digital books and educational
            resources. Content may be provided for educational,
            informational, and research purposes. If you believe that
            any content infringes your rights, please contact us so
            that the matter can be reviewed.
          </p>
        </section>

        {/* Local Storage */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            5. Local Storage
          </h2>

          <p className="text-gray-600 leading-7">
            The website may use browser local storage for features such
            as favorites and reading preferences. This information is
            stored in your browser and helps provide a better reading
            experience.
          </p>
        </section>

        {/* Security */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            6. Data Security
          </h2>

          <p className="text-gray-600 leading-7">
            We take reasonable steps to protect the information used by
            the website. However, no online service can guarantee
            absolute security.
          </p>
        </section>

        {/* Third Party */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            7. Third-Party Services
          </h2>

          <p className="text-gray-600 leading-7">
            Mehwar Digital Library may use third-party services such as
            Firebase for authentication and database functionality.
            These services operate according to their own privacy
            policies and terms.
          </p>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            8. Changes to This Policy
          </h2>

          <p className="text-gray-600 leading-7">
            This Privacy Policy may be updated from time to time.
            Changes will be reflected on this page.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            9. Contact
          </h2>

          <p className="text-gray-600 leading-7">
            If you have questions or concerns regarding this Privacy
            Policy, please contact us through the Contact page.
          </p>
        </section>

        {/* Back */}
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