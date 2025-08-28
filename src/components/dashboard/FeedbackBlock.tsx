import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const sentimentData = [
  { name: "เชิงบวก", value: 72.3, count: 892, color: "#20A161" },
  { name: "เชิงลบ", value: 27.7, count: 342, color: "#D14343" }
];

const topicsData = [
  { topic: "คุณภาพการบริการ", negative: -45, positive: 128, total: 173 },
  { topic: "ความรวดเร็ว", negative: -32, positive: 95, total: 127 },
  { topic: "สภาพแวดล้อม", negative: -28, positive: 87, total: 115 },
  { topic: "ความสะดวก", negative: -23, positive: 72, total: 95 },
  { topic: "ระบบคิว", negative: -41, positive: 56, total: 97 },
  { topic: "พนักงาน", negative: -18, positive: 89, total: 107 }
];

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
{/* Topics Mentioned - Butterfly Chart */}
          <div className="space-y-4">
            <h3 className="font-kanit text-lg font-semibold text-foreground">ประเด็นที่ถูกกล่าวถึง</h3>
            
            <div className="h-80">
              <div className="flex flex-col h-full">
                {/* Chart area */}
                <div className="flex-1 relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-0 w-28 flex flex-col justify-around py-4">
                    {topicsData.map((item, index) => (
                      <div key={index} className="text-sm font-kanit text-gray-600 text-right pr-2">
                        {item.topic}
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart bars */}
                  <div className="ml-28 h-full flex flex-col justify-around py-4">
                    {topicsData.map((item, index) => (
                      <div key={index} className="flex items-center h-8 relative">
                        {/* Negative bar (left side) */}
                        <div className="flex-1 flex justify-end pr-1">
                          <div 
                            className="bg-red-500 h-6 flex items-center justify-center text-white text-xs font-kanit font-medium"
                            style={{ 
                              width: `${(Math.abs(item.negative) / 50) * 100}%`,
                              minWidth: Math.abs(item.negative) > 10 ? 'auto' : '24px'
                            }}
                          >
                            {Math.abs(item.negative)}
                          </div>
                        </div>
                        
                        {/* Center line */}
                        <div className="w-px bg-gray-300 h-8"></div>
                        
                        {/* Positive bar (right side) */}
                        <div className="flex-1 flex justify-start pl-1">
                          <div 
                            className="bg-green-500 h-6 flex items-center justify-center text-white text-xs font-kanit font-medium"
                            style={{ 
                              width: `${(item.positive / 130) * 100}%`,
                              minWidth: item.positive > 10 ? 'auto' : '24px'
                            }}
                          >
                            {item.positive}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* X-axis */}
                <div className="ml-28 flex justify-between text-sm font-kanit text-gray-600 px-2 pt-2">
                  <span>-50</span>
                  <span>-25</span>
                  <span>0</span>
                  <span>40</span>
                  <span>85</span>
                  <span>130</span>
                </div>
              </div>
            </div>
            
            {/* Legend and Summary */}
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
              
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600 font-kanit">
                    {topicsData.reduce((sum, topic) => sum + topic.positive, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground font-kanit">รวมเชิงบวก</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600 font-kanit">
                    {topicsData.reduce((sum, topic) => sum + Math.abs(topic.negative), 0)}
                  </div>
                  <div className="text-xs text-muted-foreground font-kanit">รวมเชิงลบ</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground font-kanit">
                    {topicsData.reduce((sum, topic) => sum + topic.total, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground font-kanit">รวมทั้งหมด</div>
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