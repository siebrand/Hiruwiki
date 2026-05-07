/* Triangle Area Proof – Hiruwiki module
   Injected into any element: <div class="hiruwiki" data-module="triangle-area"></div>
*/
(function () {
    'use strict';


/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Área del triángulo",
        "hint": "Esta es una visualización interactiva. Arrastra los vértices para modificar el triángulo.",
        "btnProve": "Pruébalo",
        "btnReset": "Reiniciar",
        "labelArea": "Área",
        "labelBase": "Base (b)",
        "labelHeight": "Altura (h)",
        "labelBaseShort": "b",
        "labelHeightShort": "h",
        "proofResultPara": "Área del paralelogramo = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Triángulo = ½ × {area} = <strong>{triArea} cm²</strong>",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "fr": {
        "_name": "Aire du triangle",
        "hint": "Ceci est une visualisation interactive. Faites glisser les sommets pour modifier le triangle.",
        "btnProve": "Prouver",
        "btnReset": "Réinitialiser",
        "labelArea": "Aire",
        "labelBase": "Base (b)",
        "labelHeight": "Hauteur (h)",
        "labelBaseShort": "b",
        "labelHeightShort": "h",
        "proofResultPara": "Aire du parallélogramme = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Triangle = ½ × {area} = <strong>{triArea} cm²</strong>",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "ga": {
        "_name": "Limistéar an Triantáin",
        "hint": "Is léirshamhlú idirghníomhach é seo. Tarraing na buaicphointí chun an triantán a athrú.",
        "btnProve": "Cruthaigh é",
        "btnReset": "Athshocraigh",
        "labelArea": "Limistéar",
        "labelBase": "Bonn (b)",
        "labelHeight": "Airde (u)",
        "labelBaseShort": "b",
        "labelHeightShort": "h",
        "proofResultPara": "Achar comhthreomharáin = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Triantán = ½ × {area} = <strong>{triArea} cm²</strong>",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "qqq": {
        "_name": "Name of the Triangle Area module",
        "hint": "Footer hint text telling the user to drag the vertices to reshape the triangle",
        "btnProve": "Button label to start the area proof animation",
        "btnReset": "Button label to reset the triangle",
        "labelArea": "Label for the computed area value",
        "labelBase": "Label for the base measurement, with variable name in parentheses",
        "labelHeight": "Label for the height measurement, with variable name in parentheses",
        "labelBaseShort": "Short symbol for base (usually 'b')",
        "labelHeightShort": "Short symbol for height (usually 'h')",
        "proofResultPara": "Proof result text for the parallelogram area. Uses HTML. Parameters: {b} = base, {h} = height, {area} = parallelogram area.",
        "proofResultTri": "Proof result text for the triangle area (half the parallelogram). Uses HTML. Parameters: {area} = parallelogram area, {triArea} = triangle area.",
        "unitCm": "Unit of length (centimeters)",
        "unitCm2": "Unit of area (square centimeters)"
    },
    "it": {
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "nl": {
        "_name": "Oppervlakte van een driehoek",
        "hint": "Dit is een interactieve visualisatie. Sleep de hoekpunten om de driehoek te wijzigen.",
        "btnProve": "Bewijs het",
        "btnReset": "Reset",
        "labelArea": "Oppervlakte",
        "labelBase": "Basis (b)",
        "labelHeight": "Hoogte (h)",
        "labelBaseShort": "b",
        "labelHeightShort": "h",
        "proofResultPara": "Oppervlakte parallellogram = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Driehoek = ½ × {area} = <strong>{triArea} cm²</strong>",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "en": {
        "_name": "Triangle Area",
        "hint": "This is an interactive visualization. Drag the vertices to reshape the triangle.",
        "btnProve": "Prove it",
        "btnReset": "Reset",
        "labelArea": "Area",
        "labelBase": "Base (b)",
        "labelHeight": "Height (h)",
        "labelBaseShort": "b",
        "labelHeightShort": "h",
        "proofResultPara": "Parallelogram area = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Triangle = ½ × {area} = <strong>{triArea} cm²</strong>",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "ca": {
        "hint": "Aquesta és una visualització interactiva. Arrossega els vèrtexs per modificar el triangle.",
        "btnReset": "Reinicia",
        "labelArea": "Àrea",
        "labelBaseShort": "b",
        "labelHeightShort": "h",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "ko": {
        "_name": "삼각형 면적",
        "hint": "이것은 대화형 시각화입니다. 꼭짓점을 드래그하여 삼각형을 바꾸세요.",
        "btnReset": "초기화",
        "labelArea": "면적",
        "labelBase": "밑변 (b)",
        "labelHeight": "높이 (h)",
        "proofResultPara": "평행사변형 넓이 = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ 삼각형 = ½ × {area} = <strong>{triArea} cm²</strong>",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "eu": {
        "_name": "Hirukiaren azalera",
        "hint": "Bistaratzaile interaktibo bat da. Arrastatu erpinak hirukia aldatzeko.",
        "btnProve": "Froga ezazu",
        "btnReset": "Berrezarri",
        "labelArea": "Azalera",
        "labelBase": "Oinarria (b)",
        "labelHeight": "Altuera (h)",
        "labelBaseShort": "b",
        "labelHeightShort": "h",
        "proofResultPara": "Paralelogramoaren azalera = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Triangeluarena = ½ × {area} = <strong>{triArea} cm²</strong>",
        "unitCm": "cm",
        "unitCm2": "cm²"
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


/* ── Shared constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var W    = 680;
var H    = 360;
var GRID = 24;
var GSW  = 0.5;
var TSW  = 2;
var DR   = 8;
var CM   = 36;
var DUR  = 1600;

function isDark() { return window.matchMedia('(prefers-color-scheme:dark)').matches; }
function bgCol()    { return isDark() ? '#1e1e1c' : '#F8F9FA'; }
function gcol()     { return isDark() ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'; }
function tcol()     { return isDark() ? '#D0CEC4' : '#1A1A18'; }
function greenS()   { return isDark() ? '#5DCAA5' : '#0F6E56'; }
function greenF()   { return isDark() ? 'rgba(93,202,165,0.14)' : 'rgba(15,110,86,0.10)'; }
function amber()    { return isDark() ? '#EF9F27' : '#BA7517'; }
function dotCol()   { return isDark() ? '#9F9DE8' : '#534AB7'; }
function proofBlue(){ return isDark() ? '#534AB7' : '#534AB7'; }


/* ── Widget factory ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function init(container) {

    /* ── Build DOM ── */

    /* Canvas wrap */
    var wrap = document.createElement('div');
    wrap.className = 'hw-area-wrap';
    var cvs = document.createElement('canvas');
    wrap.appendChild(cvs);
    container.appendChild(wrap);

    /* Info bar */
    var bar = document.createElement('div');
    bar.className = 'hw-area-bar';

    function makeInfo(labelText, cls, formula) {
        var info = document.createElement('div');
        info.className = 'hw-info';
        var lbl = document.createElement('span');
        lbl.className = 'hw-lbl';
        lbl.textContent = labelText;
        var val = document.createElement('span');
        val.className = 'hw-val ' + cls;
        val.textContent = '—';
        info.appendChild(lbl);
        info.appendChild(val);
        if (formula) {
            var f = document.createElement('span');
            f.className = 'hw-formula';
            f.textContent = formula;
            info.appendChild(f);
        }
        return info;
    }

    bar.appendChild(makeInfo(t('labelBase'),   'hw-area-val-b',    null));
    bar.appendChild(makeInfo(t('labelHeight'), 'hw-area-val-h',    null));
    var areaInfo = makeInfo(t('labelArea'),    'hw-area-val-area', 'A = ½ × b × h');
    areaInfo.style.flex = '2';
    bar.appendChild(areaInfo);

    var btnProof = document.createElement('button');
    btnProof.className = 'hw-area-btn';
    btnProof.textContent = t('btnProve');
    bar.appendChild(btnProof);

    var elResult = document.createElement('div');
    elResult.className = 'hw-area-proof';
    bar.appendChild(elResult);

    container.appendChild(bar);

    /* Footer — hint text from this module's own i18n */
    var footer = document.createElement('div');
    footer.className = 'hw-footer';
    var fImg = document.createElement('img');
    fImg.src    = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hiruwiki.svg/32px-Hiruwiki.svg.png';
    fImg.alt    = 'Hiruwiki';
    fImg.width  = 22;
    fImg.height = 22;
    var fText = document.createElement('span');
    fText.textContent = t('hint');
    footer.appendChild(fImg);
    footer.appendChild(fText);
    container.appendChild(footer);

    /* ── Canvas setup ── */
    var ctx = cvs.getContext('2d');
    cvs.width  = W;
    cvs.height = H;

    var elB    = bar.querySelector('.hw-area-val-b');
    var elH    = bar.querySelector('.hw-area-val-h');
    var elArea = bar.querySelector('.hw-area-val-area');

    /* ── State ── */
    var V = {
        A: { x: W/2 - 2.3*CM, y: 280 },
        B: { x: W/2 + 2.3*CM, y: 280 },
        C: { x: W/2 + 0.4*CM, y: 280 - 3.2*CM }
    };
    var phase = 'idle', animStart = null, dragging = null;


    /* ── Math helpers ── */
    function dist(a, b) { return Math.hypot(b.x-a.x, b.y-a.y); }
    function mid(a, b)  { return { x:(a.x+b.x)/2, y:(a.y+b.y)/2 }; }
    function cross2d(ax, ay, bx, by) { return ax*by - ay*bx; }
    function rotPt(P, M, angle) {
        var c=Math.cos(angle), s=Math.sin(angle), dx=P.x-M.x, dy=P.y-M.y;
        return { x:M.x+dx*c-dy*s, y:M.y+dx*s+dy*c };
    }
    function footOfLine(A, B, P) {
        var dx=B.x-A.x, dy=B.y-A.y;
        var t=((P.x-A.x)*dx+(P.y-A.y)*dy)/(dx*dx+dy*dy);
        return { x:A.x+t*dx, y:A.y+t*dy, t:t };
    }
    function fmt(px) { return (px/CM).toFixed(2); }
    function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; }

    function longestSide() {
        var A=V.A, B=V.B, C=V.C;
        var dAB=dist(A,B), dBC=dist(B,C), dCA=dist(C,A);
        if (dAB>=dBC && dAB>=dCA) { return { P1:A, P2:B, P3:C, b:dAB }; }
        if (dBC>=dAB && dBC>=dCA) { return { P1:B, P2:C, P3:A, b:dBC }; }
        return { P1:C, P2:A, P3:B, b:dCA };
    }
    function metrics() {
        var s=longestSide(), foot=footOfLine(s.P1,s.P2,s.P3), h=dist(s.P3,foot);
        return { P1:s.P1, P2:s.P2, P3:s.P3, b:s.b, h:h, foot:foot,
            bCm:fmt(s.b), hCm:fmt(h), areaCm:(0.5*(s.b/CM)*(h/CM)).toFixed(2) };
    }
    function rotDir(F, pivot, axP1, axP2, otherPt) {
        var ax=axP2.x-axP1.x, ay=axP2.y-axP1.y;
        var sO=cross2d(ax,ay,otherPt.x-axP1.x,otherPt.y-axP1.y);
        var Fm=rotPt(F,pivot,Math.PI/2);
        return (cross2d(ax,ay,Fm.x-axP1.x,Fm.y-axP1.y)*sO<0) ? 1 : -1;
    }

    function updateUI() {
        var m=metrics();
        elB.textContent    = m.bCm    + ' ' + t('unitCm');
        elH.textContent    = m.hCm    + ' ' + t('unitCm');
        elArea.textContent = m.areaCm + ' ' + t('unitCm2');
    }


    /* ── Drawing ── */
    function drawGrid() {
        ctx.strokeStyle = gcol();
        ctx.lineWidth   = GSW;
        for (var x=0; x<=W; x+=GRID) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
        for (var y=0; y<=H; y+=GRID) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    }

    function fillPoly(pts, fill, stroke, lw) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (var i=1; i<pts.length; i++) { ctx.lineTo(pts[i].x, pts[i].y); }
        ctx.closePath();
        ctx.fillStyle=fill; ctx.fill();
        ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke();
    }

    function drawVtx(pt, label) {
        ctx.save();
        ctx.beginPath(); ctx.arc(pt.x, pt.y, DR, 0, Math.PI*2);
        ctx.fillStyle=dotCol(); ctx.fill();
        ctx.font='bold 14px sans-serif'; ctx.fillStyle=tcol();
        var ox = label==='A' ? -20 : label==='B' ? 14 : 12;
        var oy = label==='C' ? -16 : 20;
        ctx.fillText(label, pt.x+ox, pt.y+oy);
        ctx.restore();
    }

    function drawScene(m) {
        var P1=m.P1, P2=m.P2, P3=m.P3, foot=m.foot;
        var fdx=foot.x-P3.x, fdy=foot.y-P3.y, flen=Math.hypot(fdx,fdy)||1;

        /* Extension dashes if foot is outside the base segment */
        if (foot.t<0 || foot.t>1) {
            var ep = foot.t<0 ? P1 : P2;
            ctx.save(); ctx.setLineDash([4,4]);
            ctx.strokeStyle='rgba(186,117,23,0.28)'; ctx.lineWidth=1.5;
            ctx.beginPath(); ctx.moveTo(foot.x,foot.y); ctx.lineTo(ep.x,ep.y); ctx.stroke();
            ctx.setLineDash([]); ctx.restore();
        }

        /* Dashed height line */
        ctx.save(); ctx.setLineDash([5,5]);
        ctx.strokeStyle=amber(); ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(P3.x,P3.y); ctx.lineTo(foot.x,foot.y); ctx.stroke();
        ctx.setLineDash([]); ctx.restore();

        /* Right-angle marker */
        if (flen>14) {
            var ux=fdx/flen, uy=fdy/flen, nx=-uy, ny=ux, s=9;
            ctx.beginPath();
            ctx.moveTo(foot.x,foot.y);
            ctx.lineTo(foot.x-ux*s, foot.y-uy*s);
            ctx.lineTo(foot.x-ux*s+nx*s, foot.y-uy*s+ny*s);
            ctx.lineTo(foot.x+nx*s, foot.y+ny*s);
            ctx.closePath();
            ctx.strokeStyle=amber(); ctx.lineWidth=1; ctx.stroke();
        }

        /* h label */
        var mx=(P3.x+foot.x)/2, my=(P3.y+foot.y)/2;
        ctx.save(); ctx.font='500 14px sans-serif';
        ctx.fillStyle=amber(); ctx.textAlign='center';
        ctx.fillText(t('labelHeightShort')+' = '+m.hCm+' '+t('unitCm'), mx-fdy/flen*16, my+fdx/flen*16);
        ctx.restore();

        /* b label */
        var bdx=P2.x-P1.x, bdy=P2.y-P1.y, bl=Math.hypot(bdx,bdy)||1;
        var bnx=bdy/bl, bny=-bdx/bl;
        var toCx=P3.x-(P1.x+P2.x)/2, toCy=P3.y-(P1.y+P2.y)/2;
        var sign=(toCx*bnx+toCy*bny)>0 ? -1 : 1;
        ctx.save(); ctx.font='500 14px sans-serif';
        ctx.fillStyle=tcol(); ctx.textAlign='center';
        ctx.fillText(t('labelBaseShort')+' = '+m.bCm+' '+t('unitCm'),
            (P1.x+P2.x)/2+sign*bnx*24, (P1.y+P2.y)/2+sign*bny*24);
        ctx.restore();
    }

    function drawProof(progress) {
        var m=metrics();
        var P1=m.P1, P2=m.P2, P3=m.P3, F={x:m.foot.x, y:m.foot.y};
        var e=ease(Math.min(progress,1));
        var mP1P3=mid(P1,P3), mP2P3=mid(P2,P3);

        var angL=Math.PI*e*rotDir(F,mP1P3,P1,P3,P2);
        fillPoly([rotPt(P1,mP1P3,angL), rotPt(F,mP1P3,angL), rotPt(P3,mP1P3,angL)],
            'rgba(216,90,48,0.28)', '#D85A30', TSW);

        var angR=Math.PI*e*rotDir(F,mP2P3,P2,P3,P1);
        var rF=rotPt(F,mP2P3,angR), rP2=rotPt(P2,mP2P3,angR), rP3=rotPt(P3,mP2P3,angR);
        fillPoly([rF,rP2,rP3], 'rgba(83,74,183,0.25)', proofBlue(), TSW);

        if (e>=0.99) {
            var lP3=rotPt(P3,mP1P3,angL);
            ctx.save(); ctx.beginPath();
            ctx.moveTo(P1.x,P1.y); ctx.lineTo(P2.x,P2.y);
            ctx.lineTo(rP3.x,rP3.y); ctx.lineTo(lP3.x,lP3.y); ctx.closePath();
            ctx.strokeStyle=isDark()?'#B4B2A9':'#5F5E5A';
            ctx.lineWidth=1; ctx.setLineDash([6,3]); ctx.stroke();
            ctx.setLineDash([]); ctx.restore();

            var rectArea=((m.b/CM)*(m.h/CM)).toFixed(2);
            elResult.style.display='block';
            elResult.innerHTML =
                t('proofResultPara', { b:m.bCm, h:m.hCm, area:rectArea }) + '<br>' +
                t('proofResultTri',  { area:rectArea, triArea:m.areaCm });
        }
    }

    function draw(ts) {
        ctx.clearRect(0,0,W,H);
        ctx.fillStyle=bgCol(); ctx.fillRect(0,0,W,H);
        drawGrid();

        var m=metrics();
        fillPoly([V.A,V.B,V.C], greenF(), greenS(), TSW);

        /* Base highlight — one step thicker than edges */
        ctx.save(); ctx.strokeStyle=greenS(); ctx.lineWidth=TSW+1;
        ctx.beginPath(); ctx.moveTo(m.P1.x,m.P1.y); ctx.lineTo(m.P2.x,m.P2.y); ctx.stroke();
        ctx.restore();

        drawScene(m);
        drawVtx(V.A,'A'); drawVtx(V.B,'B'); drawVtx(V.C,'C');

        if (phase==='animating' || phase==='done') {
            var elapsed = phase==='done' ? DUR : (ts-animStart);
            drawProof(elapsed/DUR);
            if (elapsed<DUR && phase==='animating') {
                requestAnimationFrame(draw);
            } else if (phase==='animating') {
                phase='done'; draw(performance.now());
            }
        }
    }

    function redraw() { requestAnimationFrame(function(ts){ draw(ts); }); }


    /* ── Button ── */
    btnProof.addEventListener('click', function() {
        if (phase!=='idle') {
            phase='idle';
            elResult.style.display='none';
            btnProof.textContent=t('btnProve');
            redraw();
            return;
        }
        phase='animating'; animStart=null;
        btnProof.textContent=t('btnReset');
        requestAnimationFrame(function frame(ts) {
            if (!animStart) { animStart=ts; }
            draw(ts);
            if (ts-animStart<DUR) { requestAnimationFrame(frame); }
            else { phase='done'; draw(ts); }
        });
    });


    /* ── Pointer events ── */
    function cpos(e) {
        var r=cvs.getBoundingClientRect(), sx=W/r.width;
        var ex=e.touches?e.touches[0].clientX:e.clientX;
        var ey=e.touches?e.touches[0].clientY:e.clientY;
        return { x:(ex-r.left)*sx, y:(ey-r.top)*sx };
    }
    function hitV(pos) {
        var keys=Object.keys(V);
        for (var i=0; i<keys.length; i++) {
            if (dist(pos,V[keys[i]])<18) { return keys[i]; }
        }
        return null;
    }

    cvs.addEventListener('mousedown', function(e) {
        var h=hitV(cpos(e));
        if (h) { dragging=h; cvs.style.cursor='grabbing'; }
    });
    cvs.addEventListener('touchstart', function(e) {
        var h=hitV(cpos(e));
        if (h) { dragging=h; e.preventDefault(); }
    }, { passive:false });

    function onMove(e) {
        var pos=cpos(e);
        if (!dragging) {
            cvs.style.cursor=hitV(pos)?'grab':'crosshair';
            return;
        }
        pos.x=Math.max(20, Math.min(W-20, pos.x));
        pos.y=Math.max(20, Math.min(H-20, pos.y));
        V[dragging]=pos;
        if (phase!=='idle') {
            phase='idle';
            elResult.style.display='none';
            btnProof.textContent=t('btnProve');
        }
        updateUI(); redraw();
    }
    cvs.addEventListener('mousemove', onMove);
    cvs.addEventListener('touchmove', function(e){ onMove(e); e.preventDefault(); }, { passive:false });

    function onUp() { dragging=null; cvs.style.cursor='crosshair'; }
    window.addEventListener('mouseup',  onUp);
    window.addEventListener('touchend', onUp);

    updateUI();
    redraw();
}


/* ── Boot ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
document.querySelectorAll('.hiruwiki[data-module="triangle-area"]').forEach(function(el) {
    init(el);
});

}());
