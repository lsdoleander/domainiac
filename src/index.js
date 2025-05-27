{
	const co = require("./iso-3166-1-alpha-2.json");

	let API = module.exports = {
		extractDomain(hostname){
			if (!hostname) return
			let parts = hostname.toLowerCase().trim().split(".");
			let tld = parts[parts.length-1];
			let sld = parts[parts.length-2];
			if (tld.length == 2 && co[tld]) {
				if ((sld.length <= 4 && sld.length >= 2) || tld === "fr") {
					return [parts[parts.length-3],sld,tld].join(".");
				}
			}
			return [sld,tld].join(".")
		},
		
		cookieDomain(domain){
			if (domain)	return API.extractDomain(domain.startsWith(".") ? domain.substr(1) : domain);
		},

		country(hostname){

			let parts = hostname.toLowerCase().trim().split(".");
			let tld = parts[parts.length-1];
			if (tld.length == 2 && co[tld]) {
				return tld;
			} else {
				return "us";
			}
		}
	}
}