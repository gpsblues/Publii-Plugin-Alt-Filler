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
        /<img([^>]*?)alt=""([^>]*?)>/g, // Find img tags with an empty alt attribute
        (match, attributes1, attributes2) => {
            
            // Find the first value of src or srcset
            const srcMatch = match.match(/src="([^"]+)"|srcset="([^"]+)"/);
            if (!srcMatch) return match; // If src is not found, return the original tag

            const path = srcMatch[1] || srcMatch[2];
            
            // Extract the file name without extension
            let fileName = path.split('/').pop().split('.').slice(0, -1).join('.'); 

            // Replace suffix '-thumbnail' in galleries
            fileName = fileName.replace('-thumbnail', '');

            // Convert to lowercase with the first letter capitalized
            fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).toLowerCase();

            // Replace ., -, _ with spaces
            fileName = fileName.replace(/[._-]/g, ' ');
            
            // Add final dot
            fileName = fileName + '.'

            // Reconstruct the tag with the updated alt attribute
            return `<img${attributes1}alt="${fileName}"${attributes2}>`; 
        }
    );
}

module.exports = FillImgAlt;