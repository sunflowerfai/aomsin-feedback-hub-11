
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// ข้อมูลคะแนนความพึงพอใจตามภาค
const satisfactionDataByRegion = {
  "all": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.3 },
    { criteria: "ความน่าเชื่อถือ", score: 4.1 },
    { criteria: "ความรวดเร็ว", score: 4.2 },
    { criteria: "ความสุภาพ/บริการ", score: 4.4 },
    { criteria: "สภาพแวดล้อม", score: 4.0 },
    { criteria: "ความพร้อมรับ", score: 4.2 }
  ],
  "ภาค 1": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.5 },
    { criteria: "ความน่าเชื่อถือ", score: 4.2 },
    { criteria: "ความรวดเร็ว", score: 4.3 },
    { criteria: "ความสุภาพ/บริการ", score: 4.6 },
    { criteria: "สภาพแวดล้อม", score: 4.1 },
    { criteria: "ความพร้อมรับ", score: 4.3 }
  ],
  "ภาค 2": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.1 },
    { criteria: "ความน่าเชื่อถือ", score: 4.0 },
    { criteria: "ความรวดเร็ว", score: 4.1 },
    { criteria: "ความสุภาพ/บริการ", score: 4.3 },
    { criteria: "สภาพแวดล้อม", score: 3.9 },
    { criteria: "ความพร้อมรับ", score: 4.1 }
  ],
  "ภาค 3": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.6 },
    { criteria: "ความน่าเชื่อถือ", score: 4.4 },
    { criteria: "ความรวดเร็ว", score: 4.5 },
    { criteria: "ความสุภาพ/บริการ", score: 4.7 },
    { criteria: "สภาพแวดล้อม", score: 4.3 },
    { criteria: "ความพร้อมรับ", score: 4.5 }
  ],
  "ภาค 4": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.2 },
    { criteria: "ความน่าเชื่อถือ", score: 3.9 },
    { criteria: "ความรวดเร็ว", score: 4.0 },
    { criteria: "ความสุภาพ/บริการ", score: 4.2 },
    { criteria: "สภาพแวดล้อม", score: 3.8 },
    { criteria: "ความพร้อมรับ", score: 4.0 }
  ],
  "ภาค 5": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.4 },
    { criteria: "ความน่าเชื่อถือ", score: 4.3 },
    { criteria: "ความรวดเร็ว", score: 4.2 },
    { criteria: "ความสุภาพ/บริการ", score: 4.5 },
    { criteria: "สภาพแวดล้อม", score: 4.2 },
    { criteria: "ความพร้อมรับ", score: 4.4 }
  ],
  "ภาค 6": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.0 },
    { criteria: "ความน่าเชื่อถือ", score: 3.8 },
    { criteria: "ความรวดเร็ว", score: 3.9 },
    { criteria: "ความสุภาพ/บริการ", score: 4.1 },
    { criteria: "สภาพแวดล้อม", score: 3.7 },
    { criteria: "ความพร้อมรับ", score: 3.9 }
  ],
  "ภาค 7": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.3 },
    { criteria: "ความน่าเชื่อถือ", score: 4.1 },
    { criteria: "ความรวดเร็ว", score: 4.1 },
    { criteria: "ความสุภาพ/บริการ", score: 4.4 },
    { criteria: "สภาพแวดล้อม", score: 4.0 },
    { criteria: "ความพร้อมรับ", score: 4.2 }
  ],
  "ภาค 8": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.7 },
    { criteria: "ความน่าเชื่อถือ", score: 4.5 },
    { criteria: "ความรวดเร็ว", score: 4.6 },
    { criteria: "ความสุภาพ/บริการ", score: 4.8 },
    { criteria: "สภาพแวดล้อม", score: 4.4 },
    { criteria: "ความพร้อมรับ", score: 4.6 }
  ],
  "ภาค 9": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.1 },
    { criteria: "ความน่าเชื่อถือ", score: 3.9 },
    { criteria: "ความรวดเร็ว", score: 4.0 },
    { criteria: "ความสุภาพ/บริการ", score: 4.2 },
    { criteria: "สภาพแวดล้อม", score: 3.8 },
    { criteria: "ความพร้อมรับ", score: 4.0 }
  ],
  "ภาค 10": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.5 },
    { criteria: "ความน่าเชื่อถือ", score: 4.3 },
    { criteria: "ความรวดเร็ว", score: 4.4 },
    { criteria: "ความสุภาพ/บริการ", score: 4.6 },
    { criteria: "สภาพแวดล้อม", score: 4.2 },
    { criteria: "ความพร้อมรับ", score: 4.4 }
  ],
  "ภาค 11": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.2 },
    { criteria: "ความน่าเชื่อถือ", score: 4.0 },
    { criteria: "ความรวดเร็ว", score: 4.1 },
    { criteria: "ความสุภาพ/บริการ", score: 4.3 },
    { criteria: "สภาพแวดล้อม", score: 3.9 },
    { criteria: "ความพร้อมรับ", score: 4.1 }
  ],
  "ภาค 12": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.4 },
    { criteria: "ความน่าเชื่อถือ", score: 4.2 },
    { criteria: "ความรวดเร็ว", score: 4.3 },
    { criteria: "ความสุภาพ/บริการ", score: 4.5 },
    { criteria: "สภาพแวดล้อม", score: 4.1 },
    { criteria: "ความพร้อมรับ", score: 4.3 }
  ],
  "ภาค 13": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 3.9 },
    { criteria: "ความน่าเชื่อถือ", score: 3.7 },
    { criteria: "ความรวดเร็ว", score: 3.8 },
    { criteria: "ความสุภาพ/บริการ", score: 4.0 },
    { criteria: "สภาพแวดล้อม", score: 3.6 },
    { criteria: "ความพร้อมรับ", score: 3.8 }
  ],
  "ภาค 14": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.6 },
    { criteria: "ความน่าเชื่อถือ", score: 4.4 },
    { criteria: "ความรวดเร็ว", score: 4.5 },
    { criteria: "ความสุภาพ/บริการ", score: 4.7 },
    { criteria: "สภาพแวดล้อม", score: 4.3 },
    { criteria: "ความพร้อมรับ", score: 4.5 }
  ],
  "ภาค 15": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.1 },
    { criteria: "ความน่าเชื่อถือ", score: 3.9 },
    { criteria: "ความรวดเร็ว", score: 4.0 },
    { criteria: "ความสุภาพ/บริการ", score: 4.2 },
    { criteria: "สภาพแวดล้อม", score: 3.8 },
    { criteria: "ความพร้อมรับ", score: 4.0 }
  ],
  "ภาค 16": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.3 },
    { criteria: "ความน่าเชื่อถือ", score: 4.1 },
    { criteria: "ความรวดเร็ว", score: 4.2 },
    { criteria: "ความสุภาพ/บริการ", score: 4.4 },
    { criteria: "สภาพแวดล้อม", score: 4.0 },
    { criteria: "ความพร้อมรับ", score: 4.2 }
  ],
  "ภาค 17": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.5 },
    { criteria: "ความน่าเชื่อถือ", score: 4.3 },
    { criteria: "ความรวดเร็ว", score: 4.4 },
    { criteria: "ความสุภาพ/บริการ", score: 4.6 },
    { criteria: "สภาพแวดล้อม", score: 4.2 },
    { criteria: "ความพร้อมรับ", score: 4.4 }
  ],
  "ภาค 18": [
    { criteria: "การอธิบาย/ความเข้าใจได้", score: 4.8 },
    { criteria: "ความน่าเชื่อถือ", score: 4.6 },
    { criteria: "ความรวดเร็ว", score: 4.7 },
    { criteria: "ความสุภาพ/บริการ", score: 4.9 },
    { criteria: "สภาพแวดล้อม", score: 4.5 },
    { criteria: "ความพร้อมรับ", score: 4.7 }
  ]
};

