# Java Version Manager (JVM)

Java Version Manager (JVM) is a command-line tool that allows you to easily manage multiple Java versions on your system, similar to Node.js's nvm.


- windows √
- others x

```sh
java version manager

usage:
    jvm help
        print this help

    jvm setup
        setup java-version-manager environment
            JAVA_HOME = path_to_jvm\java_home √
            PATH = %JAVA_HOME%\bin;PATH
            CLASSPATH = .;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar

    jvm status
    jvm ls
    jvm list
        print current Java version information and a list of locally configured Java versions

    jvm add <name> <path_to_java_jdk_dir>
        add local Java path to java-version-manager
            jvm add java6 path_to_jdk6
            jvm add java8 path_to_jdk8
            jvm add java11 path_to_jdk11

    jvm use <name>
        switch java version to <name>
            jvm use java6
            jvm use java8
            jvm use java11
```

## License

JVM is released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute this tool as per the terms of the license.
