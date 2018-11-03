const blockedWebsites = [ '*.facebook.com', 'twitter.com', '*.instagram.com' ]

const close = () => {

	return {

		cancel: true

	}

}

const setOn = () => {

	chrome.webRequest.onBeforeRequest.addListener(
		close,
		{
			urls: blockedWebsites.map(item => `*://${item}/*`)
		},
		['blocking']
	)

	chrome.browserAction.setIcon({ path: 'icons/icon16.png' })

}

const setOff = () => {

	chrome.webRequest.onBeforeRequest.removeListener(close)

	chrome.browserAction.setIcon({ path: 'icons/disable.png' })

}

if (localStorage.getItem('off')) {

	setOff();
	
}
else {

	setOn();
	
}

chrome.browserAction.onClicked.addListener((tab) => {

	if (localStorage.getItem('off')) {

		localStorage.setItem('off', '');
		setOn();
		
    }
    else {

		localStorage.setItem('off', '1');
		setOff();
		
    }
	
})



