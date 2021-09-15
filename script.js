let file;
let route;

const INPUT_WAITING = document.querySelector('#waiting');
const INPUT_DRAGED = document.querySelector('#draged');
const INPUT_DROPED = document.querySelector('#droped');
const FILE_LIST = document.querySelector('#file>.section');

function waiting(){
    route = "waiting";
    INPUT_WAITING.checked = true;
}
function draged(){
    INPUT_DRAGED.checked = true;
}
function droped(){
    route = "droped";
    INPUT_DROPED.checked = true;
}
const RESET_BUTTON = document.querySelector('#file>.footer>.reset_button');
RESET_BUTTON.addEventListener("click" , ()=>{
    FILE_LIST.innerHTML = "";
    lender_total_size();

})


// upload by click
const LOCAL_DIV = document.querySelector('.local');
LOCAL_DIV.addEventListener('click' , ()=>{
})
const CLOUD_DIV = document.querySelector('.cloud');
CLOUD_DIV.addEventListener('click' , ()=>{
    alert('안 만듦');
})
const INPUT = document.querySelector('#file');
INPUT.addEventListener('change' , function(){
    
    file = this.files[0];
    lender_file_list(file);
    lender_total_size();
    droped();
})
const PLUS_BUTTON = document.querySelector("#file>.header>.icon");
PLUS_BUTTON.addEventListener("click" , ()=>{
    INPUT.click();
})

const APP = document.querySelector('#app');
APP.addEventListener('dragover' , (event)=>{
    event.preventDefault();
    draged();
})
const DRAGED_VIEW = document.querySelector('label[for="draged"]');
DRAGED_VIEW.addEventListener('dragleave' , ()=>{
    if(route == "waiting"){
        waiting();
    }else{
        droped();
    }
})
DRAGED_VIEW.addEventListener('drop' , (event)=>{
    event.preventDefault();
    file = event.dataTransfer.files[0];
    lender_file_list(file);
    lender_total_size();
    droped();
})
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
function lender_file_list(file){

    const ITEM = document.createElement("div");
    ITEM.classList.add("item");
    FILE_LIST.append(ITEM);

        const ICON = document.createElement("div");
        ICON.classList.add("icon");
        if((file.type).indexOf("image") != -1){
            ICON.innerHTML = '<i class="uil uil-scenery"></i>';
        }else if((file.type).indexOf("video") != -1){
            ICON.innerHTML = '<i class="uil uil-film"></i>';
        }else if((file.type).indexOf("audio") != -1){
            ICON.innerHTML = '<i class="uil uil-music"></i>';
        }else if((file.type).indexOf("text") == 0){
            ICON.innerHTML = '<i class="uil uil-file"></i>';
        }else{
            ICON.innerHTML = '<i class="uil uil-paperclip"></i>';
        }

        ITEM.append(ICON);

        const INFO = document.createElement("div");
        INFO.classList.add("info");
        ITEM.append(INFO);

            const NAME = document.createElement("div");
            NAME.classList.add("name");
            NAME.innerHTML = file.name;
            INFO.append(NAME);

            const SIZE = document.createElement("div");
            SIZE.classList.add("size");
            SIZE.innerHTML = formatBytes(file.size);
            INFO.append(SIZE);

            const BYTE = document.createElement("div");
            BYTE.classList.add("byte");
            BYTE.innerHTML = file.size;
            INFO.append(BYTE);

        const DELETE = document.createElement("div");
        DELETE.classList.add("delete");
        DELETE.innerHTML = '<i class="uil uil-trash-alt"></i>';
        DELETE.addEventListener('click' , function(){
            this.parentNode.remove();
            lender_total_size();
        })
        ITEM.append(DELETE);
}
function lender_total_size(){
    const TOTAL_SIZE = document.querySelector("#file>.footer>.total_size");
    let BYTE;
    let value = 0;
    for(i of FILE_LIST.children){
        BYTE = i.querySelector(".info>.byte");
        value += parseInt(BYTE.innerText);
    }
    TOTAL_SIZE.innerText = formatBytes(value);
}
lender_total_size();
waiting();
