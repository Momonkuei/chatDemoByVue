const app = Vue.createApp({
	name: 'scroll',
	data() {
		return {
			enteredContentValue: '',
			computerContentValue: '',
			messagedatas: [
				{
					username: true,
					img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png',
					content: 'I say you say ',
				},
				{
					username: false,
					img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png',
					content: 'You say i say ',
				},
			],
		};
	},
	methods: {
		addMessage() {
			if (
				this.enteredContentValue.replace(/(^s*)|(s*$)/g, '').length !==
				0
			) {
				const dataOwer = {
					username: true,
					img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png',
					content: this.enteredContentValue,
				};
				this.messagedatas.push(dataOwer);
				this.computerContentValue = this.enteredContentValue;
				this.enteredContentValue = '';
				this.awaitMessage();
				// console.log(this.messagedatas);
				this.$nextTick(() => {
					let msg = document.getElementById('chatArea');
					msg.scrollTop = msg.scrollHeight;
					console.log(msg);
				});
			} else {
				alert('請輸入文字');
			}
		},
		awaitMessage() {
			const that = this;
			const awaitValue = new Promise(function (resolve, resject) {
				setTimeout(() => {
					resolve({
						username: false,
						img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png',
						content: that.computerContentValue,
					});
				}, 1000);
			});
			awaitValue
				.then(res => {
					this.messagedatas.push(res);
					console.log(res);
					console.log(this.messagedatas);
					this.computerContentValue = '';
					this.$nextTick(() => {
						let msg = document.getElementById('chatArea');
						msg.scrollTop = msg.scrollHeight;
						console.log(msg);
					});
				})
				.catch(err => console.log(err));
		},
		scrollToEnd() {
			var content = this.$refs.container;
			content.scrollTop = content.scrollHeight;
		},
	},
	// updated() {
	// 	// This will be called when the component updates
	// 	// try toggling a todo
	// 	this.scrollToEnd();
	// },

	// mounted() {
	// 	// This will be called on load
	// 	this.scrollToEnd();
	// },
});

app.mount('#chatArea');
app.use(VueSmoothScroll);
