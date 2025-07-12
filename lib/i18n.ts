import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.about": "About",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "nav.bookshop": "Bookshop",
      "nav.dailyUpdates": "Daily Updates",
      "dailyUpdates.title": "Daily Updates",

      // Hero Section
      "hero.dua": "اللهم صلى على سيد السادات السعادات الهدات والبركات",
      "hero.symbolic": "☆آآآم#ااااھےو☆",
      "hero.tagline":
        "Premium Islamic Learning & Spiritual Enlightenment Centre",
      "hero.cta": "DM us for exclusive teaching",

      // About Section
      "about.title": "About Us",
      "about.mission": "Our Mission",
      "about.mission.text":
        "The Babu-l-Ulum Islamic Learning Centre specializes in offering advanced knowledge and spiritual enlightenment through a unique approach to Islamic education. Our core mission is to empower individuals with a deeper understanding of Islamic teachings and spirituality.",
      "about.vision": "Our Vision",
      "about.vision.text":
        "To be the leading centre for Islamic spiritual education, fostering deep understanding and personal growth through traditional wisdom and modern approaches.",

      // Services
      "services.title": "Our Services",
      "services.mastery": "Mastery of Asrar",
      "services.mastery.desc":
        "Advanced spiritual secrets and mystical knowledge",
      "services.prayers": "Guidance on Prayers",
      "services.prayers.desc":
        "Powerful prayer techniques and spiritual practices",
      "services.astrology": "Astrology & Ancient Sciences",
      "services.astrology.desc":
        "Traditional Islamic astrology and ancient wisdom",
      "services.nature": "Human Nature Study",
      "services.nature.desc":
        "Deep exploration of human psychology and spirituality",
      "services.consultations": "Personalized Consultations",
      "services.consultations.desc":
        "One-on-one spiritual guidance and counseling",
      "services.illumination": "Illumination of Personal Signs",
      "services.illumination.desc":
        "Understanding personal spiritual symbols and signs",
      "services.education": "Adult Education",
      "services.education.desc":
        "Arabic language and Islamic studies for adults",
      "services.preacher": "Islamic Preacher / Lecturer",
      "services.preacher.desc":
        "Professional Islamic preaching, lectures, and public speaking",

      // Founder
      "founder.title": "Founder",
      "founder.name": "Alfa Baba",
      "founder.description":
        "A renowned Islamic scholar and spiritual guide with decades of experience in Islamic education and spiritual counseling.",

      // Contact
      "contact.title": "Contact Us",
      "contact.phone": "Phone",
      "contact.email": "Email",
      "contact.whatsapp": "WhatsApp",
      "contact.form.name": "Name",
      "contact.form.email": "Email",
      "contact.form.message": "Message",
      "contact.form.send": "Send Message",
      "contact.form.sendViaWhatsapp": "Send via WhatsApp",

      // Footer
      "footer.rights":
        "© 2025 Babul Ulum Islamic Learning Centre. All rights reserved.",
      "footer.powered": "Powered by Sageverse",

      // Language Toggle
      "lang.en": "English",
      "lang.ar": "العربية",
      "nav.toggleLanguage": "Toggle language",

      // Tags
      "tags.faith": "Faith",
      "tags.spirituality": "Spirituality",
      "tags.prayer": "Prayer",
      "tags.astrology": "Astrology",
      "tags.guidance": "Guidance",
      "tags.education": "Education",
      "tags.community": "Community",
      "tags.legacy": "Legacy",
      // Add more as needed

      // Types
      "types.article": "Article",
      "types.video": "Video",
      "types.audio": "Audio",
      "types.event": "Event",
      // Add more as needed

      // Comments Show More/Less
      "comments.showMore": "Show more comments",
      "comments.showLess": "Show less",

      // Additional Hero Section
      "hero.brand": "Babul Ulum",
      "hero.subtitle": "Islamic Learning Centre",
      "hero.explore": "Explore Our Teachings",

      // Additional About Section
      "about.community": "Community",
      "about.community.text":
        "Building a strong, supportive community of learners and seekers of spiritual knowledge.",
      "about.excellence": "Excellence",
      "about.excellence.text":
        "Maintaining the highest standards of Islamic education and spiritual guidance.",

      // Additional Founder Section
      "founder.achievements.scholar": "Renowned Scholar",
      "founder.achievements.scholar.desc":
        "Recognized Islamic scholar with decades of experience",
      "founder.achievements.educator": "Expert Educator",
      "founder.achievements.educator.desc":
        "Specialized in advanced Islamic studies and spiritual guidance",
      "founder.achievements.leader": "Community Leader",
      "founder.achievements.leader.desc":
        "Dedicated to building strong Islamic communities",
      "founder.achievements.guide": "Spiritual Guide",
      "founder.achievements.guide.desc":
        "Trusted mentor for spiritual development and growth",
      "founder.quote.title": "Founder & Spiritual Guide",
      "founder.quote.text":
        "Knowledge is the light that illuminates the path to spiritual enlightenment. Through education and guidance, we can transform lives and build stronger communities.",
      "founder.description.extended":
        "With a deep understanding of Islamic traditions and modern educational methods, Alfa Baba has dedicated his life to spreading knowledge and fostering spiritual growth. His unique approach combines traditional wisdom with contemporary insights, making Islamic learning accessible and meaningful for students of all backgrounds.",
      "founder.cta.title": "Learn from the Best",
      "founder.cta.text":
        "Experience the wisdom and guidance of Alfa Baba through our comprehensive Islamic learning programs.",
      "founder.cta.button": "Start Your Journey",

      // Additional Services Section
      "services.subtitle":
        "Discover our comprehensive range of Islamic learning and spiritual guidance services",

      // Additional Contact Section
      "contact.subtitle":
        "Get in touch with us to learn more about our services and begin your spiritual journey",
      "contact.form.title": "Send us a Message",
      "contact.form.name.placeholder": "Your name",
      "contact.form.email.placeholder": "your.email@example.com",
      "contact.form.message.placeholder":
        "Tell us about your spiritual journey and how we can help...",

      // Footer Section
      "footer.brand": "Babul Ulum",
      "footer.subtitle": "Islamic Learning Centre",
      "footer.description":
        "Premium Islamic Learning & Spiritual Enlightenment Centre founded by Alfa Baba. Dedicated to spreading knowledge and fostering spiritual growth.",
      "footer.quickLinks": "Quick Links",
      "footer.services": "Our Services",
      "footer.contactInfo": "Contact Info",
      "footer.service1": "Mastery of Asrar",
      "footer.service2": "Guidance on Prayers",
      "footer.service3": "Astrology & Sciences",
      "footer.service4": "Personal Consultations",
      "footer.service5": "Spiritual Education",
      "footer.service6": "Illumination of personal signs",
      "footer.service7": "Adult education",
      "footer.service8": "Islamic lectures - public lectures",

      // Additional About Section - Legacy
      "about.legacy.title": "A Legacy of Excellence",
      "about.legacy.text1":
        "Founded by the esteemed Alfa Baba, Babul Ulum has been at the forefront of Islamic education and spiritual guidance. Our centre combines traditional Islamic wisdom with modern educational approaches to provide a comprehensive learning experience.",
      "about.legacy.text2":
        "We believe in the power of knowledge to transform lives and communities. Through our carefully designed programs and personalized approach, we help individuals develop a deeper connection with their faith and spirituality.",
      "about.stats.students": "Students",
      "about.stats.years": "Years",
      "about.stats.services": "Services",
      "about.wisdom.title": "Islamic Wisdom",
      "about.wisdom.subtitle":
        "Traditional knowledge meets modern understanding",

      // Additional Services Section - CTA
      "services.cta.title": "Ready to Begin Your Spiritual Journey?",
      "services.cta.text":
        "Contact us to learn more about our services and how we can help you on your path to spiritual enlightenment.",
      "services.cta.button": "Get Started Today",

      // Additional Contact Section
      "contact.getInTouch.title": "Get In Touch",
      "contact.getInTouch.text":
        "We're here to help you on your spiritual journey. Contact us through any of the following channels or fill out the form to get started.",
      "contact.location.title": "Location",
      "contact.location.address": "Islamic Learning Centre",
      "contact.location.country": "Kwara state, Nigeria",
      "contact.location.availability":
        "Available for online and in-person consultations",
      "contact.quick.title": "Ready to Start Your Journey?",
      "contact.quick.text":
        "Don't wait to begin your spiritual transformation. Contact us today and take the first step towards enlightenment.",
      "contact.quick.call": "Call Now",
      "contact.quick.whatsapp": "WhatsApp",
      "contact.quick.email": "Email",

      // Forum/Teachings
      "forum.title": "Babul Ulum's Forum",
      "forum.search.placeholder": "Search...",
      "forum.filter.clear": "Clear filter",
      "forum.featured": "Featured",
      "forum.noResults":
        "No teachings found. Try a different search or filter.",
      "forum.pagination.previous": "Previous",
      "forum.pagination.next": "Next",
      "forum.pagination.page": "Page",
      "forum.pagination.of": "of",
      "forum.loading": "Loading teachings...",
      "forum.viewAllFeatured": "View All Featured",
      "forum.viewAllTeachings": "View All Teachings",

      // Favorites
      "favorites.show": "Show Favorites",
      "favorites.hide": "Show All",
      "favorites.add": "Add to Favorites",
      "favorites.remove": "Remove from Favorites",
      "favorites.empty": "No favorite teachings yet.",

      // Comments
      "comments.title": "Comments",
      "comments.add": "Add Comment",
      "comments.name": "Name",
      "comments.email": "Email (optional)",
      "comments.content": "Comment",
      "comments.submit": "Post Comment",
      "comments.anonymous": "Anonymous",
      "comments.delete": "Delete",
      "comments.deleteConfirm": "Are you sure you want to delete this comment?",
      "comments.empty": "No comments yet. Be the first to comment!",
      "comments.posted": "Comment posted successfully!",
      "comments.error": "Failed to post comment. Please try again.",
      "comments.deleted": "Comment deleted successfully!",

      // Admin Actions
      "admin.pin": "Pin",
      "admin.unpin": "Unpin",
      "admin.edit": "Edit",
      "admin.delete": "Delete",
      "admin.deleteConfirm": "Are you sure you want to delete this teaching?",
      "admin.pinned": "Teaching pinned!",
      "admin.unpinned": "Teaching unpinned!",
      "admin.deleted": "Teaching deleted!",

      // Share
      "share.whatsapp": "WhatsApp",
      "share.twitter": "Twitter",
      "share.copy": "Copy Link",
      "share.copied": "Link copied!",
      "share.title": "Share",

      // Pagination
      "pagination.previous": "Previous",
      "pagination.next": "Next",

      // Forum additional
      "forum.allTeachings": "All Teachings",
      "latest_dailyUpdates": "Latest Daily Updates",

      // Tags (additional)
      "tags.Guide": "Guide",
      "tags.wise": "Wise",
      "tags.Prayer": "Prayer",
      "tags.life": "Life",
      "tags.year": "Year",
      // Types (additional)
     "types.Guide": "Guide",
