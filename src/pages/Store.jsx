import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Sample data (replace with actual data from your API)
const featuredCourses = [
  {
    id: 1,
    title: "Web Development Masterclass",
    thumbnail: "/images/courses/web-dev.jpg",
    category: "Programming",
    price: "₹999"
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    thumbnail: "/images/courses/data-science.jpg",
    category: "Programming",
    price: "₹1299"
  },
  {
    id: 3,
    title: "Digital Marketing",
    thumbnail: "/images/courses/marketing.jpg",
    category: "Marketing",
    price: "₹799"
  },
  // Add more courses as needed
];

const categories = [
  {
    id: 1,
    name: "Programming",
    courses: [
      {
        id: 1,
        title: "Python for Beginners",
        thumbnail: "/images/courses/python.jpg",
        price: "₹699"
      },
      {
        id: 2,
        title: "JavaScript Advanced",
        thumbnail: "/images/courses/javascript.jpg",
        price: "₹899"
      },
      // Add more courses
    ]
  },
  {
    id: 2,
    name: "Technologies",
    courses: [
      {
        id: 3,
        title: "Cloud Computing",
        thumbnail: "/images/courses/cloud.jpg",
        price: "₹1299"
      },
      {
        id: 4,
        title: "DevOps Fundamentals",
        thumbnail: "/images/courses/devops.jpg",
        price: "₹1099"
      },
      // Add more courses
    ]
  },
  // Add more categories
];

// Add this function before the Store component
const filterCourses = (courses, query) => {
  if (!query) return courses;
  const searchTerm = query.toLowerCase();
  return courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm) ||
    course.category?.toLowerCase().includes(searchTerm)
  );
};

export default function Store() {
  const [searchQuery, setSearchQuery] = useState('');
  const carouselRefs = useRef({});

  // Add filtered courses logic
  const filteredFeaturedCourses = filterCourses(featuredCourses, searchQuery);
  const filteredCategories = categories.map(category => ({
    ...category,
    courses: filterCourses(category.courses, searchQuery)
  }));

  const scrollCarousel = (categoryId, direction) => {
    const carousel = carouselRefs.current[categoryId];
    if (carousel) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-magenta-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white"
            >
              LearnHub
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-2xl"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses..."
                  className="w-full px-6 py-3 pl-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Featured Courses Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Courses</h2>
          {filteredFeaturedCourses.length > 0 ? (
            <div className="relative">
              <button
                onClick={() => scrollCarousel('featured', 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              </button>

              <div
                ref={(el) => (carouselRefs.current['featured'] = el)}
                className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredFeaturedCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="min-w-[300px] sm:min-w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0 snap-center"
                  >
                    <div className="relative h-48 overflow-hidden group">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {course.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-2">
                        {course.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {course.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => scrollCarousel('featured', 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No featured courses found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.map((category) => (
            category.courses.length > 0 && (
              <div key={category.id} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h2>
                <div className="relative">
                  <button
                    onClick={() => scrollCarousel(category.id, 'left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                  </button>

                  <div
                    ref={(el) => (carouselRefs.current[category.id] = el)}
                    className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {category.courses.map((course) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="min-w-[250px] sm:min-w-[300px] bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 snap-center hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="relative h-40 overflow-hidden group">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                            {course.price}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-gray-900">
                            {course.title}
                          </h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollCarousel(category.id, 'right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )
          ))}
          {filteredCategories.every(category => category.courses.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No courses found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 