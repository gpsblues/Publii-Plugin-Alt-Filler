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
        // Se alt è già compilato (non vuoto), non toccare
        if (/alt\s*=\s*["'][^"']+["']/i.test(imgTag)) return imgTag;

        // Cerca src="..." (ignoriamo srcset del tutto)
        const srcMatch = imgTag.match(/src="([^"]+)"/i);
        if (!srcMatch) return imgTag;

        const path = srcMatch[1];
        let fileName = path.split('/').pop().split('.').slice(0, -1).join('.');

        // Pulizia del nome file
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

        // Se alt="" → sostituisci il valore
        if (/alt\s*=\s*["']["']/i.test(imgTag)) {
            return imgTag.replace(/alt\s*=\s*["']["']/i, `alt="${fileName}"`);
        }

        // Se alt non esiste → inseriscilo dopo <img
        return imgTag.replace(/<img\b/i, `<img alt="${fileName}"`);
    });
}


module.exports = FillImgAlt;