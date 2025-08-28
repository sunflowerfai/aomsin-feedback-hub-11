
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// ข้อมูลคะแนนความพึงพอใจตามภาค
const satisfactionDataByRegion = {
  "ภาค 1": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.5 },
    { criteria: "ความประทับใจฯ", score: 4.3 },
    { criteria: "ความน่าเชื่อถือฯ", score: 4.2 },
    { criteria: "ความรวดเร็วฯ", score: 4.1 },
    { criteria: "ความถูกต้องฯ", score: 3.5 },
    { criteria: "ความพร้อมฯ", score: 4.0 },
    { criteria: "สภาพแวดล้อมฯ", score: 3.9 }
  ],
  "ภาค 2": [
    { criteria: "การดูแล ความเอาใจใส่", score: 3.5 },
    { criteria: "ความประทับใจฯ", score: 4.2 },
    { criteria: "ความน่าเชื่อถือฯ", score: 4.3 },
    { criteria: "ความรวดเร็วฯ", score: 4.1 },
    { criteria: "ความถูกต้องฯ", score: 2.8 },
    { criteria: "ความพร้อมฯ", score: 4.2 },
    { criteria: "สภาพแวดล้อมฯ", score: 2.5 }
  ],
  "ภาค 3": [
    { criteria: "การดูแล ความเอาใจใส่", score: 3.3 },
    { criteria: "ความประทับใจฯ", score: 4.4 },
    { criteria: "ความน่าเชื่อถือฯ", score: 3.5 },
    { criteria: "ความรวดเร็วฯ", score: 3.9 },
    { criteria: "ความถูกต้องฯ", score: 4.6 },
    { criteria: "ความพร้อมฯ", score: 4.0 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.3 }
  ],
  "ภาค 4": [
    { criteria: "การดูแล ความเอาใจใส่", score: 2.4 },
    { criteria: "ความประทับใจฯ", score: 4.1 },
    { criteria: "ความน่าเชื่อถือฯ", score: 4.0 },
    { criteria: "ความรวดเร็วฯ", score: 3.9 },
    { criteria: "ความถูกต้องฯ", score: 3.8 },
    { criteria: "ความพร้อมฯ", score: 4.1 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.5 }
  ],
  "ภาค 5": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.4 },
    { criteria: "ความประทับใจฯ", score: 4.3 },
    { criteria: "ความน่าเชื่อถือฯ", score: 3.8 },
    { criteria: "ความรวดเร็วฯ", score: 4.5 },
    { criteria: "ความถูกต้องฯ", score: 4.7 },
    { criteria: "ความพร้อมฯ", score: 4.3 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.2 }
  ],
  "ภาค 6": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.1 },
    { criteria: "ความประทับใจฯ", score: 4.4 },
    { criteria: "ความน่าเชื่อถือฯ", score: 3.8 },
    { criteria: "ความรวดเร็วฯ", score: 3.8 },
    { criteria: "ความถูกต้องฯ", score: 4.6 },
    { criteria: "ความพร้อมฯ", score: 4.0 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.5 }
  ],
  "ภาค 7": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.2 },
    { criteria: "ความประทับใจฯ", score: 4.3 },
    { criteria: "ความน่าเชื่อถือฯ", score: 2.4 },
    { criteria: "ความรวดเร็วฯ", score: 4.1 },
    { criteria: "ความถูกต้องฯ", score: 4.7 },
    { criteria: "ความพร้อมฯ", score: 3.8 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.3 }
  ],
  "ภาค 8": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.3 },
    { criteria: "ความประทับใจฯ", score: 4.2 },
    { criteria: "ความน่าเชื่อถือฯ", score: 3.8 },
    { criteria: "ความรวดเร็วฯ", score: 4.3 },
    { criteria: "ความถูกต้องฯ", score: 4.8 },
    { criteria: "ความพร้อมฯ", score: 4.1 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.4 }
  ],
  "ภาค 9": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.4 },
    { criteria: "ความประทับใจฯ", score: 4.1 },
    { criteria: "ความน่าเชื่อถือฯ", score: 4.2 },
    { criteria: "ความรวดเร็วฯ", score: 4.5 },
    { criteria: "ความถูกต้องฯ", score: 3.8 },
    { criteria: "ความพร้อมฯ", score: 4.0 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.3 }
  ],
  "ภาค 10": [
    { criteria: "การดูแล ความเอาใจใส่", score: 2.6 },
    { criteria: "ความประทับใจฯ", score: 4.3 },
    { criteria: "ความน่าเชื่อถือฯ", score: 4.1 },
    { criteria: "ความรวดเร็วฯ", score: 4.4 },
    { criteria: "ความถูกต้องฯ", score: 3.8 },
    { criteria: "ความพร้อมฯ", score: 4.2 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.5 }
  ],
  "ภาค 11": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.1 },
    { criteria: "ความประทับใจฯ", score: 4.4 },
    { criteria: "ความน่าเชื่อถือฯ", score: 3.8 },
    { criteria: "ความรวดเร็วฯ", score: 4.3 },
    { criteria: "ความถูกต้องฯ", score: 3.8 },
    { criteria: "ความพร้อมฯ", score: 4.1 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.2 }
  ],
  "ภาค 12": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.3 },
    { criteria: "ความประทับใจฯ", score: 4.2 },
    { criteria: "ความน่าเชื่อถือฯ", score: 3.8 },
    { criteria: "ความรวดเร็วฯ", score: 4.1 },
    { criteria: "ความถูกต้องฯ", score: 4.8 },
    { criteria: "ความพร้อมฯ", score: 4.3 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.4 }
  ],
  "ภาค 13": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.4 },
    { criteria: "ความประทับใจฯ", score: 4.1 },
    { criteria: "ความน่าเชื่อถือฯ", score: 4.3 },
    { criteria: "ความรวดเร็วฯ", score: 4.2 },
    { criteria: "ความถูกต้องฯ", score: 4.6 },
    { criteria: "ความพร้อมฯ", score: 4.0 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.3 }
  ],
  "ภาค 14": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.2 },
    { criteria: "ความประทับใจฯ", score: 4.4 },
    { criteria: "ความน่าเชื่อถือฯ", score: 3.8 },
    { criteria: "ความรวดเร็วฯ", score: 4.3 },
    { criteria: "ความถูกต้องฯ", score: 3.8 },
    { criteria: "ความพร้อมฯ", score: 4.1 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.2 }
  ],
  "ภาค 15": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.3 },
    { criteria: "ความประทับใจฯ", score: 4.2 },
    { criteria: "ความน่าเชื่อถือฯ", score: 4.4 },
    { criteria: "ความรวดเร็วฯ", score: 4.5 },
    { criteria: "ความถูกต้องฯ", score: 4.6 },
    { criteria: "ความพร้อมฯ", score: 4.0 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.5 }
  ],
  "ภาค 16": [
    { criteria: "การดูแล ความเอาใจใส่", score: 4.1 },
    { criteria: "ความประทับใจฯ", score: 4.3 },
    { criteria: "ความน่าเชื่อถือฯ", score: 4.2 },
    { criteria: "ความรวดเร็วฯ", score: 2.5 },
    { criteria: "ความถูกต้องฯ", score: 4.7 },
    { criteria: "ความพร้อมฯ", score: 4.1 },
    { criteria: "สภาพแวดล้อมฯ", score: 3.8 }
  ],
  "ภาค 17": [
    { criteria: "การดูแล ความเอาใจใส่", score: 3.8 },
    { criteria: "ความประทับใจฯ", score: 2.7 },
    { criteria: "ความน่าเชื่อถือฯ", score: 4.1 },
    { criteria: "ความรวดเร็วฯ", score: 4.2 },
    { criteria: "ความถูกต้องฯ", score: 3.8 },
    { criteria: "ความพร้อมฯ", score: 4.0 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.4 }
  ],
  "ภาค 18": [
    { criteria: "การดูแล ความเอาใจใส่", score: 3.8 },
    { criteria: "ความประทับใจฯ", score: 4.1 },
    { criteria: "ความน่าเชื่อถือฯ", score: 4.3 },
    { criteria: "ความรวดเร็วฯ", score: 3.8 },
    { criteria: "ความถูกต้องฯ", score: 4.6 },
    { criteria: "ความพร้อมฯ", score: 4.2 },
    { criteria: "สภาพแวดล้อมฯ", score: 4.5 }
  ]
};

