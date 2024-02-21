(function () {
    // use URLSerachParams to get strings <- does not work in Internet Explorer
    let deleteParams = [];
    const utmParamQueryString = new URLSearchParams(window.location.search);
    utmParamQueryString.forEach(function (value, key) {
        if (!key.startsWith("utm_source")) deleteParams.push(key);
    });
    for (var key in deleteParams) utmParamQueryString.delete(key);
    if (utmParamQueryString) {
        // get all the links on the page
        document.querySelectorAll("a").forEach(function (item) {
            const checkUrl = new URL(item.href);
            // if the links hrefs are not navigating to the same domain, then skip processing them
            if (checkUrl.host === location.host || checkUrl.host.indexOf('typeform') > -1) {
                let doNotProcess = false;
                const linkSearchParams = new URLSearchParams(checkUrl.search);
                linkSearchParams.forEach(function (value, key) {
                    if (key.startsWith("utm_")) doNotProcess = true;
                });
                if (doNotProcess) return;
                checkUrl.search = new URLSearchParams({
                    ...Object.fromEntries(utmParamQueryString),
                    ...Object.fromEntries(linkSearchParams),
                });
                item.href = checkUrl.href;
            }
        });
    }
})();
