// Achievements.jsx
import React from "react";

const Achievements = () => {
  return (
    <section className="py-16 text-center bg-white">
      <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
      <div className="flex justify-center gap-10">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-blue-600">10K+</h3>
          <p className="text-gray-600">Students Enrolled</p>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-bold text-blue-600">500+</h3>
          <p className="text-gray-600">Courses Available</p>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
