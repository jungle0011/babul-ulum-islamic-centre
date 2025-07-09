import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.contact': 'Contact',
      'nav.bookshop': 'Bookshop',
      'nav.teachings': 'Teachings',
      'teachings.title': 'Teachings',
      
      // Hero Section
      'hero.dua': 'اللهم صلى على سيد السادات السعادات الهدات والبركات',
      'hero.symbolic': '☆آآآم#ااااھےو☆',
      'hero.tagline': 'Premium Islamic Learning & Spiritual Enlightenment Centre',
      'hero.cta': 'DM us for exclusive teaching',
      
      // About Section
      'about.title': 'About Us',
      'about.mission': 'Our Mission',
      'about.mission.text': 'The Babu-l-Ulum Islamic Learning Centre specializes in offering advanced knowledge and spiritual enlightenment through a unique approach to Islamic education. Our core mission is to empower individuals with a deeper understanding of Islamic teachings and spirituality.',
      'about.vision': 'Our Vision',
      'about.vision.text': 'To be the leading centre for Islamic spiritual education, fostering deep understanding and personal growth through traditional wisdom and modern approaches.',
      
      // Services
      'services.title': 'Our Services',
      'services.mastery': 'Mastery of Asrar',
      'services.mastery.desc': 'Advanced spiritual secrets and mystical knowledge',
      'services.prayers': 'Guidance on Prayers',
      'services.prayers.desc': 'Powerful prayer techniques and spiritual practices',
      'services.astrology': 'Astrology & Ancient Sciences',
      'services.astrology.desc': 'Traditional Islamic astrology and ancient wisdom',
      'services.nature': 'Human Nature Study',
      'services.nature.desc': 'Deep exploration of human psychology and spirituality',
      'services.consultations': 'Personalized Consultations',
      'services.consultations.desc': 'One-on-one spiritual guidance and counseling',
      'services.illumination': 'Illumination of Personal Signs',
      'services.illumination.desc': 'Understanding personal spiritual symbols and signs',
      'services.education': 'Adult Education',
      'services.education.desc': 'Arabic language and Islamic studies for adults',
      'services.preacher': 'Islamic Preacher / Lecturer',
      'services.preacher.desc': 'Professional Islamic preaching, lectures, and public speaking',
      
      // Founder
      'founder.title': 'Founder',
      'founder.name': 'Alfa Baba',
      'founder.description': 'A renowned Islamic scholar and spiritual guide with decades of experience in Islamic education and spiritual counseling.',
      
      // Contact
      'contact.title': 'Contact Us',
      'contact.phone': 'Phone',
      'contact.email': 'Email',
      'contact.whatsapp': 'WhatsApp',
      'contact.form.name': 'Name',
      'contact.form.email': 'Email',
      'contact.form.message': 'Message',
      'contact.form.send': 'Send Message',
      
      // Footer
      'footer.rights': '© 2025 Babul Ulum Islamic Learning Centre. All rights reserved.',
      'footer.powered': 'Powered by Sageverse',
      
      // Language Toggle
      'lang.en': 'English',
      'lang.ar': 'العربية',
      'nav.toggleLanguage': 'Toggle language',

      // Tags
      'tags.faith': 'Faith',
      'tags.spirituality': 'Spirituality',
      'tags.prayer': 'Prayer',
      'tags.astrology': 'Astrology',
      'tags.guidance': 'Guidance',
      'tags.education': 'Education',
      'tags.community': 'Community',
      'tags.legacy': 'Legacy',
      // Add more as needed

      // Types
      'types.article': 'Article',
      'types.video': 'Video',
      'types.audio': 'Audio',
      'types.event': 'Event',
      // Add more as needed

      // Comments Show More/Less
      'comments.showMore': 'Show more comments',
      'comments.showLess': 'Show less',

      // Additional Hero Section
      'hero.brand': 'Babul Ulum',
      'hero.subtitle': 'Islamic Learning Centre',
      'hero.explore': 'Explore Our Teachings',
      
      // Additional About Section
      'about.community': 'Community',
      'about.community.text': 'Building a strong, supportive community of learners and seekers of spiritual knowledge.',
      'about.excellence': 'Excellence',
      'about.excellence.text': 'Maintaining the highest standards of Islamic education and spiritual guidance.',
      
      // Additional Founder Section
      'founder.achievements.scholar': 'Renowned Scholar',
      'founder.achievements.scholar.desc': 'Recognized Islamic scholar with decades of experience',
      'founder.achievements.educator': 'Expert Educator',
      'founder.achievements.educator.desc': 'Specialized in advanced Islamic studies and spiritual guidance',
      'founder.achievements.leader': 'Community Leader',
      'founder.achievements.leader.desc': 'Dedicated to building strong Islamic communities',
      'founder.achievements.guide': 'Spiritual Guide',
      'founder.achievements.guide.desc': 'Trusted mentor for spiritual development and growth',
      'founder.quote.title': 'Founder & Spiritual Guide',
      'founder.quote.text': 'Knowledge is the light that illuminates the path to spiritual enlightenment. Through education and guidance, we can transform lives and build stronger communities.',
      'founder.description.extended': 'With a deep understanding of Islamic traditions and modern educational methods, Alfa Baba has dedicated his life to spreading knowledge and fostering spiritual growth. His unique approach combines traditional wisdom with contemporary insights, making Islamic learning accessible and meaningful for students of all backgrounds.',
      'founder.cta.title': 'Learn from the Best',
      'founder.cta.text': 'Experience the wisdom and guidance of Alfa Baba through our comprehensive Islamic learning programs.',
      'founder.cta.button': 'Start Your Journey',
      
      // Additional Services Section
      'services.subtitle': 'Discover our comprehensive range of Islamic learning and spiritual guidance services',
      
      // Additional Contact Section
      'contact.subtitle': 'Get in touch with us to learn more about our services and begin your spiritual journey',
      'contact.form.title': 'Send us a Message',
      'contact.form.name.placeholder': 'Your name',
      'contact.form.email.placeholder': 'your.email@example.com',
      'contact.form.message.placeholder': 'Tell us about your spiritual journey and how we can help...',
      
      // Footer Section
      'footer.brand': 'Babul Ulum',
      'footer.subtitle': 'Islamic Learning Centre',
      'footer.description': 'Premium Islamic Learning & Spiritual Enlightenment Centre founded by Alfa Baba. Dedicated to spreading knowledge and fostering spiritual growth.',
      'footer.quickLinks': 'Quick Links',
      'footer.services': 'Our Services',
      'footer.contactInfo': 'Contact Info',
      'footer.service1': 'Mastery of Asrar',
      'footer.service2': 'Guidance on Prayers',
      'footer.service3': 'Astrology & Sciences',
      'footer.service4': 'Personal Consultations',
      'footer.service5': 'Spiritual Education',
      'footer.service6': 'Illumination of personal signs',
      'footer.service7': 'Adult education',
      'footer.service8': 'Islamic Preacher / Lecturer',
      
      // Additional About Section - Legacy
      'about.legacy.title': 'A Legacy of Excellence',
      'about.legacy.text1': 'Founded by the esteemed Alfa Baba, Babul Ulum has been at the forefront of Islamic education and spiritual guidance. Our centre combines traditional Islamic wisdom with modern educational approaches to provide a comprehensive learning experience.',
      'about.legacy.text2': 'We believe in the power of knowledge to transform lives and communities. Through our carefully designed programs and personalized approach, we help individuals develop a deeper connection with their faith and spirituality.',
      'about.stats.students': 'Students',
      'about.stats.years': 'Years',
      'about.stats.services': 'Services',
      'about.wisdom.title': 'Islamic Wisdom',
      'about.wisdom.subtitle': 'Traditional knowledge meets modern understanding',
      
      // Additional Services Section - CTA
      'services.cta.title': 'Ready to Begin Your Spiritual Journey?',
      'services.cta.text': 'Contact us to learn more about our services and how we can help you on your path to spiritual enlightenment.',
      'services.cta.button': 'Get Started Today',
      
      // Additional Contact Section
      'contact.getInTouch.title': 'Get In Touch',
      'contact.getInTouch.text': 'We\'re here to help you on your spiritual journey. Contact us through any of the following channels or fill out the form to get started.',
      'contact.location.title': 'Location',
      'contact.location.address': 'Islamic Learning Centre',
      'contact.location.country': 'Kwara state, Nigeria',
      'contact.location.availability': 'Available for online and in-person consultations',
      'contact.quick.title': 'Ready to Start Your Journey?',
      'contact.quick.text': 'Don\'t wait to begin your spiritual transformation. Contact us today and take the first step towards enlightenment.',
      'contact.quick.call': 'Call Now',
      'contact.quick.whatsapp': 'WhatsApp',
      'contact.quick.email': 'Email',
      
      // Forum/Teachings
      'forum.title': 'Babul Ulum\'s Forum',
      'forum.search.placeholder': 'Search...',
      'forum.filter.clear': 'Clear filter',
      'forum.featured': 'Featured',
      'forum.noResults': 'No teachings found. Try a different search or filter.',
      'forum.pagination.previous': 'Previous',
      'forum.pagination.next': 'Next',
      'forum.pagination.page': 'Page',
      'forum.pagination.of': 'of',
      'forum.loading': 'Loading teachings...',
      
      // Favorites
      'favorites.show': 'Show Favorites',
      'favorites.hide': 'Show All',
      'favorites.add': 'Add to Favorites',
      'favorites.remove': 'Remove from Favorites',
      'favorites.empty': 'No favorite teachings yet.',
      
      // Comments
      'comments.title': 'Comments',
      'comments.add': 'Add Comment',
      'comments.name': 'Name',
      'comments.email': 'Email (optional)',
      'comments.content': 'Comment',
      'comments.submit': 'Post Comment',
      'comments.anonymous': 'Anonymous',
      'comments.delete': 'Delete',
      'comments.deleteConfirm': 'Are you sure you want to delete this comment?',
      'comments.empty': 'No comments yet. Be the first to comment!',
      'comments.posted': 'Comment posted successfully!',
      'comments.error': 'Failed to post comment. Please try again.',
      'comments.deleted': 'Comment deleted successfully!',
      
      // Admin Actions
      'admin.pin': 'Pin',
      'admin.unpin': 'Unpin',
      'admin.edit': 'Edit',
      'admin.delete': 'Delete',
      'admin.deleteConfirm': 'Are you sure you want to delete this teaching?',
      'admin.pinned': 'Teaching pinned!',
      'admin.unpinned': 'Teaching unpinned!',
      'admin.deleted': 'Teaching deleted!',
      
      // Share
      'share.whatsapp': 'WhatsApp',
      'share.twitter': 'Twitter',
      'share.copy': 'Copy Link',
      'share.copied': 'Link copied!',
      'share.title': 'Share',
      
      // Pagination
      'pagination.previous': 'Previous',
      'pagination.next': 'Next',
      
      // Forum additional
      'forum.allTeachings': 'All Teachings',
      'latest_teachings': 'Latest Teachings',

      // Tags (additional)
      'tags.Guide': 'Guide',
      'tags.wise': 'Wise',
      'tags.Prayer': 'Prayer',
      'tags.life': 'Life',
      'tags.year': 'Year',
      // Types (additional)
      'types.Guide': 'Guide',
      'types.wise': 'Wise',
      'types.Prayer': 'Prayer',
      'types.life': 'Life',
      'types.year': 'Year',
    }
  },
  ar: {
    translation: {
      // Navigation
      'nav.home': 'الرئيسية',
      'nav.about': 'من نحن',
      'nav.services': 'خدماتنا',
      'nav.contact': 'اتصل بنا',
      'nav.bookshop': 'المكتبة',
      'nav.teachings': 'التعاليم',
      'teachings.title': 'التعاليم',
      
      // Hero Section
      'hero.dua': 'اللهم صلى على سيد السادات السعادات الهدات والبركات',
      'hero.symbolic': '☆آآآم#ااااھےو☆',
      'hero.tagline': 'مركز تعليم إسلامي متميز للتنوير الروحي',
      'hero.cta': 'تواصل معنا للتعليم الحصري',
      
      // About Section
      'about.title': 'من نحن',
      'about.mission': 'مهمتنا',
      'about.mission.text': 'يتخصص مركز باب العلم للتعليم الإسلامي في تقديم المعرفة المتقدمة والتنوير الروحي من خلال نهج فريد في التعليم الإسلامي. مهمتنا الأساسية هي تمكين الأفراد من فهم أعمق للتعاليم الإسلامية والروحانية.',
      'about.vision': 'رؤيتنا',
      'about.vision.text': 'أن نكون المركز الرائد في التعليم الروحي الإسلامي، وتعزيز الفهم العميق والنمو الشخصي من خلال الحكمة التقليدية والنهج الحديثة.',
      
      // Services
      'services.title': 'خدماتنا',
      'services.mastery': 'إتقان الأسرار',
      'services.mastery.desc': 'الأسرار الروحية المتقدمة والمعرفة الصوفية',
      'services.prayers': 'إرشاد الصلوات',
      'services.prayers.desc': 'تقنيات الصلاة القوية والممارسات الروحية',
      'services.astrology': 'التنجيم والعلوم القديمة',
      'services.astrology.desc': 'التنجيم الإسلامي التقليدي والحكمة القديمة',
      'services.nature': 'دراسة الطبيعة البشرية',
      'services.nature.desc': 'استكشاف عميق لعلم النفس البشري والروحانية',
      'services.consultations': 'استشارات شخصية',
      'services.consultations.desc': 'إرشاد روحي واستشارة فردية',
      'services.illumination': 'إضاءة العلامات الشخصية',
      'services.illumination.desc': 'فهم الرموز والعلامات الروحية الشخصية',
      'services.education': 'التعليم للكبار',
      'services.education.desc': 'اللغة العربية والدراسات الإسلامية للكبار',
      'services.preacher': 'واعظ ومحاضر إسلامي',
      'services.preacher.desc': 'الوعظ الإسلامي الاحترافي والمحاضرات والخطابة العامة',
      
      // Founder
      'founder.title': 'المؤسس',
      'founder.name': 'ألفا بابا',
      'founder.description': 'عالم إسلامي مرموق ومرشد روحي مع عقود من الخبرة في التعليم الإسلامي والإرشاد الروحي.',
      
      // Contact
      'contact.title': 'اتصل بنا',
      'contact.phone': 'الهاتف',
      'contact.email': 'البريد الإلكتروني',
      'contact.whatsapp': 'واتساب',
      'contact.form.name': 'الاسم',
      'contact.form.email': 'البريد الإلكتروني',
      'contact.form.message': 'الرسالة',
      'contact.form.send': 'إرسال الرسالة',
      
      // Footer
      'footer.rights': '© 2025 Babul Ulum Islamic Learning Centre. All rights reserved.',
      'footer.powered': 'مدعوم بواسطة Sageverse',
      
      // Language Toggle
      'lang.en': 'English',
      'lang.ar': 'العربية',
      'nav.toggleLanguage': 'تبديل اللغة',

      // Tags
      'tags.faith': 'الإيمان',
      'tags.spirituality': 'الروحانية',
      'tags.prayer': 'الصلاة',
      'tags.astrology': 'التنجيم',
      'tags.guidance': 'الإرشاد',
      'tags.education': 'التعليم',
      'tags.community': 'المجتمع',
      'tags.legacy': 'الإرث',
      // Add more as needed

      // Types
      'types.article': 'مقالة',
      'types.video': 'فيديو',
      'types.audio': 'صوت',
      'types.event': 'حدث',
      // Add more as needed

      // Comments Show More/Less
      'comments.showMore': 'عرض المزيد من التعليقات',
      'comments.showLess': 'إخفاء المزيد من التعليقات',

      // Additional Hero Section
      'hero.brand': 'باب العلم',
      'hero.subtitle': 'مركز التعليم الإسلامي',
      'hero.explore': 'استكشف تعاليمنا',
      
      // Additional About Section
      'about.community': 'المجتمع',
      'about.community.text': 'بناء مجتمع قوي وداعم من المتعلمين والباحثين عن المعرفة الروحية.',
      'about.excellence': 'التميز',
      'about.excellence.text': 'الحفاظ على أعلى معايير التعليم الإسلامي والإرشاد الروحي.',
      
      // Additional Founder Section
      'founder.achievements.scholar': 'عالم مرموق',
      'founder.achievements.scholar.desc': 'عالم إسلامي معترف به مع عقود من الخبرة',
      'founder.achievements.educator': 'مربي خبير',
      'founder.achievements.educator.desc': 'متخصص في الدراسات الإسلامية المتقدمة والإرشاد الروحي',
      'founder.achievements.leader': 'قائد المجتمع',
      'founder.achievements.leader.desc': 'مكرس لبناء مجتمعات إسلامية قوية',
      'founder.achievements.guide': 'مرشد روحي',
      'founder.achievements.guide.desc': 'مرشد موثوق للتطور والنمو الروحي',
      'founder.quote.title': 'المؤسس والمرشد الروحي',
      'founder.quote.text': 'المعرفة هي النور الذي يضيء الطريق إلى التنوير الروحي. من خلال التعليم والإرشاد، يمكننا تحويل الحياة وبناء مجتمعات أقوى.',
      'founder.description.extended': 'مع فهم عميق للتقاليد الإسلامية والطرق التعليمية الحديثة، كرس ألفا بابا حياته لنشر المعرفة وتعزيز النمو الروحي. نهجه الفريد يجمع بين الحكمة التقليدية والرؤى المعاصرة، مما يجعل التعلم الإسلامي في متناول وذو معنى للطلاب من جميع الخلفيات.',
      'founder.cta.title': 'تعلم من الأفضل',
      'founder.cta.text': 'اختبر حكمة وإرشاد ألفا بابا من خلال برامجنا الشاملة للتعلم الإسلامي.',
      'founder.cta.button': 'ابدأ رحلتك',
      
      // Additional Services Section
      'services.subtitle': 'اكتشف مجموعة شاملة من خدمات التعلم الإسلامي والإرشاد الروحي',
      
      // Additional Contact Section
      'contact.subtitle': 'تواصل معنا لمعرفة المزيد عن خدماتنا وبدء رحلتك الروحية',
      'contact.form.title': 'أرسل لنا رسالة',
      'contact.form.name.placeholder': 'اسمك',
      'contact.form.email.placeholder': 'your.email@example.com',
      'contact.form.message.placeholder': 'أخبرنا عن رحلتك الروحية وكيف يمكننا المساعدة...',
      
      // Footer Section
      'footer.brand': 'باب العلم',
      'footer.subtitle': 'مركز التعليم الإسلامي',
      'footer.description': 'مركز تعليم إسلامي متميز للتنوير الروحي أسسه ألفا بابا. مكرس لنشر المعرفة وتعزيز النمو الروحي.',
      'footer.quickLinks': 'روابط سريعة',
      'footer.services': 'خدماتنا',
      'footer.contactInfo': 'معلومات الاتصال',
      'footer.service1': 'إتقان الأسرار',
      'footer.service2': 'إرشاد الصلوات',
      'footer.service3': 'التنجيم والعلوم',
      'footer.service4': 'استشارات شخصية',
      'footer.service5': 'التعليم الروحي',
      'footer.service6': 'إضاءة العلامات الشخصية',
      'footer.service7': 'التعليم للكبار',
      'footer.service8': 'واعظ ومحاضر إسلامي',
      
      // Additional About Section - Legacy
      'about.legacy.title': 'إرث من التميز',
      'about.legacy.text1': 'أسسه المحترم ألفا بابا، كان باب العلم في طليعة التعليم الإسلامي والإرشاد الروحي. يجمع مركزنا بين الحكمة الإسلامية التقليدية والنهج التعليمية الحديثة لتقديم تجربة تعلم شاملة.',
      'about.legacy.text2': 'نؤمن بقوة المعرفة في تحويل الحياة والمجتمعات. من خلال برامجنا المصممة بعناية ونهجنا الشخصي، نساعد الأفراد على تطوير اتصال أعمق بإيمانهم وروحانيتهم.',
      'about.stats.students': 'طالب',
      'about.stats.years': 'سنوات',
      'about.stats.services': 'خدمات',
      'about.wisdom.title': 'الحكمة الإسلامية',
      'about.wisdom.subtitle': 'المعرفة التقليدية تلتقي بالفهم الحديث',
      
      // Additional Services Section - CTA
      'services.cta.title': 'مستعد لبدء رحلتك الروحية؟',
      'services.cta.text': 'تواصل معنا لمعرفة المزيد عن خدماتنا وكيف يمكننا مساعدتك في طريقك إلى التنوير الروحي.',
      'services.cta.button': 'ابدأ اليوم',
      
      // Additional Contact Section
      'contact.getInTouch.title': 'تواصل معنا',
      'contact.getInTouch.text': 'نحن هنا لمساعدتك في رحلتك الروحية. تواصل معنا من خلال أي من القنوات التالية أو املأ النموذج للبدء.',
      'contact.location.title': 'الموقع',
      'contact.location.address': 'مركز التعليم الإسلامي',
      'contact.location.country': 'ولاية كوارا، نيجيريا',
      'contact.location.availability': 'متاح للاستشارات عبر الإنترنت والشخصية',
      'contact.quick.title': 'مستعد لبدء رحلتك؟',
      'contact.quick.text': 'لا تنتظر لبدء تحولك الروحي. تواصل معنا اليوم واتخذ الخطوة الأولى نحو التنوير.',
      'contact.quick.call': 'اتصل الآن',
      'contact.quick.whatsapp': 'واتساب',
      'contact.quick.email': 'البريد الإلكتروني',
      
      // Forum/Teachings
      'forum.title': 'منتدى باب العلم',
      'forum.search.placeholder': 'البحث...',
      'forum.filter.clear': 'مسح الفلتر',
      'forum.featured': 'مميز',
      'forum.noResults': 'لم يتم العثور على تعاليم. جرب بحث أو فلتر مختلف.',
      'forum.pagination.previous': 'السابق',
      'forum.pagination.next': 'التالي',
      'forum.pagination.page': 'صفحة',
      'forum.pagination.of': 'من',
      'forum.loading': 'جاري تحميل التعاليم...',
      
      // Favorites
      'favorites.show': 'عرض المفضلة',
      'favorites.hide': 'عرض الكل',
      'favorites.add': 'إضافة إلى المفضلة',
      'favorites.remove': 'إزالة من المفضلة',
      'favorites.empty': 'لا توجد تعاليم مفضلة بعد.',
      
      // Comments
      'comments.title': 'التعليقات',
      'comments.add': 'إضافة تعليق',
      'comments.name': 'الاسم',
      'comments.email': 'البريد الإلكتروني (اختياري)',
      'comments.content': 'التعليق',
      'comments.submit': 'نشر التعليق',
      'comments.anonymous': 'مجهول',
      'comments.delete': 'حذف',
      'comments.deleteConfirm': 'هل أنت متأكد من حذف هذا التعليق؟',
      'comments.empty': 'لا توجد تعليقات بعد. كن أول من يعلق!',
      'comments.posted': 'تم نشر التعليق بنجاح!',
      'comments.error': 'فشل في نشر التعليق. يرجى المحاولة مرة أخرى.',
      'comments.deleted': 'تم حذف التعليق بنجاح!',
      
      // Admin Actions
      'admin.pin': 'تثبيت',
      'admin.unpin': 'إلغاء التثبيت',
      'admin.edit': 'تعديل',
      'admin.delete': 'حذف',
      'admin.deleteConfirm': 'هل أنت متأكد من حذف هذا التعليم؟',
      'admin.pinned': 'تم تثبيت التعليم!',
      'admin.unpinned': 'تم إلغاء تثبيت التعليم!',
      'admin.deleted': 'تم حذف التعليم!',
      
      // Share
      'share.whatsapp': 'واتساب',
      'share.twitter': 'تويتر',
      'share.copy': 'نسخ الرابط',
      'share.copied': 'تم نسخ الرابط!',
      'share.title': 'مشاركة',
      
      // Pagination
      'pagination.previous': 'السابق',
      'pagination.next': 'التالي',
      
      // Forum additional
      'forum.allTeachings': 'جميع التعاليم',
      'latest_teachings': 'أحدث التعاليم',

      // Tags (additional)
      'tags.Guide': 'دليل',
      'tags.wise': 'حكمة',
      'tags.Prayer': 'صلاة',
      'tags.life': 'الحياة',
      'tags.year': 'سنة',
      // Types (additional)
      'types.Guide': 'دليل',
      'types.wise': 'حكمة',
      'types.Prayer': 'صلاة',
      'types.life': 'الحياة',
      'types.year': 'سنة',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 