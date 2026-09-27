/**
 * Interactive CV Editor & Live Builder Engine
 * Reactive 2-way data binding, auto-save, PDF generation & data export
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'gazi_cv_user_data_v1';
  let state = null;
  let saveTimeout = null;

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initState();
    renderEditorForm();
    renderLivePreview();
    setupGlobalEventListeners();
  });

  /* ==========================================================================
     1. State Management & Persistence
     ========================================================================== */
  function initState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load from localStorage, using master data:', e);
    }

    if (!state) {
      // Deep clone master data
      state = JSON.parse(JSON.stringify(window.CV_MASTER_DATA));
    }
  }

  function saveState() {
    const badge = document.getElementById('autosaveBadge');
    if (badge) badge.innerHTML = '<span class="autosave-dot" style="background:#f59e0b"></span> Saving...';

    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        if (badge) badge.innerHTML = '<span class="autosave-dot"></span> Auto-saved';
      } catch (e) {
        console.error('Save error:', e);
        if (badge) badge.innerHTML = '<span class="autosave-dot" style="background:#ef4444"></span> Storage Error';
      }
    }, 400);
  }

  /* ==========================================================================
     2. Form Rendering (Left Sidebar)
     ========================================================================== */
  function renderEditorForm() {
    const container = document.getElementById('editorFormSections');
    if (!container) return;

    container.innerHTML = `
      <!-- 1. Header & Contact Details -->
      <div class="editor-section active" id="sec-personal">
        <button type="button" class="section-toggle-btn" onclick="toggleSection('sec-personal')">
          <div class="section-toggle-left">
            <span class="section-icon">👤</span>
            <span>Personal & Contact Info</span>
          </div>
          <span class="toggle-arrow">▾</span>
        </button>
        <div class="section-body">
          <div class="form-field">
            <label class="field-label">Full Name</label>
            <input type="text" class="field-input" value="${escapeHtml(state.personal.fullName)}" oninput="updateField('personal.fullName', this.value)">
          </div>
          <div class="form-field">
            <label class="field-label">Professional Title / Headline</label>
            <input type="text" class="field-input" value="${escapeHtml(state.personal.title)}" oninput="updateField('personal.title', this.value)">
          </div>
          <div class="form-grid-2">
            <div class="form-field">
              <label class="field-label">Location</label>
              <input type="text" class="field-input" value="${escapeHtml(state.personal.location)}" oninput="updateField('personal.location', this.value)">
            </div>
            <div class="form-field">
              <label class="field-label">Phone</label>
              <input type="text" class="field-input" value="${escapeHtml(state.personal.phone)}" oninput="updateField('personal.phone', this.value)">
            </div>
          </div>
          <div class="form-grid-2">
            <div class="form-field">
              <label class="field-label">Email</label>
              <input type="email" class="field-input" value="${escapeHtml(state.personal.email)}" oninput="updateField('personal.email', this.value)">
            </div>
            <div class="form-field">
              <label class="field-label">Portfolio URL</label>
              <input type="text" class="field-input" value="${escapeHtml(state.personal.portfolioUrl)}" oninput="updateField('personal.portfolioUrl', this.value)">
            </div>
          </div>
          <div class="form-grid-2">
            <div class="form-field">
              <label class="field-label">GitHub URL</label>
              <input type="text" class="field-input" value="${escapeHtml(state.personal.githubUrl)}" oninput="updateField('personal.githubUrl', this.value)">
            </div>
            <div class="form-field">
              <label class="field-label">LinkedIn URL</label>
              <input type="text" class="field-input" value="${escapeHtml(state.personal.linkedinUrl)}" oninput="updateField('personal.linkedinUrl', this.value)">
            </div>
          </div>
          <div class="form-field">
            <label class="field-label">Photo Mode & Style</label>
            <div class="radio-pill-group">
              <button type="button" class="radio-pill-btn ${state.personal.photoMode === 'square' ? 'active' : ''}" onclick="setPhotoMode('square')">Square Frame</button>
              <button type="button" class="radio-pill-btn ${state.personal.photoMode === 'rounded' ? 'active' : ''}" onclick="setPhotoMode('rounded')">Circular</button>
              <button type="button" class="radio-pill-btn ${state.personal.photoMode === 'hidden' ? 'active' : ''}" onclick="setPhotoMode('hidden')">Hide (Pure Text)</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Summary & Impact Metrics -->
      <div class="editor-section" id="sec-summary">
        <button type="button" class="section-toggle-btn" onclick="toggleSection('sec-summary')">
          <div class="section-toggle-left">
            <span class="section-icon">📝</span>
            <span>Summary & Impact Metrics</span>
          </div>
          <span class="toggle-arrow">▾</span>
        </button>
        <div class="section-body">
          <div class="form-field">
            <label class="field-label">Executive Professional Summary</label>
            <textarea class="field-textarea" rows="5" oninput="updateField('summary', this.value)">${escapeHtml(state.summary)}</textarea>
          </div>
          <div class="field-label" style="margin-top:6px;">Highlights Metrics Strip</div>
          <div class="form-grid-2">
            ${state.metrics.map((m, idx) => `
              <div class="list-card-item">
                <div class="form-field">
                  <label class="field-label">Metric ${idx + 1} Value</label>
                  <input type="text" class="field-input" value="${escapeHtml(m.value)}" oninput="updateMetric(${idx}, 'value', this.value)">
                </div>
                <div class="form-field">
                  <label class="field-label">Metric Label</label>
                  <input type="text" class="field-input" value="${escapeHtml(m.label)}" oninput="updateMetric(${idx}, 'label', this.value)">
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- 3. Core Competencies & Skills -->
      <div class="editor-section" id="sec-skills">
        <button type="button" class="section-toggle-btn" onclick="toggleSection('sec-skills')">
          <div class="section-toggle-left">
            <span class="section-icon">⚡</span>
            <span>Core Competencies & Skills</span>
          </div>
          <span class="toggle-arrow">▾</span>
        </button>
        <div class="section-body">
          <div class="form-field">
            <label class="field-label">Technical SEO</label>
            <textarea class="field-textarea" rows="2" oninput="updateField('skills.technicalSeo', this.value)">${escapeHtml(state.skills.technicalSeo)}</textarea>
          </div>
          <div class="form-field">
            <label class="field-label">On-Page & Semantic SEO</label>
            <textarea class="field-textarea" rows="2" oninput="updateField('skills.onPageSemantic', this.value)">${escapeHtml(state.skills.onPageSemantic)}</textarea>
          </div>
          <div class="form-field">
            <label class="field-label">Off-Page & Authority Building</label>
            <textarea class="field-textarea" rows="2" oninput="updateField('skills.offPageAuthority', this.value)">${escapeHtml(state.skills.offPageAuthority)}</textarea>
          </div>
          <div class="form-field">
            <label class="field-label">Analytics & SEO Tool Stack</label>
            <textarea class="field-textarea" rows="2" oninput="updateField('skills.analyticsTools', this.value)">${escapeHtml(state.skills.analyticsTools)}</textarea>
          </div>
          <div class="form-field">
            <label class="field-label">Web & Programming Foundation</label>
            <textarea class="field-textarea" rows="2" oninput="updateField('skills.webProgramming', this.value)">${escapeHtml(state.skills.webProgramming)}</textarea>
          </div>
        </div>
      </div>

      <!-- 4. Professional Experience -->
      <div class="editor-section" id="sec-experience">
        <button type="button" class="section-toggle-btn" onclick="toggleSection('sec-experience')">
          <div class="section-toggle-left">
            <span class="section-icon">💼</span>
            <span>Professional Experience (${state.experience.length})</span>
          </div>
          <span class="toggle-arrow">▾</span>
        </button>
        <div class="section-body">
          <div id="experienceItemsContainer">
            ${renderExperienceFormItems()}
          </div>
          <button type="button" class="btn-add-section-item" onclick="addExperienceItem()">
            + Add New Work Experience
          </button>
        </div>
      </div>

      <!-- 5. Featured SEO Case Studies -->
      <div class="editor-section" id="sec-casestudies">
        <button type="button" class="section-toggle-btn" onclick="toggleSection('sec-casestudies')">
          <div class="section-toggle-left">
            <span class="section-icon">📈</span>
            <span>Featured Case Studies (${state.caseStudies.length})</span>
          </div>
          <span class="toggle-arrow">▾</span>
        </button>
        <div class="section-body">
          <div id="caseStudyItemsContainer">
            ${renderCaseStudyFormItems()}
          </div>
          <button type="button" class="btn-add-section-item" onclick="addCaseStudyItem()">
            + Add New Case Study
          </button>
        </div>
      </div>

      <!-- 6. Education -->
      <div class="editor-section" id="sec-education">
        <button type="button" class="section-toggle-btn" onclick="toggleSection('sec-education')">
          <div class="section-toggle-left">
            <span class="section-icon">🎓</span>
            <span>Education</span>
          </div>
          <span class="toggle-arrow">▾</span>
        </button>
        <div class="section-body">
          ${state.education.map((edu, idx) => `
            <div class="list-card-item">
              <div class="form-field">
                <label class="field-label">Degree Title</label>
                <input type="text" class="field-input" value="${escapeHtml(edu.degree)}" oninput="updateEducation(${idx}, 'degree', this.value)">
              </div>
              <div class="form-grid-2">
                <div class="form-field">
                  <label class="field-label">Institution</label>
                  <input type="text" class="field-input" value="${escapeHtml(edu.institution)}" oninput="updateEducation(${idx}, 'institution', this.value)">
                </div>
                <div class="form-field">
                  <label class="field-label">Period</label>
                  <input type="text" class="field-input" value="${escapeHtml(edu.period)}" oninput="updateEducation(${idx}, 'period', this.value)">
                </div>
              </div>
              <div class="form-field">
                <label class="field-label">Details / Strategic Advantage Description</label>
                <textarea class="field-textarea" rows="2" oninput="updateEducation(${idx}, 'description', this.value)">${escapeHtml(edu.description)}</textarea>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 7. Academic & Professional References -->
      <div class="editor-section" id="sec-references">
        <button type="button" class="section-toggle-btn" onclick="toggleSection('sec-references')">
          <div class="section-toggle-left">
            <span class="section-icon">🏛️</span>
            <span>References (${state.references.length})</span>
          </div>
          <span class="toggle-arrow">▾</span>
        </button>
        <div class="section-body">
          ${state.references.map((ref, idx) => `
            <div class="list-card-item">
              <div class="list-card-header">
                <span class="list-card-title">Reference ${idx + 1}: ${escapeHtml(ref.name)}</span>
              </div>
              <div class="form-grid-2">
                <div class="form-field">
                  <label class="field-label">Name</label>
                  <input type="text" class="field-input" value="${escapeHtml(ref.name)}" oninput="updateReference(${idx}, 'name', this.value)">
                </div>
                <div class="form-field">
                  <label class="field-label">Title / Role</label>
                  <input type="text" class="field-input" value="${escapeHtml(ref.title)}" oninput="updateReference(${idx}, 'title', this.value)">
                </div>
              </div>
              <div class="form-field">
                <label class="field-label">Department & Institution</label>
                <input type="text" class="field-input" value="${escapeHtml(ref.department)}" oninput="updateReference(${idx}, 'department', this.value)">
              </div>
              <div class="form-grid-2">
                <div class="form-field">
                  <label class="field-label">Email</label>
                  <input type="email" class="field-input" value="${escapeHtml(ref.email)}" oninput="updateReference(${idx}, 'email', this.value)">
                </div>
                <div class="form-field">
                  <label class="field-label">Phone</label>
                  <input type="text" class="field-input" value="${escapeHtml(ref.phone)}" oninput="updateReference(${idx}, 'phone', this.value)">
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderExperienceFormItems() {
    return state.experience.map((exp, expIdx) => `
      <div class="list-card-item" style="margin-bottom: 14px;" id="form-exp-${exp.id}">
        <div class="list-card-header">
          <span class="list-card-title">${escapeHtml(exp.role)} @ ${escapeHtml(exp.company)}</span>
          <button type="button" class="btn-remove-item" onclick="removeExperienceItem('${exp.id}')">Remove Role ✕</button>
        </div>
        <div class="form-grid-2">
          <div class="form-field">
            <label class="field-label">Job Title / Role</label>
            <input type="text" class="field-input" value="${escapeHtml(exp.role)}" oninput="updateExperienceField(${expIdx}, 'role', this.value)">
          </div>
          <div class="form-field">
            <label class="field-label">Company Name</label>
            <input type="text" class="field-input" value="${escapeHtml(exp.company)}" oninput="updateExperienceField(${expIdx}, 'company', this.value)">
          </div>
        </div>
        <div class="form-grid-2">
          <div class="form-field">
            <label class="field-label">Period / Duration</label>
            <input type="text" class="field-input" value="${escapeHtml(exp.period)}" oninput="updateExperienceField(${expIdx}, 'period', this.value)">
          </div>
          <div class="form-field">
            <label class="field-label">Location</label>
            <input type="text" class="field-input" value="${escapeHtml(exp.location)}" oninput="updateExperienceField(${expIdx}, 'location', this.value)">
          </div>
        </div>

        <div class="form-field">
          <label class="field-label">Bullet Achievements</label>
          <div class="bullets-group">
            ${exp.bullets.map((bullet, bIdx) => `
              <div class="bullet-row">
                <textarea class="field-textarea bullet-input" rows="2" oninput="updateExperienceBullet(${expIdx}, ${bIdx}, this.value)">${escapeHtml(bullet)}</textarea>
                <button type="button" class="btn-delete-bullet" title="Delete bullet" onclick="removeExperienceBullet(${expIdx}, ${bIdx})">✕</button>
              </div>
            `).join('')}
            <button type="button" class="btn-add-bullet" onclick="addExperienceBullet(${expIdx})">+ Add Achievement Bullet</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderCaseStudyFormItems() {
    return state.caseStudies.map((cs, csIdx) => `
      <div class="list-card-item" style="margin-bottom: 14px;" id="form-cs-${cs.id}">
        <div class="list-card-header">
          <span class="list-card-title">${escapeHtml(cs.title)}</span>
          <button type="button" class="btn-remove-item" onclick="removeCaseStudyItem('${cs.id}')">Remove Case Study ✕</button>
        </div>
        <div class="form-field">
          <label class="field-label">Case Study Headline / Title</label>
          <input type="text" class="field-input" value="${escapeHtml(cs.title)}" oninput="updateCaseStudyTitle(${csIdx}, this.value)">
        </div>
        <div class="form-field">
          <label class="field-label">Action & Results Bullets</label>
          <div class="bullets-group">
            ${cs.bullets.map((b, bIdx) => `
              <div class="bullet-row">
                <textarea class="field-textarea bullet-input" rows="2" oninput="updateCaseStudyBullet(${csIdx}, ${bIdx}, this.value)">${escapeHtml(b)}</textarea>
                <button type="button" class="btn-delete-bullet" title="Delete bullet" onclick="removeCaseStudyBullet(${csIdx}, ${bIdx})">✕</button>
              </div>
            `).join('')}
            <button type="button" class="btn-add-bullet" onclick="addCaseStudyBullet(${csIdx})">+ Add Case Study Bullet</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     3. Live Document Preview Rendering (Right Panel)
     ========================================================================== */
  function renderLivePreview() {
    const paper = document.getElementById('cv-preview-paper');
    if (!paper) return;

    const p = state.personal || {};
    const photoClass = p.photoMode === 'rounded' ? 'photo-rounded' : 'photo-square';
    const isPhotoHidden = p.photoMode === 'hidden' || !p.photoUrl || !p.photoUrl.trim();

    // 1. Build dynamic contact items (Omit any empty field and its label)
    const contactItems = [];
    if (p.location && p.location.trim()) {
      contactItems.push(`<span class="contact-item"><strong>Location:</strong> ${escapeHtml(p.location.trim())}</span>`);
    }
    if (p.phone && p.phone.trim()) {
      contactItems.push(`<span class="contact-item"><strong>Phone:</strong> <a href="tel:${escapeHtml(p.phone.trim())}">${escapeHtml(p.phone.trim())}</a></span>`);
    }
    if (p.email && p.email.trim()) {
      contactItems.push(`<span class="contact-item"><strong>Email:</strong> <a href="mailto:${escapeHtml(p.email.trim())}">${escapeHtml(p.email.trim())}</a></span>`);
    }
    if (p.portfolioUrl && p.portfolioUrl.trim()) {
      const displayUrl = p.portfolioUrl.trim().replace(/^https?:\/\//i, '').replace(/\/$/, '');
      contactItems.push(`<span class="contact-item"><strong>Portfolio:</strong> <a href="${escapeHtml(p.portfolioUrl.trim())}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayUrl)}</a></span>`);
    }
    if (p.githubUrl && p.githubUrl.trim()) {
      const displayUrl = p.githubUrl.trim().replace(/^https?:\/\//i, '').replace(/\/$/, '');
      contactItems.push(`<span class="contact-item"><strong>GitHub:</strong> <a href="${escapeHtml(p.githubUrl.trim())}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayUrl)}</a></span>`);
    }
    if (p.linkedinUrl && p.linkedinUrl.trim()) {
      const displayUrl = p.linkedinUrl.trim().replace(/^https?:\/\//i, '').replace(/\/$/, '');
      contactItems.push(`<span class="contact-item"><strong>LinkedIn:</strong> <a href="${escapeHtml(p.linkedinUrl.trim())}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayUrl)}</a></span>`);
    }

    let contactHtml = '';
    if (contactItems.length > 0) {
      if (contactItems.length > 3) {
        const mid = Math.ceil(contactItems.length / 2);
        const row1 = contactItems.slice(0, mid).join('<span class="contact-separator">•</span>');
        const row2 = contactItems.slice(mid).join('<span class="contact-separator">•</span>');
        contactHtml = `
          <div class="contact-info">
            <div class="contact-row">${row1}</div>
            <div class="contact-row">${row2}</div>
          </div>
        `;
      } else {
        contactHtml = `
          <div class="contact-info">
            <div class="contact-row">${contactItems.join('<span class="contact-separator">•</span>')}</div>
          </div>
        `;
      }
    }

    // 2. Metrics Strip (Only valid metrics)
    const validMetrics = (state.metrics || []).filter(m => m && (m.value?.trim() || m.label?.trim()));
    const metricsHtml = validMetrics.length > 0 ? `
      <div class="metrics-strip">
        ${validMetrics.map(m => `
          <div class="metric-box">
            ${m.value?.trim() ? `<div class="metric-val">${escapeHtml(m.value.trim())}</div>` : ''}
            ${m.label?.trim() ? `<div class="metric-lbl">${escapeHtml(m.label.trim())}</div>` : ''}
          </div>
        `).join('')}
      </div>
    ` : '';

    // 3. Summary Section
    const hasSummary = state.summary && state.summary.trim();
    const summarySectionHtml = (hasSummary || metricsHtml) ? `
      <section class="cv-section" aria-labelledby="heading-summary">
        <h2 class="section-heading" id="heading-summary">Professional Summary</h2>
        ${hasSummary ? `<p class="summary-text">${escapeHtml(state.summary.trim())}</p>` : ''}
        ${metricsHtml}
      </section>
    ` : '';

    // 4. Skills Grid (Only non-empty categories)
    const skillCategories = [
      { label: 'Technical SEO:', val: state.skills?.technicalSeo },
      { label: 'On-Page & Semantic:', val: state.skills?.onPageSemantic },
      { label: 'Off-Page & Authority:', val: state.skills?.offPageAuthority },
      { label: 'Analytics & Tools:', val: state.skills?.analyticsTools },
      { label: 'Web & Programming:', val: state.skills?.webProgramming }
    ].filter(s => s.val && s.val.trim());

    const skillsSectionHtml = skillCategories.length > 0 ? `
      <section class="cv-section" aria-labelledby="heading-skills">
        <h2 class="section-heading" id="heading-skills">Core Competencies &amp; Technical Skills</h2>
        <div class="skills-grid">
          ${skillCategories.map(s => `
            <div class="skill-category">
              <span class="skill-category-title">${escapeHtml(s.label)}</span>
              <span class="skill-tags-text">${escapeHtml(s.val.trim())}</span>
            </div>
          `).join('')}
        </div>
      </section>
    ` : '';

    // 5. Professional Experience
    const validExperiences = (state.experience || []).filter(exp => {
      const hasRole = exp.role && exp.role.trim();
      const hasCompany = exp.company && exp.company.trim();
      const hasBullets = (exp.bullets || []).some(b => b && b.trim());
      return hasRole || hasCompany || hasBullets;
    });

    const experienceSectionHtml = validExperiences.length > 0 ? `
      <section class="cv-section" aria-labelledby="heading-experience">
        <h2 class="section-heading" id="heading-experience">Professional Experience</h2>
        ${validExperiences.map(exp => {
          const bullets = (exp.bullets || []).filter(b => b && b.trim());
          const roleText = exp.role?.trim() || '';
          const companyText = exp.company?.trim() || '';
          const periodText = exp.period?.trim() || '';
          const locationText = exp.location?.trim() || '';

          return `
            <div class="experience-entry">
              <div class="entry-header">
                <div class="entry-left">
                  ${roleText ? `<span class="job-role">${escapeHtml(roleText)}</span>` : ''}
                  ${companyText ? `<span class="job-company">${escapeHtml(companyText)}</span>` : ''}
                </div>
                <div class="entry-meta">
                  ${periodText ? `<span class="job-period">${escapeHtml(periodText)}</span>` : ''}
                  ${locationText ? `<span class="job-location">${escapeHtml(locationText)}</span>` : ''}
                </div>
              </div>
              ${bullets.length > 0 ? `
                <ul class="achievements-list">
                  ${bullets.map(b => `<li>${escapeHtml(b.trim())}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `;
        }).join('')}
      </section>
    ` : '';

    // 6. Featured Case Studies
    const validCaseStudies = (state.caseStudies || []).filter(cs => {
      const hasTitle = cs.title && cs.title.trim();
      const hasBullets = (cs.bullets || []).some(b => b && b.trim());
      return hasTitle || hasBullets;
    });

    const caseStudiesSectionHtml = validCaseStudies.length > 0 ? `
      <section class="cv-section" aria-labelledby="heading-case-studies">
        <h2 class="section-heading" id="heading-case-studies">Featured SEO Case Studies &amp; Impact</h2>
        ${validCaseStudies.map(cs => {
          const bullets = (cs.bullets || []).filter(b => b && b.trim());
          return `
            <div class="case-study-entry">
              ${cs.title?.trim() ? `<div class="case-study-title">${escapeHtml(cs.title.trim())}</div>` : ''}
              ${bullets.length > 0 ? `
                <ul class="achievements-list">
                  ${bullets.map(b => `<li>${escapeHtml(b.trim())}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `;
        }).join('')}
      </section>
    ` : '';

    // 7. Education
    const validEducation = (state.education || []).filter(edu => {
      return (edu.degree && edu.degree.trim()) || (edu.institution && edu.institution.trim()) || (edu.description && edu.description.trim());
    });

    const educationSectionHtml = validEducation.length > 0 ? `
      <section class="cv-section" aria-labelledby="heading-education">
        <h2 class="section-heading" id="heading-education">Education</h2>
        ${validEducation.map(edu => `
          <div class="education-entry">
            <div class="entry-header">
              <div class="entry-left">
                ${edu.degree?.trim() ? `<span class="degree-title">${escapeHtml(edu.degree.trim())}</span>` : ''}
                ${edu.institution?.trim() ? `<span class="institution-name">${escapeHtml(edu.institution.trim())}</span>` : ''}
              </div>
              <div class="entry-meta">
                ${edu.period?.trim() ? `<span class="job-period">${escapeHtml(edu.period.trim())}</span>` : ''}
              </div>
            </div>
            ${edu.description?.trim() ? `<p class="education-desc">${escapeHtml(edu.description.trim())}</p>` : ''}
          </div>
        `).join('')}
      </section>
    ` : '';

    // 8. Languages
    const validLanguages = (state.languages || []).filter(l => l.name && l.name.trim());
    const languagesSectionHtml = validLanguages.length > 0 ? `
      <section class="cv-section" aria-labelledby="heading-languages">
        <h2 class="section-heading" id="heading-languages">Languages</h2>
        <div class="languages-list">
          ${validLanguages.map(lang => `
            <div class="language-item">
              <span class="lang-name">${escapeHtml(lang.name.trim())}${lang.level?.trim() ? ':' : ''}</span>
              ${lang.level?.trim() ? `<span class="lang-level">${escapeHtml(lang.level.trim())}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    ` : '';

    // 9. Academic & Professional References
    const validReferences = (state.references || []).filter(r => r.name && r.name.trim());
    const referencesSectionHtml = validReferences.length > 0 ? `
      <section class="cv-section" aria-labelledby="heading-references">
        <h2 class="section-heading" id="heading-references">Academic &amp; Professional References</h2>
        <div class="references-grid">
          ${validReferences.map(ref => {
            const contactArr = [];
            if (ref.email && ref.email.trim()) {
              contactArr.push(`<span><strong>Email:</strong> <a href="mailto:${escapeHtml(ref.email.trim())}">${escapeHtml(ref.email.trim())}</a></span>`);
            }
            if (ref.phone && ref.phone.trim()) {
              contactArr.push(`<span><strong>Phone:</strong> ${escapeHtml(ref.phone.trim())}</span>`);
            }

            return `
              <div class="reference-card">
                <div class="ref-name">${escapeHtml(ref.name.trim())}</div>
                ${ref.title?.trim() ? `<div class="ref-title">${escapeHtml(ref.title.trim())}</div>` : ''}
                ${ref.department?.trim() ? `<div class="ref-inst">${escapeHtml(ref.department.trim())}</div>` : ''}
                ${contactArr.length > 0 ? `<div class="ref-contact">${contactArr.join(' ')}</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </section>
    ` : '';

    paper.innerHTML = `
      <div class="cv-page" id="cv-printable-document">
        <!-- 1. Header & Contact -->
        <header class="cv-header">
          <div class="cv-header-left">
            ${p.fullName?.trim() ? `<h1 class="candidate-name">${escapeHtml(p.fullName.trim())}</h1>` : ''}
            ${p.title?.trim() ? `<div class="candidate-title">${escapeHtml(p.title.trim())}</div>` : ''}
            ${contactHtml}
          </div>

          ${!isPhotoHidden ? `
            <div class="cv-photo-wrapper ${photoClass}">
              <img src="${escapeHtml(p.photoUrl)}" alt="${escapeHtml(p.fullName || 'Portrait')}" width="90" height="90">
            </div>
          ` : ''}
        </header>

        ${summarySectionHtml}
        ${skillsSectionHtml}
        ${experienceSectionHtml}
        ${caseStudiesSectionHtml}
        ${educationSectionHtml}
        ${languagesSectionHtml}
        ${referencesSectionHtml}
      </div>
    `;
  }

  /* ==========================================================================
     4. Mutation & Event Handlers (Attached to window for inline calls)
     ========================================================================== */
  window.updateField = function (path, value) {
    const parts = path.split('.');
    if (parts.length === 1) {
      state[parts[0]] = value;
    } else if (parts.length === 2) {
      state[parts[0]][parts[1]] = value;
    }
    renderLivePreview();
    saveState();
  };

  window.setPhotoMode = function (mode) {
    state.personal.photoMode = mode;
    document.querySelectorAll('.radio-pill-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderLivePreview();
    saveState();
  };

  window.updateMetric = function (idx, field, value) {
    if (state.metrics[idx]) {
      state.metrics[idx][field] = value;
      renderLivePreview();
      saveState();
    }
  };

  window.updateExperienceField = function (expIdx, field, value) {
    if (state.experience[expIdx]) {
      state.experience[expIdx][field] = value;
      renderLivePreview();
      saveState();
    }
  };

  window.updateExperienceBullet = function (expIdx, bIdx, value) {
    if (state.experience[expIdx] && state.experience[expIdx].bullets[bIdx] !== undefined) {
      state.experience[expIdx].bullets[bIdx] = value;
      renderLivePreview();
      saveState();
    }
  };

  window.addExperienceBullet = function (expIdx) {
    if (state.experience[expIdx]) {
      state.experience[expIdx].bullets.push('New key measurable achievement / responsibility.');
      renderEditorForm();
      renderLivePreview();
      saveState();
    }
  };

  window.removeExperienceBullet = function (expIdx, bIdx) {
    if (state.experience[expIdx]) {
      state.experience[expIdx].bullets.splice(bIdx, 1);
      renderEditorForm();
      renderLivePreview();
      saveState();
    }
  };

  window.addExperienceItem = function () {
    const newId = 'exp-' + Date.now();
    state.experience.unshift({
      id: newId,
      role: 'New SEO Role / Position',
      company: 'Company / Organization',
      period: '2026 – Present',
      location: 'Remote / Location',
      bullets: [
        'Spearheaded key organic search initiatives, driving measurable rankings and traffic.',
        'Executed technical site audits and collaborated with developers to implement Core Web Vitals fixes.'
      ]
    });
    renderEditorForm();
    renderLivePreview();
    saveState();
    showToast('Added New Experience Role');
  };

  window.removeExperienceItem = function (id) {
    if (confirm('Are you sure you want to remove this experience role?')) {
      state.experience = state.experience.filter(e => e.id !== id);
      renderEditorForm();
      renderLivePreview();
      saveState();
      showToast('Experience Role Removed');
    }
  };

  window.updateCaseStudyTitle = function (csIdx, value) {
    if (state.caseStudies[csIdx]) {
      state.caseStudies[csIdx].title = value;
      renderLivePreview();
      saveState();
    }
  };

  window.updateCaseStudyBullet = function (csIdx, bIdx, value) {
    if (state.caseStudies[csIdx] && state.caseStudies[csIdx].bullets[bIdx] !== undefined) {
      state.caseStudies[csIdx].bullets[bIdx] = value;
      renderLivePreview();
      saveState();
    }
  };

  window.addCaseStudyBullet = function (csIdx) {
    if (state.caseStudies[csIdx]) {
      state.caseStudies[csIdx].bullets.push('Strategy or metric outcome detail.');
      renderEditorForm();
      renderLivePreview();
      saveState();
    }
  };

  window.removeCaseStudyBullet = function (csIdx, bIdx) {
    if (state.caseStudies[csIdx]) {
      state.caseStudies[csIdx].bullets.splice(bIdx, 1);
      renderEditorForm();
      renderLivePreview();
      saveState();
    }
  };

  window.addCaseStudyItem = function () {
    const newId = 'cs-' + Date.now();
    state.caseStudies.push({
      id: newId,
      title: 'New Client Growth Case Study: +200% Organic Lift',
      bullets: [
        'Analyzed technical crawl bottlenecks and resolved indexation barriers.',
        'Scaled high-intent keyword rankings and improved Core Web Vitals scores.'
      ]
    });
    renderEditorForm();
    renderLivePreview();
    saveState();
    showToast('Added New Case Study');
  };

  window.removeCaseStudyItem = function (id) {
    if (confirm('Remove this case study from the CV?')) {
      state.caseStudies = state.caseStudies.filter(c => c.id !== id);
      renderEditorForm();
      renderLivePreview();
      saveState();
      showToast('Case Study Removed');
    }
  };

  window.updateEducation = function (idx, field, value) {
    if (state.education[idx]) {
      state.education[idx][field] = value;
      renderLivePreview();
      saveState();
    }
  };

  window.updateReference = function (idx, field, value) {
    if (state.references[idx]) {
      state.references[idx][field] = value;
      renderLivePreview();
      saveState();
    }
  };

  window.toggleSection = function (secId) {
    const sec = document.getElementById(secId);
    if (!sec) return;
    sec.classList.toggle('active');
  };

  /* ==========================================================================
     5. Action Toolbar Controls (Print, Export, Import, Reset, Copy Text)
     ========================================================================== */
  window.triggerPrintPDF = function () {
    window.print();
  };

  window.exportJsonFile = function () {
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Gazi_Fahim_Hasan_CV_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported CV Data (JSON)');
  };

  window.triggerImportJson = function () {
    const fileInput = document.getElementById('importJsonInput');
    if (fileInput) fileInput.click();
  };

  window.handleFileImport = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData && importedData.personal && importedData.summary) {
          state = importedData;
          saveState();
          renderEditorForm();
          renderLivePreview();
          showToast('CV Data Imported Successfully!');
        } else {
          alert('Invalid CV JSON file format.');
        }
      } catch (err) {
        alert('Could not parse JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  window.resetToMasterData = function () {
    if (confirm('Reset all fields to Gazi Fahim Hasan master default CV? Any unsaved custom modifications will be replaced.')) {
      state = JSON.parse(JSON.stringify(window.CV_MASTER_DATA));
      localStorage.removeItem(STORAGE_KEY);
      renderEditorForm();
      renderLivePreview();
      showToast('Reset to Master Verified CV');
    }
  };

  window.copyAtsPlainText = function () {
    const text = generatePlainTextCV(state);
    navigator.clipboard.writeText(text).then(() => {
      showToast('ATS Plain Text Copied to Clipboard!');
    }).catch(() => {
      prompt('Copy your plain text CV below:', text);
    });
  };

  function generatePlainTextCV(d) {
    const p = d.personal || {};
    let out = `${p.fullName || ''}\n${p.title || ''}\n`;
    
    // Contact Info Row 1 & 2
    const c1 = [];
    if (p.location && p.location.trim()) c1.push(`Location: ${p.location.trim()}`);
    if (p.phone && p.phone.trim()) c1.push(`Phone: ${p.phone.trim()}`);
    if (p.email && p.email.trim()) c1.push(`Email: ${p.email.trim()}`);
    if (c1.length > 0) out += c1.join(' | ') + '\n';

    const c2 = [];
    if (p.portfolioUrl && p.portfolioUrl.trim()) c2.push(`Portfolio: ${p.portfolioUrl.trim()}`);
    if (p.githubUrl && p.githubUrl.trim()) c2.push(`GitHub: ${p.githubUrl.trim()}`);
    if (p.linkedinUrl && p.linkedinUrl.trim()) c2.push(`LinkedIn: ${p.linkedinUrl.trim()}`);
    if (c2.length > 0) out += c2.join(' | ') + '\n';
    out += '\n';

    if (d.summary && d.summary.trim()) {
      out += `========================================================\n`;
      out += `PROFESSIONAL SUMMARY\n`;
      out += `========================================================\n`;
      out += `${d.summary.trim()}\n\n`;
    }

    const validMetrics = (d.metrics || []).filter(m => m && (m.value?.trim() || m.label?.trim()));
    if (validMetrics.length > 0) {
      out += `KEY PERFORMANCE HIGHLIGHTS:\n`;
      validMetrics.forEach(m => {
        out += `• ${m.label?.trim() || 'Metric'}: ${m.value?.trim() || ''}\n`;
      });
      out += `\n`;
    }

    const validSkills = [
      { label: 'Technical SEO', val: d.skills?.technicalSeo },
      { label: 'On-Page & Semantic', val: d.skills?.onPageSemantic },
      { label: 'Off-Page & Authority', val: d.skills?.offPageAuthority },
      { label: 'Analytics & Tools', val: d.skills?.analyticsTools },
      { label: 'Web & Programming', val: d.skills?.webProgramming }
    ].filter(s => s.val && s.val.trim());

    if (validSkills.length > 0) {
      out += `========================================================\n`;
      out += `CORE COMPETENCIES & TECHNICAL SKILLS\n`;
      out += `========================================================\n`;
      validSkills.forEach(s => {
        out += `${s.label}: ${s.val.trim()}\n`;
      });
      out += `\n`;
    }
    out += `Analytics & Tools: ${d.skills.analyticsTools}\n`;
    out += `Web & Programming: ${d.skills.webProgramming}\n\n`;

    out += `========================================================\n`;
    out += `PROFESSIONAL EXPERIENCE\n`;
    out += `========================================================\n`;
    d.experience.forEach(exp => {
      out += `${exp.role} | ${exp.company} (${exp.period}) - ${exp.location}\n`;
      exp.bullets.forEach(b => {
        out += `  • ${b}\n`;
      });
      out += `\n`;
    });

    out += `========================================================\n`;
    out += `FEATURED SEO CASE STUDIES & IMPACT\n`;
    out += `========================================================\n`;
    d.caseStudies.forEach(cs => {
      out += `${cs.title}\n`;
      cs.bullets.forEach(b => {
        out += `  • ${b}\n`;
      });
      out += `\n`;
    });

    out += `========================================================\n`;
    out += `EDUCATION\n`;
    out += `========================================================\n`;
    d.education.forEach(edu => {
      out += `${edu.degree} - ${edu.institution} (${edu.period})\n`;
      out += `${edu.description}\n\n`;
    });

    out += `========================================================\n`;
    out += `ACADEMIC & PROFESSIONAL REFERENCES\n`;
    out += `========================================================\n`;
    d.references.forEach(ref => {
      out += `${ref.name}, ${ref.title}\n`;
      out += `${ref.department}\n`;
      out += `Email: ${ref.email} | Phone: ${ref.phone}\n\n`;
    });

    return out;
  }

  /* ==========================================================================
     6. Toast & Utility Helpers
     ========================================================================== */
  window.showToast = function (msg) {
    const toast = document.getElementById('studioToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function setupGlobalEventListeners() {
    // Zoom control in preview
    let currentZoom = 1.0;
    const paper = document.getElementById('cv-preview-paper');

    window.zoomPreview = function (delta) {
      currentZoom = Math.min(Math.max(currentZoom + delta, 0.7), 1.3);
      if (paper) {
        paper.style.transform = `scale(${currentZoom})`;
      }
    };

    window.resetZoom = function () {
      currentZoom = 1.0;
      if (paper) paper.style.transform = 'scale(1)';
    };

    // Mobile view switch
    window.setMobileView = function (mode) {
      document.body.classList.remove('view-edit', 'view-preview');
      document.body.classList.add(mode === 'preview' ? 'view-preview' : 'view-edit');
      document.querySelectorAll('.mobile-tab-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
    };
  }
})();
