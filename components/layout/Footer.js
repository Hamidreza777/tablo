function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white overflow-hidden">
      
      {/* Glow Effect */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-wide">
              انصاف تابلو
            </h2>
            <p className="text-blue-200 text-sm mt-3 leading-6">
              پلتفرم هوشمند رزرو آنلاین بیلبورد و تبلیغات محیطی  
              در بهترین نقاط شهری ایران
            </p>

            <button className="mt-6 px-6 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 transition font-semibold shadow-lg shadow-blue-500/30">
              رزرو بیلبورد
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">دسترسی سریع</h3>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="hover:text-white transition cursor-pointer">بیلبوردها</li>
              <li className="hover:text-white transition cursor-pointer">تعرفه‌ها</li>
              <li className="hover:text-white transition cursor-pointer">همکاری با ما</li>
              <li className="hover:text-white transition cursor-pointer">سوالات متداول</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4 text-lg">قوانین</h3>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="hover:text-white transition cursor-pointer">قوانین و مقررات</li>
              <li className="hover:text-white transition cursor-pointer">حریم خصوصی</li>
              <li className="hover:text-white transition cursor-pointer">شرایط استفاده</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-lg">ارتباط با ما</h3>
            <ul className="space-y-4 text-sm text-blue-200">
              <li>📍 تهران، خیابان ولیعصر</li>
              <li>📞 ۰۲۱-۱۲۳۴۵۶۷۸</li>
              <li>✉️ info@ensaftablo.ir</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-300">
          <p>
            © {new Date().getFullYear()} تمام حقوق متعلق به انصاف تابلو می‌باشد
          </p>

          <p className="tracking-widest uppercase">
            Billboard • Outdoor • Impact
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
