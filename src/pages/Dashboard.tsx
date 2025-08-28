import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, LogOut, Settings, RotateCcw, LayoutDashboard, MapPin, MessageSquareText, AlertTriangle, Bot, FileText } from "lucide-react";
import { MenuItems } from "@/components/dashboard/MenuItems";
import { MiniRailSidebar } from "@/components/dashboard/MiniRailSidebar";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SatisfactionBlock } from "@/components/dashboard/SatisfactionBlock";
import { FormSubmissionBlock } from "@/components/dashboard/FormSubmissionBlock";
import { FeedbackBlock } from "@/components/dashboard/FeedbackBlock";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("สรุปภาพรวมประจำเดือน");
  const [selectedMonth, setSelectedMonth] = useState("2024-08");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleMenuSelect = (menuItem: string) => {
    setActiveMenu(menuItem);
    setIsOpen(false);
  };

  const renderContent = () => {
    switch (activeMenu) {
        case "สรุปภาพรวมประจำเดือน":
        return (
          <div className="space-y-8">
            <FormSubmissionBlock />
            <SatisfactionBlock />
            <FeedbackBlock />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-muted-foreground">{activeMenu}</h2>
              <p className="text-muted-foreground">เนื้อหาของส่วนนี้จะพัฒนาในเร็วๆ นี้</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mini Rail Sidebar - Desktop Only */}
      <MiniRailSidebar 
        activeMenu={activeMenu}
        onMenuSelect={handleMenuSelect}
        onToggleMainSidebar={() => setIsOpen(!isOpen)}
      />

      {/* Top Bar */}
      <header className="topbar px-6">
        <div className="w-full">
          <div className="flex items-center justify-between relative z-10">
          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20 w-11 h-11 rounded-2xl"
                  aria-label="เปิดเมนู"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader className="flex flex-row items-center justify-between">
                  <SheetTitle className="font-kanit">เมนูหลัก</SheetTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetHeader>
                <div className="mt-6">
                  <MenuItems onMenuSelect={handleMenuSelect} activeMenu={activeMenu} />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-muted-foreground text-center font-kanit">
                    อัพเดตล่าสุด: 27/08/2025 · 12:25 น.
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Drawer/Sidebar Toggle */}
          <div className="hidden md:block">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetContent side="left" className="w-80 ml-[72px]">
                <SheetHeader className="flex flex-row items-center justify-between">
                  <SheetTitle className="font-kanit">เมนูหลัก</SheetTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetHeader>
                <div className="mt-6">
                  <MenuItems onMenuSelect={handleMenuSelect} activeMenu={activeMenu} />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-muted-foreground text-center font-kanit">
                    อัพเดตล่าสุด: 27/08/2025 · 12:25 น.
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white font-kanit mb-2">
              Dashboard ข้อเสนอแนะ ข้อร้องเรียน การใช้บริการสาขา
            </h1>
            <p className="text-white/80 font-kanit text-base">
              ระบบติดตามและวิเคราะห์ข้อร้องเรียนลูกค้าธนาคารออมสิน
            </p>
          </div>
          
          {/* Right Content */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white text-base font-kanit">
                อัปเดตล่าสุด: 27/08/2025 17:29 น.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-pink-400/30 w-10 h-10 rounded-full border border-white/20 transition-colors duration-200"
                aria-label="การตั้งค่า"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-pink-400/30 w-10 h-10 rounded-full border border-white/20 transition-colors duration-200"
                aria-label="ประวัติ"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-white hover:bg-pink-400/30 flex items-center gap-2 font-kanit px-4 py-2 rounded-full border border-white/20 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="main-content transition-all duration-200 ease-out bg-gray-50 min-h-screen">
        <div className="container mx-auto p-6">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground font-kanit mb-2">{activeMenu}</h2>
              <p className="text-muted-foreground font-kanit">
                ติดตามและวิเคราะห์ข้อมูลภาพรวมของการให้บริการแต่ละเดือน
              </p>
            </div>
            {activeMenu === "สรุปภาพรวมประจำเดือน" && (
              <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
            )}
          </div>
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#ECEFF1' }} className="border-t border-border py-3 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left/Center Content */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-center md:text-left">
              <span className="text-sm text-muted-foreground font-kanit">
                © 2024 Customer Dashboard. สงวนลิขสิทธิ์.
              </span>
              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
                <a 
                  href="#" 
                  className="text-muted-foreground font-kanit hover:text-primary hover:underline transition-colors duration-200"
                  aria-label="นโยบายความเป็นส่วนตัว"
                >
                  นโยบายความเป็นส่วนตัว
                </a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <a 
                  href="#" 
                  className="text-muted-foreground font-kanit hover:text-primary hover:underline transition-colors duration-200"
                  aria-label="เงื่อนไขการใช้งาน"
                >
                  เงื่อนไขการใช้งาน
                </a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <a 
                  href="#" 
                  className="text-muted-foreground font-kanit hover:text-primary hover:underline transition-colors duration-200"
                  aria-label="ติดต่อเรา"
                >
                  ติดต่อเรา
                </a>
              </div>
            </div>
            
            {/* Right Content */}
            <div className="text-center md:text-right">
              <span className="text-sm text-muted-foreground font-kanit">
                เวอร์ชัน 2.1.0
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer - Only visible on small screens */}
      <div className="md:hidden px-6 py-4">
        <div className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] overflow-hidden">
          {/* Pink header strip */}
          <div className="h-2 bg-gradient-to-r from-[#DF7AB0] to-[#F9B5D3]"></div>
          
          <div className="p-4">
            {/* Three gradient boxes */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 mb-4">
              <a 
                href="#" 
                className="block bg-gradient-to-r from-[#D8218C] via-[#DF7AB0] to-[#F9B5D3] text-white font-kanit font-medium text-center py-3 px-2 rounded-xl hover:opacity-95 hover:shadow-lg transition-all duration-200"
                aria-label="นโยบายความเป็นส่วนตัว"
              >
                นโยบายความเป็นส่วนตัว
              </a>
              <a 
                href="#" 
                className="block bg-gradient-to-r from-[#D8218C] via-[#DF7AB0] to-[#F9B5D3] text-white font-kanit font-medium text-center py-3 px-2 rounded-xl hover:opacity-95 hover:shadow-lg transition-all duration-200"
                aria-label="เงื่อนไขการใช้งาน"
              >
                เงื่อนไขการใช้งาน
              </a>
              <a 
                href="#" 
                className="block bg-gradient-to-r from-[#D8218C] via-[#DF7AB0] to-[#F9B5D3] text-white font-kanit font-medium text-center py-3 px-2 rounded-xl hover:opacity-95 hover:shadow-lg transition-all duration-200"
                aria-label="ติดต่อเรา"
              >
                ติดต่อเรา
              </a>
            </div>
            
            {/* Copyright and version info */}
            <div className="text-center space-y-1">
              <div className="text-xs text-[#6B7280] font-kanit leading-relaxed">
                © 2024 Customer Dashboard. สงวนลิขสิทธิ์.
              </div>
              <div className="text-xs text-[#6B7280] font-kanit leading-relaxed">
                เวอร์ชัน 2.1.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;