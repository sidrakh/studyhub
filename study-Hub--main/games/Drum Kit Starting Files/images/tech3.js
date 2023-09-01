const app = (() => {
	let body;
	let menu;
	let menuItems;

	const init = () => {
		body = document.querySelector('body');
		menu = document.querySelector('.menu-icon');
		plusIcon = document.querySelector('.plus-icon');
    const overlay = document.querySelector('#overlay');

		applyListeners();
	}

	const applyListeners = () => {
		menu.addEventListener('click', () => {
      toggleClass(body, 'nav-active')
      if(overlay)
        toggleClass(overlay, "active");
    });
		if (plusIcon) plusIcon.addEventListener('click', () => toggleClass(body, 'menu-active'));
	}

	const toggleClass = (element, stringClass) => {
		if (element.classList.contains(stringClass))
			element.classList.remove(stringClass);
		else
			element.classList.add(stringClass);
	}

	init();
})();
