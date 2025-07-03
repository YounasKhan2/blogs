import Link from 'next/link';
import { generateStaticPageMetadata } from '../../lib/seo';
import { StructuredDataScript } from '../../lib/seo/components';

// Professional SEO system will handle metadata
export const generateMetadata = async () => {
  return generateStaticPageMetadata(
    'Privacy Policy',
    'Read the Privacy Policy for TechBlog Pro. Learn how we collect, use, and protect your personal information.'
  );
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* SEO Structured Data */}
      <StructuredDataScript schemas={[
        { type: 'organization', data: {} },
        { type: 'website', data: {} }
      ]} />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">&gt;</span>
            <span>Privacy Policy</span>
          </nav>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Last updated: June 26, 2025
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              At TechBlog Pro, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We may collect personal information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Name and email address when you subscribe to our newsletter</li>
                <li>Contact information when you reach out to us through our contact forms</li>
                <li>Comments and feedback you provide on our articles</li>
                <li>Account information if you create an account on our website</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We automatically collect certain information when you visit our website, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>IP address and location information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
                <li>Device information (mobile, desktop, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>To provide and improve our website and services</li>
                <li>To send you newsletters and updates (with your consent)</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To analyze website usage and improve user experience</li>
                <li>To detect and prevent fraud or abuse</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>With service providers who assist us in operating our website</li>
                <li>When required by law or to protect our rights</li>
                <li>In the event of a business transfer or merger</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                These cookies are necessary for the website to function and cannot be switched off in our systems.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use Google Analytics to understand how visitors interact with our website and improve our content.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advertising Cookies</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We may use advertising cookies to display relevant ads and measure their effectiveness.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Staff training on data protection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Access: Request a copy of the personal information we hold about you</li>
                <li>Correction: Request correction of inaccurate or incomplete information</li>
                <li>Deletion: Request deletion of your personal information</li>
                <li>Opt-out: Unsubscribe from our newsletters at any time</li>
                <li>Data portability: Request your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Services</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our website may contain links to third-party websites and services:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Google AdSense for advertising</li>
                <li>Social media platforms for sharing content</li>
                <li>Email service providers for newsletters</li>
              </ul>
              <p className="text-gray-600 mb-6 leading-relaxed">
                These services have their own privacy policies, and we are not responsible for their practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If we become aware that we have collected 
                personal information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure that such transfers are conducted in accordance with applicable data protection laws 
                and with appropriate safeguards in place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage 
                you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-2"><strong>Email:</strong> privacy@techblogpro.com</p>
                <p className="text-gray-600 mb-2"><strong>Address:</strong> 123 Tech Street, Silicon Valley, CA 94041</p>
                <p className="text-gray-600"><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </section>

          </div>
        </div>

        {/* Related Links */}
        <div className="max-w-4xl mx-auto mt-8 mb-16">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/terms-conditions"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/cookie-policy"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Cookie Policy
              </Link>
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
