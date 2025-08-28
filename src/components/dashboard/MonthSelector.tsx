import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MonthSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const months = [
  { value: "2024-01", label: "มกราคม 2567" },
  { value: "2024-02", label: "กุมภาพันธ์ 2567" },
  { value: "2024-03", label: "มีนาคม 2567" },
  { value: "2024-04", label: "เมษายน 2567" },
  { value: "2024-05", label: "พฤษภาคม 2567" },
  { value: "2024-06", label: "มิถุนายน 2567" },
  { value: "2024-07", label: "กรกฎาคม 2567" },
  { value: "2024-08", label: "สิงหาคม 2567" },
  { value: "2024-09", label: "กันยายน 2567" },
  { value: "2024-10", label: "ตุลาคม 2567" },
  { value: "2024-11", label: "พฤศจิกายน 2567" },
  { value: "2024-12", label: "ธันวาคม 2567" },
];

export const MonthSelector = ({ value, onChange }: MonthSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px] bg-white border border-border rounded-2xl shadow-sm">
        <SelectValue placeholder="เลือกเดือน" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-border rounded-xl shadow-lg">
        {months.map((month) => (
          <SelectItem 
            key={month.value} 
            value={month.value}
            className="font-kanit hover:bg-muted/50 focus:bg-muted/50"
          >
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};