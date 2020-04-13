
  function parseUrl(url) {
    const myUrl = new URL(url);
    return {
      protocol: myUrl.protocol.replace(':', ''), 
      host: myUrl.host,
      hostname: myUrl.hostname,
      port: myUrl.port,
      query: myUrl.search,
      params: (function() {
        var params = {},
          seg = myUrl.search.replace(/^\?/, '').split('&'),
          len = seg.length,
          p;
        for (var i = 0; i < len; i++) {
          if (seg[i]) {
            p = seg[i].split('=');
            params[p[0]] = p[1];   
          }
        }
        return params;
      })(),
      hash: myUrl.hash.replace('#', ''),
      path: myUrl.pathname.replace(/^([^\/])/, '/$1')
    };
  }