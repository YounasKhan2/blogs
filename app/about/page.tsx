'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Users, Award, Target, Heart, Mail, Linkedin, Twitter } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: "John Smith",
      role: "Founder & Mobile Expert",
      image: "/api/placeholder/300/300",
      bio: "10+ years in mobile technology journalism. Former editor at TechCrunch and The Verge.",
      social: {
        twitter: "@johnsmith_tech",
        linkedin: "johnsmith-tech"
      },
      expertise: ["Smartphones", "Mobile Apps", "5G Technology"]
    },
    {
      name: "Sarah Johnson",
      role: "Laptop & Computing Specialist",
      image: "/api/placeholder/300/300",
      bio: "Computer science background with expertise in laptop reviews and performance testing.",
      social: {
        twitter: "@sarah_tech",
        linkedin: "sarahjohnson-tech"
      },
      expertise: ["Laptops", "PC Hardware", "Performance Testing"]
    },
    {
      name: "Mike Chen",
      role: "AI & Software Analyst",
      image: "/api/placeholder/300/300",
      bio: "AI researcher turned tech journalist, specializing in artificial intelligence and software reviews.",
      social: {
        twitter: "@mikechen_ai",
        linkedin: "mikechen-ai"
      },
      expertise: ["Artificial Intelligence", "Software Development", "Machine Learning"]
    },
    {
      name: "Lisa Brown",
      role: "Photography & Creative Tech",
      image: "/api/placeholder/300/300",
      bio: "Professional photographer with deep knowledge of camera technology and creative software.",
      social: {
        twitter: "@lisa_photo",
        linkedin: "lisabrown-photo"
      },
      expertise: ["Camera Technology", "Photo Editing", "Creative Software"]
    }
  ];

  const stats = [
    { number: "500+", label: "Reviews Published", icon: Award },
    { number: "2M+", label: "Monthly Readers", icon: Users },
    { number: "50K+", label: "Newsletter Subscribers", icon: Mail },
    { number: "4.8/5", label: "Reader Satisfaction", icon: Heart }
  ];

  const values = [
    {
      title: "Honest Reviews",
      description: "We provide unbiased, honest reviews based on extensive testing and real-world usage.",
      icon: Target
    },
    {
      title: "Expert Analysis",
      description: "Our team consists of technology experts with years of experience in their respective fields.",
      icon: Award
    },
    {
      title: "Consumer Focus",
      description: "Every review is written with the consumer in mind, helping you make informed decisions.",
      icon: Users
    },
    {
      title: "Continuous Learning",
      description: "We stay updated with the latest technology trends to provide you with current information.",
      icon: Heart
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
            <span>About Us</span>
          </nav>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About TechBlog Pro
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              We're passionate tech enthusiasts dedicated to providing honest, in-depth reviews 
              and analysis to help you make informed technology decisions.
            </p>
          </div>
        </div>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-blue-600" size={32} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                In a world flooded with technology products, we believe everyone deserves access to 
                honest, comprehensive reviews that cut through the marketing noise. Our mission is to 
                test, analyze, and review technology products with complete transparency, helping you 
                make confident purchasing decisions.
              </p>
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-xl font-semibold text-blue-900 italic">
                  "Technology should enhance your life, not complicate it. We're here to guide you 
                  to the right choices."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at TechBlog Pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our diverse team of technology experts brings decades of combined experience 
              in testing and reviewing tech products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Our Story
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2020 - The Beginning</h3>
                    <p className="text-gray-600">
                      Founded by John Smith with a simple mission: provide honest tech reviews 
                      in an increasingly cluttered digital landscape.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2021 - Team Expansion</h3>
                    <p className="text-gray-600">
                      Added specialized experts in laptops, AI, and photography to provide 
                      comprehensive coverage across all tech categories.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2023 - Recognition</h3>
                    <p className="text-gray-600">
                      Recognized as one of the top tech review sites, reaching over 1 million 
                      monthly readers and building a community of tech enthusiasts.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2025 - Today</h3>
                    <p className="text-gray-600">
                      Continuing to evolve with the latest technology trends, expanding our 
                      coverage to include AI tools, emerging tech, and sustainable technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of our growing community of tech enthusiasts. Get the latest reviews, 
              participate in discussions, and help shape the future of technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/newsletter"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Subscribe to Newsletter
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
