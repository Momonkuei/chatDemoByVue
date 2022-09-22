const app = Vue.createApp({
	name: 'scroll',
	data() {
		return {
			enteredContentValue: '',
			computerContentValue: '',
			timestamp: '',
			messagedatas: [
				// {
				// 	username: true,
				// 	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png',
				// 	content: 'I say you say ',
				// },
				// {
				// 	username: false,
				// 	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png',
				// 	content: 'You say i say ',
				// },
				// {
				// 	username: true,
				// 	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png',
				// 	content: 'I say you say ',
				// },
				// {
				// 	username: false,
				// 	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png',
				// 	content: 'You say i say ',
				// },
				// {
				// 	username: true,
				// 	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png',
				// 	content: 'I say you say ',
				// },
				// {
				// 	username: false,
				// 	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png',
				// 	content: 'You say i say ',
				// },
				// {
				// 	username: true,
				// 	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png',
				// 	content: 'I say you say ',
				// },
				// {
				// 	username: false,
				// 	img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png',
				// 	content: 'You say i say ',
				// },
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
					time: this.getNow(),
				};
				this.messagedatas.push(dataOwer);
				this.computerContentValue = this.enteredContentValue;
				this.enteredContentValue = '';
				this.awaitMessage();
				// console.log(this.messagedatas);
				this.$nextTick(() => {
					// let msg = document.getElementById('body');
					// msg.scrollTop = msg.scrollHeight;
					// console.log(msg);
					let msg = document.getElementById('body');
					let message = document.getElementById('chatAreaMain');
					// msg.scrollTop = message.height;
					// msg.scrollTop = message.scrollHeight;
					// console.log(msg.scrollTop);
					window.scrollTo(0, document.body.scrollHeight);
				});
			} else {
				// alert('請輸入文字');
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
						time: that.getNow(),
					});
				}, 1000);
			});
			awaitValue
				.then(res => {
					this.messagedatas.push(res);

					this.computerContentValue = '';
					this.timestamp = '';
					this.$nextTick(() => {
						// let msg = document.getElementById('body');
						// let message = document.getElementById('chatAreaMain');
						// msg.scrollTop = message.scrollHeight;
						// console.log(msg);
						window.scrollTo(0, document.body.scrollHeight);
					});
				})
				.catch(err => console.log(err));
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

		//測試自動到底
		scrollToEnd: function () {
			const content = this.$refs.messagesContainer;
			content.scrollTop = content.scrollHeight;
		},
	},
	mounted() {
		// This will be called on load
		this.scrollToEnd();
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
