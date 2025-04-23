import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { subscription as subscriptionApi } from '../api'

const plans = [
  {
    name: 'Monthly',
    price: 999, // in INR
    interval: 'month',
    description: 'Perfect for getting started',
    features: [
      'Access to all courses',
      'HD video quality',
      'Download for offline viewing',
      'Cancel anytime',
    ],
    popular: false,
  },
  {
    name: 'Annual',
    price: 9999, // in INR
    interval: 'year',
    description: 'Best value for money',
    features: [
      'All Monthly plan features',
      'Save 17% compared to monthly',
      'Priority support',
      'Early access to new courses',
    ],
    popular: true,
  },
]

export default function Subscribe() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (plan) => {
    try {
      setLoading(true)
      console.log('Creating Razorpay order for plan:', plan)
      
      // Log Razorpay key for verification
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID
      console.log('Using Razorpay Key:', razorpayKey)
      
      if (!razorpayKey) {
        toast.error('Razorpay key not configured')
        return
      }
      
      // Create Razorpay order (sending amount in INR)
      const response = await subscriptionApi.createRazorpayOrder({
        amount: plan.price,  // This is already in INR
        currency: 'INR'
      })
      console.log('Razorpay order created:', response.data)

      const options = {
        key: razorpayKey,
        amount: response.data.amount,  // This will be in paise from the backend
        currency: response.data.currency,
        name: "LearnHub",
        description: `${plan.name} Subscription`,
        order_id: response.data.order_id,
        handler: async function (response) {
          try {
            console.log('Payment successful, verifying:', response)
            
            // Verify payment
            const verifyResponse = await subscriptionApi.verifyRazorpayPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
            
            console.log('Payment verification response:', verifyResponse)
            
            if (verifyResponse.data.subscription_id) {
              toast.success('Subscription activated successfully!')
              navigate('/dashboard')
            } else {
              toast.error('Subscription activation failed')
            }
          } catch (error) {
            console.error('Payment verification failed:', error)
            console.error('Error response:', error.response?.data)
            const errorMessage = error.response?.data?.error || 'Payment verification failed'
            toast.error(errorMessage)
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#0ea5e9"
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed')
            toast.info('Payment cancelled')
          }
        }
      }

      console.log('Opening Razorpay with options:', options)
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Subscription error:', error)
      console.error('Error response:', error.response?.data)
      const errorMessage = error.response?.data?.error || 'Failed to initiate subscription process'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose Your Plan
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Get unlimited access to all our premium courses and start your learning journey today.
          </p>
        </div>

        {/* Pricing Section */}
        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 ${
                plan.popular ? 'border-2 border-primary-500' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    Popular
                  </span>
                </div>
              )}

              <div className="bg-white p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-5xl font-extrabold text-gray-900">₹{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/{plan.interval}</span>
                </p>

                {/* Feature List */}
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-primary-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading}
                  className={`mt-8 w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition-colors duration-200 ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700'
                      : 'bg-gray-800 hover:bg-gray-900'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="w-3 h-3 text-white animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Subscribe Now'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center p-4 bg-blue-50 rounded-lg">
            <svg
              className="h-3 w-3 text-blue-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-blue-700 font-medium">30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
} 