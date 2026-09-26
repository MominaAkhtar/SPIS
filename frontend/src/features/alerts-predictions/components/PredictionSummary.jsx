import React from 'react';

export default function PredictionSummary({ summary, confidenceScore }) {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-900">
      <h4 className="font-semibold text-sm mb-1">Predictive Trend Insight</h4>
      <p className="text-sm mb-2">{summary}</p>
      <div className="text-xs text-blue-700">Confidence Score: <strong>{confidenceScore}%</strong></div>
    </div>
  );
}
