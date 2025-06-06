const tools = {
	setNotify(mens) {
		const notify = document.createElement("div");
		const body = document.querySelector("body");

		notify.innerHTML = `
							<h2>${mens}</h2>
							<button class="ok">ok</button>      
						`;
		notify.style.display = "flex";
		notify.className = "notify";

		body.appendChild(notify);

		const button = document.querySelector(".ok");

		button.addEventListener("click", removeNotify);

		setTimeout(removeNotify, 2500);

		function removeNotify() {
			notify.innerHTML = "";
			notify.style.display = "none";
			body.removeChild(notify);
		}
	},
	setDays(date) {
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
	},
	formaterDate(date) {
		const data = new Date(date);

		const dia = String(data.getDate() + 1).padStart(2, "0");
		const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0
		const ano = data.getFullYear();

		const dataFormatada = `${dia}/${mes}/${ano}`;
		return dataFormatada;
	},
	async searchPassword(password){
		try{
			const url = "https://myschoollback.onrender.com/login";
			const response = await fetch(url,{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password: password,
				}),
			});
			return await response.json();
		}catch(e){
			console.log(e);
		}
	}
};

export { tools };
