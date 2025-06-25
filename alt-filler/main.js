class FillImgAlt {
    constructor (API, name, config) {
        this.API = API; 		// gives you an access to the plugins API functions
		this.name = name; 		// retrieved plugin name - probably will be removed in the future
		this.config = config; 	// gives access to the plugin saved config
    }	

    
    addModifiers () {
	this.API.addModifier('htmlOutput', this.modifyHTML, 1, this);    
    }
	
    modifyHTML (rendererInstance, text) {
        //Fill empty alt attributes
		text = fillEmptyImgAlt(text);
		return text
	}

}

function fillEmptyImgAlt(html) {
    return html.replace(/<img\b[^>]*>/gi, (imgTag) => {
        // If alt is already set (not empty), leave unchanged
        if (/alt\s*=\s*["'][^"']+["']/i.test(imgTag)) return imgTag;

        // Look for src="..." (we completely ignore srcset)
        const srcMatch = imgTag.match(/src="([^"]+)"/i);
        if (!srcMatch) return imgTag;

        const path = srcMatch[1];
        let fileName = path.split('/').pop().split('.').slice(0, -1).join('.');

        // File name cleaning
        fileName = fileName.replace('-thumbnail', '');
        fileName = fileName.replace(/(?:[-_]\(\d+\)|[-_]\d+|\d+)$/, '') // remove final numbers "#", "_#", "-#", "(#)"
        fileName = fileName.replace(/%20/g, ' ');                       // change "%20" in " "
        fileName = fileName.replace(/%(?!20)[0-9a-fA-F]{2}/g, ' ');     // remove "%xx" url code
        fileName = fileName.replace(/[-._,]/g, ' ');                    // change "-", ".", "_", "," in " "
        fileName = fileName.replace(/[\[\]()!%?]/g, '');                // Remove "(", ")", "[", "]", "!", "?", "%"
        fileName = fileName.replace(/\s+/g, ' ');                       // change multiple spaces in " "
        fileName = fileName.slice(0, 124);                              // chars limit for alt attribute

        if (fileName) {
            fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1) + '.';
        }

        // If alt="" → replace the value
        if (/alt\s*=\s*["']["']/i.test(imgTag)) {
            return imgTag.replace(/alt\s*=\s*["']["']/i, `alt="${fileName}"`);
        }

        // If alt doesn't exist → insert it after <img
        return imgTag.replace(/<img\b/i, `<img alt="${fileName}"`);
    });
}

module.exports = FillImgAlt;