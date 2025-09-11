'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, Brain, TrendingUp } from 'lucide-react'

interface Question {
  id: string
  text: string
  options: { value: number; label: string }[]
}

interface Assessment {
  id: string
  title: string
  description: string
  questions: Question[]
  scoring: {
    ranges: { min: number; max: number; label: string; description: string }[]
  }
}

const assessments: Assessment[] = [
  {
    id: 'parenting-stress',
    title: 'Parenting Stress Assessment',
    description: 'Evaluate your current stress levels related to parenting and identify areas for support.',
    questions: [
      {
        id: 'q1',
        text: 'How often do you feel overwhelmed by your parenting responsibilities?',
        options: [
          { value: 1, label: 'Never' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'Always' }
        ]
      },
      {
        id: 'q2',
        text: 'How confident do you feel in your parenting decisions?',
        options: [
          { value: 5, label: 'Very confident' },
          { value: 4, label: 'Somewhat confident' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Somewhat uncertain' },
          { value: 1, label: 'Very uncertain' }
        ]
      },
      {
        id: 'q3',
        text: 'How often do you feel supported in your parenting role?',
        options: [
          { value: 5, label: 'Always' },
          { value: 4, label: 'Often' },
          { value: 3, label: 'Sometimes' },
          { value: 2, label: 'Rarely' },
          { value: 1, label: 'Never' }
        ]
      },
      {
        id: 'q4',
        text: 'How well do you manage work-life balance as a parent?',
        options: [
          { value: 5, label: 'Very well' },
          { value: 4, label: 'Well' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Poorly' },
          { value: 1, label: 'Very poorly' }
        ]
      },
      {
        id: 'q5',
        text: 'How often do you feel guilty about your parenting?',
        options: [
          { value: 1, label: 'Never' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'Always' }
        ]
      }
    ],
    scoring: {
      ranges: [
        { min: 5, max: 10, label: 'Low Stress', description: 'You\'re managing parenting stress well. Continue your current strategies.' },
        { min: 11, max: 15, label: 'Moderate Stress', description: 'You may benefit from additional support and stress management techniques.' },
        { min: 16, max: 20, label: 'High Stress', description: 'Consider seeking professional support and implementing stress reduction strategies.' },
        { min: 21, max: 25, label: 'Very High Stress', description: 'Professional support is strongly recommended to help manage your stress levels.' }
      ]
    }
  },
  {
    id: 'relationship-satisfaction',
    title: 'Relationship Satisfaction Scale',
    description: 'Assess the quality of your relationship and identify areas for improvement.',
    questions: [
      {
        id: 'q1',
        text: 'How satisfied are you with your current relationship?',
        options: [
          { value: 5, label: 'Very satisfied' },
          { value: 4, label: 'Satisfied' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Dissatisfied' },
          { value: 1, label: 'Very dissatisfied' }
        ]
      },
      {
        id: 'q2',
        text: 'How well do you communicate with your partner?',
        options: [
          { value: 5, label: 'Very well' },
          { value: 4, label: 'Well' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Poorly' },
          { value: 1, label: 'Very poorly' }
        ]
      },
      {
        id: 'q3',
        text: 'How often do you feel supported by your partner?',
        options: [
          { value: 5, label: 'Always' },
          { value: 4, label: 'Often' },
          { value: 3, label: 'Sometimes' },
          { value: 2, label: 'Rarely' },
          { value: 1, label: 'Never' }
        ]
      },
      {
        id: 'q4',
        text: 'How well do you resolve conflicts together?',
        options: [
          { value: 5, label: 'Very well' },
          { value: 4, label: 'Well' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Poorly' },
          { value: 1, label: 'Very poorly' }
        ]
      },
      {
        id: 'q5',
        text: 'How much do you trust your partner?',
        options: [
          { value: 5, label: 'Completely' },
          { value: 4, label: 'Mostly' },
          { value: 3, label: 'Somewhat' },
          { value: 2, label: 'A little' },
          { value: 1, label: 'Not at all' }
        ]
      }
    ],
    scoring: {
      ranges: [
        { min: 5, max: 10, label: 'Low Satisfaction', description: 'Your relationship may benefit from professional counseling and communication work.' },
        { min: 11, max: 15, label: 'Moderate Satisfaction', description: 'There are areas for improvement. Consider relationship counseling or workshops.' },
        { min: 16, max: 20, label: 'Good Satisfaction', description: 'Your relationship is generally healthy with room for continued growth.' },
        { min: 21, max: 25, label: 'High Satisfaction', description: 'You have a strong, healthy relationship. Keep nurturing it!' }
      ]
    }
  }
]

export default function AssessmentScales() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (selectedAssessment && currentQuestion < selectedAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    setShowResults(true)
  }

  const resetAssessment = () => {
    setSelectedAssessment(null)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const getScore = () => {
    if (!selectedAssessment) return 0
    return Object.values(answers).reduce((sum, score) => sum + score, 0)
  }

  const getScoreRange = () => {
    if (!selectedAssessment) return null
    const score = getScore()
    return selectedAssessment.scoring.ranges.find(range => 
      score >= range.min && score <= range.max
    )
  }

  if (showResults && selectedAssessment) {
    const scoreRange = getScoreRange()
    return (
      <div className="text-center">
        <div className="mb-6">
          <Brain className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h3>
          <p className="text-gray-600">Your {selectedAssessment.title} Results</p>
        </div>

        <div className="card max-w-md mx-auto mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {getScore()}/{selectedAssessment.questions.length * 5}
            </div>
            <div className="text-xl font-semibold text-gray-900 mb-2">
              {scoreRange?.label}
            </div>
            <p className="text-gray-600">
              {scoreRange?.description}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={resetAssessment}
            className="btn-primary"
          >
            Take Another Assessment
          </button>
          <button
            onClick={() => {
              setShowResults(false)
              setCurrentQuestion(0)
              setAnswers({})
            }}
            className="btn-secondary"
          >
            Retake This Assessment
          </button>
        </div>
      </div>
    )
  }

  if (selectedAssessment) {
    const question = selectedAssessment.questions[currentQuestion]
    const isAnswered = answers[question.id] !== undefined

    return (
      <div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{selectedAssessment.title}</h3>
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {selectedAssessment.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / selectedAssessment.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-6">{question.text}</h4>
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  answers[question.id] === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={answers[question.id] === option.value}
                  onChange={() => handleAnswer(question.id, option.value)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[question.id] === option.value
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {answers[question.id] === option.value && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-gray-900">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === selectedAssessment.questions.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <Brain className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Psychological Assessments</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take our evidence-based assessments to better understand your situation 
          and receive personalized guidance tailored to your needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="card hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary-600 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {assessment.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {assessment.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedAssessment(assessment)}
              className="btn-primary w-full"
            >
              Start Assessment
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
