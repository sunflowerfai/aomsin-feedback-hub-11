import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const sentimentData = [
  { name: "เชิงบวก", value: 72.3, count: 892, color: "#20A161" },
  { name: "เชิงลบ", value: 27.7, count: 342, color: "#D14343" }
];

const topicsData = [
  { topic: "แสงสว่าง", negative: -158, positive: 349, total: 507 },
  { topic: "ความเอาใจใส่ในการให้บริการลูกค้า", negative: -48, positive: 288, total: 336 },
  { topic: "ความสามารถในการตอบคำถามหรือให้คำแนะนำ", negative: -37, positive: 294, total: 331 },
  { topic: "ความเรียบง่ายข้อมูล", negative: -40, positive: 279, total: 319 },
  { topic: "ความพร้อมในการให้บริการ", negative: -30, positive: 278, total: 308 },
  { topic: "ที่จอดรถ", negative: -119, positive: 264, total: 383 },
  { topic: "เครื่องออกบัตรคิว", negative: -142, positive: 245, total: 387 },
  { topic: "ความประทับใจในการให้บริการ", negative: -151, positive: 241, total: 392 },
  { topic: "การเอาเปรียบ", negative: -47, positive: 229, total: 276 },
  { topic: "ระยะเวลาอนุมัติ", negative: -152, positive: 78, total: 230 },
  { topic: "ทำเลพื้นที่และควาบคับคั่ง", negative: -39, positive: 155, total: 194 },
  { topic: "ระบบยืนยันตัวตน", negative: -114, positive: 188, total: 302 },
  { topic: "การบังคับ", negative: -35, positive: 152, total: 187 },
  { topic: "การรบกวน", negative: -30, positive: 112, total: 142 },
  { topic: "เครื่องปรับสมุด", negative: -124, positive: 135, total: 259 },
  { topic: "ความถูกต้องในการให้บริการ", negative: -28, positive: 127, total: 155 },
  { topic: "รายละเอียดผลิตภัณฑ์", negative: -146, positive: 120, total: 266 },
  { topic: "ระบบ Core ของธนาคาร", negative: -47, positive: 118, total: 165 },
  { topic: "ATM ADM CDM", negative: -66, positive: 48, total: 114 },
  { topic: "ที่นั่งรอ", negative: -125, positive: 62, total: 187 }
];

// จัดเรียงตาม total จากมากไปน้อย
const sortedTopicsData = topicsData.sort((a, b) => b.total - a.total);

console.log(sortedTopicsData);

const regionFeedbackData = [
  { region: "ภาค 1", previous: 45, positive: 67, negative: 23 },
  { region: "ภาค 2", previous: 52, positive: 58, negative: 28 },
  { region: "ภาค 3", previous: 38, positive: 72, negative: 18 },
  { region: "ภาค 4", previous: 41, positive: 49, negative: 31 },
  { region: "ภาค 5", previous: 47, positive: 63, negative: 26 },
  { region: "ภาค 6", previous: 55, positive: 61, negative: 34 },
  { region: "ภาค 7", previous: 43, positive: 78, negative: 19 },
  { region: "ภาค 8", previous: 39, positive: 52, negative: 29 },
  { region: "ภาค 9", previous: 48, positive: 69, negative: 22 },
  { region: "ภาค 10", previous: 35, positive: 44, negative: 35 },
  { region: "ภาค 11", previous: 51, positive: 73, negative: 20 },
  { region: "ภาค 12", previous: 44, positive: 57, negative: 25 },
  { region: "ภาค 13", previous: 40, positive: 48, negative: 32 },
  { region: "ภาค 14", previous: 46, positive: 65, negative: 27 },
  { region: "ภาค 15", previous: 37, positive: 41, negative: 38 },
  { region: "ภาค 16", previous: 49, positive: 59, negative: 24 },
  { region: "ภาค 17", previous: 42, positive: 71, negative: 21 },
  { region: "ภาค 18", previous: 36, positive: 46, negative: 33 }
];

