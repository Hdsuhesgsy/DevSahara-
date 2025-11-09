// DevSahara Adaptive Learning System
class AdaptiveLearningSystem {
    constructor() {
        this.userKnowledgeGraph = {};
        this.learningPath = [];
        this.performanceMetrics = {};
        this.init();
    }

    async init() {
        await this.loadKnowledgeGraph();
        await this.analyzeUserLevel();
        this.generatePersonalizedPath();
    }

    async loadKnowledgeGraph() {
        this.knowledgeGraph = {
            'html-basics': {
                title: 'HTML Fundamentals',
                level: 'beginner',
                dependencies: [],
                duration: '2 hours',
                topics: ['elements', 'attributes', 'semantic-html'],
                difficulty: 1
            },
            'css-foundations': {
                title: 'CSS Foundations',
                level: 'beginner', 
                dependencies: ['html-basics'],
                duration: '3 hours',
                topics: ['selectors', 'box-model', 'flexbox'],
                difficulty: 2
            },
            'javascript-essentials': {
                title: 'JavaScript Essentials',
                level: 'beginner',
                dependencies: ['html-basics'],
                duration: '4 hours',
                topics: ['variables', 'functions', 'dom-manipulation'],
                difficulty: 3
            },
            'react-fundamentals': {
                title: 'React Fundamentals',
                level: 'intermediate',
                dependencies: ['javascript-essentials', 'css-foundations'],
                duration: '5 hours',
                topics: ['components', 'state', 'props'],
                difficulty: 4
            }
        };
    }

    async analyzeUserLevel() {
        const userProgress = JSON.parse(localStorage.getItem('devsahara_learning_progress')) || {};
        const completedTopics = userProgress.completedLessons || [];
        
        this.userLevel = this.calculateUserLevel(completedTopics);
        this.knowledgeGaps = this.identifyKnowledgeGaps(completedTopics);
    }

    calculateUserLevel(completedTopics) {
        const scores = {
            beginner: 0,
            intermediate: 0,
            advanced: 0
        };

        completedTopics.forEach(topicId => {
            const topic = this.knowledgeGraph[topicId];
            if (topic) {
                scores[topic.level]++;
            }
        });

        if (scores.advanced > 5) return 'advanced';
        if (scores.intermediate > 3) return 'intermediate';
        return 'beginner';
    }

    identifyKnowledgeGaps(completedTopics) {
        const gaps = [];
        
        Object.keys(this.knowledgeGraph).forEach(topicId => {
            const topic = this.knowledgeGraph[topicId];
            const isCompleted = completedTopics.includes(topicId);
            const dependenciesMet = topic.dependencies.every(dep => 
                completedTopics.includes(dep)
            );

            if (!isCompleted && dependenciesMet) {
                gaps.push(topicId);
            }
        });

        return gaps;
    }

    generatePersonalizedPath() {
        const path = [];
        const userLevel = this.userLevel;
        const knowledgeGaps = this.knowledgeGaps;

        // إضافة مواضيع لسد الفجوات
        knowledgeGaps.forEach(gap => {
            path.push({
                id: gap,
                type: 'gap-filling',
                priority: 'high'
            });
        });

        // إضافة مواضيع للتطوير
        const developmentTopics = this.getDevelopmentTopics(userLevel);
        path.push(...developmentTopics);

        this.learningPath = path;
        this.saveLearningPath();
    }

    getDevelopmentTopics(userLevel) {
        const topics = [];
        const levelMap = {
            beginner: ['html-basics', 'css-foundations', 'javascript-essentials'],
            intermediate: ['react-fundamentals', 'nodejs-basics', 'database-design'],
            advanced: ['system-design', 'performance-optimization', 'advanced-algorithms']
        };

        levelMap[userLevel].forEach(topicId => {
            if (this.knowledgeGraph[topicId]) {
                topics.push({
                    id: topicId,
                    type: 'skill-development',
                    priority: 'medium'
                });
            }
        });

        return topics;
    }

    async adjustDifficulty(performance) {
        const { accuracy, timeSpent, confidence } = performance;
        
        let adjustment = 0;
        
        if (accuracy > 0.8 && timeSpent < 300) {
            adjustment = 1; // زيادة الصعوبة
        } else if (accuracy < 0.5 || timeSpent > 600) {
            adjustment = -1; // تقليل الصعوبة
        }

        this.updateContentDifficulty(adjustment);
    }

