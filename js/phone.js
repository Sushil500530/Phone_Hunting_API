const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
  //   console.log(phones[2].phone_name);
    displayPhones(phones);
  };
  
  const displayPhones = (Phones) => {
      //1.where we set elements
      const phoneContainer = document.getElementById('phone-container')
      // clear phone container card before adding new cards 
      phoneContainer.innerText = '' ;
    //   console.log(Phones)

    // display all show button if there are more then 12(jodi element onek gulo ace sekhettre button ta dekhabe, na hole dekhabe na)
    const showAllContainer = document.getElementById('show-all-container') ;
    if(Phones.length > 12){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    // search dile sob gulo phone dekhabe..tai joto gulo dekhate chai seta korar jonno slice() use kora hoy 
    Phones = Phones.slice(0,12)
      Phones.forEach((phone) => {
      console.log(phone)
      // 1.createa div
      const phoneCard = document.createElement("div");
      phoneCard.classList = `card border shadow-xl`;
      //3.set innerHTML
      phoneCard.innerHTML = `
          <figure class="px-10 m-4 py-10 bg-gray-100 rounded-xl hover:scale-105 hover:transition-all">
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
  };
  
  //handle search button
  const handleSearch = () =>{
      const searchField = document.getElementById('search-field') ;
      const searchText = searchField.value ;
      // searchField.value = '' ;
      // console.log(searchText)
      loadPhone(searchText);
  }
  