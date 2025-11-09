// DevSahara Main Application Script
class DevSaharaApp {
    constructor() {
        this.currentUser = null;
        this.projects = [];
        this.communityStats = {};
        this.init();
    }

    async init() {
        await this.loadUserData();
        await this.loadProjects();
        await this.loadCommunityStats();
        this.setupEventListeners();
        this.setupGitHubFeatures();
        this.setupRealTimeUpdates();
        this.initializePage();
    }

    async loadUserData() {
        // محاكاة تحميل بيانات المستخدم
        this.currentUser = JSON.parse(localStorage.getItem('devsahara_current_user')) || {
            name: 'Developer',
            username: 'dev',
            avatar: '👨‍💻',
            joined: new Date().toISOString(),
            skills: ['JavaScript', 'React'],
            region: 'Africa'
        };
        
        this.updateUserInterface();
    }

    async loadProjects() {
        // محاكاة تحميل المشاريع
        this.projects = [
            {
                id: 1,
                name: 'web-development-bootcamp',
                title: 'Web Development Bootcamp',
                description: 'Complete web development curriculum for African and Asian developers',
                stars: 142,
                forks: 23,
                language: 'JavaScript',
                topics: ['html', 'css', 'javascript', 'react', 'nodejs'],
                lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                contributors: 15
            },
            {
                id: 2,
                name: 'african-ecommerce-api',
                title: 'African E-commerce API',
                description: 'E-commerce API designed specifically for African markets',
                stars: 89,
                forks: 15,
                language: 'Node.js',
                topics: ['nodejs', 'api', 'ecommerce', 'africa'],
                lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                contributors: 8
            },
            {
                id: 3,
                name: 'agriculture-tech-ml',
                title: 'Agriculture Tech ML',
                description: 'Machine learning solutions for agricultural challenges',
                stars: 67,
                forks: 12,
                language: 'Python',
                topics: ['python', 'ml', 'agriculture', 'ai'],
                lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                contributors: 6
            },
            {
                id: 4,
                name: 'mobile-money-integration',
                title: 'Mobile Money Integration',
                description: 'Unified API for mobile money services across Africa',
                stars: 45,
                forks: 8,
                language: 'Java',
                topics: ['java', 'api', 'mobile-money', 'fintech'],
                lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                contributors: 4
            }
        ];

        this.renderProjects();
    }

    async loadCommunityStats() {
        // محاكاة تحميل إحصائيات المجتمع
        this.communityStats = {
            activeDevelopers: 1250,
            projectsLaunched: 89,
            countriesRepresented: 15,
            aiSupport: '24/7',
            totalContributions: 2347,
            activeDiscussions: 56
        };

        this.updateStatsDisplay();
    }

    setupEventListeners() {
        // استماع لأحداث علامات التبويب
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-button')) {
                this.switchTab(e.target.dataset.tab, e.target);
            }
            
            if (e.target.classList.contains('repo-title') || e.target.closest('.repo-title')) {
                e.preventDefault();
                const repoName = e.target.textContent || e.target.closest('.repo-title').textContent;
                this.openRepository(repoName);
            }
            
