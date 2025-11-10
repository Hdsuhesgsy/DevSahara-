// Animations and Progress Updates
window.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.progress-bar');
  setTimeout(() => {
    progressBar.style.width = '35%';
  }, 500);

  document.querySelectorAll('.fade-in-up').forEach((el, i) => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.animation = 'fadeInUp 0.6s ease forwards';
    }, i * 200);
  });
});

// DevSahara Advanced Learning System
class LearningSystem {
    constructor() {
        this.currentPath = null;
        this.lessons = [];
        this.userProgress = {};
        this.dailyChallenges = [];
        this.init();
    }

    init() {
        this.loadLearningPaths();
        this.loadUserProgress();
        this.loadDailyChallenges();
        this.renderActiveLessons();
        this.renderDailyChallenges();
    }

    loadLearningPaths() {
        this.learningPaths = {
            frontend: {
                name: "Frontend Master",
                description: "Become a frontend expert with modern technologies",
                lessons: [
                    { id: 1, title: "HTML5 Fundamentals", duration: "2 hours", completed: true },
                    { id: 2, title: "CSS3 & Flexbox", duration: "3 hours", completed: true },
                    { id: 3, title: "JavaScript Basics", duration: "4 hours", completed: true },
                    { id: 4, title: "React Components", duration: "5 hours", completed: false },
                    { id: 5, title: "State Management", duration: "4 hours", completed: false }
                ]
            },
            backend: {
                name: "Backend Expert", 
                description: "Master server-side development and APIs",
                lessons: [
                    { id: 6, title: "Node.js Fundamentals", duration: "3 hours", completed: true },
                    { id: 7, title: "Express.js Framework", duration: "4 hours", completed: true },
                    { id: 8, title: "Database Design", duration: "5 hours", completed: false },
                    { id: 9, title: "RESTful APIs", duration: "4 hours", completed: false }
                ]
            },
            mobile: {
                name: "Mobile Developer",
                description: "Build cross-platform mobile applications",
                lessons: [
                    { id: 10, title: "React Native Basics", duration: "3 hours", completed: true },
                    { id: 11, title: "Mobile UI Design", duration: "4 hours", completed: false },
                    { id: 12, title: "API Integration", duration: "3 hours", completed: false }
                ]
            }
        };
    }

    loadUserProgress() {
        this.userProgress = JSON.parse(localStorage.getItem('devsahara_learning_progress')) || {
            completedLessons: [1, 2, 3, 6, 7, 10],
            currentPath: 'frontend',
            points: 450,
            streak: 7
        };
    }

    loadDailyChallenges() {
        this.dailyChallenges = [
            {
                id: 1,
                title: "Build a Responsive Navbar",
                description: "Create a navigation bar that works on both desktop and mobile",
                difficulty: "Beginner",
                points: 50,
                tech: ["HTML", "CSS"],
                completed: false
            },
            {
                id: 2, 
                title: "API Data Fetching",
                description: "Fetch and display data from a public API",
                difficulty: "Intermediate",
                points: 100,
                tech: ["JavaScript", "API"],
                completed: false
            },
            {
                id: 3,
                title: "E-commerce Cart System",
                description: "Implement a shopping cart with add/remove functionality",
                difficulty: "Advanced", 
                points: 200,
                tech: ["React", "JavaScript"],
                completed: false
            }
        ];
    }

    selectPath(pathId) {
        this.currentPath = this.learningPaths[pathId];
        this.renderPathLessons();
        auth.showNotification(`Selected learning path: ${this.currentPath.name}`, 'success');
    }

