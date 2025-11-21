import { useState } from 'react'
import axios from 'axios'
import SymptomSelector from './components/SymptomSelector'
import PredictionResult from './components/PredictionResult'

const SYMPTOM_LIST = [
  'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 
  'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 
  'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety', 
  'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 
  'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 
  'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 
  'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 
  'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 
  'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 
  'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 
  'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 
  'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 
  'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 
  'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 
  'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 
  'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 
  'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 
  'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 
  'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 
  'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 
  'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 
  'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 
  'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 
  'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 
  'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 
  'history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 
  'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 
  'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 
  'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
]

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState(new Set())
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSymptomToggle = (symptom) => {
    const newSelected = new Set(selectedSymptoms)
    if (newSelected.has(symptom)) {
      newSelected.delete(symptom)
    } else {
      newSelected.add(symptom)
    }
    setSelectedSymptoms(newSelected)
    setPrediction(null)
    setError(null)
  }

  const handlePredict = async () => {
    if (selectedSymptoms.size === 0) {
      setError('Please select at least one symptom')
      return
    }

    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      // Get API URL from environment or use relative
      const apiUrl = import.meta.env.VITE_API_URL || '/api/predict'
      const response = await axios.post(apiUrl, {
        symptoms: Array.from(selectedSymptoms)
      })
      setPrediction(response.data.disease)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSelectedSymptoms(new Set())
    setPrediction(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-3 md:py-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mb-2 shadow-lg">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 tracking-tight">
            MediPredict
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-1 font-medium">
            AI-Powered Disease Prediction System
          </p>
          <p className="text-xs md:text-sm text-gray-500 max-w-2xl mx-auto mb-3">
            Get instant insights by analyzing your symptoms. Our advanced machine learning model helps identify potential conditions based on your input.
          </p>
          <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl mx-auto shadow-sm">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong className="font-semibold">Medical Disclaimer:</strong> This tool is designed for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Symptom Selector */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6">
            <SymptomSelector
              symptoms={SYMPTOM_LIST}
              selectedSymptoms={selectedSymptoms}
              onToggle={handleSymptomToggle}
              onClear={handleClear}
            />
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={handlePredict}
                disabled={loading || selectedSymptoms.size === 0}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-[1.02] disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Get Prediction
                  </span>
                )}
              </button>
              {selectedSymptoms.size > 0 && (
                <button
                  onClick={handleClear}
                  className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 border border-gray-200"
                >
                  Clear
                </button>
              )}
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-800 rounded-lg text-sm">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {selectedSymptoms.size > 0 && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  <span className="font-bold text-blue-900">{selectedSymptoms.size}</span> symptom{selectedSymptoms.size !== 1 ? 's' : ''} selected
                </p>
              </div>
            )}
          </div>

          {/* Prediction Result */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6">
            <PredictionResult prediction={prediction} loading={loading} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 md:mt-8 text-center border-t border-gray-200 pt-4 md:pt-6">
          <p className="text-xs text-gray-500">
            Powered by advanced machine learning algorithms • Built with care for accurate predictions
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

