"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [step, setStep] = useState("phone"); // "phone" یا "otp"
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const otpRefs = useRef([]);

  // فرمت خودکار شماره موبایل (فقط اعداد + حداکثر 11 رقم)
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
    setError("");
  };

  // ارسال درخواست کد تأیید (اینجا فقط شبیه‌سازی شده)
  const requestOtp = async () => {
    if (!phone || phone.length < 10) {
      setError("لطفاً شماره موبایل معتبر وارد کنید");
      return;
    }

    setLoading(true);
    setError("");

    // شبیه‌سازی درخواست به سرور
    try {
      // await api.post("/auth/send-otp", { phone });
      console.log("درخواست کد برای:", phone);

      setStep("otp");
      setTimer(120); // ۲ دقیقه زمان برای وارد کردن کد
    } catch (err) {
      setError("خطا در ارسال کد. دوباره تلاش کنید");
    } finally {
      setLoading(false);
    }
  };

  // مدیریت تایمر شمارش معکوس
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // مدیریت ورودی‌های OTP
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // فقط عدد یا خالی

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // فوکوس خودکار به ورودی بعدی
    if (value && index < 4) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // بررسی کد OTP (شبیه‌سازی)
  const verifyOtp = () => {
    const code = otp.join("");
    if (code.length !== 5) {
      setError("کد ۵ رقمی را کامل وارد کنید");
      return;
    }

    setLoading(true);

    // اینجا باید به سرور درخواست بفرستی
    setTimeout(() => {
      // شبیه‌سازی موفقیت / شکست
      if (code === "12345") {
        // موفقیت → ریدایرکت بر اساس نقش
        // در پروژه واقعی این اطلاعات باید از پاسخ سرور بیاد
        if (phone === "09121234567") {
          router.push("/boss/Dashboard");
        } else if (phone === "09351234567") {
          router.push("/Dashboard");
        } else {
          router.push("/user/Dashboard");
        }
      } else {
        setError("کد تأیید اشتباه است");
        setLoading(false);
      }
    }, 1200);
  };

  const resendOtp = () => {
    setOtp(["", "", "", "", ""]);
    setError("");
    requestOtp();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10 transform transition-all">
        {/* لوگو یا عنوان */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">ورود به پنل</h1>
          <p className="text-gray-500 mt-2">با شماره موبایل خود وارد شوید</p>
        </div>

        {step === "phone" && (
          <>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شماره موبایل
                </label>
                <input
                  dir="ltr"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={11}
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="0912xxxxxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              <button
                onClick={requestOtp}
                disabled={loading || phone.length < 10}
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "در حال ارسال..." : "دریافت کد تأیید"}
              </button>
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-gray-700 font-medium">
                  کد ۵ رقمی ارسال شده به شماره
                </p>
                <p className="text-blue-600 font-bold mt-1">{phone}</p>
              </div>

              {/* فیلدهای OTP */}
              <div className="flex justify-center gap-3 md:gap-4" dir="ltr">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              <button
                onClick={verifyOtp}
                disabled={loading || otp.join("").length < 5}
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "در حال بررسی..." : "تأیید و ورود"}
              </button>

              <div className="text-center text-sm">
                {timer > 0 ? (
                  <p className="text-gray-500">
                    ارسال مجدد بعد از {Math.floor(timer / 60)}:
                    {String(timer % 60).padStart(2, "0")}
                  </p>
                ) : (
                  <button
                    onClick={resendOtp}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    ارسال مجدد کد
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}