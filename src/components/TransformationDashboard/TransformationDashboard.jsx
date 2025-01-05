import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlusCircle, FileText, Edit3 } from 'lucide-react';

const TransformationDashboard = ({ onNewTransformation, onEditTransformation }) => {
  const [transformations, setTransformations] = useState({
    personal: [],
    family: [],
    professional: []
  });

  const categories = {
    personal: {
      title: 'Personal',
      color: 'bg-blue-500',
      count: transformations.personal.length,
    },
    family: {
      title: 'Family/Ancestors and Close Relationships',
      color: 'bg-green-500',
      count: transformations.family.length,
    },
    professional: {
      title: 'Profession and Community',
      color: 'bg-purple-500',
      count: transformations.professional.length,
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Transformation Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{Object.values(transformations).flat().length}/21 Transformations</span>
              </div>
              <Progress 
                value={(Object.values(transformations).flat().length / 21) * 100} 
                className="h-2"
              />
            </div>

            {/* Category Progress */}
            <div className="grid gap-4">
              {Object.entries(categories).map(([key, category]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.title}</span>
                    <span className="text-sm">{category.count}/7</span>
                  </div>
                  <Progress 
                    value={(category.count / 7) * 100}
                    className={`h-2 ${category.color}`}
                  />
                  <div className="flex gap-2 mt-2">
                    {[...Array(7)].map((_, index) => (
                      <div 
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border
                          ${index < category.count ? category.color + ' text-white' : 'bg-gray-100'}`}
                      >
                        {index < category.count ? (
                          <FileText className="w-4 h-4" />
                        ) : (
                          <PlusCircle className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Transformations */}
            <div className="mt-6">
              <h3 className="font-medium mb-3">Recent Transformations</h3>
              <div className="space-y-2">
                {Object.values(transformations).flat().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Begin your journey by creating your first transformation
                  </div>
                ) : (
                  Object.values(transformations).flat().slice(-3).map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4" />
                        <span>{t.title}</span>
                      </div>
                      <button 
                        onClick={() => onEditTransformation(t.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* New Transformation Button */}
            <button
              onClick={onNewTransformation}
              className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Begin New Transformation</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransformationDashboard;
