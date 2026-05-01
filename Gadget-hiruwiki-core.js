(function () {

    const loadedModules = new Set();

    function loadModule(name) {

        if (loadedModules.has(name)) {
            return;
        }

        loadedModules.add(name);

        const jsPage  = 'MediaWiki:Hiruwiki/modules/' + encodeURIComponent(name) + '.js';
        const cssPage = 'MediaWiki:Hiruwiki/modules/' + encodeURIComponent(name) + '.css';

        // load JS
        mw.loader.load(
            mw.util.getUrl(jsPage, { action: 'raw', ctype: 'text/javascript' })
        );

        // load CSS
        mw.loader.load(
            mw.util.getUrl(cssPage, { action: 'raw', ctype: 'text/css' }),
            'text/css'
        );
    }

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
