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
      console.log(Phones)

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
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
          `;
          //4.appendChild
          phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false)
  };
  
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