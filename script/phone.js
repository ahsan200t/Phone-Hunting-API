const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)

    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones);
}

const displayPhone = (phones) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = "";

    const showAllButton = document.getElementById("show-all-container");
    if (phones.length > 12) {
        showAllButton.classList.remove("hidden");
    } else {
        showAllButton.classList.add("hidden");
    }

    phones = phones.slice(0, 12);
    phones.forEach(phone => {

        const phoneCard = document.createElement("div");
        phoneCard.classList = `card bg-gray-100 p-6 shadow-xl`;
        phoneCard.innerHTML = `
        <figure>
        <img
          src="${phone.image}"
         
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneCard);

    });
   
    toggleLoadingSpinner(false);

}


// handle Search Button
const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if(isLoading){
        loadingSpinner.classList.remove("hidden");
    }else{
        loadingSpinner.classList.add("hidden");
    }
}
// loadPhone();
