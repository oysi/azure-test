<script setup>
	import TheWelcome from '../components/TheWelcome.vue'
	import VueCookies from "vue-cookies";
	
	import { ref } from "vue";
	
	let userID = VueCookies.get("userID");
	if (!userID || userID.length !== 36) {
		userID = crypto.randomUUID();
		VueCookies.set("userID", userID);
	}
	
	const gameCode = ref("");
	
	function newGame() {
		console.log("newGame");
		fetch(
			`https://oysi-server.azurewebsites.net/newgame?userID=${userID}`
		).then(res => res.json()).then(data => {
			console.log("data", data);
			const code = data.Code;
			if (code) {
				this.$router.push(`/game/${code}`);
			} else {
				error("invalid code", code);
			}
		}).catch(err => {
			console.error(err);
		});
	}
	
	function joinGame() {
		console.log("joinGame");
	}
</script>

<template>
	<main>
		<div>Hello</div>
		<div>You</div>
		<button @click="newGame.call(this)">Click me to generate a game</button>
		<button @click="joinGame.call(this)">Click me to join a game</button>
		<div>This is for co op minesweeper</div>
		<br />
		<div>Your game code is {{ gameCode || "INVALID" }}</div>
		<div>Your userID: {{ VueCookies.get("userID") }}</div>
	</main>
</template>
