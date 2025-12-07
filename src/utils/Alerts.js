// src/utils/Alerts.js

import Swal from 'sweetalert2';

// 1. Toast Alert (نمایش موفقیت آمیز)
export const showSuccessAlert = (title, message = '') => { 
    Swal.fire({
        toast: true,
        icon: 'success', 
        title: title,
        text: message,
        position: 'top-end', // 👈 موقعیت بالا سمت راست
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
        customClass: {
            popup: 'swal2-toast-custom', 
        },
    });
};

// 2. Confirmation Alert (برای تکمیل خرید)
export const showConfirmAlert = async (title, text) => {
    const result = await Swal.fire({
        title: title,
        html: `<div dir="rtl" class="text-sec">${text}</div>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--accent)',
        cancelButtonColor: 'var(--bg-card)',
        confirmButtonText: 'بله، تأیید می‌کنم',
        cancelButtonText: 'انصراف',
        reverseButtons: true,
        customClass: {
            popup: 'swal2-popup', 
            confirmButton: 'swal2-confirm swal2-styled btn-modern btn-primary-custom',
            cancelButton: 'swal2-cancel swal2-styled btn-modern btn-danger-custom',
        }
    });
    return result.isConfirmed;
};

// 3. Simple Error Alert 
export const showErrorAlert = (title, text) => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        customClass: {
            popup: 'swal2-popup',
        }
    });
};