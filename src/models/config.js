const pathGlobal = __dirname + '/../configs/global.json';
const pathGlobalDefaults = __dirname + '/../configs/globalDefaults.json';
const pathReactionRole = __dirname + '/../configs/reactionRole.json';
const pathReactionRoleDefaults = __dirname + '/../configs/reactionRoleDefaults.json';

import {replace} from 'replace-json-property'
import fs from 'fs'

class Config{
    
    static global =  {};

    static reactionRole = {};
    
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
    static applyChanges(configFile,property,new_value){
        replace(__dirname + "/../configs/" + configFile + ".json", property, new_value);
    }
    static async writeFile(configFile, object){
        const data = JSON.stringify(object);
        await fs.writeFile(__dirname + "/../configs/" + configFile + ".json", data, (err) => {
            if (err) {
                throw err;
            }
        });
    }
    static async loadDefaults(option){
        if(option == "global" || option == "all"){
            await fs.readFile(pathGlobalDefaults, 'utf-8', (err, jsonString) => {
                if(err) throw err; 
                this.global = JSON.parse(jsonString);
                Config.writeFile("global", Config.getGlobal());
            })
        }
        if(option == "reactionRole" || option == "all"){
            await fs.readFile(pathReactionRoleDefaults, 'utf-8', (err, jsonString) => {
                if(err) throw err; 
                this.global = JSON.parse(jsonString);
                Config.writeFile("reactionRole", Config.getReactionRole());
            })
        }
    }
    

}

export default Config;