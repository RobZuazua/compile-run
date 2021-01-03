import { Result, Options, errorResultCallback } from "../types";
import { multipleArgsCallbackifier } from "../helper";
import { compileJavaSource } from "./compile-source";
import { execute } from "../execute-command";
import path from 'path';

/**
 * Runs a Java source string 
 * @param source source string
 * @param options
 * @param callback
 */
export function runJavaSource(source: string, options: Options, callback: errorResultCallback): Promise<Result>;

/**
 * Runs a Java source string 
 * @param source source string
 * @param callback
 */
export function runJavaSource(source: string, callback: errorResultCallback): Promise<Result>;

/**
 * Runs a Java source string 
 * @param source source string
 * @param options
 */
export function runJavaSource(source: string, options?: Options): Promise<Result>;

export async function runJavaSource(source: string, ...args: any[]): Promise<Result> {
    return multipleArgsCallbackifier<Result>(source, runJavaSourceAndReturnPromise, ...args);
}

export async function runJavaSourceAndReturnPromise(filePath: string, options?: Options): Promise<Result> {
    try {
        let classFilePath = await compileJavaSource(filePath, options);
        let classPath = path.dirname(classFilePath);
        let [className] = path.basename(classFilePath).split('.');
        // const endFileName = className + ".java";

        // const finalPath = path.join(classPath, endFileName);
        // const resolvedFinalPath = path.resolve(finalPath);
        const executionPath = options && options.executionPath || 'java';

        console.log(classPath);
        console.log(className);
        console.log(executionPath);

        let res = await execute(executionPath, ['-classpath', classPath, className, '/Users/robbiezuazua/git/test/javadep/dependencies/gson-2.8.6.jar'], options);
/*
/tmp/java/source-5ee57f7a50153b74c66b935b5dc6b249-1609651521025
TestingCompileRun
java
*/
        //let res = await execute(executionPath, ['-cp', '/Users/robbiezuazua/git/test/javadep/dependencies/gson-2.8.6.jar', resolvedFinalPath], options);
        // let res = await execute(executionPath, ['-cp', '/opt/gson-2.8.6.jar', resolvedFinalPath], options);
        if (res.stderr) {
            res.errorType = 'run-time';
        }
        return res;
    }
    catch (err) {
        return err;
    }
}