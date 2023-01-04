export function getOffsetForElementById(id) {
	const NAVBAR_HEIGHT = 95;
	const PADDING = 16;
	const el = document.getElementById(id);
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.scrollX,
		top: (rect.top + window.scrollY) - NAVBAR_HEIGHT - PADDING,
	};
}