    renderPathLessons() {
        if (!this.currentPath) return;

        const lessonsHTML = this.currentPath.lessons.map(lesson => `
            <div class="path-card">
                <div style="display: flex; justify-content: between; align-items: center;">
                    <h4>${lesson.title}</h4>
                    ${lesson.completed ? '<span class="lesson-complete">✓ Completed</span>' : ''}
                </div>
                <p>⏱️ ${lesson.duration}</p>
                <div class="project-actions">
                    <button class="btn" onclick="learningSystem.startLesson(${lesson.id})">
                        <span>${lesson.completed ? 'Review' : 'Start Lesson'}</span>
                    </button>
                    ${!lesson.completed ? `
                        <button class="btn btn-secondary" onclick="learningSystem.markComplete(${lesson.id})">
                            <span>Mark Complete</span>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');

        // في التطبيق الحقيقي، قد تفتح نافذة منبثقة أو صفحة جديدة
        alert(`Lessons for ${this.currentPath.name}:\n\n${this.currentPath.lessons.map(l => l.title).join('\n')}`);
    }

    renderActiveLessons() {
        const container = document.getElementById('active-lessons');
        const activeLessons = Object.values(this.learningPaths)
            .flatMap(path => path.lessons)
            .filter(lesson => !lesson.completed)
            .slice(0, 3);

        container.innerHTML = activeLessons.map(lesson => `
            <div class="project-card">
                <h4>${lesson.title}</h4>
                <p>⏱️ ${lesson.duration} • 🎯 Continue learning</p>
                <button class="btn" onclick="learningSystem.startLesson(${lesson.id})">
                    <span>Continue</span>
                </button>
            </div>
        `).join('');
    }

    renderDailyChallenges() {
        const container = document.getElementById('daily-challenges');
        container.innerHTML = this.dailyChallenges.map(challenge => `
            <div class="project-card">
                <div style="display: flex; justify-content: between; align-items: start;">
                    <h4>${challenge.title}</h4>
                    <span class="badge">${challenge.difficulty}</span>
                </div>
                <p>${challenge.description}</p>
                <div class="project-tech">
                    <strong>Technologies:</strong> ${challenge.tech.join(', ')}
                </div>
                <div class="project-stats">
                    <span>🏆 ${challenge.points} points</span>
                    <span>${challenge.completed ? '✅ Completed' : '⏳ Pending'}</span>
                </div>
                <div class="project-actions">
                    <button class="btn" onclick="learningSystem.startChallenge(${challenge.id})">
                        <span>Start Challenge</span>
                    </button>
                </div>
            </div>
        `).join('');
    }

    startLesson(lessonId) {
        // في التطبيق الحقيقي، قد تفتح صفحة درس تفاعلي
        auth.showNotification(`Starting lesson ${lessonId} - Opening interactive tutorial...`, 'success');
        
        // محاكاة بدء الدرس
        setTimeout(() => {
            this.simulateLessonCompletion(lessonId);
        }, 2000);
    }

    simulateLessonCompletion(lessonId) {
        if (!this.userProgress.completedLessons.includes(lessonId)) {
            this.userProgress.completedLessons.push(lessonId);
            this.userProgress.points += 25;
            this.saveProgress();
            auth.showNotification('🎉 Lesson completed! +25 points', 'success');
            this.renderActiveLessons();
        }
    }

    markComplete(lessonId) {
        this.simulateLessonCompletion(lessonId);
    }

    startChallenge(challengeId) {
        const challenge = this.dailyChallenges.find(c => c.id === challengeId);
        if (challenge) {
            auth.showNotification(`Starting challenge: ${challenge.title}`, 'success');
            
            // محاكاة إكمال التحدي
            setTimeout(() => {
                this.completeChallenge(challengeId);
            }, 3000);
        }
    }

    completeChallenge(challengeId) {
        const challenge = this.dailyChallenges.find(c => c.id === challengeId);
        if (challenge && !challenge.completed) {
            challenge.completed = true;
            this.userProgress.points += challenge.points;
            this.saveProgress();
            auth.showNotification(`🏆 Challenge completed! +${challenge.points} points`, 'success');
            this.renderDailyChallenges();
        }
    }

    changeLanguage() {
        const select = document.getElementById('language-select');
        const editor = document.getElementById('code-editor');
        
        const defaultCode = {
            html: `<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello DevSahara!</h1>\n</body>\n</html>`,
            css: `body {\n  font-family: Arial, sans-serif;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: white;\n}`,
            javascript: `// JavaScript Playground\nfunction greet() {\n  return "Hello African & Asian Developers!";\n}\n\nconsole.log(greet());`,
            python: `# Python Playground\ndef welcome():\n    return "Welcome to DevSahara Learning Hub!"\n\nprint(welcome())`
        };

        editor.value = defaultCode[select.value] || '';
    }

    runCode() {
        const code = document.getElementById('code-editor').value;
        const language = document.getElementById('language-select').value;
        const output = document.getElementById('code-output');

        try {
            // محاكاة تنفيذ الكود (في تطبيق حقيقي، قد تستخدم خدمة مثل CodePen API)
            let result = '';
            
            switch(language) {
                case 'javascript':
                    result = this.runJavaScript(code);
                    break;
                case 'python':
                    result = this.runPython(code);
                    break;
                default:
                    result = `Code executed successfully for ${language}`;
            }

            output.innerHTML = `<div style="color: #00ff00;">${result}</div>`;
            auth.showNotification('✅ Code executed successfully!', 'success');
        } catch (error) {
            output.innerHTML = `<div style="color: #ff6b6b;">Error: ${error.message}</div>`;
        }
    }

    runJavaScript(code) {
        // محاكاة تنفيذ جافاسكريبت (في تطبيق حقيقي، استخدم بيئة معزولة)
        if (code.includes('console.log')) {
            return "Hello African & Asian Developers!\nWelcome to DevSahara Code Playground!";
        }
        return "Code executed successfully!";
    }

    runPython(code) {
        // محاكاة تنفيذ بايثون
        if (code.includes('print(')) {
            return "Welcome to DevSahara Learning Hub!\nPython code executed successfully!";
        }
        return "Python code executed!";
    }

    saveProgress() {
        localStorage.setItem('devsahara_learning_progress', JSON.stringify(this.userProgress));
    }

    getUserStats() {
        const totalLessons = Object.values(this.learningPaths)
            .flatMap(path => path.lessons).length;
        const completed = this.userProgress.completedLessons.length;
        
        return {
            totalLessons,
            completed,
            progress: Math.round((completed / totalLessons) * 100),
            points: this.userProgress.points,
            streak: this.userProgress.streak
        };
    }
}

// تهيئة نظام التعلم
const learningSystem = new LearningSystem();
