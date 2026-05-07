/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
(function () {

    const loadedModules = new Set();
    const bananaUrl = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/banana-i18n.js&action=raw&ctype=text/javascript';
    let bananaPromise = null;

    // Shared CSS is loaded once, the first time any module is needed.
    // All module CSS files depend on the custom properties defined here.
    const sharedCssUrl = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/modules/hiruwiki-shared.css&action=raw&ctype=text/css';
    let sharedCssLoaded = false;

    function ensureSharedCss() {
        if (!sharedCssLoaded) {
            mw.loader.load(sharedCssUrl, 'text/css');
            sharedCssLoaded = true;
        }
    }

    function getBanana() {
        if (!bananaPromise) {
            bananaPromise = $.getScript(bananaUrl);
        }
        return bananaPromise;
    }

    function loadModule(name) {

        if (loadedModules.has(name)) {
            return;
        }

        loadedModules.add(name);

        // Ensure shared design tokens are available before any module CSS lands.
        ensureSharedCss();

        const jsUrl  = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/modules/' + encodeURIComponent(name) + '.js&action=raw&ctype=text/javascript';
        const cssUrl = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/modules/' + encodeURIComponent(name) + '.css&action=raw&ctype=text/css';

        // load CSS immediately (shared CSS is already queued above)
        mw.loader.load(cssUrl, 'text/css');

        // load JS after banana-i18n is ready
        getBanana().done(function () {
            $.getScript(jsUrl)
                .fail(function(jqxhr, settings, exception) {
                    console.error('Hiruwiki: Failed to load module ' + name, exception);
                });
        }).fail(function() {
            console.error('Hiruwiki: Failed to load banana-i18n library');
        });
    }

    window.hiruwiki = {
        getThemeColor: function (token, fallback) {
            const val = getComputedStyle(document.documentElement).getPropertyValue('--' + token).trim();
            return val || fallback;
        },
        getLogoSvg: function (size) {
            size = size || 22;
            return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 88.28875 67.855469" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-12.170768,-135.07508)"><path style="fill:#006699" d="m 95.011021,202.93056 h -11.24215 v -32.10209 h 11.24215 z" /><path style="fill:#339966" d="m 80.904881,170.87121 -8.93387,16.41439 8.93387,15.64496 h -8.84838 l -6.6256,-12.52452 v 12.52452 h -8.50642 v -32.05935 h 2.86397 v 28.81067 l 14.44808,-28.81067 z" /><path style="fill:#990000" d="m 65.986591,202.93056 v -10.30173 l 5.47147,10.30173 z" /><path style="fill:#006699" d="m 73.424361,170.87121 -13.03747,26.28867 v -26.28867 z" /><path style="fill:#990000" d="m 53.761311,202.93056 h -11.24215 v -32.10209 h 11.24215 z" /><path style="fill:#339966" d="m 12.170769,202.93056 v -32.10209 h 11.24215 l 0.26458,21.25903 z" /><path style="fill:#006699" d="m 39.817139,202.93056 v -32.10209 h -11.24215 l -0.26458,21.25903 z" /><path style="fill:#006699" d="m 100.45952,135.4598 v 20.85995 q 0,2.43651 -0.940405,4.5738 -0.897661,2.09454 -2.479256,3.71889 -1.581595,1.58159 -3.718885,2.522 -2.13729,0.89766 -4.5738,0.89766 -2.436511,0 -4.573801,-0.89766 -2.094544,-0.94041 -3.718884,-2.522 -1.581595,-1.62435 -2.522003,-3.71889 -0.897661,-2.13729 -0.897661,-4.5738 V 135.4598 h 10.472721 v 26.58789 l 9.318584,-16.7991 v -0.0855 -9.7033 z" /><path style="fill:#990000" d="m 96.270435,145.03486 -8.164448,14.7473 V 135.4598 h 8.164448 z" /><path style="fill:#006699" d="m 58.098423,167.51915 v -9.83153 l 6.027158,9.83153 z" /><path style="fill:#339966" d="m 57.499982,155.59307 v 11.92608 h -4.445563 -0.04275 v -31.80288 l 13.251198,19.57758 8.292685,12.2253 H 64.80951 Z" /><path style="fill:#990000" d="m 74.940268,147.21489 -8.249939,7.6515 -13.379436,-19.7913 z" /><path style="fill:#339966" d="M 49.762999,167.4764 H 38.520854 v -32.10209 h 11.242145 z" /><path style="fill:#339966" d="m 12.303125,135.43359 v 20.17448 l 11.046354,-8.63203 v -11.50938 z" /><path style="fill:#006699" d="m 24.275521,135.46666 11.112499,0.0331 0.03307,11.34401 -12.038541,9.55807 v 11.17865 H 12.336198 v -11.14558 l 11.972395,-9.525 v -11.4763" /><path style="fill:#990000" d="m 35.421093,147.73672 -11.079427,8.76432 v 11.04635 h 11.013281 z" /><path style="fill:#990000" d="m 13.129949,202.77004 12.79922,-12.2039 13.22916,12.33619 z" /></g></svg>';
        }
    };

    function scanPage() {

        document.querySelectorAll('.hiruwiki').forEach(function (el) {

            const module = el.dataset.module;

            if (!module) {
                return;
            }

            loadModule(module);

        });

    }

    // wait until DOM is ready
    mw.hook('wikipage.content').add(function () {
        scanPage();
    });

})();
