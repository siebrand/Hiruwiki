/* Gauss-Legendre Pi Algorithm Module — Hiruwiki */

(function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Gauss-Legendre Algorithm",
        "iteration": "Iteration",
        "variable_a": "Arithmetic Mean (a)",
        "variable_b": "Geometric Mean (b)",
        "variable_t": "Error Term (t)",
        "variable_p": "Power Term (p)",
        "step": "Next Step",
        "reset": "Reset",
        "pi_approx": "Approximation of π",
        "correct_digits": "{count} correct digits",
        "precision_note": "Converges quadratically: digits double each step."
    }
} /* I18N_END */

var lang = (window.mw && mw.config.get('wgUserLanguage')) || 'en';
var banana = new Banana(lang.split('-')[0]);
banana.load(messages);

function t(key, vars) {
    var args = Array.isArray(vars) ? vars : [];
    var str = banana.i18n(key, ...args);
    if (vars && typeof vars === 'object' && !Array.isArray(vars)) {
        Object.keys(vars).forEach(function(k) {
            str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
        });
    }
    return str;
}

const MATH_PI_STR = "3.141592653589793238462643383279";

function getCorrectDigitsMarkup(approxStr) {
    let markup = "";
    let match = true;
    for (let i = 0; i < approxStr.length; i++) {
        const char = approxStr[i];
        const target = MATH_PI_STR[i];
        
        if (match && char === target) {
            markup += `<span class="gl-correct-digit">${char}</span>`;
        } else {
            match = false;
            markup += `<span class="gl-wrong-digit">${char}</span>`;
        }
    }
    return markup;
}

function countCorrectDigits(approxStr) {
    let count = 0;
    for (let i = 0; i < Math.min(approxStr.length, MATH_PI_STR.length); i++) {
        if (approxStr[i] === MATH_PI_STR[i]) {
            if (approxStr[i] !== '.') count++;
        } else {
            break;
        }
    }
    return count;
}

function createWidget(container) {
    if (container.dataset.glInit) return;
    container.dataset.glInit = "1";

    let n = 0;
    let a = 1.0;
    let b = 1.0 / Math.sqrt(2);
    let t_val = 0.25;
    let p = 1.0;

    container.innerHTML = `
        <div class="gl-wrap">
            <div class="gl-header">
                <div class="gl-title">${t('_name')}</div>
                <div class="gl-iteration-badge">${t('iteration')}: <span id="gl-n">0</span></div>
            </div>

            <div class="gl-dashboard">
                <div class="gl-card">
                    <span class="gl-card-label">${t('variable_a')}</span>
                    <span class="gl-card-value" id="gl-a">1.0000000000</span>
                </div>
                <div class="gl-card">
                    <span class="gl-card-label">${t('variable_b')}</span>
                    <span class="gl-card-value" id="gl-b">0.7071067811</span>
                </div>
                <div class="gl-card">
                    <span class="gl-card-label">${t('variable_t')}</span>
                    <span class="gl-card-value" id="gl-t">0.2500000000</span>
                </div>
                <div class="gl-card">
                    <span class="gl-card-label">${t('variable_p')}</span>
                    <span class="gl-card-value" id="gl-p">1.0000000000</span>
                </div>
            </div>

            <div class="gl-result-section">
                <span class="gl-card-label">${t('pi_approx')}</span>
                <div class="gl-pi-display" id="gl-pi-val">–</div>
                <div class="gl-digit-info">
                    <span id="gl-digit-count">0 ${t('correct_digits', {count: 0})}</span>
                    <span>${t('precision_note')}</span>
                </div>
            </div>

            <div class="gl-controls">
                <button class="gl-btn gl-btn-primary" id="gl-btn-step">${t('step')}</button>
                <button class="gl-btn gl-btn-destructive" id="gl-btn-reset">${t('reset')}</button>
            </div>
        </div>
    `;

    const el = {
        n: container.querySelector('#gl-n'),
        a: container.querySelector('#gl-a'),
        b: container.querySelector('#gl-b'),
        t: container.querySelector('#gl-t'),
        p: container.querySelector('#gl-p'),
        pi: container.querySelector('#gl-pi-val'),
        digits: container.querySelector('#gl-digit-count'),
        btnStep: container.querySelector('#gl-btn-step'),
        btnReset: container.querySelector('#gl-btn-reset')
    };

    function updateUI() {
        el.n.textContent = n;
        el.a.textContent = a.toFixed(14);
        el.b.textContent = b.toFixed(14);
        el.t.textContent = t_val.toFixed(14);
        el.p.textContent = p.toFixed(0);

        const pi_approx = Math.pow(a + b, 2) / (4 * t_val);
        const piStr = pi_approx.toFixed(15);
        
        el.pi.innerHTML = getCorrectDigitsMarkup(piStr);
        
        const count = countCorrectDigits(piStr);
        el.digits.textContent = t('correct_digits', {count: count});
        
        if (n >= 4) {
            el.btnStep.disabled = true;
            el.btnStep.style.opacity = "0.5";
            el.btnStep.style.cursor = "not-allowed";
        } else {
            el.btnStep.disabled = false;
            el.btnStep.style.opacity = "1";
            el.btnStep.style.cursor = "pointer";
        }
    }

    function step() {
        if (n >= 4) return; // Precision limit for JS Number reached

        const next_a = (a + b) / 2.0;
        const next_b = Math.sqrt(a * b);
        const next_t = t_val - p * Math.pow(a - next_a, 2);
        const next_p = 2.0 * p;

        a = next_a;
        b = next_b;
        t_val = next_t;
        p = next_p;
        n++;

        updateUI();
    }

    function reset() {
        n = 0;
        a = 1.0;
        b = 1.0 / Math.sqrt(2);
        t_val = 0.25;
        p = 1.0;
        updateUI();
    }

    el.btnStep.addEventListener('click', step);
    el.btnReset.addEventListener('click', reset);

    updateUI();
}

function init() {
    document.querySelectorAll('.hiruwiki[data-module="gauss-legendre"]').forEach(createWidget);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

})();
