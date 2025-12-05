// utils/Alerts.js

import Swal from "sweetalert2";

// آبجکت ثابت برای کلاس‌های CSS مشترک جهت جلوگیری از تکرار کد
const baseCustomClasses = {
  popup: "swal2-popup", 
  title: "swal2-title",
  htmlContainer: "swal2-html-container",
  // دکمه تأیید پیش‌فرض برای آلارم‌های بدون دکمه لغو
  confirmButton: "btn-primary-custom", 
};

/**
 * نمایش یک پیغام موفقیت آمیز SweetAlert2
 * @param {string} title - عنوان اصلی (مثال: موفقیت)
 * @param {string} text - متن پیام (مثال: عملیات با موفقیت انجام شد.)
 * @returns {Promise<SweetAlertResult>} - در صورت استفاده از await در Navbar، تا بسته شدن آلارم صبر می‌کند.
 */
export const showSuccessAlert = (title, text) => {
  // Swal.fire یک Promise برمی‌گرداند که بعد از اتمام Timer یا کلیک، Resolve می‌شود.
  // این تضمین می‌کند که پیمایش (navigate) در Navbar پس از بسته شدن آلارم انجام شود.
  return Swal.fire({ 
    icon: "success",
    title: title || "عملیات موفق",
    text: text || "درخواست شما با موفقیت انجام شد.",
    confirmButtonText: "باشه",
    customClass: baseCustomClasses, 
    
    // ✨ تنظیمات خاص برای پیغام موفقیت: بسته شدن خودکار پس از ۳ ثانیه
    showConfirmButton: false, 
    timer: 3000, 
    timerProgressBar: true, 
  });
};

/**
 * نمایش یک پیغام خطا SweetAlert2
 * @param {string} title - عنوان اصلی (مثال: خطا)
 * @param {string} text - متن پیام (مثال: خطایی در انجام عملیات رخ داد.)
 */
export const showErrorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title || "خطا",
    text: text || "متأسفانه خطایی در اجرای درخواست شما رخ داد.",
    confirmButtonText: "تلاش مجدد",
    customClass: baseCustomClasses,
  });
};

/**
 * نمایش یک پیغام تأیید (Confirm) با SweetAlert2
 * @param {string} title - عنوان تأیید
 * @param {string} text - متن پیام تأیید
 * @returns {Promise<boolean>} - True اگر کاربر تأیید کند، False در غیر این صورت
 */
export const showConfirmAlert = async (title, text) => {
  const result = await Swal.fire({
    icon: "warning",
    title: title || "آیا مطمئن هستید؟",
    text: text || "این عمل قابل بازگشت نیست.",
    showCancelButton: true,
    confirmButtonText: "بله، انجام بده",
    cancelButtonText: "لغو",
    customClass: {
      ...baseCustomClasses, // استفاده از کلاس‌های پایه
      confirmButton: "btn-primary-custom", // دکمه تأیید (آبی)
      cancelButton: "btn-modern", // دکمه لغو (خاکستری مدرن)
    },
    // مهم: برای استفاده از کلاس‌های سفارشی دکمه، باید buttonsStyling را false قرار داد
    buttonsStyling: false, 
  });

  return result.isConfirmed;
};