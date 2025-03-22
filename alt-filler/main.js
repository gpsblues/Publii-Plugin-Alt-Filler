// https://github.com/GetPublii/Publii/discussions/1359

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
    return html.replace(
        /<img([^>]*?)((?:alt="")?)([^>]*?)>/g, 
        (match, attributes1, altAttr, attributes2) => {
            const srcMatch = match.match(/src="([^"]+)"|srcset="([^"]+)"/);
            if (!srcMatch) return match;
    
            const path = srcMatch[1] || srcMatch[2];
            let fileName = path.split('/').pop().split('.').slice(0, -1).join('.');
    
            // Pulizia del nome file
            fileName = fileName.replace('-thumbnail', '');
            fileName = fileName.replace(/(?:[-_]\(\d+\)|[-_]\d+|\d+)$/, '') // remove final numbers "#", "_#", "-#", "(#)"
            fileName = fileName.replace(/%20/g, ' ');                       // change "%20" in " "
            fileName = fileName.replace(/%(?!20)[0-9a-fA-F]{2}/g, ' ');     // remove "%xx" url code
            fileName = fileName.replace(/[._-,]/g, ' ');                    // change ".", "_", "-", "," in " "
            fileName = fileName.replace(/[\[\]()!%?]/g, '');                // Remove "(", ")", "[", "]", "!", "?", "%"
            fileName = fileName.replace(/\s+/g, ' ');                       // change multiple spaces in " "
            fileName = fileName.slice(0, 124);                              // chars limit for alt attribute
            fileName = fileName.trim();
    
            // Se è vuoto, non aggiungere il punto finale
            if (fileName) fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1) + '.';
    
            // Se l'attributo alt è assente o vuoto, lo aggiungiamo
            return `<img${attributes1} alt="${fileName}"${attributes2}>`;
        }
    );  
}

module.exports = FillImgAlt;