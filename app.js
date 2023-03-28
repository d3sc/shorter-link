const fileName = "app"
const defaultValue = "Default"
const flags = ["-h", "-u"]

const checkFlag = (flag) => {
    if(process.argv.indexOf(flag) > -1) return true;
}

const getValueFlags = (flag) => {
    const customIndex = process.argv.indexOf(flag);
    
    let customValue;
    if (customIndex) {
        customValue = process.argv[customIndex + 1];
    }
    
    const customFlag = (customValue || defaultValue);
    return customFlag;
}

const convertUrl = (url) => {
    fetch(`https://api.shrtco.de/v2/shorten?url=${url}`).then((response) => {
        return response.json();
    }).then(result => console.log(result))
    .catch((err) => {
        console.log(`${fileName}: ` + err)
    });
}

const help = () => {
    const getFlags = flags.map(i => `[${i}]`).join(" ");
    console.log(`usage: ${fileName} -u "https://example.com"

 Options
 -h                 help command
 -u <url>           set target url`

 );
}

const uFlagHandler = (flag) => {
    const flagValue = getValueFlags(flag);
    try{
        if(flagValue == defaultValue) throw new Error("[-u] flag require arguments!");
        convertUrl(flagValue);
    } catch(err) {
        console.log(`${fileName}: ${err}`)
    }
}

if(checkFlag(flags[0])) return help();
if(checkFlag(flags[1])) return uFlagHandler(flags[1]);
help();