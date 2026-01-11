import { ReactElement } from "react";

const PrivacyPolicy = (): ReactElement => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-200">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">
        Last updated: January 10, 2026
      </p>

      <section className="space-y-6">
        <p>
          This Privacy Policy explains how we collect, use, disclose, and
          protect your information when you use our application and related
          services (the “Service”). By using the Service, you agree to the
          collection and use of information in accordance with this policy.
        </p>

        <h2 className="text-xl font-semibold">1. Information We Collect</h2>

        <h3 className="font-semibold">1.1 Personal Information</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Email address</li>
          <li>Name or username</li>
          <li>Authentication data (such as OTP or login tokens)</li>
        </ul>

        <h3 className="font-semibold">1.2 Usage Data</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Device type and operating system</li>
          <li>Browser type and version</li>
          <li>IP address</li>
          <li>Pages visited and actions taken</li>
          <li>Date and time of access</li>
        </ul>

        <h3 className="font-semibold">1.3 Cookies and Tracking</h3>
        <p>
          We may use cookies or similar technologies to maintain sessions,
          improve performance, and analyze usage patterns.
        </p>

        <h2 className="text-xl font-semibold">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Provide and maintain the Service</li>
          <li>Authentication and security (OTP)</li>
          <li>Improve and optimize the Service</li>
          <li>Communicate important updates</li>
          <li>Prevent fraud and abuse</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Sharing of Information</h2>
        <p>
          We do not sell your personal information. We may share data only with
          trusted service providers, for legal requirements, or during business
          transfers.
        </p>

        <h2 className="text-xl font-semibold">4. Data Security</h2>
        <p>
          We use reasonable security measures to protect your data. However, no
          system is completely secure.
        </p>

        <h2 className="text-xl font-semibold">5. Data Retention</h2>
        <p>
          We retain personal data only as long as necessary to fulfill the
          purposes described in this policy.
        </p>

        <h2 className="text-xl font-semibold">6. Your Rights</h2>
        <p>
          You may request access, correction, or deletion of your data, or
          restrict processing where applicable.
        </p>

        <h2 className="text-xl font-semibold">7. Children’s Privacy</h2>
        <p>
          The Service is not intended for children under the age of 13, and we
          do not knowingly collect data from them.
        </p>

        <h2 className="text-xl font-semibold">8. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Continued use of the
          Service means you accept the changes.
        </p>

        <h2 className="text-xl font-semibold">9. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at:
          <br />
          <span className="font-medium">cool69731@gmail.com</span>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
