import Auth from "../auth/auth.js";
import IndexView from "../views/pages/IndexView.js";

const view = IndexView;
const auth = Auth;

function init() {
    view.init();
    view.handleLoginClick(auth);
    view.handleDashboardClick(auth);
    view.handleRenderImagesAsync(getImageLinksAsync);
}

async function getImageLinksAsync() {
    try {
        const carouselImageLinks = sessionStorage.getItem("carouselImageLinks") || [];

        if (carouselImageLinks.length > 0) {
            const imageLinks = JSON.parse(carouselImageLinks);
            return imageLinks;
        }

        const response = await fetch("https://picsum.photos/v2/list?page=1&limit=3", {
            method: "GET"
        });

        const result = await response.json();
        const imageLinks = result.map(image => image.download_url);
        sessionStorage.setItem("carouselImageLinks", JSON.stringify(imageLinks));

        return imageLinks;
    } catch (error) {
        console.error(error);
    }
}

export default { init };