export const FeedbackBlock = () => {
  const [showPositive, setShowPositive] = useState(true);
  const [showNegative, setShowNegative] = useState(true);
  
  const renderPieLabel = ({ value }: any) => `${value}%`;
  
  return (
    <Card className="rounded-2xl border shadow-card bg-white overflow-hidden">
      {/* Pink header strip */}
      <div 
        className="h-2 rounded-t-2xl"
        style={{ background: 'var(--gradient-pink-strip)' }}
      />
      
      <CardHeader className="pb-4 pt-5">
        <CardTitle className="font-kanit text-xl font-bold text-foreground">
          ข้อคิดเห็น/ข้อเสนอแนะ
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6 pt-0">
        {/* Top Row - Two sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Donut */}
          <div className="space-y-4">
            <h3 className="font-kanit text-lg font-semibold text-foreground">ทัศนคติข้อคิดเห็น</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={renderPieLabel}
                    labelLine={false}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any, name: string, props: any) => [
                      `${value}% (${props.payload.count} ครั้ง)`,
                      'สัดส่วน'
                    ]}
                    labelFormatter={(label) => `ทัศนคติ: ${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontFamily: 'Kanit'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4">
              {sentimentData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-kanit text-sm text-muted-foreground">
                    {item.name}: {item.count} ครั้ง
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Topics Mentioned - Butterfly Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-kanit text-lg font-semibold text-foreground">ประเด็นที่ถูกกล่าวถึง</h3>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="เรียงลำดับ"
                >
                  <TrendingUp className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="กรอง"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="h-80">
              <div className="flex flex-col h-full">
                {/* Chart area with scroll */}
                <ScrollArea className="flex-1">
                  <div className="space-y-2 py-4">
                    {sortedTopicsData.map((item, index) => (
                      <div key={index} className="flex items-center h-8 relative">
                        {/* Negative bar (left side) */}
                        <div className="flex-1 flex justify-end pr-1">
                          <div 
                            className="bg-red-500 h-6 flex items-center justify-center text-white text-xs font-kanit font-medium"
                            style={{ 
                              width: `${(Math.abs(item.negative) / 200) * 100}%`,
                              minWidth: Math.abs(item.negative) > 10 ? 'auto' : '24px'
                            }}
                          >
                            {Math.abs(item.negative)}
                          </div>
                        </div>
                        
                        {/* Center area with topic name */}
                        <div className="w-40 flex items-center justify-center px-2 flex-shrink-0">
                          <div className="w-px bg-gray-300 h-8 absolute"></div>
                          <span className="text-xs font-kanit text-gray-700 font-medium bg-white px-1 relative z-10 text-center leading-tight">
                            {item.topic}
                          </span>
                        </div>
                        
                        {/* Positive bar (right side) */}
                        <div className="flex-1 flex justify-start pl-1">
                          <div 
                            className="bg-green-500 h-6 flex items-center justify-center text-white text-xs font-kanit font-medium"
                            style={{ 
                              width: `${(item.positive / 400) * 100}%`,
                              minWidth: item.positive > 10 ? 'auto' : '24px'
                            }}
                          >
                            {item.positive}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* X-axis */}
                <div className="flex justify-between text-sm font-kanit text-gray-600 px-2 pt-2">
                  <span>-200</span>
                  <span>-100</span>
                  <span>0</span>
                  <span>100</span>
                  <span>200</span>
                  <span>400</span>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="font-kanit text-sm text-muted-foreground">ความคิดเห็นเชิงลบ</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-kanit text-sm text-muted-foreground">ความคิดเห็นเชิงบวก</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Regional Feedback Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-kanit text-lg font-semibold text-foreground">ทัศนคติความคิดเห็นรายพื้นที่</h3>
            <div className="flex items-center gap-2">
              <Button 
                variant={showPositive ? "outline" : "ghost"}
                size="sm"
                onClick={() => setShowPositive(!showPositive)}
                className={`font-kanit text-xs border-green-200 transition-all duration-200 ${
                  showPositive ? 'text-green-700 bg-green-50 hover:bg-green-100 border-green-300' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                [เชิงบวก]
              </Button>
              <Button 
                variant={showNegative ? "outline" : "ghost"}
                size="sm"
                onClick={() => setShowNegative(!showNegative)}
                className={`font-kanit text-xs border-red-200 transition-all duration-200 ${
                  showNegative ? 'text-red-700 bg-red-50 hover:bg-red-100 border-red-300' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                [เชิงลบ]
              </Button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionFeedbackData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
                <XAxis 
                  dataKey="region" 
                  tick={{ fontSize: 11, fontFamily: 'Kanit' }}
                  stroke="#6B7280"
                  height={60}
                  angle={-15}
                />
                <YAxis 
                  tick={{ fontSize: 12, fontFamily: 'Kanit' }}
                  stroke="#6B7280"
                />
                <Tooltip 
                  formatter={(value: any, name: string) => {
                    const nameMap: { [key: string]: string } = {
                      'previous': 'เดือนที่แล้ว',
                      'positive': 'เชิงบวก',
                      'negative': 'เชิงลบ'
                    };
                    return [`${value} ครั้ง`, nameMap[name] || name];
                  }}
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
                  formatter={(value) => {
                    const nameMap: { [key: string]: string } = {
                      'previous': 'เดือนที่แล้ว',
                      'positive': 'เชิงบวก',
                      'negative': 'เชิงลบ'
                    };
                    return nameMap[value] || value;
                  }}
                />
                <Bar 
                  dataKey="previous" 
                  fill="#9CA3AF" 
                  radius={[4, 4, 0, 0]}
                  name="previous"
                />
                {showPositive && (
                  <Bar 
                    dataKey="positive" 
                    fill="#20A161" 
                    radius={[4, 4, 0, 0]}
                    name="positive"
                  />
                )}
                {showNegative && (
                  <Bar 
                    dataKey="negative" 
                    fill="#D14343" 
                    radius={[4, 4, 0, 0]}
                    name="negative"
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="font-kanit text-sm text-muted-foreground">เดือนก่อน</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-kanit text-sm text-muted-foreground">เชิงบวก</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="font-kanit text-sm text-muted-foreground">เชิงลบ</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};