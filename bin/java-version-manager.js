#!/usr/bin/env node

import minimist from 'minimist'
import { add, list, setup, use } from '../src/lib.js'
import c from 'ansi-colors'

async function start() {

    const argv = minimist(process.argv.slice(2), {})

    let [cmd, param, param2] = argv._

    // console.log(cmd, param, param2)

    if (cmd == 'setup') {
        await setup()
    } else if (['status', 'list', 'ls'].includes(cmd)) {
        await list()
    } else if (cmd == 'use') {
        await use(param)
    } else if (cmd == 'add') {
        await add(param, param2)
    } else if (cmd == 'test') {
        // await setJavaDir('D:\\java\\jdk1.8.0_211')
    } else {
        printUsage()
    }
}

function printUsage() {
    console.log(`
java version manager

usage:
    ${c.bold('jvm help')}
        print this help

    ${c.bold('jvm setup')}
        setup java-version-manager environment
            JAVA_HOME = path_to_jvm\\java_home ${c.green('√')}
            PATH = %JAVA_HOME%\\bin;PATH
            CLASSPATH = .;%JAVA_HOME%\\lib;%JAVA_HOME%\\lib\\dt.jar;%JAVA_HOME%\\lib\\tools.jar

    ${c.bold('jvm status')}
    ${c.bold('jvm ls')}
    ${c.bold('jvm list')}
        print current Java version information and a list of locally configured Java versions

    ${c.bold('jvm add <name> <path_to_java_jdk_dir>')}
        add local Java path to java-version-manager
            jvm add java6 path_to_jdk6
            jvm add java8 path_to_jdk8
            jvm add java11 path_to_jdk11

    ${c.bold('jvm use <name>')}
        switch java version to <name>
            jvm use java6
            jvm use java8
            jvm use java11
    `)
}

start()