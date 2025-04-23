import { Link } from 'react-router-dom'

export default function CourseCard({ course }) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={course.thumbnail_url || 'https://via.placeholder.com/800x600?text=Course+Thumbnail'}
          alt={course.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/course/${course.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {course.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{course.instructor}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">₹{course.price}</p>
      </div>
      <div className="mt-2">
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <svg
                key={rating}
                className={`h-4 w-4 flex-shrink-0 ${
                  rating < Math.floor(course.rating || 0)
                    ? 'text-yellow-400'
                    : 'text-gray-200'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
          <p className="ml-2 text-sm text-gray-500">
            {course.rating?.toFixed(1) || 'No ratings'} ({course.reviews_count || 0} reviews)
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {course.enrolled_count || 0} students enrolled
        </div>
      </div>
    </div>
  )
} 