import { useState } from 'react'

function SymptomSelector({ symptoms, selectedSymptoms, onToggle, onClear }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatSymptomName = (symptom) => {
    return symptom
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Search Symptoms
        </label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by symptom name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-800">
            Available Symptoms
            {selectedSymptoms.size > 0 && (
              <span className="ml-2 text-blue-600 font-bold">({selectedSymptoms.size} selected)</span>
            )}
          </label>
          {selectedSymptoms.size > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-gray-600 hover:text-gray-800 font-medium px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="border border-gray-200 rounded-xl p-3 max-h-[360px] md:max-h-[420px] overflow-y-auto bg-gray-50/50 custom-scrollbar">
          {filteredSymptoms.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-sm">No symptoms found matching your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {filteredSymptoms.map((symptom) => (
                <label
                  key={symptom}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                    selectedSymptoms.has(symptom)
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-400 shadow-sm'
                      : 'bg-white border-2 border-transparent hover:bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.has(symptom)}
                    onChange={() => onToggle(symptom)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 mr-3 cursor-pointer"
                  />
                  <span className={`text-sm flex-1 ${selectedSymptoms.has(symptom) ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                    {formatSymptomName(symptom)}
                  </span>
                  {selectedSymptoms.has(symptom) && (
                    <svg className="w-5 h-5 text-blue-600 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SymptomSelector

