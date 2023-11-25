import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, rmdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import c from 'ansi-colors'
import { normalize } from 'node:path'

/**
 * @typedef {{name:string;path:string;}} CONFIG_ITEM
 * @typedef {{current:string;items:CONFIG_ITEM[]}} CONFIG
 */

export async function status() {
    let ret = execSync(`java -version`)
    console.info(ret.toString('utf-8'))
}

export async function setup() {
    let dataDir = await getDataDir()
    let java = new URL('./java/', dataDir)
    execSync(`SETX JAVA_HOME ${fileURLToPath(java)}`)
    // execSync(`SETX CLASSPATH ".;%JAVA_HOME%\\lib;%JAVA_HOME%\\lib\\dt.jar;%JAVA_HOME%\\lib\\tools.jar"`)
    console.log(`
    JAVA_HOME = path_to_jvm\\java_home ${c.green('√')}
    PATH = %JAVA_HOME%\\bin;PATH
    CLASSPATH = .;%JAVA_HOME%\\lib;%JAVA_HOME%\\lib\\dt.jar;%JAVA_HOME%\\lib\\tools.jar
`);
}

/**
 * @param {string} path
 */
export async function setJavaDir(path) {
    if (!existsSync(path)) {
        throw new Error(`${path} not exist!`)
    }
    let dataDir = await getDataDir()
    let java = new URL('./java/', dataDir)
    if (existsSync(java)) {
        rmSync(java)
    }
    execSync(`mklink /D java ${path}`, { cwd: dataDir })
}

async function getDataDir() {
    let dataDir = new URL('../data/', import.meta.url)
    if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true })
    }
    return dataDir
}

export async function list() {
    let config = await loadConfig()
    console.info('\n')
    let maxNameLength = config.items.reduce((p, c) => Math.max(p, c.name.length), 0)
    console.info(config.items.map(o => {
        let msg = `      ${o.name.padEnd(maxNameLength, ' ')} ${o.path}`
        if (config.current == o.name) {
            msg = `    ${c.green(`* ${o.name.padEnd(maxNameLength, ' ')} ${o.path}`)}`
        }
        return msg
    }).join('\n'))
    console.info('\n')
    await status()
}

/**
 * @param {string} name
 * @param {string} path
 */
export async function add(name, path) {
    path = normalize(path)
    let config = await loadConfig()
    config.items = config.items.filter(o => o.name != name)
    config.items.push({ name, path })
    await saveConfig(config)
    await list()
}

/**
 * @param {string} name
 */
export async function use(name) {
    let config = await loadConfig()
    let item = config.items.find(o => o.name == name)
    if (!item) {
        console.error(`This configuration item does not exist : ${name}`)
        return
    }
    config.current = item.name
    await setJavaDir(item.path)
    await saveConfig(config)
    await list()
}

/**
 * @returns {Promise<CONFIG>}
 */
async function loadConfig() {
    let configFile = await getConfigFile()
    if (!existsSync(configFile)) {
        return { current: '', items: [] }
    }
    return JSON.parse(readFileSync(configFile, 'utf-8'))
}

/**
 * @param {CONFIG} config
 */
async function saveConfig(config) {
    let configFile = await getConfigFile()
    writeFileSync(configFile, JSON.stringify(config, null, 4))
}

async function getConfigFile() {
    return new URL('./config.json', await getDataDir())
}

async function getReg(path, key){
    
    /*
    reg query HKEY_CURRENT_USER\Environment
    
    */


}
async function setReg(path, key, value){

}