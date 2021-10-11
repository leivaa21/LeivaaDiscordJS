const pathGlobal = __dirname + '/../configs/global.json';
const pathReactionRole = __dirname + '/../configs/reactionRole.json';

import {replace} from 'replace-json-property'
import fs from 'fs'
import { SystemChannelFlags } from 'discord.js';

class Config{
    
    static global =  {
        "prefix": "!",
        "welcomeChannel": "undefined",
        "welcomeMsg":"undefined",
        "maxDeleting": 20,
        "botLogo": "https://i.imgur.com/sNCtn86.png",
        "botName": "LeivaaDiscordJS",
        "leivaaLogo": "https://i.imgur.com/dZWwv1R.png",
        "color": "#FFFFFF",
        "colors": {
            "WHITE": "#FFFFFF",
            "AQUA": "#1ABC9C",
            "PINK": "#E91E63",
            "GREEN": "#2ECC71",
            "GOLD": "#F1C40F",
            "BLUE": "#3498DB",
            "ORANGE": "#E67E22",
            "PURPLE": "#9B59B6",
            "RED": "#E74C3C",
            "YELLOW": "#FFFF00",
        }
    };

    static reactionRole = {
        "idMsg":"undefined",
        "title": "undefined",
        "channel": "undefined",
        "message": "undefined",
        "nRoles": 0,
        "rol1":{
            "id":"",
            "emoji":"",
            "description":""
        },
        "rol2":{
            "id":"",
            "emoji":"",
            "description":""
        },
        "rol3":{
            "id":"",
            "emoji":"",
            "description":""
        }
    };
    static async loadGlobalJSON(callback){
        await fs.readFile(pathGlobal, 'utf-8', (err, jsonString) => {
            if(err) return console.log(err); 
            this.global = JSON.parse(jsonString);
        })
        if(callback != undefined) callback();
    }
    static async loadReactionRoleJSON(callback){
        await fs.readFile(pathReactionRole, 'utf-8', (err, jsonString) => {
            if(err) return console.log(err); 
            this.reactionRole = JSON.parse(jsonString);
        })
        if(callback != undefined) callback();
    }
    constructor(callback1, callback2){
        Config.loadGlobalJSON(callback1);
        Config.loadReactionRoleJSON(callback2);
    }
    static reload(){
        Config.loadGlobalJSON(() => {});
        Config.loadReactionRoleJSON(() => {});
    }
    static getGlobal(){
        return this.global;
    }
    static getReactionRole(){
        return this.reactionRole;
    }
    static applyChanges(configFile,property,new_value){
        replace(__dirname + "/../configs/" + configFile + ".json", property, new_value);
    }

}

export default Config;