'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Zap } from 'lucide-react';

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "General inquiries and feedback",
      contact: "info@techblogpro.com",
      action: "mailto:info@techblogpro.com"
    },
    {
      icon: MessageCircle,
      title: "Press Inquiries",
      description: "Media relations and press kit",
      contact: "press@techblogpro.com", 
      action: "mailto:press@techblogpro.com"
    },
    {
      icon: Users,
      title: "Partnerships",
      description: "Brand collaborations and sponsorships",
      contact: "partnerships@techblogpro.com",
      action: "mailto:partnerships@techblogpro.com"
    },
    {
      icon: Zap,
      title: "Product Reviews",
      description: "Submit products for review consideration",
      contact: "reviews@techblogpro.com",
      action: "mailto:reviews@techblogpro.com"
    }
  ];

  const officeInfo = {
    address: "123 Tech Street, Silicon Valley, CA 94041",
    phone: "+1 (555) 123-4567",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM PST"
  };

  const faqs = [
    {
      question: "How do you choose products to review?",
      answer: "We select products based on reader interest, market impact, innovation, and availability for testing. We prioritize products that our audience is most curious about."
    },
    {
      question: "Do you accept products for review?",
      answer: "Yes, we accept review units from manufacturers and PR agencies. However, accepting a product doesn't guarantee a review, and all reviews remain completely unbiased."
    },
    {
      question: "How long does a typical review take?",
      answer: "Our review process typically takes 2-4 weeks, depending on the product category. We believe in thorough testing to provide the most accurate assessment."
    },
    {
      question: "Can I advertise on your website?",
      answer: "We offer various advertising opportunities. Please contact our partnerships team for detailed information about advertising packages and rates."
    },
    {
      question: "How can I stay updated with your latest content?",
      answer: "Subscribe to our newsletter, follow us on social media, or enable browser notifications. We also have RSS feeds available for all our categories."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">&gt;</span>
            <span>Contact</span>
          </nav>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Have a question, feedback, or want to collaborate? We'd love to hear from you. 
              Our team is here to help and always excited to connect with fellow tech enthusiasts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="review">Product Review Request</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="press">Press Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="technical">Technical Issue</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                    Subscribe me to the newsletter for latest tech updates
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="mr-2" size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600 text-sm">{officeInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600 text-sm">{officeInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Office Hours</p>
                    <p className="text-gray-600 text-sm">{officeInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Methods */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Quick Contact
              </h3>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.action}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <IconComponent className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-blue-900">
                          {method.title}
                        </p>
                        <p className="text-gray-600 text-sm mb-1">
                          {method.description}
                        </p>
                        <p className="text-blue-600 text-sm font-medium">
                          {method.contact}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our review process, partnerships, and more.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="mb-16">
          <div className="bg-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Response Time
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We typically respond to all inquiries within 24-48 hours during business days. 
              For urgent matters, please call our office directly. Product review requests 
              may take longer to process due to our thorough evaluation process.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
