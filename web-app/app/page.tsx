'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Check, 
  AlertCircle, 
  Sparkles,
  Activity,
  Brain,
  Play,
  Loader2
} from 'lucide-react';

const ALL_SYMPTOMS = [
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
];

export default function Home() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredSymptoms = useMemo(() => {
    if (!searchTerm) return ALL_SYMPTOMS;
    return ALL_SYMPTOMS.filter(symptom =>
      symptom.toLowerCase().replace(/_/g, ' ').includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
    setPrediction(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed');
      }

      setPrediction(data.disease);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setSelectedSymptoms([]);
    setPrediction(null);
    setError(null);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">MediPredict</h1>
                <p className="text-xs text-gray-500">AI Disease Prediction</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span>Educational Only</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Simple Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">AI-Powered Diagnosis</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Disease Prediction</h2>
          <p className="text-gray-600">Select your symptoms to get instant predictions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Select Symptoms</h3>
                  <p className="text-sm text-gray-500">Choose all that apply</p>
                </div>
                {selectedSymptoms.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded border border-red-200"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Selected Preview */}
              {selectedSymptoms.length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900 mb-3">
                    Selected: {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.slice(0, 5).map((symptom) => (
                      <span
                        key={symptom}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded border border-blue-300 text-xs text-blue-700"
                      >
                        {symptom.replace(/_/g, ' ')}
                        <button
                          onClick={() => toggleSymptom(symptom)}
                          className="hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedSymptoms.length > 5 && (
                      <span className="px-3 py-1 bg-white rounded border border-blue-300 text-xs text-blue-700">
                        +{selectedSymptoms.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Symptoms Grid - Proper Spacing */}
              <div className="max-h-96 overflow-y-auto mb-6 pr-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredSymptoms.map((symptom) => {
                    const isSelected = selectedSymptoms.includes(symptom);
                    return (
                      <button
                        key={symptom}
                        onClick={() => toggleSymptom(symptom)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium text-center border transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400'
                        }`}
                      >
                        {symptom.replace(/_/g, ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Predict Button */}
              <button
                onClick={handlePredict}
                disabled={loading || selectedSymptoms.length === 0}
                className={`w-full py-3.5 px-6 rounded-lg font-semibold text-base border transition-all ${
                  loading || selectedSymptoms.length === 0
                    ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Predict Disease ({selectedSymptoms.length})
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Result</h3>
              </div>

              {error && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-900">Error</p>
                      <p className="text-xs text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {prediction ? (
                <div className="space-y-4">
                  <div className="p-6 bg-green-50 rounded-lg border border-green-200 text-center">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-xs font-bold text-green-700 uppercase mb-2">Predicted Disease</p>
                    <h4 className="text-xl font-bold text-gray-900">
                      {prediction.replace(/_/g, ' ')}
                    </h4>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Details</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Symptoms:</span>
                        <span className="font-semibold">{selectedSymptoms.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Model:</span>
                        <span className="font-semibold">Random Forest</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <Search className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">
                    Select symptoms and click "Predict Disease" to see results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Simple Footer */}
        <footer className="mt-12 pt-6 text-center border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Built with Next.js, TypeScript & Machine Learning</p>
          <p className="text-xs text-gray-500">Random Forest • Decision Tree • Naive Bayes • Gradient Boosting</p>
        </footer>
      </main>
    </div>
  );
}
