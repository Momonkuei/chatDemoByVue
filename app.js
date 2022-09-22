const app = Vue.createApp({
	name: 'scroll',
	data() {
		return {
			enteredContentValue: '',
			computerContentValue: '',
			timestamp: '',
			messagedatas: [],
		};
	},
	// async created() {
	// 	const response = await this.computerRetured;
	// },
	methods: {
		addMessage() {
			if (
				this.enteredContentValue.replace(/(^s*)|(s*$)/g, '').length !==
				0
			) {
				const dataOwer = {
					usertalk: true,
					img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png',
					content: this.enteredContentValue,
					time: this.getNow(),
				};
				this.messagedatas.push(dataOwer);
				this.computerContentValue = this.enteredContentValue;
				this.enteredContentValue = '';
				this.awaitMessage();
				console.log(this.computerContentValue);
				// console.log(this.messagedatas);
				this.$nextTick(() => {
					window.scrollTo(0, document.body.scrollHeight);
				});
			} else {
				// alert('請輸入文字');
			}
		},
		computerRetured() {
			const computerValue = this.computerContentValue;
			const that = this;
			return new Promise(function (resolve, resject) {
				setTimeout(() => {
					resolve({
						usertalk: false,
						img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png',
						content: computerValue,
						time: that.getNow(),
					});
				}, 1000);
			});
		},
		async awaitMessage() {
			const awaitValue = await this.computerRetured();
			console.log(awaitValue.content);
			this.messagedatas.push(awaitValue);
			this.computerContentValue = '';
			this.timestamp = '';
			this.$nextTick(() => {
				window.scrollTo(0, document.body.scrollHeight);
			});
		},
		// 對話置底function
		scrollToEnd() {
			const content = this.$refs.container;
			content.scrollTop = content.scrollHeight;
		},
		//時間function
		getNow() {
			const today = new Date();
			const date =
				today.getFullYear() +
				'-' +
				(today.getMonth() + 1) +
				'-' +
				today.getDate();
			const time =
				today.getHours() +
				':' +
				today.getMinutes() +
				':' +
				today.getSeconds();
			const dateTime = date + ' ' + time;
			this.timestamp = dateTime;
			// console.log(this.timestamp);
			return dateTime;
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
