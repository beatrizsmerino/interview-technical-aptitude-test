const NETWORK_ERROR_PROBABILITY = 0.1;
const MAX_RETRIES = 3;

function fakeFetch(ad, cb, retries = 0) {
	const fakeResponses = [
		{
			"ad": 1,
			"title": "The first ad",
		},
		{
			"ad": 2,
			"title": "The second ad",
		},
		{
			"ad": 3,
			"title": "The third ad",
		},
		{
			"ad": 4,
			"title": "The forth ad",
		},
		{
			"ad": 5,
			"title": "The last ad",
		},
	];
	const randomDelay = Math.round(Math.random() * 1E4) % 40 + 1000;

	setTimeout(() => {
		const networkError = Math.random() <= NETWORK_ERROR_PROBABILITY;
		const currentAd = fakeResponses.find(resp => resp.ad === ad);

		if (networkError) {
			if (retries < MAX_RETRIES) {
				fakeFetch(ad, cb, retries + 1);
			} else {
				cb(`Failed to load the ad ${ad}`);
			}
		} else {
			cb(null, currentAd);
		}
	}, randomDelay);
}

function fetchAds() {
	let ad = 1;

	function fetchNextAd() {
		fakeFetch(ad, (error, adData) => {
			if (error) {
				console.log(error);
			} else {
				console.log(adData.title);
				ad++;
				if (ad <= 5) {
					fetchNextAd();
				} else {
					console.log("Done!");
				}
			}
		});
	}

	fetchNextAd();
}

fetchAds();
