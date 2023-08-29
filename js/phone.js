const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
  //   console.log(phones[2].phone_name);
    displayPhones(phones,isShowAll);
  };
  
  const displayPhones = (Phones,isShowAll) => {
      //1.where we set elements
      const phoneContainer = document.getElementById('phone-container')
      // clear phone container card before adding new cards 
      phoneContainer.innerText = '' ;
      //   console.log(Phones)
     // HW---
      const ifNotFound = document.getElementById('if-not-found')
      if(Phones.length === 0 && !isShowAll){
        ifNotFound.innerText = 'No Data Available, Please Search Again...!'
        // console.log("No Data Available!")
      }
      else{
        ifNotFound.innerText = '' ;
      }


    // display all show button if there are more then 12(jodi element onek gulo ace sekhettre button ta dekhabe, na hole dekhabe na)
    const showAllContainer = document.getElementById('show-all-container') ;
    if(Phones.length > 12 && !isShowAll){ // click korar por r jate na dekhay 
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    console.log('is show all', isShowAll)
    // search dile sob gulo phone dekhabe..tai joto gulo dekhate chai seta korar jonno slice() use kora hoy 
    // Phones = Phones.slice(0,12)
    // jodi slice() ta na hoy tahle show all korbo na..r jodi show all hoy tahle slice() korbo..tar mane akta condition dite hobe seta korar jonno 

    if(!isShowAll){
        Phones = Phones.slice(0,12)
    }

      Phones.forEach((phone) => {
    //   console.log(phone)
      // 1.createa div
      const phoneCard = document.createElement("div");
      phoneCard.classList = `card border shadow-xl`;
      //3.set innerHTML
      phoneCard.innerHTML = `
          <figure class="px-10 mx-4 my-3 py-7 bg-gray-100 rounded-xl hover:scale-105 hover:transition-all">
            <img src="${phone.image}" alt="phones" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions">
            <button onclick ="handleShowDetails('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
          </div>
        </div>
          `;
          //4.appendChild
          phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false)
  };
  /*1. show details ta k dhore kaj korar jnno(click korar jonno)
  2. kare click kora hoice seta bujhte hobe 
  3.data load kora(single phone data)
  */
  const handleShowDetails = async(needId) =>{
    // console.log('clicked details',needId)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${needId}`) ;
    const data = await res.json() ;
    console.log(data) ;
    const phone = data.data
    showPhoneDetails(phone)

  }

  const showPhoneDetails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('show-details-phone-name') ;
    phoneName.innerText = phone.name ;
    const showDetailsContainer =document.getElementById('show-details-container'); 
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="phones">
    <p><strong>Storage:</strong> <span>${phone?.mainFeatures?.storage}</span></p>
    <p><strong>Display Size:</strong> :<span>${phone?.mainFeatures?.displaySize}</span></p>
    <p><strong>Chipset:</strong> <span>${phone?.mainFeatures?.chipSet}</span></p>
    <p><strong>Memory:</strong> <span>${phone?.mainFeatures?.memory}</span></p>
    <p><strong>Slug:</strong> <span>${phone?.slug}</span></p>
    <p><strong>Release Date:</strong> <span>${phone?.releaseDate}</span></p>
    <p><strong>Brand:</strong> <span>${phone?.brand}</span></p>
    <p><strong>Sensors:</strong> <span>${phone?.mainFeatures?.sensors}</span></p>
    <p><strong>GPS:</strong> <span>${phone?.others?.GPS || 'No GPS Available'}</span></p>
    `
    // <p><strong>GPS:</strong> <span>${phone?.others?.GPS ? phone.others.GPS : 'No GPS Available'}</span></p>

    // show the modal 
    show_details_modal.showModal(phone)
  }

  //handle search button
  const handleSearch = (isShowAll) =>{
    // ai function ta agei dite hobe, pore dile to value gulo dekhay dibe
    toggleLoadingSpinner(true)
      const searchField = document.getElementById('search-field') ;
      const searchText = searchField.value ;
      // searchField.value = '' ;
      // console.log(searchText)
      loadPhone(searchText,isShowAll);
  }

//   loanding spinner 
const toggleLoadingSpinner = (isLoading) => {
    const loandingSpinner = document.getElementById('loading-spinner') ;
    // sorasori to dekhano jabe na,, tai akta shorto diye dekhate hobe
    if(isLoading){
        loandingSpinner.classList.remove('hidden') 
    }
    else{
        loandingSpinner.classList.add('hidden') 
    }
}

// handle show all or more show 
const handleShowAll = () =>{
    handleSearch(true)
}