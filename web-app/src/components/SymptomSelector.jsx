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
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Search Symptoms
        </label>
        <input
          type="text"
          placeholder="Type to search symptoms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-700">
            Select Symptoms ({selectedSymptoms.size} selected)
          </label>
          {selectedSymptoms.size > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="border border-gray-200 rounded-lg p-3 max-h-96 overflow-y-auto bg-gray-50">
          {filteredSymptoms.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No symptoms found</p>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {filteredSymptoms.map((symptom) => (
                <label
                  key={symptom}
                  className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedSymptoms.has(symptom)
                      ? 'bg-primary-100 border-2 border-primary-500'
                      : 'bg-white border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.has(symptom)}
                    onChange={() => onToggle(symptom)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mr-3"
                  />
                  <span className="text-sm text-gray-700 flex-1">
                    {formatSymptomName(symptom)}
                  </span>
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

