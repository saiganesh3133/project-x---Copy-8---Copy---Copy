import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'
import { courses as coursesApi } from '../api'
import { useAuth } from '../hooks/useAuth'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await coursesApi.getById(id)
        setCourse(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch course:', error)
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id])

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      await coursesApi.enroll(id)
      toast.success('Successfully enrolled in the course!')
      const response = await coursesApi.getById(id)
      setCourse(response.data)
    } catch (error) {
      if (error.response?.status === 403) {
        navigate('/subscribe')
      } else {
        toast.error(error.response?.data?.error || 'Failed to enroll in course')
      }
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }

    try {
      await coursesApi.review(id, {
        rating: userRating,
        comment: reviewComment,
      })
      toast.success('Review submitted successfully!')
      const response = await coursesApi.getById(id)
      setCourse(response.data)
      setUserRating(0)
      setReviewComment('')
    } catch (error) {
      toast.error('Failed to submit review')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Course details */}
          <div className="lg:max-w-lg">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{course.title}</h1>
            <div className="mt-4">
              <h2 className="sr-only">Course information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${course.price}</p>
            </div>

            <div className="mt-4">
              <h2 className="sr-only">Course description</h2>
              <p className="text-base text-gray-700">{course.description}</p>
            </div>

            <div className="mt-6">
              <button
                onClick={handleEnroll}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Enroll Now
              </button>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Reviews</h2>

            {/* Review form */}
            <div className="mt-4">
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <div className="mt-1 flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          userRating >= rating ? 'text-yellow-400' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0 cursor-pointer'
                        )}
                        onClick={() => setUserRating(rating)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Comment</label>
                  <div className="mt-1">
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      rows={3}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Submit Review
                </button>
              </form>
            </div>

            {/* Existing reviews */}
            <div className="mt-8 space-y-6">
              {course.reviews?.map((review) => (
                <div key={review.id} className="border-t border-gray-200 pt-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-gray-700">{review.user.username}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 