const regionScores = [
  { region: "ภาค 1", current: 4.2, previous: 4.0 },
  { region: "ภาค 2", current: 4.1, previous: 4.3 },
  { region: "ภาค 3", current: 4.4, previous: 4.2 },
  { region: "ภาค 4", current: 4.0, previous: 3.9 },
  { region: "ภาค 5", current: 4.3, previous: 4.1 },
  { region: "ภาค 6", current: 4.2, previous: 4.4 },
  { region: "ภาค 7", current: 4.5, previous: 4.3 },
  { region: "ภาค 8", current: 4.1, previous: 4.0 },
  { region: "ภาค 9", current: 4.3, previous: 4.2 },
  { region: "ภาค 10", current: 4.0, previous: 3.8 },
  { region: "ภาค 11", current: 4.4, previous: 4.5 },
  { region: "ภาค 12", current: 4.2, previous: 4.1 },
  { region: "ภาค 13", current: 4.1, previous: 4.3 },
  { region: "ภาค 14", current: 4.3, previous: 4.0 },
  { region: "ภาค 15", current: 4.0, previous: 4.2 },
  { region: "ภาค 16", current: 4.2, previous: 4.1 },
  { region: "ภาค 17", current: 4.4, previous: 4.3 },
  { region: "ภาค 18", current: 4.1, previous: 4.2 }
];

