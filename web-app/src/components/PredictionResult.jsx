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
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] md:min-h-[350px]">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mb-6"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="text-gray-700 font-semibold text-lg mb-1">Processing Your Symptoms</p>
        <p className="text-gray-500 text-sm">Our AI model is analyzing your input...</p>
      </div>
    )
  }

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] md:min-h-[350px] text-center px-4">
        <div className="mb-6">
          <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <svg
              className="w-14 h-14 text-gray-400"
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
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Ready for Analysis
        </h3>
        <p className="text-gray-600 text-sm max-w-sm leading-relaxed">
          Select your symptoms from the list and click "Get Prediction" to receive an AI-powered analysis of potential conditions.
        </p>
        <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Select at least one symptom to begin</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] md:min-h-[350px] text-center">
      <div className="mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          Prediction Result
        </h3>
        <p className="text-xs text-gray-500">Based on symptom analysis</p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 w-full border-2 border-blue-200 shadow-inner">
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
          {formatDiseaseName(prediction)}
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>AI Model Prediction</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg w-full text-left">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900">Important:</strong> This prediction is generated by machine learning algorithms and is intended for informational purposes only. It should not be considered a substitute for professional medical evaluation, diagnosis, or treatment. Please consult with a licensed healthcare provider for proper medical assessment.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PredictionResult

