import {tools} from "./tools.js";
const {setNotify, searchPassword} = tools;

async function verifyLocalStorage(){
	const password = localStorage.getItem("password");
	const truePassword = await searchPassword(password);
	
	if (!password?.trim() || !truePassword.login) {
		window.location.assign("./login.html");
	}
}

async function setElements() {
    async function addProject(){
        const url = "https://myschoollback.onrender.com/projects";
        const response = await(await fetch(url)).json();
        
        response.forEach((element)=>{
            const {title, id} = element;

            const projects = document.querySelector(".projetos");
            console.log(title);
    
            const project = document.createElement("div");
            
            project.className = "project";
            project.id = id;
            project.innerHTML = `
                <p class="name">${title}</p>
                <div class="line"></div>
                <i class="fa-solid fa-trash"></i>
            `;
    
            projects.appendChild(project);
        })
    }

    addProject();
    function stylingElements(){
        const stylingTrash = () =>{
            const trashIcons = document.querySelectorAll('.fa-trash');
            
            trashIcons.forEach(icon => {
              icon.addEventListener('mouseenter', () => {
                icon.closest('.project').style.backgroundColor = 'rgb(225, 7, 32)';
              });
            
              icon.addEventListener('mouseleave', () => {
                icon.closest('.project').style.backgroundColor = ''; // ou a cor original
              });
            });
        }
        const stylingProject = () =>{
            const trashIcons = document.querySelectorAll('.fa-trash');
            
            trashIcons.forEach(icon => {
              icon.addEventListener('mouseenter', () => {
                icon.closest('.project').style.backgroundColor = 'rgb(225, 7, 32)';
              });
            
              icon.addEventListener('mouseleave', () => {
                icon.closest('.project').style.backgroundColor = ''; // ou a cor original
              });
            });
        }

        stylingTrash();
    }
    stylingElements()
}

setElements();
verifyLocalStorage();

