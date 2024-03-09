(function(){
    let baseUrl = 'https://yehweilun.github.io/CPPirateSeaTool/';

    var scripts = ["Layout/script"];
    var styles = ["Layout/styles"];

    function loadScripts() {
        scripts.forEach(function(script) {
            var scriptTag = document.createElement('script');
            scriptTag.src = baseUrl + script + '.js';
            document.head.appendChild(scriptTag);
        });
    }
    function loadStyles() {
        styles.forEach(function(style) {
            var linkTag = document.createElement('link');
            linkTag.rel = 'stylesheet';
        });
    }
    loadScripts();
    loadStyles();
})()