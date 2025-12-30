document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle Chat
    function toggleChat() {
        const isOpen = chatWindow.classList.contains('active');
        if (isOpen) {
            chatWindow.classList.remove('active');
            chatToggle.classList.remove('open');
            chatToggle.querySelector('i').classList.replace('fa-times', 'fa-comment-dots');
        } else {
            chatWindow.classList.add('active');
            chatToggle.classList.add('open');
            chatToggle.querySelector('i').classList.replace('fa-comment-dots', 'fa-times');
            // Focus input when opened
            setTimeout(() => chatInput.focus(), 300);
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);

    // Send Message Logic
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // 1. Add User Message
        addMessage(message, 'user');
        chatInput.value = '';

        // 2. Simulate AI processing (Typing indicator)
        showTypingIndicator();

        // 3. Generate Mock Response (Simulating RAG)
        setTimeout(() => {
            removeTypingIndicator();
            const response = generateMockResponse(message);
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000); // 1-2s delay
    }

    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Helper: Add Message to DOM
    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.classList.add('message', sender);

        // Convert URLs to links if simple text
        // (Basic implementation)
        if (text.includes('http')) {
           // Basic autolink (can be improved)
           // This is just a PoC, be careful with XSS in real apps
        }

        div.innerText = text;
        chatMessages.appendChild(div);
        scrollToBottom();
    }

    // Helper: Scroll to bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Helper: Typing Indicator
    function showTypingIndicator() {
        const div = document.createElement('div');
        div.classList.add('typing-indicator');
        div.id = 'typingIndicator';
        div.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(div);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    // --- Mock RAG Logic (The "Brain") ---
    function generateMockResponse(input) {
        const lowerInput = input.toLowerCase();
        const data = window.portfolioData || {}; // Access global data

        // Default fallback
        let response = "Lo siento, no tengo información específica sobre eso. ¿Te gustaría saber sobre mis proyectos, habilidades o cómo contactarme?";

        // 1. Greetings
        if (lowerInput.match(/hola|buenos dias|buenas|hello|hi/)) {
            return "¡Hola! ¿En qué puedo ayudarte? Puedes preguntarme sobre mi experiencia, tecnologías que uso o mis proyectos.";
        }

        // 2. Contact
        if (lowerInput.match(/contacto|email|correo|telefono|llamar|contactar|ubicacion|donde vivis/)) {
            const p = data.profile;
            return `Puedes contactar a ${p.name} al correo ${p.email} o al teléfono ${p.phone}. Reside en ${p.location}.`;
        }

        // 3. Skills / Tech
        if (lowerInput.match(/habilidades|skills|tecnologias|stack|lenguajes|sabes python|sabes react/)) {
            const s = data.skills;
            const frontend = s.frontend.join(', ');
            const backend = s.backend.join(', ');
            return `Mis habilidades principales son:\nFrontend: ${frontend}\nBackend: ${backend}.`;
        }

        // Specific tech query
        if (lowerInput.includes('python')) return "Sí, tengo experiencia con Python, especialmente con Django y scripts de automatización.";
        if (lowerInput.includes('react')) return "Sí, React es una de mis herramientas principales para el frontend. He desarrollado varias aplicaciones como 'Baloncestoteam'.";
        if (lowerInput.includes('django')) return "Tengo experiencia sólida en Django, como se puede ver en mi proyecto de 'Encuestas Django'.";

        // 4. Projects
        if (lowerInput.match(/proyectos|trabajos|portafolio|que has hecho/)) {
            const projectNames = data.projects.map(p => p.title).join(', ');
            return `He trabajado en más de ${data.profile.completed_projects} proyectos. Algunos destacados son: ${projectNames}. ¿Te gustaría saber detalles de alguno en particular?`;
        }

        // Specific Project Details (Simple keyword matching)
        const foundProject = data.projects.find(p => lowerInput.includes(p.title.toLowerCase()) || lowerInput.includes(p.title.split(' ')[0].toLowerCase()));
        if (foundProject) {
            return `El proyecto "${foundProject.title}" es un(a) ${foundProject.description}. Tecnologías usadas: ${foundProject.tech.join(', ')}. Puedes verlo aquí: ${foundProject.link}`;
        }

        // 5. Experience
        if (lowerInput.match(/experiencia|trayectoria|trabajo actual/)) {
            return `${data.profile.bio} Tengo ${data.profile.experience_years} años de experiencia. Actualmente trabajo en proyectos freelance y mi formación en la U. Mayor.`;
        }

        // 6. About / Bio
        if (lowerInput.match(/sobre ti|quien eres|biografia|resumen/)) {
            return data.profile.bio;
        }

        return response;
    }
});