// Categories mapping based on the image
const categoryMapping = {
  "เลือกทั้งหมด": "all",
  "การดูแล ความเอาใจใส่": ["การดูแล ความเอาใจใส่"],
  "ความน่าเชื่อถือการตอบคำถามและแนะนำ": ["ความน่าเชื่อถือฯ"],
  "ความรวดเร็วในการให้บริการ": ["ความรวดเร็วฯ"],
  "ความถูกต้องในการทำธุรกรรม": ["ความถูกต้องฯ"],
  "ความพร้อมของเครื่องมือ": ["ความพร้อมฯ"],
  "สภาพแวดล้อมของสาขา": ["สภาพแวดล้อมฯ"],
  "ความประกับใจในการให้บริการ": ["ความประทับใจฯ"]
};

export const SatisfactionBlock = () => {
  const [selectedRegion, setSelectedRegion] = useState<keyof typeof satisfactionDataByRegion | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("เลือกทั้งหมด");

  // Calculate average data across all regions when "all" is selected
  const calculateAverageData = () => {
    const criteriaNames = Object.keys(satisfactionDataByRegion).length > 0 
      ? satisfactionDataByRegion[Object.keys(satisfactionDataByRegion)[0] as keyof typeof satisfactionDataByRegion].map(item => item.criteria)
      : [];
    
    return criteriaNames.map(criteria => {
      const scores = Object.values(satisfactionDataByRegion).map(regionData => 
        regionData.find(item => item.criteria === criteria)?.score || 0
      );
      const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      return { criteria, score: averageScore };
    });
  };

  // Calculate bar chart data based on selected category
  const calculateBarChartData = () => {
    const regions = Object.keys(satisfactionDataByRegion);
    
    return regions.map(region => {
      const regionData = satisfactionDataByRegion[region as keyof typeof satisfactionDataByRegion];
      
      let score = 0;
      if (selectedCategory === "เลือกทั้งหมด") {
        // Calculate average of all criteria
        score = regionData.reduce((sum, item) => sum + item.score, 0) / regionData.length;
      } else {
        // Find matching criteria for the selected category
        const matchingCriteria = categoryMapping[selectedCategory as keyof typeof categoryMapping];
        if (Array.isArray(matchingCriteria)) {
          const matchingScores = regionData.filter(item => 
            matchingCriteria.some(criteria => item.criteria.includes(criteria))
          );
          score = matchingScores.length > 0 
            ? matchingScores.reduce((sum, item) => sum + item.score, 0) / matchingScores.length
            : 0;
        }
      }
      
      return {
        region,
        current: score,
        previous: score - 0.1 + Math.random() * 0.2 // Mock previous data with slight variation
      };
    });
  };

  // ข้อมูลที่จะแสดงใน RadarChart (ใช้ dropdown ซ้าย)
  const satisfactionCriteria = selectedRegion === "all" 
    ? calculateAverageData()
    : satisfactionDataByRegion[selectedRegion];

  // คำนวณค่าเฉลี่ย
  const averageScore =
    satisfactionCriteria.reduce((sum, item) => sum + item.score, 0) / satisfactionCriteria.length;

  // ข้อมูลสำหรับ Bar Chart (ใช้ dropdown ขวา)
  const barChartData = calculateBarChartData();

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
                onValueChange={(value) => setSelectedRegion(value as keyof typeof satisfactionDataByRegion | "all")}
              >
                <SelectTrigger className="w-[140px] bg-white border border-border rounded-lg text-sm font-kanit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-border rounded-lg shadow-lg z-50">
                  <SelectItem value="all" className="font-kanit">เลือกทั้งหมด</SelectItem>
                  {Object.keys(satisfactionDataByRegion).map((region) => (
                    <SelectItem key={region} value={region} className="font-kanit">
                      {region}
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
              <h3 className="font-kanit text-lg font-semibold text-foreground">เปรียบเทียบคะแนนรายภาค </h3>
              <Select 
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[200px] bg-white border border-border rounded-lg text-sm font-kanit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-border rounded-lg shadow-lg z-50">
                  {Object.keys(categoryMapping).map((category) => (
                    <SelectItem key={category} value={category} className="font-kanit">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
