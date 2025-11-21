function PredictionResult({ prediction, loading }) {
  const formatDiseaseName = (disease) => {
    if (!disease) return ''
    return disease
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Analyzing symptoms...</p>
      </div>
    )
  }

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
        <div className="mb-4">
          <svg
            className="w-24 h-24 text-gray-300 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Prediction Yet
        </h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Select your symptoms and click "Predict Disease" to get a prediction
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
          <svg
            className="w-12 h-12 text-primary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Predicted Disease
        </h3>
      </div>
      
      <div className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-xl p-8 w-full border-2 border-primary-200">
        <div className="text-3xl font-bold text-primary-700 mb-2">
          {formatDiseaseName(prediction)}
        </div>
        <div className="text-sm text-gray-600 mt-4">
          Based on the symptoms you selected
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg w-full">
        <p className="text-xs text-blue-800">
          <strong>Remember:</strong> This is a machine learning prediction for demonstration purposes. 
          Always consult with a qualified healthcare professional for accurate diagnosis and treatment.
        </p>
      </div>
    </div>
  )
}

export default PredictionResult