"types.wise": "Wise",
"types.Prayer": "Prayer",
"types.life": "Life",
"types.year": "Year",
"forum.allDailyUpdates": "All Daily Updates",
    },
  },
  ar: {
    translation: {
      // Navigation
      "nav.home": "الرئيسية",
      "nav.about": "من نحن",
      "nav.services": "خدماتنا",
      "nav.contact": "اتصل بنا",
      "nav.bookshop": "المكتبة",
      "nav.dailyUpdates": "التحديثات اليومية",
      "dailyUpdates.title": "التحديثات اليومية",

      // Hero Section
      "hero.dua": "اللهم صلى على سيد السادات السعادات الهدات والبركات",
      "hero.symbolic": "☆آآآم#ااااھےو☆",
      "hero.tagline": "مركز تعليم إسلامي متميز للتنوير الروحي",
      "hero.cta": "تواصل معنا للتعليم الحصري",

      // About Section
      "about.title": "من نحن",
      "about.mission": "مهمتنا",
      "about.mission.text":
        "يتخصص مركز باب العلم للتعليم الإسلامي في تقديم المعرفة المتقدمة والتنوير الروحي من خلال نهج فريد في التعليم الإسلامي. مهمتنا الأساسية هي تمكين الأفراد من فهم أعمق للتعاليم الإسلامية والروحانية.",
      "about.vision": "رؤيتنا",
      "about.vision.text":
        "أن نكون المركز الرائد في التعليم الروحي الإسلامي، وتعزيز الفهم العميق والنمو الشخصي من خلال الحكمة التقليدية والنهج الحديثة.",

      // Services
      "services.title": "خدماتنا",
      "services.mastery": "إتقان الأسرار",
      "services.mastery.desc": "الأسرار الروحية المتقدمة والمعرفة الصوفية",
      "services.prayers": "إرشاد الصلوات",
      "services.prayers.desc": "تقنيات الصلاة القوية والممارسات الروحية",
      "services.astrology": "التنجيم والعلوم القديمة",
      "services.astrology.desc": "التنجيم الإسلامي التقليدي والحكمة القديمة",
      "services.nature": "دراسة الطبيعة البشرية",
      "services.nature.desc": "استكشاف عميق لعلم النفس البشري والروحانية",
      "services.consultations": "استشارات شخصية",
      "services.consultations.desc": "إرشاد روحي واستشارة فردية",
      "services.illumination": "إضاءة العلامات الشخصية",
      "services.illumination.desc": "فهم الرموز والعلامات الروحية الشخصية",
      "services.education": "التعليم للكبار",
      "services.education.desc": "اللغة العربية والدراسات الإسلامية للكبار",
      "services.preacher": "واعظ ومحاضر إسلامي",
      "services.preacher.desc":
        "الوعظ الإسلامي الاحترافي والمحاضرات والخطابة العامة",

      // Founder
      "founder.title": "المؤسس",
      "founder.name": "ألفا بابا",
      "founder.description":
        "عالم إسلامي مرموق ومرشد روحي مع عقود من الخبرة في التعليم الإسلامي والإرشاد الروحي.",

      // Contact
      "contact.title": "اتصل بنا",
      "contact.phone": "الهاتف",
      "contact.email": "البريد الإلكتروني",
      "contact.whatsapp": "واتساب",
      "contact.form.name": "الاسم",
      "contact.form.email": "البريد الإلكتروني",
      "contact.form.message": "الرسالة",
      "contact.form.send": "إرسال الرسالة",

      // Footer
      "footer.rights":
        "© 2025 Babul Ulum Islamic Learning Centre. All rights reserved.",
      "footer.powered": "مدعوم بواسطة Sageverse",

      // Language Toggle
      "lang.en": "English",
      "lang.ar": "العربية",
      "nav.toggleLanguage": "تبديل اللغة",

      // Tags
      "tags.faith": "الإيمان",
      "tags.spirituality": "الروحانية",
      "tags.prayer": "الصلاة",
      "tags.astrology": "التنجيم",
      "tags.guidance": "الإرشاد",
      "tags.education": "التعليم",
      "tags.community": "المجتمع",
      "tags.legacy": "الإرث",
      // Add more as needed

      // Types
      "types.article": "مقالة",
      "types.video": "فيديو",
      "types.audio": "صوت",
      "types.event": "حدث",
      // Add more as needed

      // Comments Show More/Less
      "comments.showMore": "عرض المزيد من التعليقات",
      "comments.showLess": "إخفاء المزيد من التعليقات",

      // Additional Hero Section
      "hero.brand": "باب العلم",
      "hero.subtitle": "مركز التعليم الإسلامي",
      "hero.explore": "استكشف تعاليمنا",

      // Additional About Section
      "about.community": "المجتمع",
      "about.community.text":
        "بناء مجتمع قوي وداعم من المتعلمين والباحثين عن المعرفة الروحية.",
      "about.excellence": "التميز",
      "about.excellence.text":
        "الحفاظ على أعلى معايير التعليم الإسلامي والإرشاد الروحي.",

      // Additional Founder Section
      "founder.achievements.scholar": "عالم مرموق",
      "founder.achievements.scholar.desc":
        "عالم إسلامي معترف به مع عقود من الخبرة",
      "founder.achievements.educator": "مربي خبير",
      "founder.achievements.educator.desc":
        "متخصص في الدراسات الإسلامية المتقدمة والإرشاد الروحي",
      "founder.achievements.leader": "قائد المجتمع",
      "founder.achievements.leader.desc": "مكرس لبناء مجتمعات إسلامية قوية",
      "founder.achievements.guide": "مرشد روحي",
      "founder.achievements.guide.desc": "مرشد موثوق للتطور والنمو الروحي",
      "founder.quote.title": "المؤسس والمرشد الروحي",
      "founder.quote.text":
        "المعرفة هي النور الذي يضيء الطريق إلى التنوير الروحي. من خلال التعليم والإرشاد، يمكننا تحويل الحياة وبناء مجتمعات أقوى.",
      "founder.description.extended":
        "مع فهم عميق للتقاليد الإسلامية والطرق التعليمية الحديثة، كرس ألفا بابا حياته لنشر المعرفة وتعزيز النمو الروحي. نهجه الفريد يجمع بين الحكمة التقليدية والرؤى المعاصرة، مما يجعل التعلم الإسلامي في متناول وذو معنى للطلاب من جميع الخلفيات.",
      "founder.cta.title": "تعلم من الأفضل",
      "founder.cta.text":
        "اختبر حكمة وإرشاد ألفا بابا من خلال برامجنا الشاملة للتعلم الإسلامي.",
      "founder.cta.button": "ابدأ رحلتك",

      // Additional Services Section
      "services.subtitle":
        "اكتشف مجموعة شاملة من خدمات التعلم الإسلامي والإرشاد الروحي",

      // Additional Contact Section
      "contact.subtitle":
        "تواصل معنا لمعرفة المزيد عن خدماتنا وبدء رحلتك الروحية",
      "contact.form.title": "أرسل لنا رسالة",
      "contact.form.name.placeholder": "اسمك",
      "contact.form.email.placeholder": "your.email@example.com",
      "contact.form.message.placeholder":
        "أخبرنا عن رحلتك الروحية وكيف يمكننا المساعدة...",

      // Footer Section
      "footer.brand": "باب العلم",
      "footer.subtitle": "مركز التعليم الإسلامي",
      "footer.description":
        "مركز تعليم إسلامي متميز للتنوير الروحي أسسه ألفا بابا. مكرس لنشر المعرفة وتعزيز النمو الروحي.",
      "footer.quickLinks": "روابط سريعة",
      "footer.services": "خدماتنا",
      "footer.contactInfo": "معلومات الاتصال",
      "footer.service1": "إتقان الأسرار",
      "footer.service2": "إرشاد الصلوات",
      "footer.service3": "التنجيم والعلوم",
      "footer.service4": "استشارات شخصية",
      "footer.service5": "التعليم الروحي",
      "footer.service6": "إضاءة العلامات الشخصية",
      "footer.service7": "التعليم للكبار",
      "footer.service8": "محاضرات إسلامية - محاضرات عامة",

      // Additional About Section - Legacy
      "about.legacy.title": "إرث من التميز",
      "about.legacy.text1":
        "أسسه المحترم ألفا بابا، كان باب العلم في طليعة التعليم الإسلامي والإرشاد الروحي. يجمع مركزنا بين الحكمة الإسلامية التقليدية والنهج التعليمية الحديثة لتقديم تجربة تعلم شاملة.",
      "about.legacy.text2":
        "نؤمن بقوة المعرفة في تحويل الحياة والمجتمعات. من خلال برامجنا المصممة بعناية ونهجنا الشخصي، نساعد الأفراد على تطوير اتصال أعمق بإيمانهم وروحانيتهم.",
      "about.stats.students": "طالب",
      "about.stats.years": "سنوات",
      "about.stats.services": "خدمات",
      "about.wisdom.title": "الحكمة الإسلامية",
      "about.wisdom.subtitle": "المعرفة التقليدية تلتقي بالفهم الحديث",

      // Additional Services Section - CTA
      "services.cta.title": "مستعد لبدء رحلتك الروحية؟",
      "services.cta.text":
        "تواصل معنا لمعرفة المزيد عن خدماتنا وكيف يمكننا مساعدتك في طريقك إلى التنوير الروحي.",
      "services.cta.button": "ابدأ اليوم",

      // Additional Contact Section
      "contact.getInTouch.title": "تواصل معنا",
      "contact.getInTouch.text":
        "نحن هنا لمساعدتك في رحلتك الروحية. تواصل معنا من خلال أي من القنوات التالية أو املأ النموذج للبدء.",
      "contact.location.title": "الموقع",
      "contact.location.address": "مركز التعليم الإسلامي",
      "contact.location.country": "ولاية كوارا، نيجيريا",
      "contact.location.availability": "متاح للاستشارات عبر الإنترنت والشخصية",
      "contact.quick.title": "مستعد لبدء رحلتك؟",
      "contact.quick.text":
        "لا تنتظر لبدء تحولك الروحي. تواصل معنا اليوم واتخذ الخطوة الأولى نحو التنوير.",
      "contact.quick.call": "اتصل الآن",
      "contact.quick.whatsapp": "واتساب",
      "contact.quick.email": "البريد الإلكتروني",

      // Forum/Teachings
      "forum.title": "منتدى باب العلم",
      "forum.search.placeholder": "البحث...",
      "forum.filter.clear": "مسح الفلتر",
      "forum.featured": "مميز",
      "forum.noResults": "لم يتم العثور على تعاليم. جرب بحث أو فلتر مختلف.",
      "forum.pagination.previous": "السابق",
      "forum.pagination.next": "التالي",
      "forum.pagination.page": "صفحة",
      "forum.pagination.of": "من",
      "forum.loading": "جاري تحميل التعاليم...",
      "forum.viewAllFeatured": "عرض جميع المميزة",
      "forum.viewAllTeachings": "عرض جميع التعاليم",

      // Favorites
      "favorites.show": "عرض المفضلة",
      "favorites.hide": "عرض الكل",
      "favorites.add": "إضافة إلى المفضلة",
      "favorites.remove": "إزالة من المفضلة",
      "favorites.empty": "لا توجد تعاليم مفضلة بعد.",

      // Comments
      "comments.title": "التعليقات",
      "comments.add": "إضافة تعليق",
      "comments.name": "الاسم",
      "comments.email": "البريد الإلكتروني (اختياري)",
      "comments.content": "التعليق",
      "comments.submit": "نشر التعليق",
      "comments.anonymous": "مجهول",
      "comments.delete": "حذف",
      "comments.deleteConfirm": "هل أنت متأكد من حذف هذا التعليق؟",
      "comments.empty": "لا توجد تعليقات بعد. كن أول من يعلق!",
      "comments.posted": "تم نشر التعليق بنجاح!",
      "comments.error": "فشل في نشر التعليق. يرجى المحاولة مرة أخرى.",
      "comments.deleted": "تم حذف التعليق بنجاح!",

      // Admin Actions
      "admin.pin": "تثبيت",
      "admin.unpin": "إلغاء التثبيت",
      "admin.edit": "تعديل",
      "admin.delete": "حذف",
      "admin.deleteConfirm": "هل أنت متأكد من حذف هذا التعليم؟",
      "admin.pinned": "تم تثبيت التعليم!",
      "admin.unpinned": "تم إلغاء تثبيت التعليم!",
      "admin.deleted": "تم حذف التعليم!",

      // Share
      "share.whatsapp": "واتساب",
      "share.twitter": "تويتر",
      "share.copy": "نسخ الرابط",
      "share.copied": "تم نسخ الرابط!",
      "share.title": "مشاركة",

      // Pagination
      "pagination.previous": "السابق",
      "pagination.next": "التالي",

      // Forum additional
      "forum.allTeachings": "جميع التعاليم",
      "latest_dailyUpdates": "أحدث التحديثات اليومية",

      // Tags (additional)
      "tags.Guide": "دليل",
      "tags.wise": "حكمة",
      "tags.Prayer": "صلاة",
      "tags.life": "الحياة",
      "tags.year": "سنة",
      // Types (additional)
      "types.Guide": "دليل",
      "types.wise": "حكمة",
      "types.Prayer": "صلاة",
      "types.life": "الحياة",
      "types.year": "سنة",
      "forum.allDailyUpdates": "جميع التحديثات اليومية",
      "contact.form.sendViaWhatsapp": "ابعت على واتساب",
    },
  },
  ha: {
    translation: {
    "forum.title": "Dandalin Babul Ulum",
    "forum.featured": "Fitattun",
    "forum.allTeachings": "Dukkan Koyarwa",
    "comments.add": "Ƙara Sharhi",
      // Navigation
      "nav.home": "Gida",
      "nav.about": "Game da Mu",
      "nav.services": "Ayyuka",
      "nav.contact": "Tuntube Mu",
      "nav.bookshop": "Littattafai",
      "nav.dailyUpdates": "Sabbin Labarai",
      "dailyUpdates.title": "Sabbin Labarai",

      // Hero Section
      "hero.dua": "Allahumma ka albarka ga shugaban shugabanni, masu albarka da shiriya",
      "hero.symbolic": "☆Amin#Amin☆",
      "hero.tagline": "Cibiyar Koyon Addinin Musulunci da Hasken Ruhaniya",
      "hero.cta": "Tuntube mu don koyarwa na musamman",
      "hero.brand": "Babul Ulum",
      "hero.subtitle": "Cibiyar Koyon Addinin Musulunci",
      "hero.explore": "Bincika Koyarwarmu",

      // About Section
      "about.title": "Game da Mu",
      "about.mission": "Manufarmu",
      "about.mission.text": "Cibiyar Babu-l-Ulum ta Musulunci na ba da ilimi mai zurfi da hasken ruhaniya ta hanyar hanyar koyarwa ta musamman. Manufarmu ita ce karfafa mutane da fahimtar zurfin koyarwar Musulunci da ruhaniya.",
      "about.vision": "Ganinmu",
      "about.vision.text": "Zamowa cibiyar jagora wajen koyar da ruhaniya ta Musulunci, da karfafa fahimta da ci gaban mutum ta hanyar hikima da zamani.",
      "about.community": "Al'umma",
      "about.community.text": "Gina al'umma mai karfi da goyon baya ga masu neman ilimi da ruhaniya.",
      "about.excellence": "Girma",
      "about.excellence.text": "Kiyaye mafi kyawun matakin ilimin Musulunci da shiriya ta ruhaniya.",
      "about.legacy.title": "Gado na Girma",
      "about.legacy.text1": "An kafa Babul Ulum daga Alfa Baba, cibiyar koyarwa da shiriya ta Musulunci. Muna hade hikimar gargajiya da hanyoyin zamani don samar da ilimi mai zurfi.",
      "about.legacy.text2": "Muna da yakinin cewa ilimi na iya canza rayuwa da al'umma. Ta hanyar shirye-shiryenmu da kulawa ta musamman, muna taimakawa mutane su kara kusanci da addininsu da ruhiyarsu.",
      "about.stats.students": "Dalibai",
      "about.stats.years": "Shekaru",
      "about.stats.services": "Ayyuka",
      "about.wisdom.title": "Hikimar Musulunci",
      "about.wisdom.subtitle": "Hikimar gargajiya da fahimtar zamani",

      // Services
      "services.title": "Ayyukanmu",
      "services.mastery": "Kwarewa a Asrar",
      "services.mastery.desc": "Sirrin ruhaniya da ilimin asiri mai zurfi",
      "services.prayers": "Jagora a Addu'o'i",
      "services.prayers.desc": "Hanyoyin addu'a masu karfi da ayyukan ruhaniya",
      "services.astrology": "Ilmin Taurari da Kimiyyar Gargajiya",
      "services.astrology.desc": "Taurari na Musulunci da hikimar gargajiya",
      "services.nature": "Nazarin Halayyar Dan Adam",
      "services.nature.desc": "Bincike mai zurfi a halayyar dan adam da ruhaniya",
      "services.consultations": "Shawarwari na Musamman",
      "services.consultations.desc": "Jagora da shawarwari na ruhaniya kai tsaye",
      "services.illumination": "Bayyanar Alamu na Kai",
      "services.illumination.desc": "Fahimtar alamun ruhaniya na mutum",
      "services.education": "Ilimin Manya",
      "services.education.desc": "Koyon harshen Larabci da ilimin Musulunci ga manya",
      "services.preacher": "Wa'azin Musulunci - Wa'azin Jama'a",
      "services.preacher.desc": "Wa'azi da karatu na Musulunci ga jama'a",
      "services.subtitle": "Gano ayyukanmu na koyarwa da shiriya ta ruhaniya",
      "services.cta.title": "Shirye kake ka fara tafiyar ruhaniya?",
      "services.cta.text": "Tuntube mu don karin bayani kan ayyukanmu da yadda zamu taimaka maka.",
      "services.cta.button": "Fara Yau",

      // Founder
      "founder.title": "Mai Kafa",
      "founder.name": "Alfa Baba",
      "founder.description": "Shahararren malamin Musulunci da mai shiriya na ruhaniya da shekaru da dama na kwarewa.",
      "founder.achievements.scholar": "Malami Sananne",
      "founder.achievements.scholar.desc": "Malamin Musulunci da aka sani da shekaru na kwarewa",
      "founder.achievements.educator": "Kwararren Malami",
      "founder.achievements.educator.desc": "Kwararre a ilimin Musulunci da shiriya ta ruhaniya",
      "founder.achievements.leader": "Jagoran Al'umma",
      "founder.achievements.leader.desc": "Mai sadaukarwa wajen gina al'umma mai karfi",
      "founder.achievements.guide": "Jagoran Ruhaniya",
      "founder.achievements.guide.desc": "Aminin shiriya da ci gaban ruhaniya",
      "founder.quote.title": "Mai Kafa & Jagoran Ruhaniya",
      "founder.quote.text": "Ilimi haske ne da ke haskaka hanyar zuwa hasken ruhaniya. Ta hanyar ilimi da shiriya, zamu iya canza rayuwa da gina al'umma mai karfi.",
      "founder.description.extended": "Tare da fahimta mai zurfi a al'adun Musulunci da hanyoyin zamani, Alfa Baba ya sadaukar da rayuwarsa wajen yada ilimi da bunkasa ruhaniya. Hanyarsa ta musamman na hade hikimar gargajiya da fahimtar zamani don saukaka ilimin Musulunci ga kowa.",
      "founder.cta.title": "Koyi daga Mafi Kyau",
      "founder.cta.text": "Sami hikima da shiriya daga Alfa Baba ta shirye-shiryenmu na koyarwa na Musulunci.",
      "founder.cta.button": "Fara Tafiyarka",

      // Contact
      "contact.title": "Tuntube Mu",
      "contact.phone": "Waya",
      "contact.email": "Imel",
      "contact.whatsapp": "WhatsApp",
      "contact.form.name": "Suna",
      "contact.form.email": "Imel",
      "contact.form.message": "Sako",
      "contact.form.send": "Aika Sako",
      "contact.subtitle": "Tuntube mu don karin bayani kan ayyukanmu da fara tafiyar ruhaniya",
      "contact.form.title": "Aika mana Sako",
      "contact.form.name.placeholder": "Sunan ka",
      "contact.form.email.placeholder": "imel.dinka@example.com",
      "contact.form.message.placeholder": "Fada mana game da tafiyarka da yadda zamu taimaka...",
      "contact.getInTouch.title": "Tuntube Mu",
      "contact.getInTouch.text": "Muna nan don taimaka maka a tafiyarka ta ruhaniya. Tuntube mu ta kowanne hanya ko cike fom din don farawa.",
      "contact.location.title": "Wuri",
      "contact.location.address": "Cibiyar Koyon Musulunci",
      "contact.location.country": "Jihar Kwara, Najeriya",
      "contact.location.availability": "Akwai don shawarwari ta yanar gizo da kai tsaye",
      "contact.quick.title": "Shirye kake ka fara tafiyarka?",
      "contact.quick.text": "Kada ka jira ka fara sauyawa. Tuntube mu yau ka dauki mataki na farko.",
      "contact.quick.call": "Kira Yanzu",
      "contact.quick.whatsapp": "WhatsApp",
      "contact.quick.email": "Imel",

      // Footer
      "footer.rights": "© 2025 Babul Ulum Islamic Learning Centre. Dukkan hakkoki na ajiye.",
      "footer.powered": "Taimakawa daga Sageverse",
      "footer.brand": "Babul Ulum",
      "footer.subtitle": "Cibiyar Koyon Musulunci",
      "footer.description": "Cibiyar koyarwa da hasken ruhaniya ta Musulunci da Alfa Baba ya kafa. Sadaukar da kai wajen yada ilimi da bunkasa ruhaniya.",
      "footer.quickLinks": "Hanyoyi masu sauri",
      "footer.services": "Ayyukanmu",
      "footer.contactInfo": "Bayanan Tuntuba",
      "footer.service1": "Kwarewa a Asrar",
      "footer.service2": "Jagora a Addu'o'i",
      "footer.service3": "Ilmin Taurari da Kimiyya",
      "footer.service4": "Shawarwari na Musamman",
      "footer.service5": "Ilimin Ruhaniya",
      "footer.service6": "Bayyanar Alamu na Kai",
      "footer.service7": "Ilimin Manyan",
      "footer.service8": "Wa'azin Musulunci - Wa'azin Jama'a",
      "contact.form.sendViaWhatsapp": "Aika ta WhatsApp",
      "forum.allDailyUpdates": "Dukkan Sabbin Labarai",
      "latest_dailyUpdates": "Sabbin Labarai na Kwana-Kwana",
    },
  },
  fr: {
    translation: {
      // Navigation
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "nav.bookshop": "Librairie",
      "nav.dailyUpdates": "Mises à jour quotidiennes",
      "dailyUpdates.title": "Mises à jour quotidiennes",

      // Hero Section
      "hero.dua":
        "Allahuma shali ʿala sidi al-sadaati al-saʿadaati al-hadati wa-al-baraka",
      "hero.symbolic": "☆آآآم#ااااھےو☆",
      "hero.tagline":
        "Centre de formation islamique et développement spirituel premium",
      "hero.cta": "Contactez-nous pour une enseignement exclusif",

      // About Section
      "about.title": "À propos",
      "about.mission": "Notre mission",
      "about.mission.text":
        "Le Centre de formation Babu-l-Ulum s'efforce de proposer une connaissance avancée et l'illumination spirituelle à travers une approche unique de l'éducation islamique. Notre mission fondamentale est de donner aux individus une compréhension plus profonde des enseignements islamiques et de la spiritualité.",
      "about.vision": "Notre vision",
      "about.vision.text":
        "Être le centre de référence en matière d'éducation spirituelle islamique, favoriser une compréhension profonde et le développement personnel à travers la sagesse traditionnelle et les approches modernes.",

      // Services
      "services.title": "Nos services",
      "services.mastery": "Maîtrise des secrets",
      "services.mastery.desc":
        "Secrets spirituels avancés et connaissance mystique",
      "services.prayers": "Guidance sur les prières",
      "services.prayers.desc":
        "Techniques de prière puissantes et pratiques spirituelles",
      "services.astrology": "Astrologie et sciences anciennes",
      "services.astrology.desc":
        "Astrologie islamique traditionnelle et sagesse ancienne",
      "services.nature": "Étude de la nature humaine",
      "services.nature.desc":
        "Exploration approfondie de la psychologie et de la spiritualité humaine",
      "services.consultations": "Consultations personnalisées",
      "services.consultations.desc": "Guidance et conseils individuels",
      "services.illumination": "Éclairage des signes personnels",
      "services.illumination.desc":
        "Compréhension des symboles et des signes spirituels personnels",
      "services.education": "Éducation adulte",
      "services.education.desc":
        "Langue arabe et études islamiques pour les adultes",
      "services.preacher": "Conférences islamiques - conférences publiques",
      "services.preacher.desc":
        "Prédication et conférences islamiques professionnelles et discours publics",

      // Founder
      "founder.title": "Fondateur",
      "founder.name": "Alfa Baba",
      "founder.description":
        "Un savant islamique renommé et un guide spirituel avec des décennies d'expérience dans l'éducation islamique et le conseil spirituel.",

      // Contact
      "contact.title": "Contactez-nous",
      "contact.phone": "Téléphone",
      "contact.email": "Email",
      "contact.whatsapp": "WhatsApp",
      "contact.form.name": "Nom",
      "contact.form.email": "Email",
      "contact.form.message": "Message",
      "contact.form.send": "Envoyer le message",

      // Footer
      "footer.rights":
        "© 2025 Babul Ulum Islamic Learning Centre. All rights reserved.",
      "footer.powered": "Propulsé par Sageverse",

      // Language Toggle
      "lang.en": "Anglais",
      "lang.ar": "Arabe",
      "nav.toggleLanguage": "Basculer la langue",

      // Tags
      "tags.faith": "Foi",
      "tags.spirituality": "Spirituel",
      "tags.prayer": "Prière",
      "tags.astrology": "Astrologie",
      "tags.guidance": "Guidance",
      "tags.education": "Éducation",
      "tags.community": "Communauté",
      "tags.legacy": "Héritage",
      // Add more as needed

      // Types
      "types.article": "Article",
      "types.video": "Vidéo",
      "types.audio": "Audio",
      "types.event": "Événement",
      // Add more as needed

      // Comments Show More/Less
      "comments.showMore": "Afficher plus de commentaires",
      "comments.showLess": "Masquer plus de commentaires",

      // Additional Hero Section
      "hero.brand": "Babul Ulum",
      "hero.subtitle": "Centre de formation islamique",
      "hero.explore": "Explorez nos enseignements",

      // Additional About Section
      "about.community": "Communauté",
      "about.community.text":
        "Construction d'une communauté forte et soutenue de chercheurs et d'apprenants de la spiritualité.",
      "about.excellence": "Excellence",
      "about.excellence.text":
        "Maintien des normes les plus élevées en matière d'éducation islamique et de conseils spirituels.",

      // Additional Founder Section
      "founder.achievements.scholar": "Savant renommé",
      "founder.achievements.scholar.desc":
        "Savant islamique reconnu avec des décennies d'expérience",
      "founder.achievements.educator": "Éducateur expert",
      "founder.achievements.educator.desc":
        "Spécialisé dans les études islamiques avancées et le conseil spirituel",
      "founder.achievements.leader": "Leader de la communauté",
      "founder.achievements.leader.desc":
        "Dédié à la construction de communautés islamiques fortes",
      "founder.achievements.guide": "Guide spirituel",
      "founder.achievements.guide.desc":
        "Mentor de confiance pour le développement et le croissance spirituelle",
      "founder.quote.title": "Fondateur et guide spirituel",
      "founder.quote.text":
        "La connaissance est la lumière qui éclaire le chemin vers l'illumination spirituelle. À travers l'éducation et le conseil, nous pouvons transformer les vies et construire des communautés plus fortes.",
      "founder.description.extended":
        "Avec une compréhension profonde des traditions islamiques et des méthodes d'éducation modernes, Alfa Baba a consacré sa vie à la diffusion de la connaissance et au développement de la spiritualité. Son approche unique combine la sagesse traditionnelle avec les perspectives contemporaines, ce qui rend l'apprentissage islamique accessible et significatif pour les étudiants de toutes les origines.",
      "founder.cta.title": "Apprenez des meilleurs",
      "founder.cta.text":
        "Expériencez la sagesse et le conseil d'Alfa Baba à travers nos programmes de formation islamique complets.",
      "founder.cta.button": "Démarrez votre voyage",

      // Additional Services Section
      "services.subtitle":
        "Découvrez notre gamme complète de services de formation islamique et de soutien spirituel",

      // Additional Contact Section
      "contact.subtitle":
        "Contactez-nous pour en savoir plus sur nos services et pour commencer votre voyage spirituel",
      "contact.form.title": "Envoyez-nous un message",
      "contact.form.name.placeholder": "Votre nom",
      "contact.form.email.placeholder": "votre.email@example.com",
      "contact.form.message.placeholder":
        "Dites-nous votre voyage spirituel et comment nous pouvons vous aider...",

      // Footer Section
      "footer.brand": "Babul Ulum",
      "footer.subtitle": "Centre de formation islamique",
      "footer.description":
        "Centre de formation islamique premium fondé par Alfa Baba. Dédié à la diffusion de la connaissance et au développement de la spiritualité.",
      "footer.quickLinks": "Liens rapides",
      "footer.services": "Nos services",
      "footer.contactInfo": "Informations de contact",
      "footer.service1": "Maîtrise des secrets",
      "footer.service2": "Guidance sur les prières",
      "footer.service3": "Astrologie et sciences",
      "footer.service4": "Consultations personnalisées",
      "footer.service5": "Éducation spirituelle",
      "footer.service6": "Éclairage des signes personnels",
      "footer.service7": "Éducation adulte",
      "footer.service8": "Prédicateur / Conférencier islamique",

      // Additional About Section - Legacy
      "about.legacy.title": "Héritage de l'excellence",
      "about.legacy.text1":
        "Fondé par l'illustre Alfa Baba, Babul Ulum a été au premier plan de l'éducation islamique et du conseil spirituel. Notre centre combine la sagesse islamique traditionnelle avec des approches d'éducation modernes pour offrir une expérience d'apprentissage complète.",
      "about.legacy.text2":
        "Nous croyons dans la puissance de la connaissance pour transformer les vies et les communautés. À travers nos programmes soigneusement conçus et notre approche personnalisée, nous aidons les individus à développer une connexion plus profonde avec leur foi et leur spiritualité.",
      "about.stats.students": "Étudiants",
      "about.stats.years": "Années",
      "about.stats.services": "Services",
      "about.wisdom.title": "Sagesse islamique",
      "about.wisdom.subtitle":
        "La connaissance traditionnelle rencontre la compréhension moderne",

      // Additional Services Section - CTA
      "services.cta.title": "Prêt à commencer votre voyage spirituel ?",
      "services.cta.text":
        "Contactez-nous pour en savoir plus sur nos services et comment nous pouvons vous aider sur votre chemin vers l'illumination spirituelle.",
      "services.cta.button": "Commencez aujourd'hui",

      // Additional Contact Section
      "contact.getInTouch.title": "Contactez-nous",
      "contact.getInTouch.text":
        "Nous sommes là pour vous aider sur votre voyage spirituel. Contactez-nous via l'une des voies suivantes ou remplissez le formulaire pour commencer.",
      "contact.location.title": "Emplacement",
      "contact.location.address": "Centre de formation islamique",
      "contact.location.country": "État de Kwara, Nigéria",
      "contact.location.availability":
        "Disponible pour des consultations en ligne et en personne",
      "contact.quick.title": "Prêt à commencer ?",
      "contact.quick.text":
        "N'attendez pas pour commencer votre transformation spirituelle. Contactez-nous aujourd'hui et prenez la première étape vers l'illumination.",
      "contact.quick.call": "Appel maintenant",
      "contact.quick.whatsapp": "WhatsApp",
      "contact.quick.email": "Email",

      // Forum/Teachings
      "forum.title": "Forum de Babul Ulum",
      "forum.search.placeholder": "Recherche...",
      "forum.filter.clear": "Effacer le filtre",
      "forum.featured": "En vedette",
      "forum.noResults":
        "Aucune leçon trouvée. Essayez une recherche ou un filtre différent.",
      "forum.pagination.previous": "Précédent",
      "forum.pagination.next": "Suivant",
      "forum.pagination.page": "Page",
      "forum.pagination.of": "de",
      "forum.loading": "Chargement des leçons...",
      "forum.viewAllFeatured": "Voir toutes les en vedette",
      "forum.viewAllTeachings": "Voir toutes les leçons",

      // Favorites
      "favorites.show": "Afficher les favoris",
      "favorites.hide": "Afficher tout",
      "favorites.add": "Ajouter aux favoris",
      "favorites.remove": "Supprimer des favoris",
      "favorites.empty": "Aucune leçon favorite trouvée.",

      // Comments
      "comments.title": "Commentaires",
      "comments.add": "Ajouter un commentaire",
      "comments.name": "Nom",
      "comments.email": "Email (optionnel)",
      "comments.content": "Commentaire",
      "comments.submit": "Publier le commentaire",
      "comments.anonymous": "Anonyme",
      "comments.delete": "Supprimer",
      "comments.deleteConfirm":
        "Êtes-vous sûr de vouloir supprimer ce commentaire ?",
      "comments.empty":
        "Aucun commentaire pour le moment. Soyez le premier à commenter !",
      "comments.posted": "Commentaire publié avec succès !",
      "comments.error":
        "Échec de la publication du commentaire. Veuillez réessayer.",
      "comments.deleted": "Commentaire supprimé avec succès !",

      // Admin Actions
      "admin.pin": "Épingler",
      "admin.unpin": "Désépingler",
      "admin.edit": "Modifier",
      "admin.delete": "Supprimer",
      "admin.deleteConfirm": "Êtes-vous sûr de vouloir supprimer cette leçon ?",
      "admin.pinned": "Leçon épinglée !",
      "admin.unpinned": "Leçon désépinglée !",
      "admin.deleted": "Leçon supprimée !",

      // Share
      "share.whatsapp": "WhatsApp",
      "share.twitter": "Twitter",
      "share.copy": "Copier le lien",
      "share.copied": "Lien copié !",
      "share.title": "Partager",

      // Pagination
      "pagination.previous": "Précédent",
      "pagination.next": "Suivant",

      // Forum additional
      "forum.allTeachings": "Toutes les leçons",
      "latest_dailyUpdates": "Dernières mises à jour quotidiennes",

      // Tags (additional)
      "tags.Guide": "Guide",
      "tags.wise": "Sage",
      "tags.Prayer": "Prière",
      "tags.life": "Vie",
      "tags.year": "Année",
      // Types (additional)
      "types.Guide": "Guide",
      "types.wise": "Sage",
      "types.Prayer": "Prière",
      "types.life": "Vie",
      "types.year": "Année",
      "forum.allDailyUpdates": "Toutes les mises à jour quotidiennes",
      "contact.form.sendViaWhatsapp": "Envoyer via WhatsApp",
    },
  },
  eg: {
    translation: {
    "forum.allTeachings": "كل الدروس",
    "comments.add": "أضف تعليق",
"lang.eg":"مصري",
"lang.en":"إنجليزي",
"lang.ar":"عربي",
"lang.ha":"هوسا",
"lang.fr":"فرنسي",
//Navigation
"nav.home":"الرئيسية",
"nav.about":"عننا",
"nav.services":"الخدمات",
"nav.contact":"اتصلبينا",
"nav.bookshop":"مكتبةالكتب",
"nav.dailyUpdates":"تحديثاتيومية",
"dailyUpdates.title":"تحديثاتيومية",
//HeroSection
"hero.dua":"اللهمصليعلىسيدالساداتالسعاداتالهداتوالبركات",
"hero.symbolic":"☆آآآم#ااااھےو☆",
"hero.tagline":"مركزتعليمإسلاميمميزللتنويرالروحي",
"hero.cta":"ابعتلنالوعايزتتعلمخصوصي",
"hero.brand":"بابالعلم",
"hero.subtitle":"مركزالتعليمالإسلامي",
"hero.explore":"استكشفتعاليمنا",
//AboutSection
"about.title":"عننا",
"about.mission":"مهمتنا",
"about.mission.text":"مركزبابالعلمبيعلمالناسالدينوالمعرفةالروحيةبطريقةمميزة.هدفنانساعدكلواحديفهمدينهوروحهأكتر.",
"about.vision":"رؤيتنا",
"about.vision.text":"نكونالمركزالأولفيالتعليمالروحيالإسلاميونساعدالناسيكبرواويفهمواأكتر.",
"about.community":"المجتمع",
"about.community.text":"بنينامجتمعقويبيدعمكلالليعايزيتعلمويدورعلىالروحانية.",
"about.excellence":"التميز",
"about.excellence.text":"دايمًابنحافظعلىأعلىمستوىفيالتعليموالإرشادالروحي.",
"about.legacy.title":"إرثمنالتميز",
"about.legacy.text1":"بابالعلممنتأسيسألفابابا،دايمًافيالمقدمةفيالتعليمالإسلاميوالإرشادالروحي.بنجمعبينالحكمةالقديمةوالطريقةالحديثة.",
"about.legacy.text2":"بنؤمنإنالعلميغيرالحياةوالمجتمع.ببرامجناالمميزةوبنهتمبكلشخص،بنساعدالناسيقربوامندينهموروحهم.",
"about.stats.students":"طلاب",
"about.stats.years":"سنين",
"about.stats.services":"خدمات",
"about.wisdom.title":"حكمةإسلامية",
"about.wisdom.subtitle":"الحكمةالقديمةبتقابلالفهمالحديث",
//Services
"services.title":"خدماتنا",
"services.mastery":"إتقانالأسرار",
"services.mastery.desc":"أسرارروحيةمتقدمةومعرفةصوفية",
"services.prayers":"إرشادالصلوات",
"services.prayers.desc":"طرقصلاةقويةوممارساتروحية",
"services.astrology":"التنجيموالعلومالقديمة",
"services.astrology.desc":"تنجيمإسلاميتقليديوحكمةقديمة",
"services.nature":"دراسةالطبيعةالبشرية",
"services.nature.desc":"استكشافعميقلعلمالنفسالبشريوالروحانية",
"services.consultations":"استشاراتشخصية",
"services.consultations.desc":"إرشادروحيواستشارةفردية",
"services.illumination":"إضاءةالعلاماتالشخصية",
"services.illumination.desc":"فهمالرموزوالعلاماتالروحيةالشخصية",
"services.education":"تعليمالكبار",
"services.education.desc":"اللغةالعربيةوالدراساتالإسلاميةللكبار",
"services.preacher":"محاضراتإسلامية-محاضراتعامة",
"services.preacher.desc":"الوعظالإسلاميوالمحاضراتوالخطابةالعامة",
"services.subtitle":"اكتشفكلخدماتنافيالتعليمالإسلاميوالإرشادالروحي",
"services.cta.title":"جاهزتبدأرحلتكالروحية؟",
"services.cta.text":"اتصلبيناتعرفأكترعنخدماتناوإزاينقدرنساعدك.",
"services.cta.button":"ابدأدلوقتي",
//Founder
"founder.title":"المؤسس",
"founder.name":"ألفابابا",
"founder.description":"عالمإسلاميمعروفومرشدروحيبخبرةسنينطويلة.",
"founder.achievements.scholar":"عالممعروف",
"founder.achievements.scholar.desc":"عالمإسلاميمعترفبيهبخبرةسنين",
"founder.achievements.educator":"مدرسخبير",
"founder.achievements.educator.desc":"متخصصفيالدراساتالإسلاميةوالإرشادالروحي",
"founder.achievements.leader":"قائدمجتمع",
"founder.achievements.leader.desc":"مكرسلبناءمجتمعإسلاميقوي",
"founder.achievements.guide":"مرشدروحي",
"founder.achievements.guide.desc":"مرشدموثوقللتطورالروحي",
"founder.quote.title":"المؤسسوالمرشدالروحي",
"founder.quote.text":"العلمنوربينورطريقكللروحانية.بالتعليموالإرشادنقدرنغيرالحياةونبنيمجتمعأقوى.",
"founder.description.extended":"بفهمعميقللتقاليدالإسلاميةوالطرقالحديثة،ألفاباباكرسحياتهلنشرالعلموتطويرالروحانية.طريقتهبتجمعبينالحكمةالقديمةوالفهمالحديث،وبتخليالتعليمالإسلاميسهلومفيدلكلالناس.",
"founder.cta.title":"اتعلممنالأفضل",
"founder.cta.text":"جربحكمةوإرشادألفابابامنخلالبرامجناالكاملةللتعليمالإسلامي.",
"founder.cta.button":"ابدأرحلتك",
//Contact
"contact.title":"اتصلبينا",
"contact.phone":"تليفون",
"contact.email":"إيميل",
"contact.whatsapp":"واتساب",
"contact.form.name":"اسمك",
"contact.form.email":"إيميل",
"contact.form.message":"رسالتك",
"contact.form.send":"ابعترسالة",
"contact.form.sendViaWhatsapp":"ابعتعلىواتساب",
"contact.subtitle":"اتصلبيناتعرفأكترعنخدماتناوابدأرحلتكالروحية",
"contact.form.title":"ابعتلنارسالة",
"contact.form.name.placeholder":"اسمكهنا",
"contact.form.email.placeholder":"email@example.com",
"contact.form.message.placeholder":"احكيلناعنرحلتكوإزاينقدرنساعدك...",
"contact.getInTouch.title":"اتواصلمعانا",
"contact.getInTouch.text":"احناهنانساعدكفيرحلتكالروحية.اتواصلمعانابأيطريقةأوابعتلناعلىالفورم.",
"contact.location.title":"العنوان",
"contact.location.address":"مركزالتعليمالإسلامي",
"contact.location.country":"محافظةكوارا،نيجيريا",
"contact.location.availability":"متاحللاستشاراتأونلاينأوفيالمركز",
"contact.quick.title":"جاهزتبدأ؟",
"contact.quick.text":"مستنيإيه؟اتصلبيناوابدأرحلتكالروحيةالنهاردة.",
"contact.quick.call":"اتصلدلوقتي",
"contact.quick.whatsapp":"واتساب",
"contact.quick.email":"إيميل",
//Footer
"footer.rights":"©2025بابالعلم.كلالحقوقمحفوظة.",
"footer.powered":"بدعممنSageverse",
"footer.brand":"بابالعلم",
"footer.subtitle":"مركزالتعليمالإسلامي",
"footer.description":"مركزتعليمإسلاميمميزأسسهألفابابا.بننشرالعلموبنطورالروحانية.",
"footer.quickLinks":"روابطسريعة",
"footer.services":"خدماتنا",
"footer.contactInfo":"معلوماتالتواصل",
"footer.service1":"إتقانالأسرار",
"footer.service2":"إرشادالصلوات",
"footer.service3":"التنجيموالعلوم",
"footer.service4":"استشاراتشخصية",
"footer.service5":"تعليمروحي",
"footer.service6":"إضاءةالعلاماتالشخصية",
"footer.service7":"تعليمالكبار",
"footer.service8":"محاضراتإسلامية-محاضراتعامة",
//Forum/Teachings
"forum.title":"منتدىبابالعلم",
"forum.search.placeholder":"ابحث...",
"forum.filter.clear":"امسحالفلتر",
"forum.featured":"مميز",
"forum.noResults":"ملقيناشدروس.جربتدورأوفلترتاني.",
"forum.pagination.previous":"السابق",
"forum.pagination.next":"التالي",
"forum.pagination.page":"صفحة",
"forum.pagination.of":"من",
"forum.loading":"جاريتحميلالدروس...",
"forum.viewAllFeatured":"شوفكلالمميز",
"forum.viewAllTeachings":"شوفكلالدروس",
"forum.allDailyUpdates":"كلالتحديثاتاليومية",
"latest_dailyUpdates":"أحدثالتحديثاتاليومية",
//Favorites
"favorites.show":"عرضالمفضلة",
"favorites.hide":"عرضالكل",
"favorites.add":"أضفللمفضلة",
"favorites.remove":"شيلمنالمفضلة",
"favorites.empty":"مفيشدروسمفضلةلسه.",
//Comments
"comments.title":"تعليقات",
"comments.name":"اسم",
"comments.email":"إيميل(اختياري)",
"comments.content":"تعليق",
"comments.submit":"انشرالتعليق",
"comments.anonymous":"مجهول",
"comments.delete":"حذف",
"comments.deleteConfirm":"متأكدإنكعايزتحذفالتعليقده؟",
"comments.empty":"مفيشتعليقاتلسه.كنأولواحديعلق!",
"comments.posted":"تمنشرالتعليق!",
"comments.error":"فشلفينشرالتعليق.حاولتاني.",
"comments.deleted":"تمحذفالتعليق!",
//AdminActions
"admin.pin":"تثبيت",
"admin.unpin":"إلغاءالتثبيت",
"admin.edit":"تعديل",
"admin.delete":"حذف",
"admin.deleteConfirm":"متأكدإنكعايزتحذفالدرسده؟",
"admin.pinned":"تمتثبيتالدرس!",
"admin.unpinned":"تمإلغاءتثبيتالدرس!",
"admin.deleted":"تمحذفالدرس!",
//Share
"share.whatsapp":"واتساب",
"share.twitter":"تويتر",
"share.copy":"انسخالرابط",
"share.copied":"تمنسخالرابط!",
"share.title":"مشاركة",
//Pagination
"pagination.previous":"السابق",
"pagination.next":"التالي",
//Tags(additional)
"tags.Guide":"دليل",
"tags.wise":"حكمة",
"tags.Prayer":"صلاة",
"tags.life":"حياة",
"tags.year":"سنة",
//Types(additional)
"types.Guide":"دليل",
"types.wise":"حكمة",
"types.Prayer":"صلاة",
"types.life":"حياة",
"types.year":"سنة",
}
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
