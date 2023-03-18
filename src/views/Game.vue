
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
		<div>
			<div v-for="row in board">
				<span v-for="node in row" :style="node.styleObject">
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				board: [],
			};
		},
		methods: {
			async fetchData() {
				try {
					// const res = await fetch(`https://oysi-server.azurewebsites.net/game/${this.$route.params.code}`);
					const res = await fetch(`http://localhost:8080/game/${this.$route.params.code}`);
					const data = await res.json();
					console.log("data", data);
					// const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
					// this.data = await response.json();
					
					const board = [[]];
					for (let char of data.Board.slice(0, -1)) {
						if (char === ";") {
							board.push([]);
						} else {
							board[board.length - 1].push({
								char: char,
								styleObject: {
									display: "inline-block",
									position: "relative",
									width: "16px",
									height: "16px",
									background: "orange",
									marginRight: "0.25rem",
								},
							});
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

<style>
	@media (min-width: 1024px) {
		.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
		}
	}
</style>
