"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import PulsingCircle from "@/components/pulsing-circle"
import Image from "next/image"

export default function AboutPage() {
  return (
    <ShaderBackground>
      <Header />
      <PulsingCircle />
      <div className="relative z-20 min-h-screen pt-32 pb-16">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-medium italic instrument text-white mb-4">
              About Our Club
            </h1>
            <p className="text-xl text-white/80 font-light">
              Empowering women through community, education, and advocacy.
            </p>
          </div>

          {/* Our Mission Section */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-medium text-white mb-6 instrument italic">
                  Our Mission
                </h2>
                <p className="text-lg text-white/90 leading-relaxed poppins">
                  We believe in a world where all women have equal opportunities to thrive, lead, and make their voices heard.
                </p>
                <p className="text-lg text-white/90 leading-relaxed poppins">
                  Our club is dedicated to empowering women through education, mentorship, and community support. We create spaces where women can share their stories, develop their skills, and build meaningful connections.
                </p>
                <p className="text-lg text-white/90 leading-relaxed poppins">
                  Through our blog, events, and initiatives, we aim to inspire and uplift women from all walks of life, celebrating their achievements and advocating for gender equality.
                </p>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl h-80 lg:h-96">
                  <Image
                    src="/wec-about-2.jpg"
                    alt="Women empowerment activities"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Our Story Section */}
          <div>
            <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
              <div className="relative lg:order-1">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl h-80 lg:h-96">
                  <Image
                    src="/wec-about-1.jpg"
                    alt="WEC founding members and early activities"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="space-y-6 lg:order-2 lg:text-right">
                <h2 className="text-3xl md:text-4xl font-medium text-white mb-6 instrument italic">
                  Our Story
                </h2>
                <p className="text-lg text-white/90 leading-relaxed poppins">
                  Founded in 2016 by a group of passionate students from PEC Chandigarh who recognized the need for a supportive community, our club has grown from a small gathering to a thriving network of diverse individuals.
                </p>
                <p className="text-lg text-white/90 leading-relaxed poppins">
                  What started as informal general body meetings evolved into structured workshops, mentorship programs, and this blog platform where we share stories that inspire and empower.
                </p>
                <p className="text-lg text-white/90 leading-relaxed poppins">
                  Today, we continue to expand our reach and impact, connecting women across different backgrounds, professions, and experiences through the power of storytelling and community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShaderBackground>
  )
}