            if (e.target.classList.contains('topic-tag')) {
                e.preventDefault();
                const topic = e.target.textContent;
                this.searchByTopic(topic);
            }
        });

        // استماع لحقل البحث
        const searchInput = document.querySelector('.nav-search input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }

        // استماع لأزرار المساهمة
        document.addEventListener('click', (e) => {
            if (e.target.textContent.includes('Contribute') || 
                e.target.closest('button')?.textContent.includes('Contribute')) {
                const projectCard = e.target.closest('.repo-card');
                if (projectCard) {
                    const repoTitle = projectCard.querySelector('.repo-title').textContent;
                    this.contributeToProject(repoTitle);
                }
            }
        });

        // استماع لأزرار التنقل
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-links a')) {
                this.handleNavigation(e.target.closest('.nav-links a').href);
            }
        });
    }

    setupGitHubFeatures() {
        this.setupCopyButtons();
        this.setupRepoActions();
        this.setupFileViewer();
    }

    setupCopyButtons() {
        // إضافة أزرار النسخ لمقاطع الكود
        document.querySelectorAll('.code-content').forEach(codeBlock => {
            if (!codeBlock.previousElementSibling?.querySelector('.copy-btn')) {
                const copyButton = document.createElement('button');
                copyButton.className = 'btn copy-btn';
                copyButton.innerHTML = '📋 Copy';
                copyButton.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.3rem 0.6rem; font-size: 0.8rem;';
                
                copyButton.addEventListener('click', async () => {
                    const code = codeBlock.textContent;
                    try {
                        await navigator.clipboard.writeText(code);
                        copyButton.innerHTML = '✅ Copied!';
                        setTimeout(() => {
                            copyButton.innerHTML = '📋 Copy';
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy code: ', err);
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

    setupRepoActions() {
        // إعداد تفاعلات المستودعات
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('star-btn')) {
                this.toggleStar(e.target.dataset.repoId);
            }
            
            if (e.target.classList.contains('fork-btn')) {
                this.forkRepository(e.target.dataset.repoId);
            }
            
            if (e.target.classList.contains('watch-btn')) {
                this.watchRepository(e.target.dataset.repoId);
            }
        });
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

    setupRealTimeUpdates() {
        // تحديثات حية للمجتمع
        setInterval(() => {
            this.updateLiveActivity();
        }, 30000);

        // تحديث الإحصائيات
        setInterval(() => {
            this.updateCommunityStats();
        }, 60000);
    }

    initializePage() {
        this.applyUserPreferences();
        this.setupThemeListener();
        this.initializeTabs();
        this.setupSmoothScrolling();
    }

    applyUserPreferences() {
        // تطبيق تفضيلات المستخدم
        const theme = localStorage.getItem('devsahara_theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        const language = localStorage.getItem('devsahara_language') || 'en';
        this.setLanguage(language);
    }

    setupThemeListener() {
        // استماع لتغيير السمة
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('devsahara_theme', isDark ? 'dark' : 'light');
        
        // تحديث الأيقونة
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
        }
    }

    setLanguage(lang) {
        // محاكاة تغيير اللغة
        console.log(`Setting language to: ${lang}`);
        // في التطبيق الحقيقي، قد تقوم بتحميل ملفات الترجمة
    }

    initializeTabs() {
        // تهيئة علامات التبويب
        const defaultTab = document.querySelector('.tab-button.active');
        if (defaultTab) {
            this.switchTab(defaultTab.dataset.tab, defaultTab);
        }
    }

    switchTab(tabId, clickedButton) {
        // إخفاء جميع المحتويات
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // إلغاء تنشيط جميع الأزرار
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        
        // إظهار المحتوى المحدد وتنشيط الزر
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.style.display = 'block';
            clickedButton.classList.add('active');
            
            // تحميل محتوى إضافي إذا لزم الأمر
            this.loadTabContent(tabId);
        }
    }

    loadTabContent(tabId) {
        switch(tabId) {
            case 'projects':
                this.loadProjectsContent();
                break;
            case 'about':
                this.loadAboutContent();
                break;
            case 'contribute':
                this.loadContributeContent();
                break;
            default:
                // المحتوى الأساسي محمل بالفعل
                break;
        }
    }

    loadProjectsContent() {
        // محاكاة تحميل محتوى إضافي للمشاريع
        console.log('Loading additional projects content...');
    }

    loadAboutContent() {
        // محاكاة تحميل محتوى إضافي حول المنصة
        console.log('Loading additional about content...');
    }

    loadContributeContent() {
        // محاكاة تحميل محتوى إضافي للمساهمة
        console.log('Loading additional contribute content...');
    }

    setupSmoothScrolling() {
        // تمرير سلس للروابط الداخلية
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

    renderProjects() {
        const container = document.querySelector('.projects-grid') || document.getElementById('projects-list');
        if (!container) return;

        container.innerHTML = this.projects.map(project => `
            <div class="repo-card">
                <div class="repo-header">
                    <a href="#" class="repo-title">${project.name}</a>
                    <div class="repo-stats">
                        <span>⭐ ${project.stars}</span>
                        <span>🔄 ${project.forks}</span>
                    </div>
                </div>
                <p class="repo-description">${project.description}</p>
                <div class="repo-topics">
                    ${project.topics.map(topic => 
                        `<a href="#" class="topic-tag">${topic}</a>`
                    ).join('')}
                </div>
                <div class="repo-footer">
                    <div class="repo-meta">
                        <span class="repo-language">${project.language}</span>
                        <span>Updated ${this.formatTime(project.lastUpdated)}</span>
                    </div>
                    <button class="btn contribute-btn" data-repo-id="${project.id}">
                        <span>Contribute</span>
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateStatsDisplay() {
        // تحديث عرض الإحصائيات
        const stats = this.communityStats;
        
        const statElements = {
            'activeDevelopers': document.querySelector('.stat-card:nth-child(1) .stat-number'),
            'projectsLaunched': document.querySelector('.stat-card:nth-child(2) .stat-number'),
            'countriesRepresented': document.querySelector('.stat-card:nth-child(3) .stat-number'),
            'aiSupport': document.querySelector('.stat-card:nth-child(4) .stat-number')
        };

        if (statElements.activeDevelopers) {
            statElements.activeDevelopers.textContent = `${stats.activeDevelopers}+`;
        }
        if (statElements.projectsLaunched) {
            statElements.projectsLaunched.textContent = stats.projectsLaunched;
        }
        if (statElements.countriesRepresented) {
            statElements.countriesRepresented.textContent = stats.countriesRepresented;
        }
        if (statElements.aiSupport) {
            statElements.aiSupport.textContent = stats.aiSupport;
        }
    }

    updateUserInterface() {
        // تحديث واجهة المستخدم بناءً على بيانات المستخدم
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar && this.currentUser) {
            userAvatar.textContent = this.currentUser.avatar || 
                                   this.currentUser.name.charAt(0).toUpperCase();
        }

        // تحديث الترحيب إذا كان موجودًا
        const welcomeElement = document.querySelector('.welcome-message');
        if (welcomeElement && this.currentUser) {
            welcomeElement.textContent = `Welcome, ${this.currentUser.name}!`;
        }
    }

    handleSearch(query) {
        // البحث في الوقت الحقيقي
        if (query.length > 2) {
            this.showSearchSuggestions(query);
        } else {
            this.hideSearchSuggestions();
        }
    }

    performSearch(query) {
        if (query.trim()) {
            // محاكاة البحث
            console.log(`Searching for: ${query}`);
            // في التطبيق الحقيقي، قد تقوم بتوجيه المستخدم لصفحة النتائج
            this.showSearchResults(query);
        }
    }

    showSearchSuggestions(query) {
        // محاكاة عرض اقتراحات البحث
        const suggestions = this.generateSearchSuggestions(query);
        this.displaySearchSuggestions(suggestions);
    }

    generateSearchSuggestions(query) {
        const allItems = [
            ...this.projects.map(p => ({ type: 'repository', name: p.name, title: p.title })),
            { type: 'user', name: 'ahmed-morocco', title: 'Ahmed Morocco' },
            { type: 'topic', name: 'javascript', title: 'JavaScript' },
            { type: 'topic', name: 'react', title: 'React' },
            { type: 'topic', name: 'python', title: 'Python' }
        ];

        return allItems.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.title.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
    }

    displaySearchSuggestions(suggestions) {
        // إنشاء وعرض اقتراحات البحث
        let suggestionsContainer = document.querySelector('.search-suggestions');
        
        if (!suggestionsContainer) {
            suggestionsContainer = document.createElement('div');
            suggestionsContainer.className = 'search-suggestions';
            document.querySelector('.nav-search').appendChild(suggestionsContainer);
        }

        suggestionsContainer.innerHTML = suggestions.map(suggestion => `
            <div class="search-suggestion" data-type="${suggestion.type}" data-value="${suggestion.name}">
                <span class="suggestion-icon">${this.getSuggestionIcon(suggestion.type)}</span>
                <span class="suggestion-text">${suggestion.title}</span>
            </div>
        `).join('');

        suggestionsContainer.style.display = 'block';

        // إضافة مستمعين للأحداث
        suggestionsContainer.querySelectorAll('.search-suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                this.selectSearchSuggestion(suggestion.dataset.type, suggestion.dataset.value);
            });
        });
    }

    getSuggestionIcon(type) {
        const icons = {
            'repository': '📁',
            'user': '👤',
            'topic': '🏷️'
        };
        return icons[type] || '🔍';
    }

    selectSearchSuggestion(type, value) {
        // التعامل مع اختيار اقتراح البحث
        switch(type) {
            case 'repository':
                this.openRepository(value);
                break;
            case 'user':
                this.viewUserProfile(value);
                break;
            case 'topic':
                this.searchByTopic(value);
                break;
        }
        
        this.hideSearchSuggestions();
    }

    hideSearchSuggestions() {
        const suggestionsContainer = document.querySelector('.search-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }

    showSearchResults(query) {
        // محاكاة عرض نتائج البحث
        alert(`Search results for: ${query}\n\nThis would show search results in a real application.`);
    }

    openRepository(repoName) {
        // محاكاة فتح مستودع
        console.log(`Opening repository: ${repoName}`);
        // في التطبيق الحقيقي، قد تفتح صفحة المستودع
        window.location.href = `repository.html?name=${encodeURIComponent(repoName)}`;
    }

    viewUserProfile(username) {
        // محاكاة عرض ملف المستخدم
        console.log(`Viewing profile: ${username}`);
        // في التطبيق الحقيقي، قد تفتح صفحة الملف الشخصي
        window.location.href = `profile.html?user=${encodeURIComponent(username)}`;
    }

    searchByTopic(topic) {
        // البحث حسب الموضوع
        console.log(`Searching by topic: ${topic}`);
        const filteredProjects = this.projects.filter(project => 
            project.topics.includes(topic.toLowerCase())
        );
        
        this.displayFilteredProjects(filteredProjects, `Projects tagged with "${topic}"`);
    }

    displayFilteredProjects(projects, title) {
        // عرض المشاريع المصفاة
        const container = document.querySelector('.projects-grid') || document.getElementById('projects-list');
        if (!container) return;

        const originalTitle = container.previousElementSibling?.querySelector('h2');
        if (originalTitle) {
            originalTitle.textContent = title;
        }

        container.innerHTML = projects.map(project => `
            <div class="repo-card">
                <div class="repo-header">
                    <a href="#" class="repo-title">${project.name}</a>
                    <div class="repo-stats">
                        <span>⭐ ${project.stars}</span>
                        <span>🔄 ${project.forks}</span>
                    </div>
                </div>
                <p class="repo-description">${project.description}</p>
                <div class="repo-topics">
                    ${project.topics.map(topic => 
                        `<a href="#" class="topic-tag">${topic}</a>`
                    ).join('')}
                </div>
                <div class="repo-footer">
                    <span>Updated ${this.formatTime(project.lastUpdated)}</span>
                    <button class="btn" onclick="app.contributeToProject('${project.name}')">
                        Contribute
                    </button>
                </div>
            </div>
        `).join('');
    }

    contributeToProject(projectName) {
        if (!this.currentUser) {
            this.showLoginPrompt();
            return;
        }

        console.log(`Contributing to project: ${projectName}`);
        // في التطبيق الحقيقي، قد تفتح دليل المساهمة أو نموذج إنشاء طلب سحب
        alert(`Ready to contribute to ${projectName}!\n\nForking repository and creating contribution branch...`);
    }

    showLoginPrompt() {
        // عرض موجه تسجيل الدخول
        if (confirm('You need to be logged in to contribute. Would you like to login now?')) {
            window.location.href = 'auth.html';
        }
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

    watchRepository(repoId) {
        // محاكاية مراقبة المستودع
        console.log(`Watching repository: ${repoId}`);
        // في التطبيق الحقيقي، قد تقوم بإضافة المراقبة
    }

    showFileContent(fileName) {
        // محاكاة عرض محتوى الملف
        console.log(`Showing file content: ${fileName}`);
        // في التطبيق الحقيقي، قد تقوم بجلب وعرض محتوى الملف
    }

    updateLiveActivity() {
        // تحديث النشاط الحي
        const activities = [
            '👨‍💻 New developer just joined from Nigeria!',
            '💬 Discussion trending: "Mobile Development in Africa"',
            '🎯 Study group session starting in 15 minutes',
            '🚀 Project "agriculture-tech-ml" just got 5 new contributors',
            '🏆 Achievement unlocked: Community Helper by Sarah Kenya'
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        this.displayLiveActivity(randomActivity);
    }

    displayLiveActivity(activity) {
        const container = document.getElementById('live-activities');
        if (!container) return;

        const activityElement = document.createElement('div');
        activityElement.className = 'live-activity';
        activityElement.innerHTML = `
            <span class="activity-dot"></span>
            <span>${activity}</span>
        `;

        // إضافة تأثير الظهور
        activityElement.style.animation = 'slideInLeft 0.5s ease';
        
        container.appendChild(activityElement);
        
        // إزالة النشاط بعد 10 ثواني
        setTimeout(() => {
            if (activityElement.parentNode) {
                activityElement.style.animation = 'slideOutLeft 0.5s ease';
                setTimeout(() => activityElement.remove(), 500);
            }
        }, 10000);
    }

    updateCommunityStats() {
        // محاكاة تحديث إحصائيات المجتمع
        this.communityStats.activeDevelopers += Math.floor(Math.random() * 5);
        this.communityStats.projectsLaunched += Math.floor(Math.random() * 2);
        this.communityStats.totalContributions += Math.floor(Math.random() * 10);
        
        this.updateStatsDisplay();
    }

    handleNavigation(url) {
        // التعامل مع التنقل
        console.log(`Navigating to: ${url}`);
        // يمكن إضافة تحليلات أو تعقب هنا
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
        return date.toLocaleDateString();
    }

    // دوال مساعدة للاستدعاء من HTML
    showProjects() {
        this.switchTab('projects', document.querySelector('[data-tab="projects"]'));
    }

    showAbout() {
        this.switchTab('about', document.querySelector('[data-tab="about"]'));
    }

    showContribute() {
        this.switchTab('contribute', document.querySelector('[data-tab="contribute"]'));
    }
}

// إنشاء وتصدير نسخة من التطبيق
const app = new DevSaharaApp();

// جعل الدوال متاحة عالمياً للاستدعاء من HTML
window.showProjects = () => app.showProjects();
window.showAbout = () => app.showAbout();
window.showContribute = () => app.showContribute();

// دوال مساعدة إضافية
function searchProjects(query) {
    app.performSearch(query);
}

function filterByTopic(topic) {
    app.searchByTopic(topic);
}

function contributeToProject(projectName) {
    app.contributeToProject(projectName);
}

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تأكد من تحميل نظام التنقل إذا كان موجوداً
    if (typeof navigation !== 'undefined') {
        navigation.init();
    }
    
    // تهيئة أي مكونات إضافية
    console.log('DevSahara Platform Initialized');
});
