// DevSahara Advanced AI with GPT-4 Integration
class AdvancedAIAssistant {
    constructor() {
        this.conversationHistory = [];
        this.userProfile = {};
        this.learningContext = {};
        this.isOnline = false;
        this.init();
    }

    async init() {
        await this.loadUserData();
        await this.checkAIConnection();
        this.setupRealTimeFeatures();
    }

    async loadUserData() {
        this.userProfile = JSON.parse(localStorage.getItem('devsahara_user_profile')) || {
            skillLevel: 'beginner',
            interests: ['web development', 'javascript'],
            learningGoals: [],
            preferredLanguages: ['english', 'arabic']
        };

        this.learningContext = JSON.parse(localStorage.getItem('devsahara_learning_context')) || {
            currentCourse: null,
            recentTopics: [],
            difficulties: {},
            achievements: []
        };
    }

    async checkAIConnection() {
        // محاكاة اتصال بالذكاء الاصطناعي
        this.isOnline = await this.simulateAIConnection();
        
        if (this.isOnline) {
            console.log('🤖 Advanced AI Assistant Connected');
            this.showAIPresence();
        }
    }

    async simulateAIConnection() {
        return new Promise(resolve => {
            setTimeout(() => resolve(true), 1000);
        });
    }

    setupRealTimeFeatures() {
        // تحديث في الوقت الحقيقي
        setInterval(() => this.updateLearningSuggestions(), 300000); // كل 5 دقائق
        this.setupVoiceCommands();
        this.setupCodeAnalysis();
    }

    setupVoiceCommands() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.handleVoiceCommand(transcript);
            };
        }
    }

    async handleVoiceCommand(command) {
        const response = await this.processVoiceCommand(command);
        this.speakResponse(response);
    }

    async processVoiceCommand(command) {
        const lowerCommand = command.toLowerCase();
        
        if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
            return await this.explainConcept(command);
        } else if (lowerCommand.includes('code') || lowerCommand.includes('how to')) {
            return await this.generateCodeSolution(command);
        } else if (lowerCommand.includes('help') || lowerCommand.includes('stuck')) {
            return await this.provideHelp(command);
        } else {
            return await this.generalResponse(command);
        }
    }

    speakResponse(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        }
    }

    async explainConcept(concept) {
        // محاكاة استدعاء GPT-4
        const explanations = {
            'closure': `A closure in JavaScript is a function that has access to its own scope, 
                       the outer function's scope, and the global scope. It "remembers" the 
                       environment in which it was created.`,
            'react hooks': `React Hooks are functions that let you use state and other React 
                          features in functional components. The most common hooks are useState 
                          for state management and useEffect for side effects.`,
            'async await': `Async/await is syntactic sugar for Promises in JavaScript. It makes 
                          asynchronous code look and behave more like synchronous code, making 
                          it easier to read and write.`
        };

        const foundConcept = Object.keys(explanations).find(key => 
            concept.toLowerCase().includes(key)
        );

        return foundConcept ? explanations[foundConcept] : 
               `I'd be happy to explain "${concept}". In simple terms, it's a fundamental concept that helps developers build more efficient applications. Would you like a detailed example?`;
    }

    async generateCodeSolution(problem) {
        const solutions = {
            'sort array': `// Sorting an array in JavaScript
const numbers = [5, 2, 8, 1, 4];
const sorted = numbers.sort((a, b) => a - b);
console.log(sorted); // [1, 2, 4, 5, 8]`,

            'fetch api': `// Fetching data from API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}`,

            'react component': `// Simple React Functional Component
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}`
        };

        const foundSolution = Object.keys(solutions).find(key => 
            problem.toLowerCase().includes(key)
        );

        return foundSolution ? solutions[foundSolution] : 
               `Here's a general solution approach for "${problem}":\n\n1. Understand the problem requirements\n2. Break it down into smaller steps\n3. Write pseudocode\n4. Implement step by step\n5. Test thoroughly\n\nWould you like me to generate specific code for this?`;
    }

    async analyzeCode(code, language) {
        const analysis = {
            quality: this.assessCodeQuality(code),
            suggestions: this.generateSuggestions(code, language),
            complexity: this.calculateComplexity(code),
            bestPractices: this.checkBestPractices(code, language)
        };

        return analysis;
    }

    assessCodeQuality(code) {
        const lines = code.split('\n');
        const score = Math.min(100, Math.max(0, 
            100 - (lines.length * 0.5) + 
            (this.countFunctions(code) * 10) -
            (this.countComplexityIndicators(code) * 5)
        ));

        return {
            score: Math.round(score),
            feedback: score >= 80 ? 'Excellent' : 
                     score >= 60 ? 'Good' : 
                     score >= 40 ? 'Needs Improvement' : 'Poor'
        };
    }

    countFunctions(code) {
        return (code.match(/function|=>/g) || []).length;
    }

    countComplexityIndicators(code) {
        const indicators = ['for(', 'while(', 'if(', 'else{', 'catch'];
        return indicators.reduce((count, indicator) => 
            count + (code.split(indicator).length - 1), 0
        );
    }

    async updateLearningSuggestions() {
        const suggestions = await this.generatePersonalizedSuggestions();
        this.displaySuggestions(suggestions);
    }

    async generatePersonalizedSuggestions() {
        const userLevel = this.userProfile.skillLevel;
        const interests = this.userProfile.interests;
        
        const suggestions = {
            beginner: [
                'Start with HTML/CSS fundamentals',
                'Practice basic JavaScript syntax',
                'Build a simple portfolio website'
            ],
            intermediate: [
                'Learn React or Vue.js framework',
                'Practice API integration',
                'Build a full-stack application'
            ],
            advanced: [
                'Explore advanced algorithms',
                'Learn system design',
                'Contribute to open source projects'
            ]
        };

        return suggestions[userLevel] || suggestions.beginner;
    }

    showAIPresence() {
        const aiPresence = document.createElement('div');
        aiPresence.className = 'ai-presence-indicator';
        aiPresence.innerHTML = `
            <div class="ai-status">
                <span class="ai-dot"></span>
                <span>AI Assistant Online</span>
            </div>
        `;
        document.body.appendChild(aiPresence);
    }
}

// Initialize Advanced AI
const advancedAI = new AdvancedAIAssistant();
