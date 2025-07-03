import Link from 'next/link';
import { generateStaticPageMetadata } from '../../lib/seo';
import { StructuredDataScript } from '../../lib/seo/components';

// Professional SEO system will handle metadata
export const generateMetadata = async () => {
  return generateStaticPageMetadata(
    'Terms and Conditions',
    'Read the Terms and Conditions for using TechBlog Pro. Understand your rights, responsibilities, and our policies.'
  );
};

export default function TermsConditions() {
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
            <span>Terms & Conditions</span>
          </nav>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Last updated: June 26, 2025
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to TechBlog Pro. These terms and conditions outline the rules and regulations for the use of our website. 
              By accessing this website, you accept these terms and conditions in full.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                By accessing and using the TechBlog Pro website, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms and Conditions. If you do not agree with any part of these 
                terms, you must not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials on TechBlog Pro's website 
                for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
              <p className="text-gray-600 mb-6 leading-relaxed">
                This license shall automatically terminate if you violate any of these restrictions and may be 
                terminated by TechBlog Pro at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Safeguarding your password and account information</li>
                <li>All activities that occur under your account</li>
                <li>Immediately notifying us of any unauthorized use of your account</li>
                <li>Ensuring your account information remains accurate and up-to-date</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Content and Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                All content on TechBlog Pro, including text, graphics, logos, images, and software, is the property 
                of TechBlog Pro or its content suppliers and is protected by international copyright laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Generated Content</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                By submitting content to our website (comments, reviews, etc.), you grant TechBlog Pro a non-exclusive, 
                worldwide, royalty-free license to use, reproduce, and display such content. You represent that:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>You own or have the necessary rights to the content</li>
                <li>The content does not violate any third-party rights</li>
                <li>The content is accurate and not misleading</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prohibited Uses</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                You may not use our website for any of the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Reviews and Ratings</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our reviews and ratings are based on our independent testing and analysis. Please note:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Reviews reflect our opinions at the time of testing</li>
                <li>Product performance may vary under different conditions</li>
                <li>We may receive products for review from manufacturers</li>
                <li>Reviews are for informational purposes only</li>
                <li>We are not responsible for purchasing decisions based on our reviews</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Affiliate Links and Advertising</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                TechBlog Pro may contain affiliate links and advertising content:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>We may earn commissions from affiliate links</li>
                <li>Affiliate relationships do not influence our review opinions</li>
                <li>Sponsored content will be clearly marked</li>
                <li>We use Google AdSense and other advertising networks</li>
                <li>Third-party advertisers may use cookies to serve ads</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                TechBlog Pro excludes all representations, warranties, conditions, and terms (whether express or implied) 
                in relation to our website and the use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                In no event shall TechBlog Pro, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use 
                of the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Privacy Policy</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, 
                to understand our practices regarding the collection and use of your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We may terminate or suspend your account and bar access to the website immediately, without prior notice 
                or liability, under our sole discretion, for any reason whatsoever, including without limitation if you 
                breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the State of California, United States. 
                Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of California.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. 
                What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed 
                and interpreted to accomplish the objectives of such provision to the greatest extent possible under 
                applicable law and the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-2"><strong>Email:</strong> legal@techblogpro.com</p>
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
                href="/privacy-policy"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Privacy Policy
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
