/*Copyright (c) 2022 ksoft http://www.dummysoftware.com*/function scan(n,e){var t="HTML"==n.type?e.innerHTML:e.innerText,o=t.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)||[];(o=o.filter(function(n){return!n.endsWith(".png")})).forEach(function(n,e,t){t[e]=n.replace(/\.$/,"")});var a=t.match(/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|[-\.]?))(\d{3}(\s|[-\.]?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g)||[],r=t.match(/\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/g)||[];return{emails:o,phones:a=(a=a.concat(r).filter(function(n){return-1==n.indexOf("\n")})).map(function(n){return n.trim()})}}function unique(n){return n.filter(function(n,e,t){return t.lastIndexOf(n)==e})}chrome.runtime.onMessage.addListener(function(n,e,t){if(-1!=n.action.indexOf("scrape")){var o=scan(n,document.body);emails=o.emails,phones=o.phones;var a=document.querySelectorAll("iframe");for(var r in a){var c=a[r];try{c.contentDocument&&(o=scan(n,c.contentDocument.body),emails=emails.concat(o.emails),phones=phones.concat(o.phones))}catch(n){console.log("Oops. "+n)}}t({emails:unique(emails),phones:unique(phones),result:"OK"})}});