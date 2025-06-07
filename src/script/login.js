import {tools} from "./tools.js";
const {setNotify, searchPassword} = tools;

async function verifyLocalStorage(){
	const password = localStorage.getItem("password");
	const truePassword = await searchPassword(password);

	if(truePassword.login) {
		window.location.assign("./adm.html");
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
            localStorage.setItem("password", password);
            window.location.assign("./adm.html");
        }
    });
});
