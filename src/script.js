if (
	localStorage.getItem("name") == "" ||
	localStorage.getItem("name") == null
) {
	window.location.assign("./oi.html");
}
console.log(localStorage.getItem("name"));

const body = document.querySelector("body");

async function drawProjects(turma) {
	body.innerHTML = `
    <article class="top">
    <h1>mySchool</h1>
    
    <section class="filters">
    <p class="filt ambos" onclick="selecter(this)">AMBOS</p>
    <p class="filt turmaA" onclick="selecter(this)">TURMA A</p>
    <p class="filt turmaB" onclick="selecter(this)">TURMA B</p>
    </section>
    </article>
    <section class="projects">
    </section>
    `;

    let url = "";
	if (turma == "ambos") {
        url = "https://myschoollback.onrender.com/projects/";
	}else{
        url = `https://myschoollback.onrender.com/projects/class/${turma}`;
    }

	const response = await fetch(url);

	const projects = document.querySelector(".projects");

	const responseJson = await response.json();
	if (responseJson.length > 0) {
		projects.innerHTML = "";

		for (let i in responseJson) {
			const project = document.createElement("div");
			const { id, title, date, description, tags } = responseJson[i];

			project.className = "project";
			project.id = id;

			const days = setDays(date);

			let color = "";

			if (days[0] < 3) {
				color = "rgb(225, 7, 32)";
			} else if (days[0] < 7) {
				color = " rgb(233, 148, 11)";
			} else {
				color = " rgb(8, 176, 50)";
			}

			project.innerHTML = `
                <div class="color" style="background-color: ${color};">
                    <p>${days[1]}</p>
                </div>
                <div class="data">
                    <div class="tagsAndDates">
                    <p class="tag">${tags[0]}</p>
                    <p class="tag">${tags[1]}</p>
                    <p class="tag">${tags[2]}</p>
                    <p class="date">${formaterDate(date)}</p>
                </div>
                    <h1 class="title">${title}</h1>
                    <p class="description">${description}</p>
            `;
			projects.appendChild(project);

			project.addEventListener("click", () => drawSecondPage(id));
		}
	} else {
		projects.innerHTML = "<h1 class='acabou'>🙏 ACABOU!!</h1>";
	}
}

async function drawSecondPage(id) {
	const {
		date,
		title,
		links,
		subjects,
		images,
		documents,
		description,
		tags,
	} = await (await fetch(`https://myschoollback.onrender.com/projects/id/${id}`)).json();

	const days = setDays(date)[0];

	let color = "";

	if (days < 3 || days === "É HJ!") {
		color = "rgb(225, 7, 32)";
	} else if (days < 7) {
		color = " rgb(233, 148, 11)";
	} else {
		color = " rgb(8, 176, 50)";
	}

	body.innerHTML = `
    <article class="topo" style= "background-color: ${color}">
        <div class="up">
            <p id="volts">voltar</p>
            <p id="date">${formaterDate(date)}</p>
        </div>
        <h1 class="title">${title}</h1>
    </article>
    <article class="content">
        <section class="tags">
            <div class="tag">${tags[0]}</div>
            <div class="tag">${tags[1]}</div>
            <div class="tag">${tags[2]}</div>
            <div class="tag">${subjects}</div>
        </section>

        <section class="linkses"></section>
        <section class="images"></section>
        <section class="documents"></section>

        <section class="description">
            <p>${description}</p>
        </section>
        
        <label class="addComment" for="oi">
            <input type="text" name="oi" class="newComment" placeholder="adicionar comentário">
            <img class="enviar" src="https://static.thenounproject.com/png/3553333-200.png">
        </label>

        <section class="comments">
            <h2>comentários</h2>
            <div class="allComments"></div>
        </section>
    </article>
    `;

	function setImages() {
		const imagesSection = document.querySelector(".images");
		if (images.length == 0) {
			imagesSection.style.display = "none";
		}
	}
	function setDocuments() {
		const documentsSection = document.querySelector(".documents");
		if (documents.length == 0) {
			documentsSection.style.display = "none";
		}
	}

	function setLinks() {
		if (links.length > 0) {
			const linksHTML = document.createElement("section");
			linksHTML.className = "links";
			for (let i in links) {
				const p = document.createElement("p");
				const newLink = document.createElement("a");

				newLink.href = links[i];
				newLink.target = "_blank";
				newLink.innerText = links[i];

				p.innerText = `link ${parseInt(i) + 1}:`;
				p.appendChild(newLink);

				linksHTML.appendChild(p);
			}
			const sectionLinks = document.querySelector(".linkses");
			if (linksHTML) {
				sectionLinks.replaceWith(linksHTML);
			}
		}
	}

	async function setComments() {
		const comments = await (
			await fetch(`https://myschoollback.onrender.com/comments/${id}`)
		).json();

		const allComments = document.querySelector(".allComments");
		allComments.innerHTML = "";

		for (let i in comments) {
			const { text, name, date } = comments[i];
			const comment = document.createElement("div");
			comment.className = "comment";

			comment.innerHTML = `
                <div class="tope">
                    <p class="name">${name}</p>
                    <p class="date">${formaterDate(date)}</p>
                </div>
                <p class="content">${text}</p>
            `;

			allComments.appendChild(comment);
		}

		console.log(comments);
	}

	function addComment() {
		const btnEnviar = document.querySelector(".enviar");
		btnEnviar.addEventListener("click", async () => {
			const text = document.querySelector(".newComment").value;
			if (text.length > 0) {
				const response = await (
					await fetch("https://myschoollback.onrender.com/comments/", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							project_id: id,
							text: text,
							name: localStorage.getItem("name"),
						}),
					})
				).json();
				setComments();
			}
		});
	}

	setDocuments();
	setImages();
	addComment();
	setComments();
	setLinks();

	const voltar = document.querySelector("#volts");
	voltar.addEventListener("click", () => {
		drawProjects("ambos");
	});
}

function formaterDate(date) {
	const data = new Date(date);

	const dia = String(data.getDate() + 1).padStart(2, "0");
	const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0
	const ano = data.getFullYear();

	const dataFormatada = `${dia}/${mes}/${ano}`;
	return dataFormatada;
}

function setDays(date) {
	const dataEvento = new Date(date);
	const agora = new Date();

	// Zerar as horas para comparar apenas o dia
	dataEvento.setHours(0, 0, 0, 0);
	agora.setHours(0, 0, 0, 0);

	const diffMs = dataEvento - agora;
	const diffDias = Math.round(diffMs / (1000 * 60 * 60 * 24) + 1);

	if (diffDias == 0) {
		return [diffDias, "É HJ!"];
	} else if (diffDias <= -1) {
		return [diffDias, "JÁ FOI"];
	} else {
		return [diffDias, `${diffDias} DIA(S)`];
	}
}

function selecter(buttonClicked) {
	const buttons = document.querySelectorAll(".filt");
	buttons.forEach((button) => button.classList.remove("select"));
	buttonClicked.classList.add("select");
	drawProjects(buttonClicked.classList[1]);
}

drawProjects("ambos");
