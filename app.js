const app = Vue.createApp({
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
					content: 'I say you say ',
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
				console.log(this.messagedatas);
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
				}, 1500);
			});
			awaitValue
				.then(res => {
					this.messagedatas.push(res);
					console.log(res);
					console.log(this.messagedatas);
					this.computerContentValue = '';
				})
				.catch(err => console.log(err));
		},
	},
});

app.mount('#chatArea');
