import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Sample course data (replace with actual data from your API)
const popularCourses = [
  {
    id: 1,
    title: "Web Development Masterclass",
    description: "Learn full-stack web development from scratch",
    thumbnail: "/images/courses/web-dev.jpg",
    price: "₹999"
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description: "Master the basics of data analysis",
    thumbnail: "/images/courses/data-science.jpg",
    price: "₹1299"
  },
  {
    id: 3,
    title: "Digital Marketing",
    description: "Comprehensive guide to online marketing",
    thumbnail: "/images/courses/marketing.jpg",
    price: "₹799"
  },
  // Add more courses as needed
];

// Add testimonials data after popularCourses
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Software Developer",
    image: "/images/testimonials/sarah.jpg",
    text: "The courses here have transformed my career. The quality of instruction and practical approach to learning is unmatched."
  },
  {
    id: 2,
    name: "Michael Chen",
    designation: "Data Scientist",
    image: "/images/testimonials/michael.jpg",
    text: "I've taken multiple data science courses, and they've all been excellent. The instructors are knowledgeable and supportive."
  },
  {
    id: 3,
    name: "Priya Patel",
    designation: "Digital Marketer",
    image: "/images/testimonials/priya.jpg",
    text: "The digital marketing course helped me stay ahead in my field. The content is always up-to-date with industry trends."
  }
];

// Add after testimonials array
const offerings = [
  {
    id: 1,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of experience",
    icon: (
      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to courses",
    icon: (
      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Project-Based Learning",
    description: "Apply your knowledge through hands-on projects",
    icon: (
      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Career Support",
    description: "Get guidance and support to advance your career",
    icon: (
      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

const achievements = [
  { id: 1, number: 50000, label: "Students", suffix: "+" },
  { id: 2, number: 200, label: "Courses", suffix: "+" },
  { id: 3, number: 95, label: "Satisfaction Rate", suffix: "%" },
  { id: 4, number: 4.8, label: "Average Rating", suffix: "", decimals: 1 }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [counters, setCounters] = useState(achievements.map(a => ({ ...a, current: 0 })));

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  // Add autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Add counter animation function
  const animateCounter = useCallback((index, start, end, duration) => {
    const startTime = Date.now();
    const decimals = achievements[index].decimals || 0;
    
    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      if (progress < 1) {
        const value = start + (end - start) * progress;
        setCounters(prev => prev.map((counter, i) => 
          i === index ? { ...counter, current: Number(value.toFixed(decimals)) } : counter
        ));
        requestAnimationFrame(updateCounter);
      } else {
        setCounters(prev => prev.map((counter, i) => 
          i === index ? { ...counter, current: end } : counter
        ));
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, []);

  // Add counter animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          achievements.forEach((achievement, index) => {
            animateCounter(index, 0, achievement.number, 2000);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const element = document.getElementById('achievements');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [animateCounter]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/hero-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px)',
            opacity: '0.2'
          }}
        />

        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                Unlock Your Learning
                <span className="block text-primary-600">Potential Today</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
                Discover a world of knowledge with our expert-led courses. 
                Start your learning journey today and transform your future.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-primary-700 transition-all duration-300"
                >
                  Get Started
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-full font-semibold text-lg hover:bg-primary-50 transition-all duration-300"
                >
                  Browse Courses
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img 
                src="/images/heroimage.jpg" 
                alt="Learning Illustration"
                width={1340}
                height={400}
                className="w-[1340px] h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Learn Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to learn online
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Start, switch, or advance your career with our courses, certificates, and degrees.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Expert Instructors
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Learn from industry professionals with years of experience.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  High-Quality Content
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Access professionally produced video content in HD quality.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Flexible Learning
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Learn at your own pace, anytime, anywhere.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Popular Picks Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Picks
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most sought-after courses and start learning today
            </p>
          </div>

          {/* Course Carousel */}
          <div className="relative">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
            >
              <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
            </button>

            {/* Course Slider */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {popularCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-w-[300px] sm:min-w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0 snap-center"
                >
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.price}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {course.description}
                    </p>
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
            >
              <ChevronRightIcon className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 opacity-50" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("/images/pattern.svg")',
          opacity: '0.1'
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our community of learners about their experience
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Testimonials Slider */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div 
                      key={testimonial.id}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
                      >
                        <div className="flex items-center mb-6">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {testimonial.name}
                            </h3>
                            <p className="text-gray-600">
                              {testimonial.designation}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          "{testimonial.text}"
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index
                        ? 'bg-primary-600 w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer & Achievements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* What We Offer */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What We Offer
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover why thousands of students choose us for their learning journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {offerings.map((offering) => (
                <motion.div
                  key={offering.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-primary-50 rounded-lg p-3 inline-block mb-4">
                    {offering.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {offering.title}
                  </h3>
                  <p className="text-gray-600">
                    {offering.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Our Achievements */}
          <div id="achievements" className="bg-primary-900 rounded-3xl py-16 px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Achievements
              </h2>
              <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {counters.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {achievement.current}
                    {achievement.suffix}
                  </div>
                  <div className="text-primary-200 text-lg">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* We'll add the Footer section next */}
    </div>
  );
}
