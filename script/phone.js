const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)

    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = "";

    const showAllButton = document.getElementById("show-all-container");
    if (phones.length > 12 && !isShowAll) {
        showAllButton.classList.remove("hidden");
    } else {
        showAllButton.classList.add("hidden");
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
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
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <p class="text-2xl font-bold text-center"><span>$</span>999</p>
        <div class="card-actions justify-center">
          <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneCard);

    });

    toggleLoadingSpinner(false);

}


// handle Search Button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
   
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
    }
}

const handleShowAll = () => {
    handleSearch(true);
}


const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById("show-detail-phone-name");
    phoneName.innerText = phone.name;
    phoneName.classList.add("text-center");
    const showDetailContainer = document.getElementById("show-detail-container");
    showDetailContainer.innerHTML = `
      <div class="flex justify-center items-center bg-[#0D6EFD0D] p-10">
      <img src="${phone.image}"></img>
      </div>
      <p><span class="text-xl font-semibold">Description: </span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
      <p><span class="text-xl font-semibold">Storage: </span>${phone?.mainFeatures?.storage} </p>
      <p><span class="text-xl font-semibold">Display-Size: </span> ${phone.mainFeatures.displaySize} </p>
      <p><span class="text-xl font-semibold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
      <p><span class="text-xl font-semibold">Memory: </span>${phone?.mainFeatures?.memory}</p>
      <p><span class="text-xl font-semibold">Slug: </span>${phone.slug}</p>
      <p><span class="text-xl font-semibold">Release Data: </span>${phone?.releaseDate}</p>
      <p><span class="text-xl font-semibold">Brand: </span>${phone.brand}</p>
      <p><span class="text-xl font-semibold">GPS: </span>${phone?.others?.GPS || "NO GPS Available"}</p>
    `;
    show_details_modal.showModal();
    console.log(phone)
}
loadPhone();

