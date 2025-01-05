import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TransformationWriter = ({ transformation, onChange }) => {
  const handleInputChange = (field, value) => {
    onChange({
      ...transformation,
      [field]: value
    });
  };

  const sections = {
    reflection: {
      title: "1. Reflection",
      prompts: [
        "• Describe the experience of reactivity you are working with",
        "• Identify the pain identity you're exploring",
        "• Reflect on any limited sense of 'me' at this time",
        "• Consider: Is this familiar? Does it recur?",
        "• Notice experiences of pain body, speech, and mind"
      ]
    },
    practice: {
      title: "2. Practice",
      prompts: [
        "• Which practice(s) did you choose for working with this pattern?",
        "• Why did you select these specific practices?",
        "• How do these practices relate to the three doors?"
      ]
    },
    progression: {
      title: "3. Progression",
      prompts: [
        "• How long have you been exploring this challenge?",
        "• What shifts and changes occurred during practice?",
        "• Describe your informal practice in daily life",
        "• How did you work with the three precious pills?",
        "• Remember: This should be the longest section"
      ]
    },
    result: {
      title: "4. Result",
      prompts: [
        "• What shifts in experience emerged?",
        "• What new freedoms or openness manifested?",
        "• How has this transformation affected your daily life?",
        "• What qualities have emerged from this practice?"
      ]
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>3 Doors Academy Transformation Writer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reflection" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            {Object.entries(sections).map(([key, section]) => (
              <TabsTrigger key={key} value={key}>
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(sections).map(([key, section]) => (
            <TabsContent key={key} value={key}>
              <Card>
                <CardContent className="space-y-4 pt-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    {section.prompts.map((prompt, idx) => (
                      <p key={idx}>{prompt}</p>
                    ))}
                  </div>
                  <Textarea
                    className="min-h-[300px] mt-4"
                    value={transformation[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder="Begin writing..."
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransformationWriter;
