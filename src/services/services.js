import axios from "axios";

export default class Services {

    async get(url) {
        return await axios.get(url)
            
    }

    async getPastelColor(){ 
        return "hsl(" + 360 * Math.random() + ',' +
                   (25 + 70 * Math.random()) + '%,' + 
                   (85 + 10 * Math.random()) + '%)'
        }
      
}