    updateContentDifficulty(adjustment) {
        // تحديث صعوبة المحتوى بناءً على أداء المستخدم
        Object.keys(this.knowledgeGraph).forEach(topicId => {
            this.knowledgeGraph[topicId].difficulty += adjustment;
            this.knowledgeGraph[topicId].difficulty = Math.max(1, 
                Math.min(5, this.knowledgeGraph[topicId].difficulty)
            );
        });
    }

    getNextRecommendation() {
        if (this.learningPath.length === 0) return null;

        return this.learningPath[0];
    }

    recordProgress(topicId, performance) {
        const progress = {
            topicId,
            timestamp: new Date().toISOString(),
            performance,
            confidence: this.calculateConfidence(performance)
        };

        this.performanceMetrics[topicId] = this.performanceMetrics[topicId] || [];
        this.performanceMetrics[topicId].push(progress);

        this.updateLearningPath(topicId);
        this.saveProgress();
    }

    calculateConfidence(performance) {
        const { accuracy, timeSpent } = performance;
        const timeScore = Math.max(0, 1 - (timeSpent / 600)); // 10 minutes max
        return (accuracy * 0.7) + (timeScore * 0.3);
    }

    updateLearningPath(completedTopicId) {
        // إزالة الموضوع المكتمل من المسار
        this.learningPath = this.learningPath.filter(item => 
            item.id !== completedTopicId
        );

        // إضافة مواضيع جديدة متاحة
        this.addNewAvailableTopics(completedTopicId);
    }

    addNewAvailableTopics(completedTopicId) {
        Object.keys(this.knowledgeGraph).forEach(topicId => {
            const topic = this.knowledgeGraph[topicId];
            const isAvailable = topic.dependencies.includes(completedTopicId) &&
                              !this.learningPath.some(item => item.id === topicId) &&
                              !this.isTopicCompleted(topicId);

            if (isAvailable) {
                this.learningPath.push({
                    id: topicId,
                    type: 'new-available',
                    priority: 'medium'
                });
            }
        });
    }

    isTopicCompleted(topicId) {
        const userProgress = JSON.parse(localStorage.getItem('devsahara_learning_progress')) || {};
        return (userProgress.completedLessons || []).includes(topicId);
    }

    saveLearningPath() {
        localStorage.setItem('devsahara_learning_path', JSON.stringify(this.learningPath));
    }

    saveProgress() {
        localStorage.setItem('devsahara_performance_metrics', JSON.stringify(this.performanceMetrics));
    }

    getUserProgressReport() {
        const completed = Object.keys(this.performanceMetrics).length;
        const total = Object.keys(this.knowledgeGraph).length;
        const progress = (completed / total) * 100;

        const strengths = this.identifyStrengths();
        const weaknesses = this.identifyWeaknesses();

        return {
            progress: Math.round(progress),
            level: this.userLevel,
            strengths,
            weaknesses,
            nextSteps: this.getNextRecommendation(),
            estimatedCompletion: this.estimateCompletionTime()
        };
    }

    identifyStrengths() {
        const strengths = [];
        Object.keys(this.performanceMetrics).forEach(topicId => {
            const performances = this.performanceMetrics[topicId];
            const avgConfidence = performances.reduce((sum, p) => 
                sum + p.confidence, 0) / performances.length;
            
            if (avgConfidence > 0.7) {
                strengths.push(this.knowledgeGraph[topicId].title);
            }
        });
        return strengths;
    }

    identifyWeaknesses() {
        const weaknesses = [];
        Object.keys(this.performanceMetrics).forEach(topicId => {
            const performances = this.performanceMetrics[topicId];
            const avgConfidence = performances.reduce((sum, p) => 
                sum + p.confidence, 0) / performances.length;
            
            if (avgConfidence < 0.4) {
                weaknesses.push(this.knowledgeGraph[topicId].title);
            }
        });
        return weaknesses;
    }

    estimateCompletionTime() {
        const remainingTopics = this.learningPath.length;
        const avgTimePerTopic = 2; // hours
        return remainingTopics * avgTimePerTopic;
    }
}

const adaptiveLearning = new AdaptiveLearningSystem();
