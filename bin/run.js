let KeysProcess = require('../obj/src/container/KeysProcess').KeysProcess;

try {
    let proc = new KeysProcess();
    proc._configPath = "./config/config.yml";
    proc.run(process.argv);
} catch (ex) {
    console.error(ex);
}
