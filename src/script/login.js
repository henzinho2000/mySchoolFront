import {tools} from "./tools.js";
const {setNotify, searchPassword} = tools;

function verifyLocalStorage(){
	const name = localStorage.getItem("name");
	
	if (!name?.trim()) {
		window.location.assign("./oi.html");
	}
}
verifyLocalStorage();

document.addEventListener("DOMContentLoaded", () => {
    const enviar = document.querySelector(".enviar");
    
    enviar.addEventListener("click", async () => {
        const password = document.querySelector(".password").value.trim();
        const truePassword = await searchPassword(password);
        
        if (truePassword.login === false) {
            console.log(password);
            console.log(truePassword.login);
            setNotify("Senha Incorreta");
        } else {
            window.location.assign("./index.html");
        }
    });
});