export const SatisfactionBlock = () => {
  // Component state for selected region
  const [selectedRegion, setSelectedRegion] = useState<keyof typeof satisfactionDataByRegion>("all");

  // ข้อมูลที่จะแสดงใน RadarChart
  const satisfactionCriteria = satisfactionDataByRegion[selectedRegion];

  // คำนวณค่าเฉลี่ย
  const averageScore =
    satisfactionCriteria.reduce((sum, item) => sum + item.score, 0) / satisfactionCriteria.length;

  return (
    <Card className="rounded-2xl border shadow-card bg-white overflow-hidden">
      {/* Pink header strip */}
      <div 
        className="h-2 rounded-t-2xl"
        style={{ background: 'var(--gradient-pink-strip)' }}
      />
      
      <CardHeader className="pb-4 pt-5">
        <CardTitle className="font-kanit text-xl font-bold text-foreground">
          คะแนนความพึงพอใจ
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6 pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-kanit text-lg font-semibold text-foreground">คะแนนเฉลี่ยตามเกณฑ์</h3>
              <Select 
                value={selectedRegion}
                onValueChange={(value) => setSelectedRegion(value as keyof typeof satisfactionDataByRegion)}
              >
                <SelectTrigger className="w-[140px] bg-white border border-border rounded-lg text-sm font-kanit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-border rounded-lg shadow-lg z-50">
                  <SelectItem value="all" className="font-kanit">เลือกทั้งหมด</SelectItem>
                  {regionScores.map((region) => (
                    <SelectItem key={region.region} value={region.region} className="font-kanit">
                      {region.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              {/* Center label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <div className="text-3xl font-bold text-foreground font-kanit">
                  {averageScore.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground font-kanit">
                  คะแนนเฉลี่ย
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={satisfactionCriteria}>
                    <PolarGrid stroke="#E5E7EB" strokeOpacity={0.5} />
                    <PolarAngleAxis 
                      dataKey="criteria" 
                      tick={{ fontSize: 11, fontFamily: 'Kanit' }}
                      className="text-muted-foreground"
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 5]} 
                      tick={{ fontSize: 10, fontFamily: 'Kanit' }}
                      className="text-muted-foreground"
                    />
                    <Radar
                      name="คะแนน"
                      dataKey="score"
                      stroke="#DF7AB0"
                      fill="#DF7AB0"
                      fillOpacity={0.3}
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#DF7AB0" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Regional Comparison Bar Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-kanit text-lg font-semibold text-foreground">เปรียบเทียบคะแนนรายภาค (ภาค1–ภาค18)</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionScores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
                  <XAxis 
                    dataKey="region" 
                    tick={{ fontSize: 11, fontFamily: 'Kanit' }}
                    stroke="#6B7280"
                    height={60}
                    angle={-15}
                  />
                  <YAxis 
                    domain={[0, 5]}
                    tick={{ fontSize: 12, fontFamily: 'Kanit' }}
                    stroke="#6B7280"
                  />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `${Number(value).toFixed(1)} คะแนน`, 
                      name === 'current' ? 'เดือนปัจจุบัน' : 'เดือนก่อน'
                    ]}
                    labelFormatter={(label) => `${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontFamily: 'Kanit'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontFamily: 'Kanit', fontSize: '12px' }}
                    formatter={(value) => value === 'current' ? 'เดือนปัจจุบัน' : 'เดือนก่อน'}
                  />
                  <Bar 
                    dataKey="previous" 
                    fill="#D3D3D3" 
                    radius={[4, 4, 0, 0]}
                    name="previous"
                  />
                  <Bar 
                    dataKey="current" 
                    fill="#DF7AB0" 
                    radius={[4, 4, 0, 0]}
                    name="current"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
