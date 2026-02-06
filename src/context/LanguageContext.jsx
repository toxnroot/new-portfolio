'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        nav: {
            home: 'Home',
            skills: 'Skills',
            projects: 'Projects',
            about: 'About Me',
            contact: 'Contact',
        },
        hero: {
            hi: "Hi, I'm",
            name: "Mohammed Kamal",
            subtitle: "I create immersive web experiences.",
            button: "Let's Talk",
            downloadCV: "Download CV",
        },
        skills: {
            title: "My Skills",
        },
        projects: {
            badge: "PROUDLY FEATURED",
            title: "My Projects",
            subtitle: "Explore a collection of my recent work, where I combine code and creativity to build meaningful web solutions.",
            loadMore: "Explore More Projects",
            card: {
                badge: "Featured Project",
                live: "Live View",
                code: "Code",
                viewDetails: "View Details",
            },
            details: {
                back: "Back to Projects",
                techUsed: "Technologies Used",
                demo: "Live Demo",
                code: "Source Code",
            }
        },
        about: {
            title: "About Me",
            subtitle: "Frontend Developer & UI/UX Enthusiast",
            description1: "I’m a passionate developer with a strong eye for design, specializing in creating interactive experiences and functional interfaces using React, Three.js, and Framer Motion.",
            description2: "I love bringing ideas to life with smooth animations and modern design principles. Let's build something amazing together!",
            button: "View Projects",
        },
        contact: {
            title: "Get In Touch",
            subtitle: "I'm always open to new collaborations or just a friendly chat. Let's connect and create something amazing together!",
            emailMe: "Email Me",
            emailDesc: "Send me an email and I'll get back to you as soon as possible.",
            button: "Say Hello",
            nameLabel: "Name",
            emailLabel: "Email",
            messageLabel: "Message",
            sendButton: "Send Message",
            sending: "Sending...",
            success: "Message sent successfully!",
            error: "Something went wrong. Please try again.",
        },
        testimonials: {
            title: "Client Stories",
            subtitle: "Real feedback from people I've worked with.",
            leaveReview: "Leave a Review",
            noReviews: "No reviews yet. Be the first to share your experience!",
            form: {
                title: "Share Your Experience",
                name: "Your Name",
                position: "Position / Company (Optional)",
                rating: "Rating",
                content: "Tell us about your project...",
                submit: "Send Review",
                submitting: "Submitting...",
                success: "Thank you! Your review has been submitted for approval.",
                fillError: "Please fill in your name and review.",
            }
        },
    },
    ar: {
        nav: {
            home: 'الرئيسية',
            skills: 'المهارات',
            projects: 'المشاريع',
            about: 'عني',
            contact: 'تواصل معي',
        },
        hero: {
            hi: "مرحباً، أنا",
            name: "محمد كمال",
            subtitle: "أقوم ببناء تجارب ويب مذهلة وتفاعلية.",
            button: "لنبدأ التحدث",
            downloadCV: "تحميل السيرة الذاتية",
        },
        skills: {
            title: "مهاراتي",
        },
        projects: {
            badge: "فخور بعرضها",
            title: "مشاريعي",
            subtitle: "استكشف مجموعة من أعمالي الأخيرة، حيث أجمع بين الكود والإبداع لبناء حلول ويب هادفة.",
            loadMore: "استكشف المزيد من المشاريع",
            card: {
                badge: "مشروع مميز",
                live: "معاينة حية",
                code: "الكود",
                viewDetails: "عرض التفاصيل",
            },
            details: {
                back: "العودة للمشاريع",
                techUsed: "التقنيات المستخدمة",
                demo: "معاينة حية",
                code: "كود المشروع",
            }
        },
        about: {
            title: "عني",
            subtitle: "مطور واجهات أمامية وشغوف بالتصميم (UI/UX)",
            description1: "أنا مطور شغوف ولدي عين قوية للتصميم، متخصص في إنشاء تجارب تفاعلية وواجهات وظيفية باستخدام React و Three.js و Framer Motion.",
            description2: "أحب تحويل الأفكار إلى واقع باستخدام حركات سلسة ومبادئ التصميم الحديثة. لنبني شيئاً مذهلاً معاً!",
            button: "عرض المشاريع",
        },
        contact: {
            title: "تواصل معي",
            subtitle: "أنا دائماً منفتح لتعاونات جديدة أو مجرد دردشة ودية. لنتواصل ونبتكر شيئاً مذهلاً معاً!",
            emailMe: "راسلني",
            emailDesc: "أرسل لي بريداً إلكترونياً وسأرد عليك في أقرب وقت ممكن.",
            button: "قل مرحباً",
            nameLabel: "الاسم",
            emailLabel: "البريد الإلكتروني",
            messageLabel: "الرسالة",
            sendButton: "إرسال الرسالة",
            sending: "جاري الإرسال...",
            success: "تم إرسال الرسالة بنجاح!",
            error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
        },
        testimonials: {
            title: "آراء العملاء",
            subtitle: "تعليقات حقيقية من أشخاص عملت معهم.",
            leaveReview: "أضف رأيك",
            noReviews: "لا توجد آراء بعد. كن أول من يشارك تجربته!",
            form: {
                title: "شارك تجربتك",
                name: "الاسم",
                position: "الوظيفة / الشركة (اختياري)",
                rating: "التقييم",
                content: "أخبرنا عن مشروعك...",
                submit: "إرسال الرأي",
                submitting: "جاري الإرسال...",
                success: "شكراً لك! تم إرسال رأيك للمراجعة.",
                fillError: "يرجى ملء الاسم والتعليق.",
            }
        },
    },
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang) {
            setLang(savedLang);
        }
    }, []);

    useEffect(() => {
        // Apply attributes to the root HTML element to avoid hydration issues on wrapper divs
        // and to ensure global font/direction application.
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        if (lang === 'ar') {
            document.documentElement.classList.add('font-arabic');
        } else {
            document.documentElement.classList.remove('font-arabic');
        }
    }, [lang]);

    const toggleLanguage = () => {
        const newLang = lang === 'en' ? 'ar' : 'en';
        setLang(newLang);
        localStorage.setItem('lang', newLang);
    };

    const t = translations[lang];

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
