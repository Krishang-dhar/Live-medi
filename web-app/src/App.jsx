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
      // Use relative URL - Vercel will route /api/* to serverless functions
      const response = await axios.post('/api/predict', {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Disease Prediction from Symptoms
          </h1>
          <p className="text-gray-600 text-lg">
            Select your symptoms to get a predicted disease
          </p>
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md max-w-2xl mx-auto">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Disclaimer:</strong> This app is for demo purposes only. 
              Please consult a qualified healthcare professional for any medical concerns.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Symptom Selector */}
          <div className="bg-white rounded-xl shadow-lg p-6">
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
                className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Predicting...
                  </span>
                ) : (
                  'Predict Disease'
                )}
              </button>
              {selectedSymptoms.size > 0 && (
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
                >
                  Clear
                </button>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {selectedSymptoms.size > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                <strong>{selectedSymptoms.size}</strong> symptom{selectedSymptoms.size !== 1 ? 's' : ''} selected
              </div>
            )}
          </div>

          {/* Prediction Result */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <PredictionResult prediction={prediction} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

