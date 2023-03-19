
<script>
	import { Peer } from "peerjs";
	import VueCookies from "vue-cookies";
	
	let userID = VueCookies.get("userID");
	if (!userID || userID.length !== 36) {
		userID = crypto.randomUUID();
		VueCookies.set("userID", userID);
	}
	
	// const peer = new Peer(userID, {
	// 	host: "localhost",
	// 	port: 8080,
	// 	path: "/peerjs/myapp",
	// });
	
	export default {
		data() {
			return {
				peer: new Peer(userID, {
					host: "https://oysi-server.azurewebsites.net",
					port: 8080,
					path: "/peerjs/myapp",
				}),
				board: [],
				connections: [],
			};
		},
		methods: {
			async fetchData() {
				try {
					const res = await fetch(`https://oysi-server.azurewebsites.net/game/${this.$route.params.code}?userID=${userID}`);
					// const res = await fetch(`http://localhost:8080/game/${this.$route.params.code}?userID=${userID}`);
					const data = await res.json();
					
					console.log("data", data);
					
					// connect to users
					for (let targetUserID of data.users) {
						if (targetUserID !== userID) {
							console.log("attempting to connect to ", targetUserID);
							
							const conn = this.peer.connect(targetUserID);
							
							conn.on("open", () => {
								conn.send("hi!");
							});
						}
					}
					
					// connection events
					this.peer.on("connection", conn => {
						conn.on("data", data => {
							console.log("data", data);
						});
						conn.on("open", () => {
							console.log("open");
							conn.send("hello!");
						});
					});
					
					
					// const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
					// this.data = await response.json();
					
					const board = [[]];
					for (let char of data.Board.slice(0, -1)) {
						if (char === ";") {
							board.push([]);
						} else {
							const node = {};
							
							node.char = char;
							node.style = {};
							
							node.style.display = "inline-block";
							node.style.position = "relative";
							node.style.width = "16px";
							node.style.height = "16px";
							node.style.background = "orange";
							node.style.marginRight = "0.25rem";
							
							if (char === "0") {
								node.style.background = "white";
							} else if (char === "1") {
								node.style.background = "grey";
							}
							
							board[board.length - 1].push(node);
						}
					}
					
					console.log(board);
					
					this.board = board;
				} catch (err) {
					console.error(err);
				}
			},
		},
		mounted() {
			this.fetchData();
		},
	}
</script>

<template>
	<div>
		<div>
			<div>Share this game!</div>
			<div>
				<span>https://azure.oysi.tv/game/</span>
				<span>{{ $route.params.code }}</span>
			</div>
		</div>
		<div style="padding-top: 3rem;">
			Hello
		</div>
		<div style="">
			<div v-for="row in board">
				<span v-for="node in row" :style="node.style">
				</span>
			</div>
		</div>
	</div>
</template>

<style>
	@media (min-width: 1024px) {
		.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
		}
	}
</style>
