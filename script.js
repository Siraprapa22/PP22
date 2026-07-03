/**
 * SCADA Telemetry Controller for
 * Automation Engineer Career Development Planner
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Constants and State ---
  const SKILL_CIRCUMFERENCE = 251.2; // 2 * pi * r (r=40)
  
  // Default Skill Configurations
  const defaultSkills = {
    'industrial-automation': 75,
    'plc': 60,
    'english': 80,
    'python': 50,
    'problem-solving': 85,
    'communication': 70
  };

  // Checklist configuration IDs
  const checklistIds = [
    'chk-toeic-750',
    'chk-cefr-b2',
    'chk-industrial-automation',
    'chk-plc',
    'chk-troubleshooting',
    'chk-lsci-ai',
    'chk-prompt-eng',
    'chk-python'
  ];

  // --- Telemetry Clock ---
  function updateSystemClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;
    
    const now = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  // Run clock immediately and schedule updates
  updateSystemClock();
  setInterval(updateSystemClock, 1000);

  // --- Profile Operator Persistence ---
  const studentNameEl = document.getElementById('student-name');
  if (studentNameEl) {
    // Load student name from local storage
    const savedName = localStorage.getItem('operator_name');
    if (savedName) {
      studentNameEl.textContent = savedName;
    }

    // Save name on blur or enter key
    studentNameEl.addEventListener('blur', () => {
      localStorage.setItem('operator_name', studentNameEl.textContent.trim());
    });

    studentNameEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        studentNameEl.blur();
      }
    });
  }

  // --- Skills Calibration & Dial Updates ---
  function updateGauge(skillId, val) {
    const card = document.querySelector(`.gauge-card-interactive[data-skill-id="${skillId}"]`);
    if (!card) return;

    const fillCircle = card.querySelector('.dial-fill');
    const textVal = document.getElementById(`pct-val-${skillId}`);
    const slider = document.getElementById(`slider-${skillId}`);

    if (fillCircle) {
      // Calculate offset based on percentage
      const offset = SKILL_CIRCUMFERENCE - (val / 100) * SKILL_CIRCUMFERENCE;
      fillCircle.style.strokeDashoffset = offset;
    }

    if (textVal) {
      textVal.textContent = `${val}%`;
    }

    if (slider) {
      slider.value = val;
    }
  }

  // Set up listeners for slider interactions
  const skillSliders = document.querySelectorAll('.scada-range-slider');
  skillSliders.forEach(slider => {
    slider.addEventListener('input', (e) => {
      const skillId = e.target.id.replace('slider-', '');
      const val = parseInt(e.target.value, 10);
      
      // Update the visual dial
      updateGauge(skillId, val);
      
      // Save state to local storage
      localStorage.setItem(`skill_${skillId}`, val);
      
      // Re-calculate career readiness index
      calculateReadinessIndex();
    });
  });

  // --- Checklist Commissioning Persistence ---
  checklistIds.forEach(id => {
    const chk = document.getElementById(id);
    if (!chk) return;

    // Load from local storage
    const savedState = localStorage.getItem(`chk_${id}`);
    if (savedState !== null) {
      chk.checked = savedState === 'true';
    }

    // Save state on change
    chk.addEventListener('change', () => {
      localStorage.setItem(`chk_${id}`, chk.checked);
      calculateReadinessIndex();
    });
  });

  // --- Calculate Overall Career Readiness Index ---
  function calculateReadinessIndex() {
    // 1. Calculate Skills Average (Weight: 60% of overall rating)
    let totalSkillVal = 0;
    const skillsList = Object.keys(defaultSkills);
    
    skillsList.forEach(skillId => {
      const savedVal = localStorage.getItem(`skill_${skillId}`);
      const val = savedVal !== null ? parseInt(savedVal, 10) : defaultSkills[skillId];
      totalSkillVal += val;
    });
    const avgSkills = totalSkillVal / skillsList.length;

    // 2. Calculate Checklist Ratio (Weight: 40% of overall rating)
    let checkedCount = 0;
    checklistIds.forEach(id => {
      const chk = document.getElementById(id);
      if (chk && chk.checked) {
        checkedCount++;
      }
    });
    const checklistRatio = (checkedCount / checklistIds.length) * 100;

    // 3. Compute final metric
    const readinessIndex = Math.round((avgSkills * 0.6) + (checklistRatio * 0.4));

    // 4. Update Header indicators
    const pctText = document.getElementById('readiness-pct-text');
    const miniFill = document.getElementById('readiness-mini-fill');

    if (pctText) {
      pctText.textContent = `${readinessIndex}%`;
    }

    if (miniFill) {
      miniFill.style.width = `${readinessIndex}%`;
    }
  }

  // --- Calibration Reset Trigger ---
  const resetBtn = document.getElementById('reset-skills-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Clear localStorage elements
      Object.keys(defaultSkills).forEach(skillId => {
        localStorage.removeItem(`skill_${skillId}`);
        updateGauge(skillId, defaultSkills[skillId]);
      });

      checklistIds.forEach(id => {
        localStorage.removeItem(`chk_${id}`);
        const chk = document.getElementById(id);
        if (chk) chk.checked = false;
      });

      // Reset profile text if desired, or keep as is
      localStorage.removeItem('operator_name');
      if (studentNameEl) {
        studentNameEl.textContent = 'Alex Chen';
      }

      // Reinitialize readiness computations
      calculateReadinessIndex();
    });
  }

  // --- Initialize Telemetry Panel Data ---
  function initializeDashboard() {
    // Load skills
    Object.keys(defaultSkills).forEach(skillId => {
      const savedVal = localStorage.getItem(`skill_${skillId}`);
      const val = savedVal !== null ? parseInt(savedVal, 10) : defaultSkills[skillId];
      updateGauge(skillId, val);
    });

    // Run first calculation
    calculateReadinessIndex();
  }

  initializeDashboard();

  // --- Scroll Spy for Sticky Sidebar ---
  const sections = document.querySelectorAll('.dashboard-section');
  const navItems = document.querySelectorAll('.nav-item');

  function handleScrollSpy() {
    let currentId = 'home';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScrollSpy);
});
