// DevSahara Enhanced Navigation System
class NavigationSystem {
    constructor() {
        this.isMobileMenuOpen = false;
        this.isUserMenuOpen = false;
        this.scrollThreshold = 50;
        this.searchDebounceTimer = null;
        this.init();
    }

    async init() {
        await this.setupStickyNav();
        this.setupMobileMenu();
        this.setupUserDropdown();
        this.setupActiveLinks();
        this.setupSearch();
        this.setupGitHubFeatures();
        this.setupThemeToggle();
        this.setupSmoothScrolling();
        this.setupNotificationHandler();
        this.setupPerformanceOptimizations();
        this.setupErrorHandling();
    }

    setupStickyNav() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        const handleScroll = () => {
            if (window.scrollY > this.scrollThreshold) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };

        // استخدام throttling لتحسين الأداء
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // التهيئة الأولية
        handleScroll();
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (toggle && navLinks) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu(navLinks);
            });

            // إغلاق القائمة عند النقر خارجها
            document.addEventListener('click', (e) => {
                if (!e.target.closest('nav') && this.isMobileMenuOpen) {
                    this.closeMobileMenu(navLinks);
                }
            });

            // إغلاق القائمة عند تغيير حجم النافذة
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && this.isMobileMenuOpen) {
                    this.closeMobileMenu(navLinks);
                }
            });

            // إغلاق القائمة عند النقر على رابط
            navLinks.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    this.closeMobileMenu(navLinks);
                }
            });
        }
    }

    toggleMobileMenu(navLinks) {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu(navLinks);
        } else {
            this.openMobileMenu(navLinks);
        }
    }

    openMobileMenu(navLinks) {
        navLinks.classList.add('show');
        this.isMobileMenuOpen = true;
        document.body.style.overflow = 'hidden';
        
        // إضافة تأثير للزر
        const toggle = document.querySelector('.nav-toggle');
        if (toggle) {
            toggle.style.transform = 'rotate(90deg)';
        }
    }

    closeMobileMenu(navLinks) {
        navLinks.classList.remove('show');
        this.isMobileMenuOpen = false;
        document.body.style.overflow = '';
        
        // إعادة الزر إلى حالته الأصلية
        const toggle = document.querySelector('.nav-toggle');
        if (toggle) {
            toggle.style.transform = 'rotate(0deg)';
        }
    }

    setupUserDropdown() {
        const userDropdown = document.querySelector('.user-dropdown');
        const userMenu = document.querySelector('.user-menu');
        const userAvatar = document.querySelector('.user-avatar');
        
        if (userDropdown && userMenu) {
            const toggleMenu = (e) => {
                e.stopPropagation();
                this.toggleUserMenu(userMenu);
            };

            userDropdown.addEventListener('click', toggleMenu);
            if (userAvatar) {
                userAvatar.addEventListener('click', toggleMenu);
            }

            // إغلاق القائمة عند النقر خارجها
            document.addEventListener('click', () => {
                if (this.isUserMenuOpen) {
                    this.closeUserMenu(userMenu);
                }
            });

            // منع إغلاق القائمة عند النقر داخلها
            userMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            // إغلاق القائمة عند النقر على عنصر
            userMenu.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                    this.closeUserMenu(userMenu);
                }
            });
        }
    }

    toggleUserMenu(userMenu) {
        if (this.isUserMenuOpen) {
            this.closeUserMenu(userMenu);
        } else {
            this.openUserMenu(userMenu);
        }
    }

    openUserMenu(userMenu) {
        userMenu.classList.add('show');
        this.isUserMenuOpen = true;
        
        // إضافة تأثير للصورة
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.style.transform = 'scale(1.1)';
        }
    }

    closeUserMenu(userMenu) {
        userMenu.classList.remove('show');
        this.isUserMenuOpen = false;
        
        // إعادة الصورة إلى حالتها الأصلية
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.style.transform = 'scale(1)';
        }
    }

    setupActiveLinks() {
        const currentPage = this.getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-links a, .sidebar-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (this.isActiveLink(href, currentPage)) {
                link.classList.add('active');
            }

            // إضافة تأثير النقر
            link.addEventListener('click', (e) => {
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(href);
                }
                
                // تتبع التحليلات
                this.trackNavigation(href);
            });
        });
    }

    getCurrentPage() {
        const path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    }

    isActiveLink(href, currentPage) {
        if (!href) return false;
        
        if (href === currentPage) return true;
        if (currentPage === '' && href === 'index.html') return true;
        if (href === 'index.html' && currentPage === '') return true;
        if (currentPage.includes(href.replace('.html', ''))) return true;
        
        return false;
    }

    setupSearch() {
        const searchInput = document.querySelector('.nav-search input');
        if (!searchInput) return;

        let searchSuggestions = document.querySelector('.search-suggestions');
        if (!searchSuggestions) {
            searchSuggestions = this.createSearchSuggestions();
        }

        // البحث أثناء الكتابة
        searchInput.addEventListener('input', (e) => {
            this.debounceSearch(e.target.value, searchSuggestions);
        });

        // البحث عند الضغط على Enter
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(e.target.value);
                this.hideSearchSuggestions(searchSuggestions);
            }
        });

        // إظهار اقتراحات البحث عند التركيز
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.length > 0) {
                this.showSearchSuggestions(searchSuggestions);
            }
        });

        // إغلاق اقتراحات البحث عند فقدان التركيز
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                this.hideSearchSuggestions(searchSuggestions);
            }, 200);
        });

        // تحسين قابلية الوصول
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideSearchSuggestions(searchSuggestions);
                searchInput.blur();
            }
            
            if (e.key === 'ArrowDown' && searchSuggestions.style.display === 'block') {
                e.preventDefault();
                const firstSuggestion = searchSuggestions.querySelector('.search-suggestion');
                if (firstSuggestion) {
                    firstSuggestion.focus();
                }
            }
        });
    }

    createSearchSuggestions() {
        const container = document.createElement('div');
        container.className = 'search-suggestions';
        container.setAttribute('role', 'listbox');
        container.setAttribute('aria-label', 'Search suggestions');
        
        const searchContainer = document.querySelector('.nav-search');
        if (searchContainer) {
            searchContainer.style.position = 'relative';
            searchContainer.appendChild(container);
        }
        
        return container;
    }

    debounceSearch(query, container) {
        clearTimeout(this.searchDebounceTimer);
        
        this.searchDebounceTimer = setTimeout(() => {
            this.handleSearchInput(query, container);
        }, 300);
    }

    async handleSearchInput(query, container) {
        if (query.length > 2) {
            try {
                const suggestions = await this.generateSearchSuggestions(query);
                this.displaySearchSuggestions(suggestions, container);
                this.showSearchSuggestions(container);
            } catch (error) {
                console.error('Search error:', error);
                this.hideSearchSuggestions(container);
            }
        } else {
            this.hideSearchSuggestions(container);
        }
    }

    async generateSearchSuggestions(query) {
        // محاكاة جلب البيانات من API
        return new Promise((resolve) => {
            setTimeout(() => {
                const allItems = [
                    { type: 'repository', name: 'web-development-bootcamp', title: 'Web Development Bootcamp', description: 'Complete web development curriculum' },
                    { type: 'repository', name: 'african-ecommerce-api', title: 'African E-commerce API', description: 'E-commerce API for African markets' },
                    { type: 'user', name: 'ahmed-morocco', title: 'Ahmed Morocco', description: 'Full Stack Developer' },
                    { type: 'topic', name: 'javascript', title: 'JavaScript', description: 'Programming language' },
                    { type: 'topic', name: 'react', title: 'React', description: 'JavaScript library' },
                    { type: 'project', name: 'agriculture-tech', title: 'Agriculture Tech', description: 'ML solutions for agriculture' }
                ];

                const filtered = allItems.filter(item => 
                    item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
                ).slice(0, 6);

                resolve(filtered);
            }, 100);
        });
    }

    displaySearchSuggestions(suggestions, container) {
        if (suggestions.length === 0) {
            container.innerHTML = `
                <div class="search-suggestion no-results">
                    <span class="suggestion-icon">🔍</span>
                    <span class="suggestion-text">No results found</span>
                </div>
            `;
            return;
        }

        container.innerHTML = suggestions.map(suggestion => `
            <div class="search-suggestion" 
                 data-type="${suggestion.type}" 
                 data-value="${suggestion.name}"
                 tabindex="0"
                 role="option">
                <span class="suggestion-icon">${this.getSuggestionIcon(suggestion.type)}</span>
                <div class="suggestion-content">
                    <div class="suggestion-title">${suggestion.title}</div>
                    ${suggestion.description ? `<div class="suggestion-desc">${suggestion.description}</div>` : ''}
                </div>
            </div>
        `).join('');

        // إضافة مستمعين للأحداث
        container.querySelectorAll('.search-suggestion').forEach((suggestion, index) => {
            suggestion.addEventListener('click', () => {
                this.selectSearchSuggestion(suggestion.dataset.type, suggestion.dataset.value);
            });

            suggestion.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectSearchSuggestion(suggestion.dataset.type, suggestion.dataset.value);
                }
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = container.querySelectorAll('.search-suggestion')[index + 1];
                    if (next) next.focus();
                }
                
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (index === 0) {
                        document.querySelector('.nav-search input').focus();
                    } else {
                        const prev = container.querySelectorAll('.search-suggestion')[index - 1];
                        if (prev) prev.focus();
                    }
                }
            });
        });
    }

    getSuggestionIcon(type) {
        const icons = {
            'repository': '📁',
            'user': '👤',
            'topic': '🏷️',
            'project': '🚀'
        };
        return icons[type] || '🔍';
    }

    showSearchSuggestions(container) {
        container.style.display = 'block';
        container.setAttribute('aria-expanded', 'true');
    }

    hideSearchSuggestions(container) {
        container.style.display = 'none';
        container.setAttribute('aria-expanded', 'false');
    }

    selectSearchSuggestion(type, value) {
        const searchInput = document.querySelector('.nav-search input');
        if (searchInput) {
            searchInput.value = value;
        }

        // التنقل بناءً على النوع
        const routes = {
            'repository': `repository.html?name=${encodeURIComponent(value)}`,
            'user': `profile.html?user=${encodeURIComponent(value)}`,
            'topic': `topics.html?tag=${encodeURIComponent(value)}`,
            'project': `projects.html?id=${encodeURIComponent(value)}`
        };

        if (routes[type]) {
            window.location.href = routes[type];
        }
    }

    performSearch(query) {
        if (query.trim()) {
            // في التطبيق الحقيقي، قد تنتقل إلى صفحة نتائج البحث
            console.log('Performing search for:', query);
            window.location.href = `search.html?q=${encodeURIComponent(query.trim())}`;
        }
    }

    setupGitHubFeatures() {
        this.setupCodeCopy();
        this.setupTabSystem();
        this.setupRepoActions();
        this.setupFileViewer();
    }

    setupCodeCopy() {
        // إضافة أزرار النسخ لمقاطع الكود
        document.querySelectorAll('.code-content').forEach(codeBlock => {
            if (!codeBlock.previousElementSibling?.querySelector('.copy-btn')) {
                const copyButton = document.createElement('button');
                copyButton.className = 'btn copy-btn';
                copyButton.innerHTML = '📋 Copy';
                copyButton.setAttribute('aria-label', 'Copy code to clipboard');
                copyButton.style.cssText = `
                    position: absolute; 
                    top: 0.5rem; 
                    right: 0.5rem; 
                    padding: 0.3rem 0.6rem; 
                    font-size: 0.8rem;
                    background: rgba(255, 255, 255, 0.9);
                    border: 1px solid #e1e4e8;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                `;
                
                copyButton.addEventListener('click', async () => {
                    const code = codeBlock.textContent;
                    try {
                        await navigator.clipboard.writeText(code);
                        this.showCopyFeedback(copyButton, true);
                    } catch (err) {
                        console.error('Failed to copy code: ', err);
                        this.showCopyFeedback(copyButton, false);
                    }
                });

                const toolbar = codeBlock.previousElementSibling;
                if (toolbar && toolbar.classList.contains('code-toolbar')) {
                    toolbar.style.position = 'relative';
                    toolbar.appendChild(copyButton);
                }
            }
        });
    }

    showCopyFeedback(button, success) {
        const originalHTML = button.innerHTML;
        const originalBg = button.style.background;
        
        if (success) {
            button.innerHTML = '✅ Copied!';
            button.style.background = '#28a745';
            button.style.color = 'white';
        } else {
            button.innerHTML = '❌ Failed';
            button.style.background = '#dc3545';
            button.style.color = 'white';
        }
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = originalBg;
            button.style.color = '';
        }, 2000);
    }

    setupTabSystem() {
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                this.switchTab(tabId, button);
            });

            // دعم لوحة المفاتيح
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const tabId = button.dataset.tab;
                    this.switchTab(tabId, button);
                }
            });
        });

        // تحميل علامة التبويب النشطة من التخزين المحلي
        this.loadActiveTab();
    }

    switchTab(tabId, clickedButton) {
        // إخفاء جميع المحتويات
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
            content.setAttribute('aria-hidden', 'true');
        });
        
        // إلغاء تنشيط جميع الأزرار
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-selected', 'false');
        });
        
        // إظهار المحتوى المحدد وتنشيط الزر
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.style.display = 'block';
            targetContent.setAttribute('aria-hidden', 'false');
            clickedButton.classList.add('active');
            clickedButton.setAttribute('aria-selected', 'true');
            
            // حفظ علامة التبويب النشطة
            this.saveActiveTab(tabId);
            
            // إطلاق حدث مخصص
            this.dispatchTabChangeEvent(tabId);
        }
    }

    saveActiveTab(tabId) {
        try {
            localStorage.setItem('devsahara_active_tab', tabId);
        } catch (e) {
            console.warn('Could not save active tab to localStorage:', e);
        }
    }

    loadActiveTab() {
        try {
            const activeTab = localStorage.getItem('devsahara_active_tab');
            if (activeTab) {
                const tabButton = document.querySelector(`[data-tab="${activeTab}"]`);
                if (tabButton) {
                    // استخدام setTimeout لتأخير التنفيذ حتى تكتمل تهيئة الصفحة
                    setTimeout(() => {
                        this.switchTab(activeTab, tabButton);
                    }, 100);
                }
            }
        } catch (e) {
            console.warn('Could not load active tab from localStorage:', e);
        }
    }

    dispatchTabChangeEvent(tabId) {
        const event = new CustomEvent('tabchange', {
            detail: { tabId }
        });
        document.dispatchEvent(event);
    }

    setupRepoActions() {
        // إعداد تفاعلات المستودعات (نجوم، تفرع، إلخ)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('star-btn') || e.target.closest('.star-btn')) {
                const btn = e.target.classList.contains('star-btn') ? e.target : e.target.closest('.star-btn');
                this.toggleStar(btn.dataset.repoId);
            }
            
            if (e.target.classList.contains('fork-btn') || e.target.closest('.fork-btn')) {
                const btn = e.target.classList.contains('fork-btn') ? e.target : e.target.closest('.fork-btn');
                this.forkRepository(btn.dataset.repoId);
            }
        });
    }

    toggleStar(repoId) {
        // محاكاة إضافة/إزالة نجمة
        console.log(`Toggling star for repo: ${repoId}`);
        // في التطبيق الحقيقي، قد تقوم بإرسال طلب للخادم
    }

    forkRepository(repoId) {
        // محاكاة تفرع المستودع
        console.log(`Forking repository: ${repoId}`);
        // في التطبيق الحقيقي، قد تقوم بإنشاء تفرع
    }

    setupFileViewer() {
        // محاكاة عرض الملفات
        document.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const fileName = item.dataset.file;
                this.showFileContent(fileName);
            });
        });
    }

    showFileContent(fileName) {
        // محاكاة عرض محتوى الملف
        console.log(`Showing file content: ${fileName}`);
    }

    setupThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle btn btn-secondary';
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        themeToggle.style.cssText = `
            padding: 0.5rem;
            border-radius: 6px;
            border: 1px solid #e1e4e8;
            background: white;
            cursor: pointer;
            font-size: 1rem;
        `;

        // إضافة زر السمة إذا لم يكن موجوداً
        const navUser = document.querySelector('.nav-user');
        if (navUser && !document.querySelector('.theme-toggle')) {
            navUser.insertBefore(themeToggle, navUser.firstChild);
        }

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // تحميل السمة المحفوظة
        this.loadTheme();
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // تحديث الأيقونة
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
        }
        
        // حفظ التفضيل
        this.saveTheme(isDark);
        
        // تحديث Charts إذا كانت موجودة
        this.updateChartsTheme(isDark);
    }

    saveTheme(isDark) {
        try {
            localStorage.setItem('devsahara_theme', isDark ? 'dark' : 'light');
        } catch (e) {
            console.warn('Could not save theme preference:', e);
        }
    }

    loadTheme() {
        try {
            const savedTheme = localStorage.getItem('devsahara_theme') || 'light';
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                const themeToggle = document.querySelector('.theme-toggle');
                if (themeToggle) {
                    themeToggle.innerHTML = '☀️';
                }
            }
        } catch (e) {
            console.warn('Could not load theme preference:', e);
        }
    }

    updateChartsTheme(isDark) {
        // تحديث ألوان Charts إذا كانت موجودة
        if (window.app && window.app.charts) {
            Object.values(window.app.charts).forEach(chart => {
                if (chart && typeof chart.update === 'function') {
                    chart.update();
                }
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    scrollToSection(selector) {
        const target = document.querySelector(selector);
        if (target) {
            const offset = 80; // تعويض شريط التنقل
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    setupNotificationHandler() {
        const notificationIcon = document.querySelector('.notification-icon');
        if (notificationIcon) {
            notificationIcon.addEventListener('click', () => {
                this.showNotifications();
            });
        }
    }

    showNotifications() {
        // محاكاة عرض الإشعارات
        console.log('Showing notifications panel');
        // في التطبيق الحقيقي، قد تفتح لوحة الإشعارات
    }

    setupPerformanceOptimizations() {
        // تحسين الأداء للصور
        this.lazyLoadImages();
        
        // تحسين أداء التمرير
        this.optimizeScrollPerformance();
        
        // إدارة الذاكرة
        this.setupMemoryManagement();
    }

    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    optimizeScrollPerformance() {
        // تعطيل تأثيرات CSS أثناء التمرير السريع
        let scrollTimer;
        window.addEventListener('scroll', () => {
            document.body.classList.add('disable-animations');
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                document.body.classList.remove('disable-animations');
            }, 100);
        }, { passive: true });
    }

    setupMemoryManagement() {
        // تنظيف الـ event listeners عند التدمير
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    setupErrorHandling() {
        // معالجة الأخطاء العالمية
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.logError(e.error);
        });

        // معالجة الوعود المرفوضة
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.logError(e.reason);
        });
    }

    logError(error) {
        // في التطبيق الحقيقي، قد ترسل الأخطاء إلى خدمة تتبع الأخطاء
        console.error('Application error:', error);
    }

    trackNavigation(destination) {
        // في التطبيق الحقيقي، قد تتبع التحليلات
        console.log('Navigation to:', destination);
        
        // محاكاة إرسال بيانات التحليلات
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: destination
            });
        }
    }

    cleanup() {
        // تنظيف الـ timers
        clearTimeout(this.searchDebounceTimer);
        
        // إزالة الـ event listeners المخصصة إذا لزم الأمر
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.replaceWith(themeToggle.cloneNode(true));
        }
    }

    // دوال مساعدة للاستدعاء من HTML
    showProjects() {
        const projectsTab = document.querySelector('[data-tab="projects"]');
        if (projectsTab) {
            this.switchTab('projects', projectsTab);
        }
    }

    showAbout() {
        const aboutTab = document.querySelector('[data-tab="about"]');
        if (aboutTab) {
            this.switchTab('about', aboutTab);
        }
    }

    showContribute() {
        const contributeTab = document.querySelector('[data-tab="contribute"]');
        if (contributeTab) {
            this.switchTab('contribute', contributeTab);
        }
    }

    // دالة للمساعدة في التنقل
    navigateTo(url) {
        window.location.href = url;
    }

    // دالة لتحديث حالة المستخدم
    updateUserState(userData) {
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar && userData.avatar) {
            userAvatar.textContent = userData.avatar;
        }
        
        // تحديث القائمة المنسدلة للمستخدم
        this.updateUserMenu(userData);
    }

    updateUserMenu(userData) {
        // تحديث عناصر قائمة المستخدم إذا لزم الأمر
        const profileLink = document.querySelector('.user-menu-item[href="profile.html"]');
        if (profileLink && userData.name) {
            profileLink.textContent = `Your profile (${userData.name})`;
        }
    }
}

// إنشاء وتصدير نسخة من النظام
const navigation = new NavigationSystem();

// جعل الدوال متاحة عالمياً للاستدعاء من HTML
window.showProjects = () => navigation.showProjects();
window.showAbout = () => navigation.showAbout();
window.showContribute = () => navigation.showContribute();
window.toggleTheme = () => navigation.toggleTheme();

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تأكد من تحميل النظام
    if (typeof navigation !== 'undefined') {
        console.log('DevSahara Navigation System Initialized');
    }
});

// التعامل مع تحميل الصفحة الديناميكي (لـ SPAs)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        navigation.init();
    });
} else {
    // الصفحة محملة بالفعل
    navigation.init();
}

// جعل النظام متاحاً عالمياً للوصول من وحدة التحكم
window.navigationSystem = navigation;
