"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// const home = os.homedir();
var libDir = '.compile-run2';
var tmpDir = '/tmp';
// export const libPath = path.join(home, libDir);
exports.libPath = "";
//Make Lib dir in the os home directory
// checkExistsAndMakeDir(libPath);
exports.tmpPath = path_1.default.join(tmpDir);
//Make the tmp dir to store source files
checkExistsAndMakeDir(exports.tmpPath);
/**
 * Handles an exception occured during making a dir
 * @param err Error object
 */
function handleError(err) {
    console.log("Maybe you don't have permission to write in this directory");
    throw err;
}
/**
 * Checks if the dir exists at the provided path. If it doesn't exist simply makes a new Directory
 *
 * **Its a synchronous function
 * @param path A path like string
 */
function checkExistsAndMakeDir(path) {
    try {
        if (!fs_1.default.existsSync(path)) {
            fs_1.default.mkdirSync(path);
        }
    }
    catch (err) {
        handleError(err);
    }
}
exports.checkExistsAndMakeDir = checkExistsAndMakeDir;
//# sourceMappingURL=index.js.map