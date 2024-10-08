import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createListItem } from "./createGallery";   

// Constants
const searchInput = document.getElementById('searchImages');
const searchButton = document.getElementById('searchBtn');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

// PixaBay properties
const key = "46332612-74f33d1ba9ca951ac6c22d341";
const image_type = "photo";
const orientation = "horizontal";
const safesearch = "true";

searchButton.addEventListener('click', () => {
    loader.style.display = "block";
    gallery.style.display = "none"
    let URL = "https://pixabay.com/api/?key="+key
          +"&q="+encodeURIComponent(`${searchInput.value}`)
          +"&image_type="+image_type
          +"&orientation="+orientation
          +"&safesearch="+safesearch;

    const options = {
        method: "GET"
    };
    
    fetch(URL, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
    })
      .then(data => {
        if (data.total == 0) {
            loader.style.display = "none";
            iziToast.error({message: `Sorry, there are no images matching your search query. Please try again!`});
            return;
        }

        loader.style.display = "none";
        gallery.innerHTML = "";
        createListItem(data.hits, gallery);
        gallery.style.display = "flex";
        const lightBox = new SimpleLightbox("ul.gallery a", {
            captionType: "attr",
            captionsData: "alt",
            sourceAttr: "href",
            overlay: true,
            overlayOpacity: 1,
        });
        lightBox.refresh();
    })
      .catch(error => {
        console.log(error);
    });
});
