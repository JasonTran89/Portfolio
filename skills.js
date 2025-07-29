function initializeSkillBars() {
    const skills = [
        { name: 'HTML', level: 90 },
        { name: 'CSS', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'C++', level: 75 }
    ];

    const container = document.getElementById('skills-container');
    
    skills.forEach(skill => {
        const skillHTML = `
            <div class="skill" data-animate>
                <div class="skill-header">
                    <span>${skill.name}</span>
                    <span class="skill-percent">0%</span>
                </div>
                <div class="skill-bar" style="width: 0" 
                     data-percent="${skill.level}"></div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', skillHTML);
    });

    animateSkillBars();
}

function animateSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const targetWidth = bar.dataset.percent;
        let current = 0;
        
        const animation = setInterval(() => {
            if (current >= targetWidth) {
                clearInterval(animation);
                return;
            }
            current++;
            bar.style.width = `${current}%`;
            bar.previousElementSibling.querySelector('.skill-percent').textContent = `${current}%`;
        }, 20);
    });
}

document.addEventListener('DOMContentLoaded', initializeSkillBars);