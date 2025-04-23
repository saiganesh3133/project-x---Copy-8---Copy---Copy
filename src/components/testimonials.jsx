// Testimonials.jsx
import React from "react";

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">What Our Students Say</h2>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
          <p className="text-gray-700 italic">“This platform helped me ace my exams!”</p>
          <h4 className="font-bold mt-4">- John Doe</h4>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
          <p className="text-gray-700 italic">“Amazing courses with great content.”</p>
          <h4 className="font-bold mt-4">- Jane Smith</h4>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;